/**
 * Site-wide configuration. The few values that must change at launch live here.
 */

/** Final canonical domain — used for canonical URLs, sitemap, schema.org.
 *  Set from day one so cutover (docs/07) only flips SITE_INDEXABLE below. */
export const SITE_URL = 'https://aerocomfort.es';

/** Master indexing switch. FALSE on staging (aero.dimadomore.com) → every page
 *  emits `noindex`. Flip to TRUE at cutover, after the redirect map is live. */
export const SITE_INDEXABLE = false;

export const DEFAULT_LOCALE = 'en' as const;
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

/** Default social-share image (generated OG template — added in a later step). */
export const DEFAULT_OG_IMAGE = '/og/aerocomfort-default.jpg';
