/**
 * Shared, runtime-agnostic lead handling.
 *
 * Used by BOTH:
 *   - the Cloudflare Worker (worker/index.ts) in production, and
 *   - the local Astro dev middleware (astro.config.mjs) for testing.
 *
 * Everything here uses only Web-standard APIs (fetch, Request, Response,
 * FormData) so the exact same code path runs in the Worker runtime and in
 * Node 22+. Persistence (writing a CSV/JSON "table") is injected as a hook,
 * because the Worker has no filesystem — only the local dev server does.
 *
 * @typedef {Object} Lead
 * @property {string} name
 * @property {string} phone
 * @property {boolean} whatsapp
 * @property {string} service
 * @property {string} message
 * @property {string} locale
 * @property {string} page
 * @property {string} ip
 * @property {string} at        ISO timestamp
 *
 * @typedef {Object} LeadEnv
 * @property {string} [RESEND_API_KEY]
 * @property {string} [LEAD_EMAIL_TO]
 * @property {string} [LEAD_EMAIL_FROM]
 * @property {string} [TURNSTILE_SECRET]
 */

/** CSV column order — keep in sync with leadToCsvRow(). */
export const CSV_HEADER = [
  'at',
  'name',
  'phone',
  'whatsapp',
  'service',
  'message',
  'locale',
  'page',
  'ip',
];

/**
 * Core request handler. Parses the lead, runs anti-spam, persists (via hook),
 * sends the notification email, and returns the right Response for JS (JSON)
 * and no-JS (303 redirect) clients.
 *
 * @param {Request} request
 * @param {LeadEnv} env
 * @param {{ persist?: (lead: Lead) => Promise<void> | void }} [hooks]
 * @returns {Promise<Response>}
 */
export async function handleLead(request, env, hooks = {}) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');

  /** @type {Record<string, string>} */
  const data = {};
  const ct = request.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      Object.assign(data, await request.json());
    } else {
      const fd = await request.formData();
      fd.forEach((v, k) => {
        data[k] = String(v);
      });
    }
  } catch {
    // fall through to validation
  }

  const locale = data.locale === 'es' ? 'es' : 'en';
  const thankYou = locale === 'es' ? '/es/gracias' : '/thank-you';
  const contact = locale === 'es' ? '/es/contacto' : '/contact';

  /** @param {boolean} ok */
  const respond = (ok) => {
    if (wantsJson) {
      return new Response(JSON.stringify({ ok }), {
        status: ok ? 200 : 400,
        headers: { 'content-type': 'application/json' },
      });
    }
    // No-JS path: redirect to thank-you on success, back to contact on failure.
    return new Response(null, {
      status: 303,
      headers: { Location: ok ? thankYou : `${contact}?error=1` },
    });
  };

  // Honeypot — silently accept (don't tip off bots), don't deliver.
  if (data.company) return respond(true);

  // Turnstile (only enforced once configured).
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(
      env.TURNSTILE_SECRET,
      data['cf-turnstile-response'],
      request.headers.get('cf-connecting-ip'),
    );
    if (!ok) return respond(false);
  }

  const name = (data.name || '').trim();
  const phone = (data.phone_e164 || data.phone || '').trim();
  if (!name || !phone) return respond(false);

  /** @type {Lead} */
  const lead = {
    name,
    phone,
    whatsapp: data.has_whatsapp === 'yes',
    service: data.service || '',
    message: data.message || '',
    locale,
    page: request.headers.get('referer') || '',
    ip: request.headers.get('cf-connecting-ip') || '',
    at: new Date().toISOString(),
  };

  // 1) Persist to the "table" (CRM). Best-effort: never lose the lead for the
  //    user just because storage failed. Worker passes no persist hook (no FS);
  //    the local dev server appends to data/leads.csv + data/leads.ndjson.
  try {
    if (hooks.persist) await hooks.persist(lead);
  } catch (err) {
    console.error('lead persist failed', err);
  }

  // 2) Notify by email (Resend). Also best-effort.
  try {
    await deliver(lead, env);
  } catch (err) {
    console.error('lead delivery failed', err);
  }

  return respond(true);
}

/**
 * @param {string} secret
 * @param {string | undefined} token
 * @param {string | null} ip
 * @returns {Promise<boolean>}
 */
async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const json = await res.json().catch(() => ({ success: false }));
  return Boolean(json.success);
}

/**
 * Send the lead notification via Resend. If the secrets aren't set, log instead
 * so nothing is lost (visible in `wrangler tail` / the dev server console).
 * @param {Lead} lead
 * @param {LeadEnv} env
 */
