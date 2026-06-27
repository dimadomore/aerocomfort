// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import yaml from '@rollup/plugin-yaml';

// Canonical/site URL is the FINAL domain from day one (docs/07-migration.md):
// canonical, sitemap and schema all reference aerocomfort.es, so cutover only
// means flipping SITE_INDEXABLE — nothing to rewrite. Staging stays noindex.
// https://astro.build/config
export default defineConfig({
  site: 'https://aerocomfort.es',

  // EN at root, ES under /es (docs/05 §1). Default locale has no prefix.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    // Every page (EN + localized-ES) is listed as its own <loc>. hreflang is
    // declared once, authoritatively, in the HTML <head> (Seo.astro) — Google
    // wants a single method, so we deliberately DON'T duplicate (and only
    // partially, given our localized ES slugs) hreflang here.
    sitemap({
      // Keep non-indexable pages out of the sitemap (best practice): the
      // thank-you confirmation pages (noindex + robots-disallowed) and 404.
      filter: (page) =>
        !/\/thank-you\/?$/.test(page) &&
        !/\/es\/gracias\/?$/.test(page) &&
        !/\/404\/?$/.test(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss(), yaml()],
  },
});
