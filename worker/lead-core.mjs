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
 * @property {string} [TELEGRAM_BOT_TOKEN]  from @BotFather
 * @property {string} [TELEGRAM_CHAT_ID]    one id, or several separated by commas
 * @property {string} [TURNSTILE_SECRET]
 */

import { parsePhoneNumberFromString } from 'libphonenumber-js/min';
import { SOURCE_FIELDS, parseSource, sourceLabel, visitLabel, journeyLabel, renderClickStats } from './lead-source.mjs';

export { sourceLabel } from './lead-source.mjs';

/** CSV column order — keep in sync with leadToCsvRow(). */
export const CSV_HEADER = ['at', 'name', 'phone', 'whatsapp', 'service', 'message', 'locale', 'page', 'ip', ...SOURCE_FIELDS];

/**
 * Core request handler. Parses the lead, runs anti-spam, persists (via hook),
 * sends the notification email, and returns the right Response for JS (JSON)
 * and no-JS (303 redirect) clients.
 *
 * JSON clients (assistants and other agents) get a reason with every refusal:
 * `{ ok: false, error: 'consent_required' | 'invalid_name' | 'invalid_phone' |
 * 'rate_limited' | 'verification_failed', message }`. The API is described in
 * /openapi.json, which scripts/gen-agent-files.mjs writes.
 *
 * @param {Request} request
 * @param {LeadEnv} env
 * @param {{ persist?: (lead: Lead) => Promise<void> | void, recentCount?: (ip: string) => Promise<number> | number }} [hooks]
 * @returns {Promise<Response>}
 */

/** Requests accepted per IP address per hour. The form and agents share it. */
export const LEADS_PER_HOUR = 5;

const REFUSALS = {
  consent_required: 'The person must agree to the privacy policy and to being contacted. Send consent: true once they have.',
  invalid_name: 'A name is required.',
  invalid_phone: 'A valid phone number is required, in international format, for example +34612345678.',
  rate_limited: 'Too many requests from this address. Try again in an hour, or use WhatsApp or the phone.',
  verification_failed: 'The anti-spam check failed.',
};

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

  /** @param {boolean} ok @param {keyof typeof REFUSALS} [error] */
  const respond = (ok, error) => {
    if (wantsJson) {
      const body = ok ? { ok } : { ok, error: error ?? 'invalid_request', message: error ? REFUSALS[error] : 'Invalid request.' };
      return new Response(JSON.stringify(body), {
        status: ok ? 200 : error === 'rate_limited' ? 429 : 400,
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

  // A request sent by an assistant for someone names itself in `agent`. It cannot
  // solve a Turnstile widget, so it is held to the consent flag and the hourly
  // limit instead, and the lead is labelled so the owner can tell it apart.
  const agent = String(data.agent || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 60);
  const ip = request.headers.get('cf-connecting-ip') || '';

  // Turnstile (only enforced once configured).
  if (env.TURNSTILE_SECRET && !agent) {
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET, data['cf-turnstile-response'], ip);
    if (!ok) return respond(false, 'verification_failed');
  }

  // RGPD: no lead without the person's agreement. The form sends its checkbox,
  // an agent sends consent: true after asking the person.
  const consent = data.consent;
  if (!(consent === true || consent === 'yes' || consent === 'true' || consent === 'on')) {
    return respond(false, 'consent_required');
  }

  const name = String(data.name || '').trim().slice(0, 120);
  const phone = String(data.phone_e164 || data.phone || '').trim();
  if (!name) return respond(false, 'invalid_name');
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15 || !/^\+?[\d\s().-]+$/.test(phone)) return respond(false, 'invalid_phone');

  if (hooks.recentCount && ip) {
    try {
      if ((await hooks.recentCount(ip)) >= LEADS_PER_HOUR) return respond(false, 'rate_limited');
    } catch (err) {
      console.error('lead rate check failed', err);
    }
  }

  /** @type {Lead} */
  const lead = {
    name,
    phone,
    whatsapp: data.has_whatsapp === 'yes' || data.has_whatsapp === true,
    service: String(data.service || '').slice(0, 40),
    message: String(data.message || '').slice(0, 2000),
    locale,
    // The form page (or the assistant's name). The real origin is in the source fields below.
    page: agent ? `agent: ${agent}` : request.headers.get('referer') || '',
    ip,
    // Where the visitor came from and what they pressed (worker/lead-source.mjs).
    channel: agent ? 'agent' : 'form',
    ...parseSource(agent ? null : data.src),
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

  // 2) Notify by email (Resend) and Telegram. Also best-effort.
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
  // When Cloudflare's check itself is down, take the lead: losing a real customer
  // costs more than letting one spam message through.
  let json;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    if (!res.ok) throw new Error(`siteverify ${res.status}`);
    json = await res.json();
  } catch (err) {
    console.error('turnstile check unavailable, lead accepted', err);
    return true;
  }
  if (!json.success) console.log('turnstile refused', JSON.stringify(json['error-codes'] ?? []));
  return Boolean(json.success);
}

/**
 * Which notification channels are configured. Each one is optional.
 * @param {LeadEnv} env
 */
export function notifyChannels(env) {
  return {
    email: Boolean(env.RESEND_API_KEY && env.LEAD_EMAIL_TO && env.LEAD_EMAIL_FROM),
    telegram: Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID),
  };
}