export async function deliver(lead, env) {
  if (env.RESEND_API_KEY && env.LEAD_EMAIL_TO && env.LEAD_EMAIL_FROM) {
    const { subject, text, html } = buildEmail(lead);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.LEAD_EMAIL_FROM,
        to: env.LEAD_EMAIL_TO,
        reply_to: lead.phone ? undefined : undefined, // (no email collected from the lead)
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`Resend ${res.status}: ${detail}`);
    }
    return;
  }
  // No delivery channel configured yet — log so nothing is lost.
  console.log('LEAD (no email channel configured):', JSON.stringify(lead));
}

/**
 * Build the notification email (Russian — at the owner's request).
 * @param {Lead} l
 * @returns {{ subject: string, text: string, html: string }}
 */
export function buildEmail(l) {
  const serviceLabels = {
    installation: 'Установка',
    repair: 'Ремонт',
    maintenance: 'Обслуживание',
    cleaning: 'Чистка',
    other: 'Другое',
  };
  const service = serviceLabels[l.service] || l.service || '—';
  const when = new Date(l.at).toLocaleString('ru-RU', { timeZone: 'Europe/Madrid' });
  const subject = `🔔 Новая заявка — ${l.name}${l.service ? ` (${service})` : ''}`;

  const rows = [
    ['Имя', l.name],
    ['Телефон', l.phone],
    ['WhatsApp на этом номере', l.whatsapp ? 'Да' : 'Нет'],
    ['Услуга', service],
    ['Сообщение', l.message || '—'],
    ['Язык заявки', l.locale === 'es' ? 'Испанский' : 'Английский'],
    ['Время', when],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  // Tappable phone / WhatsApp so the owner can act straight from the inbox.
  const tel = l.phone.replace(/[^\d+]/g, '');
  const wa = tel.replace(/[^\d]/g, '');
  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
    <h2 style="margin:0 0 4px">🔔 Новая заявка</h2>
    <p style="margin:0 0 16px;color:#475569">Aerocomfort · форма на сайте</p>
    <table style="border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600;border:1px solid #e2e8f0;white-space:nowrap">${k}</td><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(String(v))}</td></tr>`,
        )
        .join('')}
    </table>
    <p style="margin:18px 0 0">
      <a href="tel:${tel}" style="display:inline-block;padding:10px 16px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:8px;margin-right:8px">📞 Позвонить</a>
      <a href="https://wa.me/${wa}" style="display:inline-block;padding:10px 16px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px">💬 WhatsApp</a>
    </p>
  </div>`;

  return { subject, text, html };
}

/**
 * One CSV row for the lead, columns per CSV_HEADER. RFC-4180 quoting.
 * @param {Lead} l
 * @returns {string}
 */
export function leadToCsvRow(l) {
  const cells = [
    l.at,
    l.name,
    l.phone,
    l.whatsapp ? 'yes' : 'no',
    l.service,
    l.message,
    l.locale,
    l.page,
    l.ip,
  ];
  return cells.map(csvCell).join(',');
}

