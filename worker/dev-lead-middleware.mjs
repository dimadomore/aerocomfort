/**
 * Local-dev Astro integration: handles `POST /api/lead` during `astro dev`.
 *
 * In production this endpoint is the Cloudflare Worker (worker/index.ts). Astro
 * dev (port 4321) serves only static pages and knows nothing about /api/lead,
 * so this integration adds a Vite dev-server middleware that runs the EXACT
 * same handleLead() from ./lead-core.mjs — same parsing, same anti-spam, same
 * Resend email. The only extra is the `persist` hook, which appends each lead
 * to data/leads.csv and data/leads.ndjson (the mini-CRM "table" — the Worker
 * can't do this because Cloudflare has no filesystem).
 *
 * Secrets are read from `.dev.vars` (the same file `wrangler dev` uses), with a
 * fallback to process.env. Without RESEND_* set, leads are logged, not emailed.
 */
import { promises as fs } from 'node:fs';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  handleLead,
  leadToCsvRow,
  leadsToCsv,
  CSV_HEADER,
  renderLeadsPage,
  checkLeadsAuth,
  unauthorizedResponse,
  NOINDEX_HEADERS,
} from './lead-core.mjs';
import { handleEvent, EVENT_FIELDS } from './lead-source.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'data');
const csvPath = join(dataDir, 'leads.csv');
const ndjsonPath = join(dataDir, 'leads.ndjson');
const eventsPath = join(dataDir, 'events.ndjson');

/** Parse a minimal KEY=VALUE secrets file (wrangler's `.dev.vars` format). */
function loadDevVars() {
  const env = { ...process.env };
  const file = join(root, '.dev.vars');
  if (!existsSync(file)) return env;
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key) env[key] = val;
  }
  return env;
}

/** Append the lead to the CSV + NDJSON "table" (creates header on first write). */
async function persist(lead) {
  await fs.mkdir(dataDir, { recursive: true });
  const needHeader = !existsSync(csvPath);
  const csv = (needHeader ? CSV_HEADER.join(',') + '\n' : '') + leadToCsvRow(lead) + '\n';
  await fs.appendFile(csvPath, csv);
  await fs.appendFile(ndjsonPath, JSON.stringify(lead) + '\n');
}

/** Append one contact click to data/events.ndjson (production writes to D1). */
async function persistEvent(event) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.appendFile(eventsPath, JSON.stringify(event) + '\n');
}

/** Contact clicks of the last 30 days, grouped like the production query. */
function readClickStats() {
  const since = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const groups = new Map();
  for (const e of readNdjson(eventsPath)) {
    if (new Date(e.at).getTime() < since) continue;
    const key = `${e.type}|${e.page}`;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  return [...groups].map(([key, n]) => ({ type: key.split('|')[0], page: key.split('|')[1], n }));
}

/** Read all saved leads (newest first) from the NDJSON table. */
function readLeads() {
  return readNdjson(ndjsonPath).reverse();
}

function readNdjson(file) {
  if (!existsSync(file)) return [];
  return readFileSync(file, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

/** Copy a Web Response (from the shared core) onto the Node response. */
async function sendWebResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(await response.text());
}

/** Build a Web Request from a Node IncomingMessage (so handleLead is reused as-is). */
async function toWebRequest(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === 'string') headers.set(k, v);
    else if (Array.isArray(v)) headers.set(k, v.join(', '));
  }
  return new Request('http://localhost' + req.url, {
    method: req.method,
    headers,
    body: body.length ? body : undefined,
  });
}

/** @returns {import('astro').AstroIntegration} */
export function devLeadApi() {
  return {
    name: 'dev-lead-api',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use(async (req, res, next) => {
          const path = (req.url || '').split('?')[0];
          const isLeads = path === '/leads' || path === '/leads.csv' || path === '/leads/clicks.csv';

          // Anonymous click counter, same handler as production.
          if (req.method === 'POST' && path === '/api/event') {
            return sendWebResponse(res, await handleEvent(await toWebRequest(req), { persistEvent }));
          }

          // Read-only CRM viewer + CSV — same Basic Auth + noindex as production.
          if (req.method === 'GET' && isLeads) {
            const env = loadDevVars();
            const request = await toWebRequest(req);
            // Auth is enforced only when LEADS_PASSWORD is set (so local browsing
            // stays frictionless until you opt into testing the password).
            if (env.LEADS_PASSWORD && !checkLeadsAuth(request, env)) {
              return sendWebResponse(res, unauthorizedResponse());
            }
            const leads = readLeads();
            for (const [k, v] of Object.entries(NOINDEX_HEADERS)) res.setHeader(k, v);
            if (path === '/leads/clicks.csv') {
              const csvCell = (v) => (/[",\n\r]/.test(String(v ?? '')) ? `"${String(v).replace(/"/g, '""')}"` : String(v ?? ''));
              const rows = readNdjson(eventsPath).reverse();
              res.statusCode = 200;
              res.setHeader('content-type', 'text/csv; charset=utf-8');
              res.setHeader('content-disposition', 'attachment; filename="clicks.csv"');
              res.end([EVENT_FIELDS.join(','), ...rows.map((r) => EVENT_FIELDS.map((f) => csvCell(r[f])).join(','))].join('\n') + '\n');
            } else if (path === '/leads.csv') {
              res.statusCode = 200;
              res.setHeader('content-type', 'text/csv; charset=utf-8');
              res.setHeader('content-disposition', 'attachment; filename="leads.csv"');
              // Built from the NDJSON table, so rows saved before the source columns still line up.
              res.end(leadsToCsv(leads));
            } else {
              res.statusCode = 200;
              res.setHeader('content-type', 'text/html; charset=utf-8');
              res.end(renderLeadsPage(leads, readClickStats()));
            }
            return;
          }

          if (req.method !== 'POST' || path !== '/api/lead') return next();

          try {
            const env = loadDevVars();
            const request = await toWebRequest(req);
            const response = await handleLead(request, env, { persist });

            const channel =
              env.RESEND_API_KEY && env.LEAD_EMAIL_TO && env.LEAD_EMAIL_FROM
                ? `email → ${env.LEAD_EMAIL_TO}`
                : 'logged (no RESEND_* set)';
            logger.info(`lead received → saved to data/leads.csv · ${channel}`);

            res.statusCode = response.status;
            response.headers.forEach((value, key) => res.setHeader(key, value));
            res.end(await response.text());
          } catch (err) {
            logger.error(`lead handler failed: ${err}`);
            res.statusCode = 500;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ ok: false }));
          }
        });
      },
    },
  };
}
