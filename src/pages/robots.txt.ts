import type { APIRoute } from 'astro';
import { SITE_URL, SITE_INDEXABLE } from '../config';

/**
 * Generated at build. Tied to SITE_INDEXABLE so cutover flips robots with the
 * rest of the site (docs/07 §5). Staging fully disallows crawling.
 *
 * AI crawlers (specification.website/spec/agent-readiness/robots-for-ai-crawlers/):
 * a local service business WANTS to be found by AI assistants, so every named
 * agent is explicitly welcomed with the same private-path exclusions as search.
 * `Content-Signal` (Cloudflare/IAB proposal) states the policy machine-readably:
 * search, AI answers and AI training are all allowed — marketing content, the
 * wider it spreads the better. Vendor agent lists change; re-check yearly.
 */

/** Private/duplicate paths — excluded for every crawler. */
const EXCLUDE = ['/thank-you', '/es/gracias', '/leads', '/api/'];

/** Named AI crawlers, explicitly welcomed (same exclusions as everyone else). */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'PerplexityBot',
  'CCBot',
];

export const GET: APIRoute = () => {
  const disallows = EXCLUDE.map((p) => `Disallow: ${p}`);

  const body = SITE_INDEXABLE
    ? [
        'User-agent: *',
        'Allow: /',
        ...disallows,
        'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
        '',
        ...AI_AGENTS.flatMap((agent) => [
          `User-agent: ${agent}`,
          'Allow: /',
          ...disallows,
          'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
          '',
        ]),
        `Sitemap: ${SITE_URL}/sitemap-index.xml`,
        '',
      ].join('\n')
    : ['# Staging — not indexed until launch (docs/07)', 'User-agent: *', 'Disallow: /', ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
