import type { APIRoute } from 'astro';
import { SITE_URL } from '../config';
import { business, offers, reviewCountDisplay } from '../data';
import { SERVICES } from '../data/services';
import { BRANDS } from '../data/brands';

const abs = (path: string) => new URL(path, SITE_URL).href;

/**
 * /llms.txt — curated markdown index for LLMs/agents (llmstxt.org convention;
 * specification.website/spec/agent-readiness/llms-txt/). Structure: H1 → one-line
 * blockquote summary → `##` sections of `- [Title](abs URL): description` links.
 * Generated at build from the same data as the pages, so it can't go stale.
 * Full page content (for retrieval without HTML parsing) lives in /llms-full.txt.
 */
export const GET: APIRoute = () => {
  const fromPrice = Math.min(...offers.items.map((o) => o.priceNew));
  const trust = business.trust ?? { installs: '1000+', years: 5, guaranteeYears: 3, equipmentWarrantyYears: 3, certified: true };

  const lines = [
    `# ${business.name}`,
    '',
    `> ${business.name} installs, repairs, maintains and cleans air conditioning across the Costa Blanca, Spain — Torrevieja, Orihuela Costa and ${business.areasCount}+ towns. Also ventilation. ${business.rating.value}★ on Google (${reviewCountDisplay} reviews), ${trust.installs} installations, ${trust.guaranteeYears}-year workmanship guarantee. English and Spanish spoken.`,
    '',
    `Bilingual site: English at ${SITE_URL}/, Spanish under ${SITE_URL}/es/. Full concatenated content for LLMs: ${abs('/llms-full.txt')}`,
    '',
    '## Services',
    ...SERVICES.map(
      (s) => `- [${s.en.title}](${abs(`/services/${s.slug}`)}): ${s.en.blurb}`,
    ),
    `- [All services](${abs('/services')}): Overview — also ventilation.`,
    '',
    '## Key pages',
    `- [Offers](${abs('/offers')}): Seasonal inverter units from €${fromPrice} with basic installation included (${offers.season.label.en}).`,
    `- [Service areas](${abs('/areas')}): ${business.areasCount}+ towns, each with a dedicated page.`,
    `- [Brands](${abs('/brands')}): ${BRANDS.map((b) => b.name).join(', ')}.`,
    `- [FAQ](${abs('/faq')}): Direct answers — waiting times, guarantees, prices, coverage.`,
    `- [About](${abs('/about')}): Who we are, certification and guarantees.`,
    `- [Our work](${abs('/gallery')}): Photos of completed installations.`,
    `- [Contact](${abs('/contact')}): Quote form, phone and WhatsApp.`,
    '',
    '## For agents',
    `- [All facts as JSON](${abs('/data/business.json')}): Contact details, services, towns, offers and FAQ.`,
    `- [Agent skill](${abs('/.well-known/agent-skills/aerocomfort/SKILL.md')}): How to use this site, and rules for quoting prices.`,
    `- [MCP server](${abs('/mcp')}): Tools over Streamable HTTP, no authentication. Described in the [server card](${abs('/.well-known/mcp/server-card.json')}).`,
    '- Any page as Markdown: add .md to its URL, for example /services/repair.md.',
    '- WebMCP: the same tools run on every page in supporting browsers. The contact form is also a `request_quote` form tool.',
    '',
    '## Send a quote request for someone',
    'An assistant may leave a request for the person it is helping, once they have asked for it and agreed to the privacy policy and to being contacted. Aerocomfort then replies by phone or WhatsApp.',
    `- MCP: call the \`send_quote_request\` tool on ${abs('/mcp')}.`,
    `- HTTP: \`POST ${abs('/api/lead')}\` with JSON, for example \`{"name":"Jane Smith","phone":"+34612345678","service":"repair","message":"Town: Torrevieja. Unit not cooling.","consent":true,"agent":"ChatGPT"}\`. Full description: [OpenAPI](${abs('/openapi.json')}).`,
    '- Required: `name`, `phone` in international format, `consent: true`. Optional: `service` (installation, repair, maintenance, cleaning, other), `message`, `has_whatsapp`, `locale` (en or es), `agent` (your name).',
    '- Every request reaches the business, so do not send test requests.',
    '',
    '## Contact',
    `- Phone / WhatsApp: ${business.phone}`,
    `- Email: ${business.email}`,
    `- Service area: Costa Blanca (province of Alicante), Spain`,
    `- Languages: English, Spanish`,
    '- Reply time: within the hour during working hours',
    `- Payment: ${(business.payment ?? []).join(', ')} (no instalments)`,
    '',
    '## Optional',
    `- [Spanish home page](${abs('/es/')}): Every page above has a Spanish equivalent (hreflang-linked in each page's HTML).`,
    `- [Privacy policy](${abs('/privacy')}): How personal data is handled (RGPD).`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