/** @param {unknown} value */
function csvCell(value) {
  const s = String(value ?? '');
  // Quote if it contains a comma, quote, or newline; double internal quotes.
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** @param {string} s */
function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ------------------------------------------------------------------ *
 * Read-only CRM viewer (/leads) — shared by the Worker (D1) and the
 * local dev server (file). Both just pass an array of Lead objects.
 * ------------------------------------------------------------------ */

const SERVICE_RU = {
  installation: 'Установка',
  repair: 'Ремонт',
  maintenance: 'Обслуживание',
  cleaning: 'Чистка',
  other: 'Другое',
};

/** Full CSV document for a list of leads (header + rows). @param {Lead[]} leads */
export function leadsToCsv(leads) {
  return [CSV_HEADER.join(','), ...leads.map(leadToCsvRow)].join('\n') + '\n';
}

/**
 * Render the leads table page. Leads must be newest-first already.
 * @param {Lead[]} leads
 * @returns {string} HTML
 */
export function renderLeadsPage(leads) {
  const fmt = (iso) => {
    try {
      return new Date(iso).toLocaleString('ru-RU', { timeZone: 'Europe/Madrid' });
    } catch {
      return String(iso || '');
    }
  };

  const rows = leads
    .map((l) => {
      const tel = String(l.phone || '').replace(/[^\d+]/g, '');
      const wa = tel.replace(/[^\d]/g, '');
      return `<tr>
        <td class="muted nowrap">${escapeHtml(fmt(l.at))}</td>
        <td><b>${escapeHtml(l.name)}</b></td>
        <td class="nowrap">
          <a href="tel:${escapeHtml(tel)}">${escapeHtml(l.phone)}</a>
          ${l.whatsapp ? `<a class="wa" href="https://wa.me/${escapeHtml(wa)}" title="WhatsApp">💬</a>` : ''}
        </td>
        <td>${l.service ? `<span class="tag">${escapeHtml(SERVICE_RU[l.service] || l.service)}</span>` : '<span class="muted">—</span>'}</td>
        <td>${escapeHtml(l.message) || '<span class="muted">—</span>'}</td>
        <td class="muted">${l.locale === 'es' ? 'ES' : 'EN'}</td>
      </tr>`;
    })
    .join('');

  return `<!doctype html><html lang="ru"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>CRM · заявки (${leads.length})</title>
  <style>
    *{box-sizing:border-box} body{margin:0;font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;background:#f8fafc}
    header{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;padding:20px 24px;border-bottom:1px solid #e2e8f0;background:#fff;position:sticky;top:0;z-index:5}
    h1{margin:0;font-size:20px} .count{background:#1d4ed8;color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;font-weight:600}
    .spacer{flex:1} a.btn{font-size:13px;text-decoration:none;background:#0f172a;color:#fff;padding:7px 12px;border-radius:8px} a.btn.light{background:#e2e8f0;color:#0f172a}
    .wrap{padding:16px 24px 60px} table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden}
    th,td{text-align:left;padding:11px 14px;border-bottom:1px solid #eef2f7;vertical-align:top} th{background:#f1f5f9;font-size:12px;text-transform:uppercase;letter-spacing:.03em;color:#475569}
    tr:last-child td{border-bottom:0} tr:hover td{background:#f8fafc}
    a{color:#1d4ed8} a.wa{margin-left:6px;text-decoration:none} .muted{color:#94a3b8} .nowrap{white-space:nowrap}
    .tag{display:inline-block;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;border-radius:6px;padding:1px 8px;font-size:13px}
    .empty{padding:60px 24px;text-align:center;color:#94a3b8}
  </style></head><body>
  <header>
    <h1>📋 Заявки</h1><span class="count">${leads.length}</span>
    <span class="spacer"></span>
    <a class="btn light" href="/leads" title="Обновить">↻ Обновить</a>
    <a class="btn" href="/leads.csv" download>⬇ Скачать CSV</a>
  </header>
  <div class="wrap">
    ${
      leads.length
        ? `<table><thead><tr><th>Время</th><th>Имя</th><th>Телефон</th><th>Услуга</th><th>Сообщение</th><th>Язык</th></tr></thead><tbody>${rows}</tbody></table>`
        : `<div class="empty">Заявок пока нет.<br>Отправь форму на странице контактов — появится здесь.</div>`
    }
  </div>
  <script>setTimeout(()=>location.reload(),15000)</script>
  </body></html>`;
}

/* ------------------------------------------------------------------ *
 * Basic Auth gate for /leads — "type a password and you see it".
 * Username is ignored unless LEADS_USER is set; only the password must
 * match LEADS_PASSWORD. If no password is configured, access is denied.
 * ------------------------------------------------------------------ */

/** Security headers for the private CRM pages (belt-and-suspenders vs indexing). */
export const NOINDEX_HEADERS = { 'X-Robots-Tag': 'noindex, nofollow, noarchive' };

/**
 * @param {Request} request
 * @param {{ LEADS_USER?: string, LEADS_PASSWORD?: string }} env
 * @returns {boolean}
 */
export function checkLeadsAuth(request, env) {
  const expected = env.LEADS_PASSWORD;
  if (!expected) return false; // not configured → safe default: locked
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return false;
  let decoded = '';
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  const i = decoded.indexOf(':');
  const user = i >= 0 ? decoded.slice(0, i) : '';
  const pass = i >= 0 ? decoded.slice(i + 1) : decoded;
  const userOk = !env.LEADS_USER || timingSafeEqual(user, env.LEADS_USER);
  return userOk && timingSafeEqual(pass, expected);
}

/**
 * Constant-time string comparison — a plain `===` short-circuits on the first
 * differing char, which leaks password prefixes to a timing attacker.
 * @param {string} a @param {string} b @returns {boolean}
 */
function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const ab = enc.encode(String(a));
  const bb = enc.encode(String(b));
  let diff = ab.length ^ bb.length;
  const len = Math.max(ab.length, bb.length);
  for (let i = 0; i < len; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

/** 401 response that makes the browser show its login dialog. */
export function unauthorizedResponse() {
  return new Response('Требуется авторизация', {
    status: 401,
    headers: {
      // Header values must be ASCII (Node/Worker reject non-latin1) — keep the
      // realm plain; the body can stay Russian.
      'WWW-Authenticate': 'Basic realm="Aerocomfort leads", charset="UTF-8"',
      'content-type': 'text/plain; charset=utf-8',
      ...NOINDEX_HEADERS,
    },
  });
}
