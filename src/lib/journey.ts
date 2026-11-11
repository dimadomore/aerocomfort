/**
 * Where a visitor came from and what they pressed.
 *
 * Two outputs:
 *   1. `source()`: sent with a quote request (LeadForm), so the owner sees the page
 *      before the form, the button pressed, the first page of the visit and the ad
 *      or site that brought the visitor.
 *   2. A count of contact clicks that never reach the form (WhatsApp, phone, email
 *      and presses on links to the form), sent to /api/event and to Google
 *      Analytics when it is switched on.
 *
 * It needs no setup per page: a new landing page is tracked the moment it exists.
 * To name a button area, put `data-cta="name"` on it or any parent; otherwise the
 * nearest header / footer / section heading is used.
 *
 * Privacy: the visit (first page, pages seen, campaign) is kept in sessionStorage
 * only after the visitor allows analytics in the cookie dialog. Without that,
 * nothing is stored: the page before the form comes from the browser's referrer
 * and the button from the link itself. The click count carries no identifier.
 * Server side and field list: worker/lead-source.mjs, docs/16-lead-tracking.md.
 */

const KEY = 'aero-journey';
const MAX_PAGES = 12;
const CONTACT_PATHS = ['/contact', '/es/contacto'];
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'];

interface Journey {
  landing: string;
  referrer: string;
  utm: { source: string; medium: string; campaign: string };
  click: string;
  path: string[];
}

const trimSlash = (p: string) => p.replace(/\/$/, '') || '/';
const here = () => trimSlash(location.pathname);

const analyticsAllowed = (): boolean => {
  try {
    return Boolean(JSON.parse(localStorage.getItem('aero-consent') || 'null')?.analytics);
  } catch {
    return false;
  }
};

/** The page before this one, if it was on this site. */
const previousPage = (): string => {
  try {
    const u = new URL(document.referrer);
    return u.host === location.host ? trimSlash(u.pathname) : '';
  } catch {
    return '';
  }
};
/** The outside site that sent the visitor here, if any. */
const outsideSite = (): string => {
  try {
    const u = new URL(document.referrer);
    return u.host === location.host ? '' : u.host;
  } catch {
    return '';
  }
};
const campaign = () => {
  const q = new URLSearchParams(location.search);
  return {
    utm: { source: q.get('utm_source') ?? '', medium: q.get('utm_medium') ?? '', campaign: q.get('utm_campaign') ?? '' },
    click: CLICK_IDS.find((k) => q.has(k)) ?? '',
  };
};

const read = (): Journey | null => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
};

/** Adds this page to the stored visit, or clears the visit when analytics is not allowed. */
function remember() {
  try {
    if (!analyticsAllowed()) {
      sessionStorage.removeItem(KEY);
      return;
    }
    const page = here();
    const now = campaign();
    const j: Journey = read() ?? { landing: page, referrer: outsideSite(), utm: now.utm, click: now.click, path: [] };
    // A new ad click during the same visit is the campaign that counts.
    if (now.utm.source || now.click) {
      j.utm = now.utm;
      j.click = now.click;
    }
    if (j.path[j.path.length - 1] !== page) j.path.push(page);
    j.path = j.path.slice(-MAX_PAGES);
    sessionStorage.setItem(KEY, JSON.stringify(j));
  } catch {
    /* storage unavailable (private mode): the stateless values still work */
  }
}

