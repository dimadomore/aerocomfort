/**
 * Cloudflare Worker: serves the static site (assets binding), handles the lead
 * form POST at /api/lead, and exposes a private read-only CRM at /leads.
 *
 * Lead logic (parse, anti-spam, email, table render, auth) lives in
 * ./lead-core.mjs so the SAME code runs here and in the local Astro dev
 * middleware (astro.config.mjs) — see that file for local testing.
 *
 * Storage: leads are written to Cloudflare D1 (binding DB) — the Worker has no
 * filesystem, so the local CSV/JSON "table" is dev-only. /leads reads D1.
 *
 * Secrets (set in Cloudflare/CI, see README / docs/09 §7):
 *   RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM  — email notification
 *   LEADS_PASSWORD  (+ optional LEADS_USER)         — /leads login
 *   TURNSTILE_SECRET                                — optional anti-spam
 */
// @ts-expect-error — plain ESM module, not type-checked (worker/ is excluded in tsconfig)
import {
  handleLead,
  renderLeadsPage,
  leadsToCsv,
  checkLeadsAuth,
  unauthorizedResponse,
  NOINDEX_HEADERS,
} from './lead-core.mjs';

interface LeadRow {
  at: string;
  name: string;
  phone: string;
  whatsapp: number;
  service: string;
  message: string;
  locale: string;
  page: string;
  ip: string;
}

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  DB?: D1Database;
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  LEAD_EMAIL_TO?: string;
  LEAD_EMAIL_FROM?: string;
  LEADS_USER?: string;
  LEADS_PASSWORD?: string;
}

// Minimal D1 typings (avoid pulling @cloudflare/workers-types just for this).
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<unknown>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
}

/**
 * Site-wide response headers (specification.website: security + agent-readiness).
 * Static assets get the same set from public/_headers (Workers Assets serves
 * them WITHOUT invoking this Worker); this covers the dynamic routes handled
 * here (/api/lead, /leads). Keep in sync with public/_headers. CSP is
 * deliberately minimal (`frame-ancestors` only): GA4/Elfsight inject inline
 * scripts, so a strict script-src would need per-response nonces.
 */
const SITE_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Content-Security-Policy': "frame-ancestors 'self'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  Link:
    '</llms.txt>; rel="describedby"; type="text/markdown"; title="Site index for LLMs", ' +
    '</sitemap-index.xml>; rel="sitemap"; type="application/xml"',
};

function withSiteHeaders(res: Response): Response {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(SITE_HEADERS)) out.headers.set(k, v);
  return out;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return withSiteHeaders(await route(request, env));
  },
};

async function route(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/lead' && request.method === 'POST') {
    // Persist to D1 (when bound); email delivery runs when Resend secrets set.
    return handleLead(request, env, {
      persist: env.DB ? (lead: LeadRow) => insertLead(env.DB!, lead) : undefined,
    });
  }

  if ((path === '/leads' || path === '/leads.csv') && request.method === 'GET') {
    return handleLeads(path, request, env);
  }

  // Everything else → static assets (pages, css, js, 404).
  return env.ASSETS.fetch(request);
}

async function insertLead(db: D1Database, lead: LeadRow): Promise<void> {
  await db
    .prepare(
      'INSERT INTO leads (at, name, phone, whatsapp, service, message, locale, page, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    )
    .bind(
      lead.at,
      lead.name,
      lead.phone,
      lead.whatsapp ? 1 : 0,
      lead.service,
      lead.message,
      lead.locale,
      lead.page,
      lead.ip,
    )
    .run();
}

async function handleLeads(path: string, request: Request, env: Env): Promise<Response> {
  // Gate: password required. Without LEADS_PASSWORD set, the page stays locked.
  if (!checkLeadsAuth(request, env)) return unauthorizedResponse();

  if (!env.DB) {
    return new Response('CRM storage (D1) is not configured.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8', ...NOINDEX_HEADERS },
    });
  }

  const { results } = await env.DB.prepare(
    'SELECT at, name, phone, whatsapp, service, message, locale, page, ip FROM leads ORDER BY id DESC LIMIT 1000',
  ).all<LeadRow>();
  const leads = results.map((r) => ({ ...r, whatsapp: Boolean(r.whatsapp) }));

  if (path === '/leads.csv') {
    return new Response(leadsToCsv(leads), {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="leads.csv"',
        ...NOINDEX_HEADERS,
      },
    });
  }

  return new Response(renderLeadsPage(leads), {
    headers: { 'content-type': 'text/html; charset=utf-8', ...NOINDEX_HEADERS },
  });
}
