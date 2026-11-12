/**
 * Cloudflare Worker: serves the static site (assets binding), handles leads at
 * /api/lead (the website form, and JSON from assistants: see /openapi.json),
 * serves the MCP server at /mcp, and exposes a private read-only CRM at /leads.
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
 *   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID            — Telegram notification
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
// @ts-expect-error: plain ESM module, not type-checked (worker/ is excluded in tsconfig)
import { handleMcp } from './mcp.mjs';
// @ts-expect-error: plain ESM module, not type-checked (worker/ is excluded in tsconfig)
import { handleEvent, SOURCE_FIELDS, EVENT_FIELDS } from './lead-source.mjs';
import { SITE_URL, SITE_INDEXABLE, STAGING_URL } from '../src/config';

const CANONICAL_HOST = new URL(SITE_URL).hostname; // aerocomfort.es
const STAGING_HOST = new URL(STAGING_URL).hostname; // aero.dimadomore.com

/**
 * Old Tilda addresses that Google may still know. Tilda answers every page at
 * /page<id>.html too (ids from data-tilda-page-id); /es and /thank-you keep
 * the same address on the new site, so they need no entry.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/sitemap.xml': '/sitemap-index.xml',
  '/page51904037.html': '/',
  '/page56383113.html': '/es',
  '/page58543935.html': '/thank-you',
};

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
  // Source fields (migrations/0002); absent on rows stored before it.
  [field: string]: string | number | undefined;
}

type EventRow = Record<string, string>;

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  DB?: D1Database;
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  LEAD_EMAIL_TO?: string;
  LEAD_EMAIL_FROM?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
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
    '</sitemap-index.xml>; rel="sitemap"; type="application/xml", ' +
    '</.well-known/api-catalog>; rel="api-catalog", ' +
    '</openapi.json>; rel="service-desc"; type="application/openapi+json", ' +
    '</.well-known/mcp/server-card.json>; rel="mcp", ' +
    '</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
};

function withSiteHeaders(res: Response): Response {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(SITE_HEADERS)) out.headers.set(k, v);
  return out;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const res = withSiteHeaders(await route(request, env));
    // Only aerocomfort.es belongs in search results. Staging and preview copies
    // serve the same pages, so they are kept out even when the build is indexable.
    if (new URL(request.url).hostname !== CANONICAL_HOST && !res.headers.has('X-Robots-Tag')) {
      res.headers.set('X-Robots-Tag', 'noindex');
    }
    return res;
  },
};

/** 301 for reads; 308 keeps the method and body of a POST. */
function permanentRedirect(location: string, request: Request): Response {
  const status = request.method === 'GET' || request.method === 'HEAD' ? 301 : 308;
  return new Response(null, { status, headers: { Location: location } });
}

/**
 * One address per page: www, plain http and (once the site is indexable) the
 * staging host go to https://aerocomfort.es, and old Tilda addresses go to
 * their new page. Path and query are kept, so ad click ids survive.
 */
function siteRedirect(request: Request, url: URL): Response | null {
  const { hostname, pathname, search } = url;
  const local = hostname === 'localhost' || hostname === '127.0.0.1';
  let origin = url.origin;
  if (hostname === `www.${CANONICAL_HOST}` || (SITE_INDEXABLE && hostname === STAGING_HOST)) origin = SITE_URL;
  else if (url.protocol === 'http:' && !local) origin = `https://${url.host}`;
  const path = LEGACY_REDIRECTS[pathname] ?? pathname;
  if (origin === url.origin && path === pathname) return null;
  return permanentRedirect(origin + path + search, request);
}

