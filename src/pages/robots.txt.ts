import type { APIRoute } from 'astro';
import { SITE_URL, SITE_INDEXABLE } from '../config';

/**
 * Generated at build. Tied to SITE_INDEXABLE so cutover flips robots with the
 * rest of the site (docs/07 §5). Staging disallows crawling,
 * except for the link-preview fetchers below.
 *
 * AI crawlers (specification.website/spec/agent-readiness/robots-for-ai-crawlers/):
 * a local service business WANTS to be found by AI assistants, so every named
 * agent is explicitly welcomed with the same private-path exclusions as search.
 * `Content-Signal` (Cloudflare/IAB proposal) states the policy machine-readably:
 * search, AI answers and AI training are all allowed — marketing content, the
 * wider it spreads the better. Vendor agent lists change; re-check yearly.
 */

/** Private/duplicate paths — excluded for every crawler. */
const EXCLUDE = ['/thank-you', '/es/gracias', '/leads'];

/** Named AI crawlers, explicitly welcomed (same exclusions as everyone else). */
const AI_AGENTS = [
  // Search and answer engines
  'OAI-SearchBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Applebot',
  'DuckAssistBot',
  'Amzn-SearchBot',
  'meta-webindexer',
  // Fetches made because a person asked an assistant
  'ChatGPT-User',
  'Claude-User',
  'Perplexity-User',
  'Google-Agent',
  'meta-externalfetcher',
  'MistralAI-User',
  // Training and product tokens
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'CCBot',
];

/** Link-preview fetchers of the messengers and social networks. They build the card
 *  shown when someone shares a link; they do not index. Facebook's (also used by
 *  Instagram and Messenger) obeys robots.txt, so staging has to let it in by name. */
const PREVIEW_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'WhatsApp',
  'TelegramBot',
  'Viber',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'Discordbot',
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
    : [
        '# Staging — not indexed until launch (docs/07). Link previews stay allowed.',
        ...PREVIEW_AGENTS.map((agent) => `User-agent: ${agent}`),
        'Allow: /',
        ...disallows,
        '',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