/**
 * Notify the team about a lead on every configured channel (email, Telegram).
 * Channels run side by side and fail independently: a Telegram error never
 * stops the email, and the other way round. With no channel configured, or
 * when every channel fails, the lead is logged so nothing is lost (visible in
 * `wrangler tail` / the dev server console).
 * @param {Lead} lead
 * @param {LeadEnv} env
 */
export async function deliver(lead, env) {
  const on = notifyChannels(env);
  /** @type {[string, () => Promise<void>][]} */
  const jobs = [];
  if (on.email) jobs.push(['email', () => sendEmail(lead, env)]);
  if (on.telegram) jobs.push(['telegram', () => sendTelegram(lead, env)]);

  if (!jobs.length) {
    console.log('LEAD (no notification channel configured):', JSON.stringify(lead));
    return;
  }

  const results = await Promise.allSettled(jobs.map(([, run]) => run()));
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`lead ${jobs[i][0]} delivery failed`, r.reason);
  });
  if (results.every((r) => r.status === 'rejected')) {
    console.log('LEAD (every notification channel failed):', JSON.stringify(lead));
  }
}

/**
 * Send the lead notification email via Resend.
 * @param {Lead} lead
 * @param {LeadEnv} env
 */
async function sendEmail(lead, env) {
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
}

/**
 * Send the lead to Telegram through a bot. TELEGRAM_CHAT_ID may list several
 * chats separated by commas (people who pressed Start in the bot, or a group
 * the bot was added to; group ids are negative). Throws if any chat failed,
 * after trying all of them.
 * @param {Lead} lead
 * @param {LeadEnv} env
 */
async function sendTelegram(lead, env) {
  const chats = String(env.TELEGRAM_CHAT_ID).split(',').map((s) => s.trim()).filter(Boolean);
  const { text, reply_markup } = buildTelegram(lead);
  const results = await Promise.allSettled(
    chats.map(async (chat_id) => {
      const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          text,
          parse_mode: 'HTML',
          link_preview_options: { is_disabled: true },
          ...(reply_markup ? { reply_markup } : {}),
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`Telegram ${res.status} for chat ${chat_id}: ${detail}`);
      }
    }),
  );
  const failed = results.filter((r) => r.status === 'rejected');
  if (failed.length) throw new Error(failed.map((r) => String(r.reason?.message || r.reason)).join('; '));
}

/**
 * Build the Telegram message (HTML parse mode). Telegram makes the phone number
 * tappable on its own; buttons only accept https links, so WhatsApp gets a
 * button and the call goes through the number in the text.
 * @param {Lead} l
 * @returns {{ text: string, reply_markup?: object }}
 */
