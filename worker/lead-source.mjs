/**
 * Lead source: where a request came from, in a form the owner can read.
 *
 * The browser (src/lib/journey.ts) sends a small `src` object with the lead:
 * the page before the form, the button pressed, the first page of the visit, the
 * outside site or ad that brought the visitor, and the pages seen on the way. This
 * module cleans it, turns paths and button ids into plain Russian for the email and
 * the /leads table, and handles the click counter (/api/event) for the channels
 * that never reach the form: WhatsApp, phone and email links.
 *
 * Nothing here is tied to a list of pages. A new page (a Black Friday landing, a
 * new town) shows up under its own path; add it to PAGE_NAMES only for a nicer label.
 * The whole system is described in docs/16-lead-tracking.md.
 */

/** Columns added to `leads` by migrations/0002. Order matters for CSV and INSERT. */
export const SOURCE_FIELDS = [
  'channel',
  'from_page',
  'cta',
  'landing',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'click_id',
  'journey',
];

const text = (v, max = 120) =>
  String(v ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .trim()
    .slice(0, max);
/** A site path only: anything else (a full URL, script, junk) is dropped. */
const path = (v) => {
  const t = text(v, 200);
  return /^\/[^\s]*$/.test(t) ? t : '';
};

/**
 * Cleans the `src` value sent with a lead (a JSON string from the form, or an
 * object from a JSON client). Every field is optional and length-capped.
 * @param {unknown} raw
 */
export function parseSource(raw) {
  let o = raw;
  if (typeof raw === 'string') {
    try {
      o = JSON.parse(raw);
    } catch {
      o = null;
    }
  }
  if (!o || typeof o !== 'object') o = {};
  return {
    from_page: path(o.from),
    cta: text(o.cta, 60),
    landing: path(o.landing),
    referrer: text(o.referrer, 100),
    utm_source: text(o.utm_source, 80),
    utm_medium: text(o.utm_medium, 80),
    utm_campaign: text(o.utm_campaign, 120),
    click_id: text(o.click, 20),
    journey: text(o.journey, 600),
  };
}

/* ───────────────────────── plain-Russian labels ───────────────────────── */

const SERVICE_NAMES = {
  installation: 'Установка',
  instalacion: 'Установка',
  repair: 'Ремонт',
  reparacion: 'Ремонт',
  maintenance: 'Обслуживание',
  mantenimiento: 'Обслуживание',
  cleaning: 'Чистка',
  limpieza: 'Чистка',
};

/** [pattern, name]. First match wins. Unknown paths are shown as they are. */
const PAGE_NAMES = [
  [/^\/(es)?$/, () => 'Главная'],
  [/^\/(?:offers|es\/ofertas)$/, () => 'Оферты'],
  [/^\/(?:es\/)?black-friday$/, () => 'Black Friday'],
  [/^\/(?:services|es\/servicios)$/, () => 'Услуги'],
  [/^\/(?:services|es\/servicios)\/([^/]+)$/, (m) => `Услуга: ${SERVICE_NAMES[m[1]] ?? m[1]}`],
  [/^\/(?:areas|es\/zonas)$/, () => 'Зоны'],
  [/^\/(?:areas|es\/zonas)\/([^/]+)$/, (m) => `Город: ${m[1]}`],
  [/^\/(?:brands|es\/marcas)$/, () => 'Бренды'],
  [/^\/(?:brands|es\/marcas)\/([^/]+)$/, (m) => `Бренд: ${m[1]}`],
  [/^\/(?:contact|es\/contacto)$/, () => 'Контакты'],
  [/^\/(?:about|es\/sobre-nosotros)$/, () => 'О компании'],
  [/^\/(?:faq|es\/preguntas-frecuentes)$/, () => 'FAQ'],
  [/^\/(?:gallery|es\/galeria)$/, () => 'Наши работы'],
];

/** "/es/servicios/reparacion?x=1" → "Услуга: Ремонт (ES)". Accepts a path or a full URL. */
export function pageName(value) {
  let p = String(value || '');
  if (!p) return '';
  try {
    if (/^https?:/.test(p)) p = new URL(p).pathname;
  } catch {
    /* keep as typed */
  }
  p = p.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  for (const [re, name] of PAGE_NAMES) {
    const m = p.match(re);
    if (m) return name(m) + (p === '/es' || p.startsWith('/es/') ? ' (ES)' : '');
  }
  return p;
}

const CTA_NAMES = {
  hero: 'первый экран',
  'page-header': 'шапка страницы',
  header: 'шапка сайта',
  'mobile-menu': 'меню',
  'sticky-bar': 'нижняя панель',
  'final-cta': 'блок внизу страницы',
  'offer-card': 'карточка оферты',
  'promo-hero': 'лендинг акции, верх',
  'promo-closing': 'лендинг акции, низ',
  'promo-badge': 'значок акции в шапке',
  'promo-bar': 'полоса акции под шапкой',
  'contact-panel': 'панель контактов',
  'chat-launcher': 'кнопка чата',
  footer: 'футер',
};
/** "offer-card" → "карточка оферты"; an unnamed section keeps its heading. */
export function ctaName(id) {
  const v = String(id || '');
  if (!v) return '';
  if (CTA_NAMES[v]) return CTA_NAMES[v];
  return v.startsWith('section:') ? `блок «${v.slice(8).replace(/-/g, ' ')}»` : v;
}

/**
 * One line for "where did this request come from": the assistant that sent it, or
 * the page before the form and the button pressed there.
 * @param {Record<string, any>} lead
 */
export function sourceLabel(lead) {
  const legacy = String(lead?.page || '');
  if (lead?.channel === 'agent' || legacy.startsWith('agent: ')) return `ИИ-агент: ${legacy.replace(/^agent: /, '') || '—'}`;
  if (lead?.from_page) return [pageName(lead.from_page), ctaName(lead.cta)].filter(Boolean).join(' · ');
  // No script ran (or an old row): the form page is all we know.
  return pageName(legacy) || '—';
}

/** How the visitor reached the site: outside site, ad campaign, first page. Empty if unknown. */
export function visitLabel(lead) {
  const parts = [];
  const campaign = [lead?.utm_source, lead?.utm_medium, lead?.utm_campaign].filter(Boolean).join(' / ');
  if (campaign) parts.push(`реклама: ${campaign}`);
  else if (lead?.click_id) parts.push(`реклама (${lead.click_id})`);
  if (lead?.referrer) parts.push(`с сайта ${lead.referrer}`);
  if (lead?.landing) parts.push(`вход: ${pageName(lead.landing)}`);
  return parts.join(' · ');
}

/** "/ > /offers > /contact" → "Главная → Оферты → Контакты". */
export function journeyLabel(lead) {
  return String(lead?.journey || '')
    .split(' > ')
    .filter(Boolean)
    .map(pageName)
    .join(' → ');
}

/* ───────────────────────── click counter ───────────────────────── */

/** Contact actions that never reach the form. `quote_click` = a press on a link to the form. */
export const EVENT_TYPES = ['whatsapp', 'call', 'email', 'quote_click'];
export const EVENT_FIELDS = ['at', 'type', 'page', 'cta', 'locale', 'device', 'landing', 'referrer', 'utm_source', 'utm_campaign'];
const EVENT_NAMES = { whatsapp: 'WhatsApp', call: 'Звонки', email: 'Email', quote_click: 'Переходы к форме' };

/**
 * POST /api/event: counts one contact click. Anonymous by design: no IP address,
 * no browser details and no identifier are stored, so it needs no consent.
 * @param {Request} request
 * @param {{ persistEvent?: (event: Record<string, string>) => Promise<void> | void }} [hooks]
 */
export async function handleEvent(request, hooks = {}) {
  let o;
  try {
    const body = await request.text();
    if (body.length > 2000) return new Response(null, { status: 413 });
    o = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!o || !EVENT_TYPES.includes(o.type)) return new Response(null, { status: 400 });
  const event = {
    at: new Date().toISOString(),
    type: o.type,
    page: path(o.page),
    cta: text(o.cta, 60),
    locale: o.locale === 'es' ? 'es' : 'en',
    device: o.device === 'mobile' ? 'mobile' : 'desktop',
    landing: path(o.landing),
    referrer: text(o.referrer, 100),
    utm_source: text(o.utm_source, 80),
    utm_campaign: text(o.utm_campaign, 120),
  };
  try {
    if (hooks.persistEvent) await hooks.persistEvent(event);
  } catch (err) {
    console.error('event persist failed', err);
  }
  return new Response(null, { status: 204 });
}

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * The "clicks in the last 30 days" block for the /leads page.
 * @param {{ type: string, page: string, n: number }[]} rows grouped counts
 * @returns {string} HTML, or '' when there is nothing to show
 */
export function renderClickStats(rows) {
  if (!rows?.length) return '';
  const totals = Object.fromEntries(EVENT_TYPES.map((t) => [t, 0]));
  /** @type {Map<string, Record<string, number>>} */
  const pages = new Map();
  for (const r of rows) {
    if (!(r.type in totals)) continue;
    const n = Number(r.n) || 0;
    totals[r.type] += n;
    const key = pageName(r.page) || '—';
    const row = pages.get(key) ?? Object.fromEntries(EVENT_TYPES.map((t) => [t, 0]));
    row[r.type] += n;
    pages.set(key, row);
  }
  const top = [...pages.entries()]
    .map(([name, row]) => ({ name, row, sum: EVENT_TYPES.reduce((s, t) => s + row[t], 0) }))
    .sort((a, b) => b.sum - a.sum)
    .slice(0, 12);

  return `<section class="stats">
    <h2>Клики за 30 дней</h2>
    <p class="muted small">Нажатия на WhatsApp, телефон и email и переходы к форме. Считаются без личных данных, поэтому это клики, а не люди и не подтверждённые звонки.</p>
    <div class="cards">${EVENT_TYPES.map((t) => `<div class="card"><b>${totals[t]}</b><span>${EVENT_NAMES[t]}</span></div>`).join('')}</div>
    <table><thead><tr><th>Страница</th>${EVENT_TYPES.map((t) => `<th>${EVENT_NAMES[t]}</th>`).join('')}</tr></thead><tbody>
      ${top.map((p) => `<tr><td>${esc(p.name)}</td>${EVENT_TYPES.map((t) => `<td>${p.row[t] || '<span class="muted">·</span>'}</td>`).join('')}</tr>`).join('')}
    </tbody></table>
  </section>`;
}
