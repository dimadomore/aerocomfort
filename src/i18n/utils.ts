import { DEFAULT_LOCALE, type Locale } from '../config';
import en from './ui.en.json';
import es from './ui.es.json';

const dictionaries = { en, es } as const;
type UIKey = keyof typeof en;

/** Detect the active locale from a request/page URL. */
export function getLocaleFromUrl(url: URL): Locale {
  const seg = url.pathname.split('/')[1];
  return seg === 'es' ? 'es' : 'en';
}

/** Returns a `t(key)` function for the given locale, falling back to EN. */
export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale] as Record<string, string>;
  const fallback = dictionaries[DEFAULT_LOCALE] as Record<string, string>;
  return function t(key: UIKey): string {
    return dict[key] ?? fallback[key] ?? key;
  };
}

/**
 * Canonical route map (EN is the source of truth). Used by the language switch,
 * hreflang alternates and localized navigation. ES slugs are localized for SEO
 * (docs/05 §1). Phase-2 dynamic routes (areas/brands) extend this at runtime.
 */
export const ROUTES = [
  { en: '/', es: '/es' },
  { en: '/services', es: '/es/servicios' },
  { en: '/services/installation', es: '/es/servicios/instalacion' },
  { en: '/services/repair', es: '/es/servicios/reparacion' },
  { en: '/services/maintenance', es: '/es/servicios/mantenimiento' },
  { en: '/services/cleaning', es: '/es/servicios/limpieza' },
  { en: '/offers', es: '/es/ofertas' },
  { en: '/areas', es: '/es/zonas' },
  { en: '/brands', es: '/es/marcas' },
  { en: '/about', es: '/es/sobre-nosotros' },
  { en: '/faq', es: '/es/preguntas-frecuentes' },
  { en: '/contact', es: '/es/contacto' },
  { en: '/blog', es: '/es/blog' },
  { en: '/thank-you', es: '/es/gracias' },
  { en: '/privacy', es: '/es/privacidad' },
  { en: '/cookies', es: '/es/cookies' },
  { en: '/legal', es: '/es/aviso-legal' },
] as const;

export type EnRoute = (typeof ROUTES)[number]['en'];

/** EN→ES section prefixes for dynamic item routes (areas/brands/services/blog). */
const SECTION_ES: Record<string, string> = {
  '/services/': '/es/servicios/',
  '/areas/': '/es/zonas/',
  '/brands/': '/es/marcas/',
  '/blog/': '/es/blog/',
};

/** Localized URL path for a given EN canonical key (handles dynamic item routes). */
export function localizedPath(enPath: string, locale: Locale): string {
  const match = ROUTES.find((r) => r.en === enPath);
  if (match) return match[locale];
  if (locale === 'es') {
    for (const [enPre, esPre] of Object.entries(SECTION_ES)) {
      if (enPath.startsWith(enPre)) return esPre + enPath.slice(enPre.length);
    }
    return enPath === '/' ? '/es' : `/es${enPath}`;
  }
  return enPath;
}

/** Primary navigation, localized. */
export function getNav(locale: Locale) {
  const t = useTranslations(locale);
  const items: { key: UIKey; en: EnRoute }[] = [
    { key: 'nav.services', en: '/services' },
    { key: 'nav.offers', en: '/offers' },
    { key: 'nav.areas', en: '/areas' },
    { key: 'nav.about', en: '/about' },
    { key: 'nav.faq', en: '/faq' },
    { key: 'nav.contact', en: '/contact' },
  ];
  return items.map((i) => ({
    label: t(i.key),
    href: localizedPath(i.en, locale),
    en: i.en,
    highlight: i.key === 'nav.offers',
  }));
}
