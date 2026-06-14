/**
 * Site-wide configuration. The few values that must change at launch live here.
 */

/** Final canonical domain — used for canonical URLs, sitemap, schema.org.
 *  Set from day one so cutover (docs/07) only flips SITE_INDEXABLE below. */
export const SITE_URL = "https://aerocomfort.es";

/** Master indexing switch. FALSE on staging (aero.dimadomore.com) → every page
 *  emits `noindex`. Flip to TRUE at cutover, after the redirect map is live. */
export const SITE_INDEXABLE = false;

export const DEFAULT_LOCALE = "en" as const;
export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Default social-share image (generated OG template). */
export const DEFAULT_OG_IMAGE = "/og/aerocomfort-default.jpg";

/**
 * Third-party integrations — public client-side IDs only (secrets stay in Worker).
 * Paste the values below to activate; empty string = feature stays dormant.
 * All analytics run under Consent Mode v2 (default denied until the user accepts).
 */
export const ANALYTICS = {
  /** GA4 Measurement ID, e.g. 'G-XXXXXXXXXX' */
  gaId: "",
  /** Google Ads ID for conversion tracking, e.g. 'AW-XXXXXXXXX' (optional) */
  adsId: "",
  /** Cloudflare Web Analytics beacon token (cookieless — runs without consent) */
  cfBeacon: "",
};

/** Elfsight Google-reviews widget id, e.g. 'elfsight-app-1a2b3c4d-...' (docs/00 §6). */
export const ELFSIGHT_ID = "elfsight-app-0a716faf-0e47-4d76-8692-1aba041cbae6";

/** Google Maps "Embed a map" iframe `src` for the service-area map (click-to-load).
 *  Get it: Google Maps → the Aerocomfort place → Share → Embed a map → copy src.
 *  Until set, the map button links out to the Google Business Profile. */
export const MAP_EMBED_URL = "";
