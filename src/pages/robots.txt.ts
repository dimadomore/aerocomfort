import type { APIRoute } from 'astro';
import { SITE_URL, SITE_INDEXABLE } from '../config';

// Generated at build. Tied to SITE_INDEXABLE so cutover flips robots with the
// rest of the site (docs/07 §5). Staging fully disallows crawling.
export const GET: APIRoute = () => {
  const body = SITE_INDEXABLE
    ? [
        'User-agent: *',
        'Allow: /',
        'Disallow: /thank-you',
        'Disallow: /es/gracias',
        '',
        `Sitemap: ${SITE_URL}/sitemap-index.xml`,
        '',
      ].join('\n')
    : ['# Staging — not indexed until launch (docs/07)', 'User-agent: *', 'Disallow: /', ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