export function buildTelegram(l) {
  const { rows, viaAgent } = leadRows(l);
  const head = `${viaAgent ? '🤖' : '🔔'} <b>Новая заявка</b>`;
  const line = ([k, v]) => `<b>${escapeHtml(k)}:</b> ${v}`;
  const MSG = 'Сообщение';
  const others = rows.map(([k, v]) => [k, k === MSG ? '' : escapeHtml(String(v))]);
  // Telegram's limit is 4096 characters. Escaping can make the visitor's message
  // several times longer, so only that field is shortened, never through an
  // entity like &quot; (a broken entity makes Telegram reject the whole message).
  const room = 4096 - `${head}\n\n${others.map(line).join('\n')}`.length - 1;
  let msg = escapeHtml(String(rows.find(([k]) => k === MSG)?.[1] ?? ''));
  if (msg.length > room) msg = msg.slice(0, Math.max(0, room)).replace(/&[a-z]*$/, '') + '…';
  const text = `${head}\n\n${others.map(([k, v]) => line([k, k === MSG ? msg : v])).join('\n')}`;
  const wa = l.phone.replace(/[^\d]/g, '');
  const reply_markup = l.whatsapp
    ? { inline_keyboard: [[{ text: '💬 Написать в WhatsApp', url: `https://wa.me/${wa}` }]] }
    : undefined;
  return { text, reply_markup };
}

/**
 * The country of a phone number by its calling code, as flag + Russian name:
 * "+34 600…" → "🇪🇸 Испания (+34)". Empty when the number has no "+code" or the
 * code is unknown. A number in a range the metadata doesn't know (common for
 * new or fictional ranges) still gets the main country of its code.
 * @param {string} phone
 * @returns {string}
 */
export function phoneCountry(phone) {
  try {
    const p = parsePhoneNumberFromString(String(phone || ''));
    if (!p) return '';
    const code = p.country || p.getPossibleCountries()[0];
    if (!code) return `+${p.countryCallingCode}`;
    const flag = String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
    let name = code;
    try {
      name = new Intl.DisplayNames(['ru'], { type: 'region' }).of(code) || code;
    } catch {}
    return `${flag} ${name} (+${p.countryCallingCode})`;
  } catch {
    return '';
  }
}

/**
 * The lead as labelled rows (Russian — at the owner's request), shared by the
 * email and the Telegram message.
 * @param {Lead} l
 */
function leadRows(l) {
  const serviceLabels = {
    installation: 'Установка',
    repair: 'Ремонт',
    maintenance: 'Обслуживание',
    cleaning: 'Чистка',
    other: 'Другое',
  };
  const service = serviceLabels[l.service] || l.service || '—';
  const when = new Date(l.at).toLocaleString('ru-RU', { timeZone: 'Europe/Madrid' });
  const viaAgent = l.channel === 'agent' || String(l.page || '').startsWith('agent: ');

  const rows = [
    ['Имя', l.name],
    ['Телефон', l.phone],
    ...(phoneCountry(l.phone) ? [['Страна номера', phoneCountry(l.phone)]] : []),
    ['WhatsApp на этом номере', l.whatsapp ? 'Да' : 'Нет'],
    ['Услуга', service],
    ['Сообщение', l.message || '—'],
    ['Язык заявки', l.locale === 'es' ? 'Испанский' : 'Английский'],
    ['Источник', sourceLabel(l)],
    ...(visitLabel(l) ? [['Как попал на сайт', visitLabel(l)]] : []),
    ...(journeyLabel(l) ? [['Путь по сайту', journeyLabel(l)]] : []),
    ['Время', when],
  ];
  return { rows, service, viaAgent };
}

/**
 * Build the notification email (Russian — at the owner's request).
 * @param {Lead} l
 * @returns {{ subject: string, text: string, html: string }}
 */
