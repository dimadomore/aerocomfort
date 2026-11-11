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

/** Google Maps embed `src` for the map on /areas and /contact. It shows the
 *  Aerocomfort place from the Google Business Profile (owner's link, Nov 2026:
 *  maps.app.goo.gl/a4ZAcn2YzJqvhThi9), pin 37.8641807, -0.7887288.
 *  To change the place: Google Maps → the place → Share → Embed a map → copy src.
 *  The map loads only after the visitor allows third-party content or clicks
 *  "Show map". Empty = the button links out to Google Maps instead. */
export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12600!2d-0.7887288!3d37.8641807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43271761bb557477%3A0x4f97ec230490a29f!2sAEROCOMFORT%20-%20installation%20air%20conditioner%20TORREVIEJA!5e0!3m2!1sen!2ses!4v1794400000000";

/** Short muted clip for the home hero slide marked `clip` in Hero.astro. Empty =
 *  photos only. It loads after the page and plays while that slide is shown, on phones
 *  and tablets only (the current clip is a tall phone video, too soft for the wide
 *  desktop band). The slide's photo stays as the first paint and as the fallback
 *  for desktop, reduced motion and data saver. */
export const HERO_VIDEO = "/hero/lg-unit.mp4";

/** Chrome origin-trial token for WebMCP. Tokens are tied to one origin, so register
 *  aerocomfort.es at cutover: developer.chrome.com/origintrials. Empty = tools only
 *  appear in browsers with WebMCP switched on. */
export const WEBMCP_ORIGIN_TRIAL = "";
