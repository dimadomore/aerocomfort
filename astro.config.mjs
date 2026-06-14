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
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss(), yaml()],
  },
});