async function route(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  const redirect = siteRedirect(request, url);
  if (redirect) return redirect;

  // Persist to D1 (when bound); email and Telegram notifications run when their secrets are set.
  // The same hooks serve the form, the JSON API and the MCP tool.
  const leadHooks = {
    persist: env.DB ? (lead: LeadRow) => insertLead(env.DB!, lead) : undefined,
    recentCount: env.DB ? (ip: string) => countRecentLeads(env.DB!, ip) : undefined,
  };

  if (path === '/api/lead') {
    // Open to other origins so an assistant running in a browser can send a request.
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: LEAD_CORS });
    if (request.method === 'POST') {
      const res = await handleLead(request, env, leadHooks);
      const out = new Response(res.body, res);
      for (const [k, v] of Object.entries(LEAD_CORS)) out.headers.set(k, v);
      return out;
    }
  }

  // Public MCP server for agents outside the browser.
  if (path === '/mcp') return handleMcp(request, env, leadHooks);

  // Anonymous counter of WhatsApp / phone / email clicks (see worker/lead-source.mjs).
  if (path === '/api/event' && request.method === 'POST') {
    return handleEvent(request, {
      persistEvent: env.DB ? (event: EventRow) => insertEvent(env.DB!, event) : undefined,
    });
  }

  // Browsers often add a trailing slash; without this, /leads/ falls through to the 404 page.
  if (path === '/leads/') return Response.redirect(new URL('/leads', url).toString(), 301);

  if ((path === '/leads' || path === '/leads.csv' || path === '/leads/clicks.csv') && request.method === 'GET') {
    return handleLeads(path, request, env);
  }

  // Everything else → static assets (pages, css, js, 404).
  const res = await env.ASSETS.fetch(request);
  // The assets layer sends /about/ and /about/index.html to /about with a
  // temporary 307. Search engines should drop the old form, so make it a 301.
  if (res.status === 307 && (request.method === 'GET' || request.method === 'HEAD')) {
    const location = res.headers.get('Location');
    if (location) {
      const target = new URL(location, url);
      if (!target.search) target.search = url.search;
      return permanentRedirect(target.origin === url.origin ? target.pathname + target.search : target.toString(), request);
    }
  }
  return res;
}

const LEAD_CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, accept',
  'Access-Control-Max-Age': '86400',
};

/** Leads stored from one IP address in the last hour (the anti-spam limit). */
async function countRecentLeads(db: D1Database, ip: string): Promise<number> {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { results } = await db
    .prepare('SELECT COUNT(*) AS n FROM leads WHERE ip = ? AND at > ?')
    .bind(ip, since)
    .all<{ n: number }>();
  return Number(results[0]?.n ?? 0);
}

const LEAD_BASE = ['at', 'name', 'phone', 'whatsapp', 'service', 'message', 'locale', 'page', 'ip'];

async function insertLead(db: D1Database, lead: LeadRow): Promise<void> {
  const value = (f: string) => (f === 'whatsapp' ? (lead.whatsapp ? 1 : 0) : (lead[f] ?? ''));
  const insert = (fields: string[]) =>
    db
      .prepare(`INSERT INTO leads (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`)
      .bind(...fields.map(value))
      .run();
  try {
    await insert([...LEAD_BASE, ...(SOURCE_FIELDS as string[])]);
  } catch (err) {
    // The source columns are not there yet (migration 0002 not applied): never
    // lose the lead over it, store what the old table can hold.
    console.error('lead insert with source failed, storing without it', err);
    await insert(LEAD_BASE);
  }
}

async function insertEvent(db: D1Database, event: EventRow): Promise<void> {
  const fields = EVENT_FIELDS as string[];
  await db
    .prepare(`INSERT INTO events (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`)
    .bind(...fields.map((f) => event[f] ?? ''))
    .run();
}

const csvCell = (v: unknown) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

async function handleLeads(path: string, request: Request, env: Env): Promise<Response> {
  // Gate: password required. Without LEADS_PASSWORD set, the page stays locked.
  if (!checkLeadsAuth(request, env)) return unauthorizedResponse();

  if (!env.DB) {
    return new Response('CRM storage (D1) is not configured.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8', ...NOINDEX_HEADERS },
    });
  }

  if (path === '/leads/clicks.csv') {
    const fields = EVENT_FIELDS as string[];
    let rows: EventRow[] = [];
    try {
      rows = (await env.DB.prepare(`SELECT ${fields.join(', ')} FROM events ORDER BY id DESC LIMIT 20000`).all<EventRow>()).results;
    } catch {
      /* table not created yet */
    }
    const csv = [fields.join(','), ...rows.map((r) => fields.map((f) => csvCell(r[f])).join(','))].join('\n') + '\n';
    return new Response(csv, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="clicks.csv"',
        ...NOINDEX_HEADERS,
      },
    });
  }

  // SELECT * so the page works before and after the source columns exist.
  const { results } = await env.DB.prepare('SELECT * FROM leads ORDER BY id DESC LIMIT 1000').all<LeadRow>();
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

  // Contact clicks of the last 30 days, grouped by type and page.
  let clicks: { type: string; page: string; n: number }[] = [];
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    clicks = (
      await env.DB.prepare('SELECT type, page, COUNT(*) AS n FROM events WHERE at > ? GROUP BY type, page ORDER BY n DESC LIMIT 500')
        .bind(since)
        .all<{ type: string; page: string; n: number }>()
    ).results;
  } catch {
    /* table not created yet */
  }

  return new Response(renderLeadsPage(leads, clicks), {
    headers: { 'content-type': 'text/html; charset=utf-8', ...NOINDEX_HEADERS },
  });
}
