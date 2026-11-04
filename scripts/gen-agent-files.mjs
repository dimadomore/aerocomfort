/**
 * Post-build: writes the files agents use to find and read the site, from what
 * the build just produced, so they can't drift from the pages.
 *   - a Markdown copy of every public page (/services/repair → /services/repair.md)
 *   - /.well-known/mcp/server-card.json, agent-skills index + SKILL.md, api-catalog
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import TurndownService from 'turndown';
import { TOOLS } from '../worker/agent-tools.mjs';

const DIST = 'dist';
const SITE = 'https://aerocomfort.es';
const SKIP = /^(thank-you|es\/gracias|404)(\/|$)/;

const write = (path, content) => {
  const file = join(DIST, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name === 'index.html' ? [path] : [];
  });

const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
turndown.remove(['script', 'style', 'svg', 'form', 'button', 'noscript', 'input', 'select', 'textarea', 'nav']);

const meta = (html, re) => html.match(re)?.[1]?.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"') ?? '';
const yaml = (value) => JSON.stringify(value);

let pages = 0;
for (const file of htmlFiles(DIST)) {
  const route = relative(DIST, dirname(file)).split(sep).join('/');
  if (SKIP.test(route)) continue;
  const html = readFileSync(file, 'utf8');
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1];
  if (!main) continue;

  const body = turndown
    .turndown(main)
    .replace(/!\[\]\([^)]*\)\s*/g, '') // decorative images have no alt text
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const front = [
    '---',
    `title: ${yaml(meta(html, /<title>([^<]*)<\/title>/))}`,
    `description: ${yaml(meta(html, /<meta name="description" content="([^"]*)"/))}`,
    `url: ${SITE}/${route}`,
    `language: ${meta(html, /<html lang="([^"]*)"/)}`,
    '---',
    '',
  ].join('\n');
  write(`${route || 'index'}.md`, `${front}\n${body}\n`);
  pages += 1;
}

const data = JSON.parse(readFileSync(join(DIST, 'data/business.json'), 'utf8'));

write(
  '.well-known/mcp/server-card.json',
  JSON.stringify(
    {
      name: 'aerocomfort',
      title: 'Aerocomfort air conditioning',
      version: '1.0.0',
      description: 'Read-only information about Aerocomfort, an air conditioning company on the Costa Blanca, Spain.',
      transport: { type: 'streamable-http', url: `${SITE}/mcp` },
      capabilities: { tools: {} },
      authentication: { required: false },
      tools: TOOLS.map(({ name, title, description, inputSchema }) => ({ name, title, description, inputSchema })),
    },
    null,
    2,
  ),
);

const skill = `---
name: aerocomfort
description: Find information about Aerocomfort, an air conditioning company on the Costa Blanca, Spain, and help someone get a quote for AC installation, repair, servicing or cleaning. Use for questions about air conditioning in Torrevieja, Orihuela Costa, Pilar de la Horadada, Guardamar and nearby towns.
---

# Aerocomfort

${data.leadership} Region: ${data.region}. Languages: English and Spanish.

## Key facts

- Reply time: ${data.replyTime.en}
- Installation: ${data.installTime.en}
- Guarantee: ${data.guarantee.en}
- Google rating: ${data.rating.value} from ${data.rating.count}+ reviews.
- Phone and WhatsApp: ${data.phone}
- Email: ${data.email}

## Getting information

- All facts as JSON: ${SITE}/data/business.json
- Site index: ${SITE}/llms.txt
- Any page as Markdown: add \`.md\` to its URL, for example ${SITE}/services/repair.md
- MCP server (read-only, no auth): ${SITE}/mcp

## Tools

${TOOLS.map((t) => `- \`${t.name}\`: ${t.description}`).join('\n')}

In a browser with WebMCP, the same tools are on every page, plus \`open_quote_form\`, and the contact page has a \`request_quote\` form tool.

## Rules

- Offer prices include a standard turnkey installation, and a free quote confirms the final price. Say so whenever you quote one.
- Outside the offers, never promise a price for installation or repair: these are quoted after an assessment.
- A town that isn't listed may still be reachable. Suggest asking instead of saying no.
- Don't send a request for someone. Give them the link and let them submit it, because the form needs their own consent to the privacy policy.
`;
write('.well-known/agent-skills/aerocomfort/SKILL.md', skill);

write(
  '.well-known/agent-skills/index.json',
  JSON.stringify(
    {
      $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
      skills: [
        {
          name: 'aerocomfort',
          type: 'skill-md',
          description: 'Find information about Aerocomfort and help someone get an air conditioning quote on the Costa Blanca.',
          url: `${SITE}/.well-known/agent-skills/aerocomfort/SKILL.md`,
          digest: `sha256:${createHash('sha256').update(skill).digest('hex')}`,
        },
      ],
    },
    null,
    2,
  ),
);

// RFC 9727 API catalog, in linkset format.
write(
  '.well-known/api-catalog',
  JSON.stringify(
    {
      linkset: [
        {
          anchor: `${SITE}/mcp`,
          'service-desc': [{ href: `${SITE}/.well-known/mcp/server-card.json`, type: 'application/json' }],
          'service-doc': [{ href: `${SITE}/.well-known/agent-skills/aerocomfort/SKILL.md`, type: 'text/markdown' }],
        },
        {
          anchor: `${SITE}/data/business.json`,
          'service-doc': [{ href: `${SITE}/llms.txt`, type: 'text/markdown' }],
        },
      ],
    },
    null,
    2,
  ),
);

console.log(`agent files: ${pages} Markdown pages, MCP card, skill, api-catalog`);