export function buildEmail(l) {
  const { rows, service, viaAgent } = leadRows(l);
  const subject = `${viaAgent ? '🤖' : '🔔'} Новая заявка — ${l.name}${l.service ? ` (${service})` : ''}`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  // Tappable phone / WhatsApp so the owner can act straight from the inbox.
  const tel = l.phone.replace(/[^\d+]/g, '');
  const wa = tel.replace(/[^\d]/g, '');
  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
    <h2 style="margin:0 0 4px">🔔 Новая заявка</h2>
    <p style="margin:0 0 16px;color:#475569">Aerocomfort · форма на сайте</p>
    <!-- Labels get a narrow, wrapping column so the values stay readable on a phone. -->
    <table width="100%" style="border-collapse:collapse;width:100%;table-layout:fixed">
      <colgroup><col width="30%" style="width:30%"><col style="width:70%"></colgroup>
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td width="30%" style="width:30%;padding:8px 8px;background:#f1f5f9;border:1px solid #e2e8f0;vertical-align:top;font-size:12px;line-height:1.3;font-weight:600;color:#475569">${k}</td><td style="padding:8px 10px;border:1px solid #e2e8f0;vertical-align:top;font-size:15px;line-height:1.4;word-wrap:break-word;overflow-wrap:anywhere">${escapeHtml(String(v))}</td></tr>`,
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
    ...SOURCE_FIELDS.map((f) => l[f] ?? ''),
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
 * Render the private CRM page: two tabs, "Заявки" (leads) and "Клики" (contact
 * clicks of the last 30 days). Leads must be newest-first already.
 *
 * Every lead is rendered server-side with its filter values in data-attributes;
 * a small inline script filters and pages them in the browser (at most 1000
 * rows come from the query, so this stays instant). Without JS all rows show.
 * Tab, filters and page live in the URL, so a reload keeps them.
 *
 * @param {Lead[]} leads
 * @param {{ type: string, page: string, n: number }[]} [clicks] contact clicks of the last 30 days, grouped
 * @returns {string} HTML
 */
export function renderLeadsPage(leads, clicks = []) {
  const fmt = (iso) => {
    try {
      return new Date(iso).toLocaleString('ru-RU', { timeZone: 'Europe/Madrid' });
    } catch {
      return String(iso || '');
    }
  };
  const isAgent = (l) => l.channel === 'agent' || String(l.page || '').startsWith('agent: ');
  const isAd = (l) => Boolean(l.utm_source || l.utm_medium || l.utm_campaign || l.click_id);

  const rows = leads
    .map((l) => {
      const tel = String(l.phone || '').replace(/[^\d+]/g, '');
      const wa = tel.replace(/[^\d]/g, '');
      const source = sourceLabel(l);
      const search = [l.name, l.phone, tel, l.message, source, visitLabel(l)].join(' ').toLowerCase();
      return `<tr class="lead" data-at="${escapeHtml(l.at)}" data-service="${escapeHtml(l.service || '')}" data-channel="${isAgent(l) ? 'agent' : 'form'}" data-ad="${isAd(l) ? 1 : 0}" data-locale="${l.locale === 'es' ? 'es' : 'en'}" data-q="${escapeHtml(search)}">
        <td data-label="Время" class="muted nowrap">${escapeHtml(fmt(l.at))}</td>
        <td data-label="Имя"><b>${escapeHtml(l.name)}</b></td>
        <td data-label="Телефон" class="nowrap">
          <a href="tel:${escapeHtml(tel)}">${escapeHtml(l.phone)}</a>
          ${l.whatsapp ? `<a class="wa" href="https://wa.me/${escapeHtml(wa)}" title="WhatsApp">💬</a>` : ''}
        </td>
        <td data-label="Услуга"${l.service ? '' : ' class="blank"'}>${l.service ? `<span class="tag">${escapeHtml(SERVICE_RU[l.service] || l.service)}</span>` : '<span class="muted">—</span>'}</td>
        <td data-label="Сообщение"${l.message ? '' : ' class="blank"'}>${escapeHtml(l.message) || '<span class="muted">—</span>'}</td>
        <td data-label="Источник"><b class="src">${escapeHtml(source)}</b>${visitLabel(l) ? `<span class="muted small">${escapeHtml(visitLabel(l))}</span>` : ''}${journeyLabel(l) ? `<span class="muted small" title="Путь по сайту">${escapeHtml(journeyLabel(l))}</span>` : ''}</td>
        <td data-label="Язык" class="muted">${l.locale === 'es' ? 'ES' : 'EN'}</td>
      </tr>`;
    })
    .join('');

  const services = [...new Set(leads.map((l) => l.service).filter(Boolean))];
  const clickTotal = clicks.reduce((sum, r) => sum + (Number(r.n) || 0), 0);
  const option = (value, label) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;

  const leadsPanel = leads.length
    ? `<form class="filters" id="filters" role="search" onsubmit="return false">
        <input type="search" name="q" placeholder="Имя, телефон, текст" aria-label="Поиск по заявкам" autocomplete="off">
        <select name="service" aria-label="Услуга">${option('', 'Все услуги')}${services.map((s) => option(s, SERVICE_RU[s] || s)).join('')}</select>
        <select name="channel" aria-label="Источник">${option('', 'Все источники')}${option('form', 'Форма на сайте')}${option('agent', 'ИИ-агент')}${option('ad', 'С рекламы')}</select>
        <select name="locale" aria-label="Язык">${option('', 'Все языки')}${option('en', 'Английский')}${option('es', 'Испанский')}</select>
        <select name="period" aria-label="Период">${option('', 'Всё время')}${option('1', 'Сегодня')}${option('7', '7 дней')}${option('30', '30 дней')}</select>
        <button type="reset" class="btn light">Сбросить</button>
      </form>
      <p class="summary muted" id="summary" aria-live="polite">Всего заявок: ${leads.length}</p>
      <table class="leads"><thead><tr><th>Время</th><th>Имя</th><th>Телефон</th><th>Услуга</th><th>Сообщение</th><th>Источник</th><th>Язык</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="empty" id="no-match" hidden>Под эти фильтры заявок нет.</div>
      <nav class="pager" id="pager" aria-label="Страницы" hidden>
        <button type="button" class="btn light" data-step="-1">← Назад</button>
        <span id="page-info"></span>
        <button type="button" class="btn light" data-step="1">Вперёд →</button>
      </nav>`
    : `<div class="empty">Заявок пока нет.<br>Отправь форму на странице контактов — появится здесь.</div>`;

  const clicksPanel =
    renderClickStats(clicks) ||
    `<div class="empty">За последние 30 дней кликов не было.<br>Здесь считаются нажатия на WhatsApp, телефон, email и переходы к форме.</div>`;

  return `<!doctype html><html lang="ru"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>CRM · заявки (${leads.length})</title>
  <style>
    *{box-sizing:border-box} [hidden]{display:none!important}
    body{margin:0;font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;background:#f8fafc}
    header{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid #e2e8f0;padding:16px 24px 0}
    .top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    h1{margin:0;font-size:20px} .spacer{flex:1}
    .btn{font:inherit;font-size:13px;line-height:1.2;text-decoration:none;background:#0f172a;color:#fff;padding:8px 12px;border-radius:8px;border:0;cursor:pointer;white-space:nowrap}
    .btn.light{background:#e2e8f0;color:#0f172a} .btn:disabled{opacity:.4;cursor:default}
    .tabs{display:flex;gap:4px;margin-top:12px}
    .tab{font:inherit;font-weight:600;background:none;border:0;border-bottom:3px solid transparent;padding:10px 14px;color:#64748b;cursor:pointer;display:flex;align-items:center;gap:8px}
    .tab[aria-selected="true"]{color:#0f172a;border-bottom-color:#1d4ed8}
    .count{background:#e2e8f0;color:#0f172a;border-radius:999px;padding:1px 9px;font-size:12px;font-weight:600}
    .tab[aria-selected="true"] .count{background:#1d4ed8;color:#fff}
    .wrap{padding:16px 24px 60px}
    .panel-head{display:flex;align-items:center;justify-content:flex-end;margin-bottom:12px}
    .filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
    .filters input,.filters select{font:inherit;font-size:14px;padding:8px 10px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a;min-width:0}
    .filters input{flex:1 1 220px}
    .summary{margin:0 0 12px;font-size:13px}
    table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden}
    th,td{text-align:left;padding:11px 14px;border-bottom:1px solid #eef2f7;vertical-align:top} th{background:#f1f5f9;font-size:12px;text-transform:uppercase;letter-spacing:.03em;color:#475569}
    tr:last-child td{border-bottom:0} tbody tr:hover td{background:#f8fafc}
    a{color:#1d4ed8} a.wa{margin-left:6px;text-decoration:none} .muted{color:#94a3b8} .nowrap{white-space:nowrap}
    .tag{display:inline-block;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;border-radius:6px;padding:1px 8px;font-size:13px}
    .empty{padding:60px 24px;text-align:center;color:#94a3b8}
    .small{display:block;font-size:12.5px;line-height:1.4;margin-top:2px} .src{font-weight:600}
    .pager{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:16px;font-size:14px;color:#475569}
    .stats h2{margin:0 0 4px;font-size:17px} .stats table{margin-top:14px}
    .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:12px}
    .card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px} .card b{display:block;font-size:24px} .card span{color:#475569;font-size:13px}
    @media (max-width:720px){
      header{padding:12px 16px 0} h1{font-size:18px} .wrap{padding:12px 16px 48px}
      .tabs{margin-top:8px} .tab{flex:1;justify-content:center;padding:10px 6px}
      .filters input{flex-basis:100%} .filters select{flex:1 1 calc(50% - 4px)} .filters .btn{flex:1 1 100%}
      table.leads,table.leads tbody,table.leads tr,table.leads td{display:block;width:100%}
      table.leads{background:none;border:0;border-radius:0}
      table.leads thead{display:none}
      table.leads tr{display:grid;grid-template-columns:1fr auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px 0;margin-bottom:10px}
      table.leads td{grid-column:1 / -1}
      table.leads td[data-label="Время"]{grid-column:1;grid-row:1;font-size:13px}
      table.leads td[data-label="Язык"]{grid-column:2;grid-row:1;font-size:13px}
      table.leads td[data-label="Время"]::before,table.leads td[data-label="Имя"]::before,table.leads td[data-label="Телефон"]::before,table.leads td[data-label="Язык"]::before{display:none}
      table.leads td.blank{display:none}
      table.leads td[data-label="Телефон"]{font-size:16px;padding-bottom:6px}
      table.leads td{border:0;padding:4px 14px} tbody tr:hover td{background:none}
      table.leads td::before{content:attr(data-label);display:block;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#94a3b8}
      table.leads td[data-label="Имя"] b{font-size:17px}
      .cards{grid-template-columns:repeat(2,1fr)}
      .stats{overflow-x:auto} .stats th{white-space:nowrap}
      .pager{justify-content:space-between}
    }
  </style></head><body>
  <header>
    <div class="top">
      <h1>📋 CRM</h1>
      <span class="spacer"></span>
      <a class="btn light" href="" id="refresh" title="Обновить">↻ Обновить</a>
    </div>
    <div class="tabs" role="tablist">
      <button type="button" class="tab" role="tab" id="tab-leads" data-tab="leads" aria-controls="panel-leads" aria-selected="true">Заявки <span class="count">${leads.length}</span></button>
      <button type="button" class="tab" role="tab" id="tab-clicks" data-tab="clicks" aria-controls="panel-clicks" aria-selected="false">Клики <span class="count">${clickTotal}</span></button>
    </div>
  </header>
  <div class="wrap">
    <section id="panel-leads" role="tabpanel" aria-labelledby="tab-leads">
      <div class="panel-head"><a class="btn" href="/leads.csv" download>⬇ Заявки CSV</a></div>
      ${leadsPanel}
    </section>
    <section id="panel-clicks" role="tabpanel" aria-labelledby="tab-clicks" hidden>
      <div class="panel-head"><a class="btn" href="/leads/clicks.csv" download>⬇ Клики CSV</a></div>
      ${clicksPanel}
    </section>
  </div>
  <script>${LEADS_PAGE_SCRIPT}</script>
  </body></html>`;
}

/** Tabs, filters, paging and auto-refresh for the /leads page (runs in the browser). */
const LEADS_PAGE_SCRIPT = `(() => {
  const PER_PAGE = 20;
  const rows = [...document.querySelectorAll('tr.lead')];
  const form = document.getElementById('filters');
  const tabs = [...document.querySelectorAll('[role=tab]')];
  const params = new URLSearchParams(location.search);
  let page = Math.max(1, parseInt(params.get('page'), 10) || 1);
  if (form) for (const el of form.elements) if (el.name && params.has(el.name)) el.value = params.get(el.name);

  const url = () => {
    const p = new URLSearchParams();
    if (form) for (const [k, v] of new FormData(form)) if (v) p.set(k, String(v));
    if (page > 1) p.set('page', String(page));
    const q = p.toString();
    return location.pathname + (q ? '?' + q : '') + location.hash;
  };
  const save = (hash = location.hash) => {
    const next = url().split('#')[0] + hash;
    try {
      history.replaceState(null, '', next);
    } catch {
      /* a page opened from a file or data: URL cannot rewrite its address */
    }
    document.getElementById('refresh').href = next;
  };

  const showTab = (name) => {
    for (const t of tabs) {
      const on = t.dataset.tab === name;
      t.setAttribute('aria-selected', String(on));
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    }
  };
  for (const t of tabs) {
    t.addEventListener('click', () => {
      showTab(t.dataset.tab);
      save(t.dataset.tab === 'clicks' ? '#clicks' : '');
    });
  }
  showTab(location.hash === '#clicks' ? 'clicks' : 'leads');

  const apply = () => {
    if (!form) return save();
    const f = Object.fromEntries(new FormData(form));
    const words = String(f.q || '').trim().toLowerCase().split(/\\s+/).filter(Boolean);
    let since = 0;
    if (f.period === '1') since = new Date().setHours(0, 0, 0, 0);
    else if (f.period) since = Date.now() - Number(f.period) * 864e5;
    const match = rows.filter((r) => {
      const d = r.dataset;
      if (f.service && d.service !== f.service) return false;
      if (f.channel === 'ad' ? d.ad !== '1' : f.channel && d.channel !== f.channel) return false;
      if (f.locale && d.locale !== f.locale) return false;
      if (since && Date.parse(d.at) < since) return false;
      return words.every((w) => d.q.includes(w));
    });
    const pages = Math.max(1, Math.ceil(match.length / PER_PAGE));
    page = Math.min(Math.max(1, page), pages);
    const from = (page - 1) * PER_PAGE;
    const visible = new Set(match.slice(from, from + PER_PAGE));
    for (const r of rows) r.hidden = !visible.has(r);

    const filtered = match.length !== rows.length;
    document.getElementById('summary').textContent = match.length
      ? (filtered ? 'Найдено ' + match.length + ' из ' + rows.length : 'Всего заявок: ' + rows.length) +
        (pages > 1 ? ' · показаны ' + (from + 1) + '–' + Math.min(from + PER_PAGE, match.length) : '')
      : 'Найдено 0 из ' + rows.length;
    document.getElementById('no-match').hidden = match.length > 0;
    document.querySelector('table.leads').hidden = match.length === 0;
    const pager = document.getElementById('pager');
    pager.hidden = pages < 2;
    document.getElementById('page-info').textContent = 'Стр. ' + page + ' из ' + pages;
    pager.querySelector('[data-step="-1"]').disabled = page <= 1;
    pager.querySelector('[data-step="1"]').disabled = page >= pages;
    save();
  };

  if (form) {
    form.addEventListener('input', () => { page = 1; apply(); });
    form.addEventListener('reset', () => setTimeout(() => { page = 1; apply(); }));
    document.getElementById('pager').addEventListener('click', (e) => {
      const step = Number(e.target.closest('[data-step]')?.dataset.step);
      if (!step) return;
      page += step;
      apply();
      document.getElementById('panel-leads').scrollIntoView({ block: 'start' });
    });
  }
  apply();

  // New leads appear without a manual refresh; skipped while a filter is being edited.
  setInterval(() => {
    const busy = document.activeElement && document.activeElement.closest('#filters');
    if (document.visibilityState === 'visible' && !busy) location.reload();
  }, 60000);
})();`;

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