/** The button that led to the form, handed over in the link as `#cta=name`. */
let cta = '';
function takeCtaFromLink() {
  const m = location.hash.match(/^#cta=([^&]+)/);
  if (!m) return;
  try {
    cta = decodeURIComponent(m[1]).slice(0, 60);
  } catch {
    cta = '';
  }
  history.replaceState(null, '', location.pathname + location.search);
}

/** What to send with a quote request. Empty values are left out. */
export function source(): Record<string, string> {
  const j = analyticsAllowed() ? read() : null;
  const now = campaign();
  const firstPageHere = !previousPage();
  const values: Record<string, string> = {
    from: j && j.path.length > 1 ? j.path[j.path.length - 2] : previousPage(),
    cta,
    landing: j?.landing ?? (firstPageHere ? here() : ''),
    referrer: j?.referrer ?? outsideSite(),
    utm_source: j?.utm.source || now.utm.source,
    utm_medium: j?.utm.medium || now.utm.medium,
    utm_campaign: j?.utm.campaign || now.utm.campaign,
    click: j?.click || now.click,
    journey: j ? j.path.join(' > ') : '',
  };
  return Object.fromEntries(Object.entries(values).filter(([, v]) => v));
}

/** Name of the area a link sits in: an explicit `data-cta`, or the nearest landmark. */
function areaOf(el: Element): string {
  const named = el.closest<HTMLElement>('[data-cta]');
  if (named?.dataset.cta) return named.dataset.cta;
  const region = el.closest('header, footer, nav, aside, section, article');
  if (!region) return 'page';
  const tag = region.tagName.toLowerCase();
  if (tag !== 'section' && tag !== 'article') return tag;
  const heading = region.querySelector('h1, h2, h3')?.textContent ?? '';
  const slug = heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return slug ? `section:${slug}` : tag;
}

type Kind = 'whatsapp' | 'call' | 'email' | 'quote_click' | '';
function kindOf(a: HTMLAnchorElement): Kind {
  const href = a.getAttribute('href') ?? '';
  if (href.startsWith('tel:')) return 'call';
  if (href.startsWith('mailto:')) return 'email';
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp';
  try {
    const u = new URL(a.href);
    if (u.host === location.host && CONTACT_PATHS.includes(trimSlash(u.pathname))) return 'quote_click';
  } catch {
    /* not a URL */
  }
  return '';
}

/** Tells the business which page a WhatsApp message was started from (not on the home page). */
function addPageToWhatsApp(a: HTMLAnchorElement) {
  if (a.dataset.waPage || here() === '/' || here() === '/es') return;
  try {
    const u = new URL(a.href);
    const title = document.title.split('|')[0].trim();
    if (!title) return;
    const label = document.documentElement.lang.startsWith('es') ? 'Página' : 'Page';
    u.searchParams.set('text', `${u.searchParams.get('text') ?? ''}\n\n${label}: ${title}`.trim());
    a.href = u.href;
    a.dataset.waPage = '1';
  } catch {
    /* leave the link as it is */
  }
}

const GA_EVENT: Record<string, string> = { whatsapp: 'whatsapp_click', call: 'phone_click', email: 'email_click', quote_click: 'quote_click' };

function count(type: Exclude<Kind, ''>, area: string) {
  const s = source();
  const body = JSON.stringify({
    type,
    page: here(),
    cta: area,
    locale: document.documentElement.lang.slice(0, 2),
    device: matchMedia('(max-width: 1023px)').matches ? 'mobile' : 'desktop',
    landing: s.landing,
    referrer: s.referrer,
    utm_source: s.utm_source,
    utm_campaign: s.utm_campaign,
  });
  try {
    navigator.sendBeacon('/api/event', new Blob([body], { type: 'application/json' }));
  } catch {
    /* counting must never get in the way of the click */
  }
  // Google Analytics, once it is switched on (Consent Mode decides what it may keep).
  (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', GA_EVENT[type], { cta: area, page_path: here() });
}

function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]');
  if (!a) return;
  const kind = kindOf(a);
  if (!kind) return;
  const area = areaOf(a);
  if (kind === 'quote_click') {
    // Hand the button's name to the contact page in the link, so nothing is stored for it.
    const u = new URL(a.href);
    u.hash = `cta=${encodeURIComponent(area)}`;
    a.href = u.href;
  }
  if (kind === 'whatsapp') addPageToWhatsApp(a);
  count(kind, area);
}

takeCtaFromLink();
remember();
window.addEventListener('aero-consent-change', remember);
document.addEventListener('click', onClick, true);
