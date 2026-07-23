import type { APIRoute } from 'astro';
import { SITE_URL } from '../config';
import { business, offers, reviewCountDisplay } from '../data';
import { SERVICES } from '../data/services';

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
    `> ${business.name} installs, repairs, maintains and cleans air conditioning across the Costa Blanca and Costa Cálida, Spain — Torrevieja, Orihuela Costa and ${business.areasCount}+ towns. Also heat pumps (aerotermia) and ventilation. ${business.rating.value}★ on Google (${reviewCountDisplay} reviews), ${trust.installs} installations, ${trust.guaranteeYears}-year workmanship guarantee. English and Spanish spoken.`,
    '',
    `Bilingual site: English at ${SITE_URL}/, Spanish under ${SITE_URL}/es/. Full concatenated content for LLMs: ${abs('/llms-full.txt')}`,
    '',
    '## Services',
    ...SERVICES.map(
      (s) => `- [${s.en.title}](${abs(`/services/${s.slug}`)}): ${s.en.blurb}`,
    ),
    `- [All services](${abs('/services')}): Overview — also heat pumps (aerotermia) and ventilation.`,
    '',
    '## Key pages',
    `- [Offers](${abs('/offers')}): Seasonal A+++ units supplied and installed, from €${fromPrice} (${offers.season.label.en}).`,
    `- [Service areas](${abs('/areas')}): ${business.areasCount}+ towns across Alicante & Murcia provinces, 14 with dedicated pages.`,
    `- [Brands](${abs('/brands')}): Mitsubishi Electric, Panasonic, LG, Giatsu, Haier, Samsung, Gree.`,
    `- [FAQ](${abs('/faq')}): Direct answers — waiting times, guarantees, prices, coverage.`,
    `- [About](${abs('/about')}): Who we are, certification and guarantees.`,
    `- [Our work](${abs('/gallery')}): Photos of completed installations.`,
    `- [Contact](${abs('/contact')}): Quote form, phone and WhatsApp.`,
    '',
    '## Contact',
    `- Phone / WhatsApp: ${business.phone}`,
    `- Email: ${business.email}`,
    `- Service area: Costa Blanca & Costa Cálida (Alicante & Murcia provinces), Spain`,
    `- Languages: English, Spanish`,
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
