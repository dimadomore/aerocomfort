import type { APIRoute } from 'astro';
import { SITE_URL } from '../config';
import { business, offers, reviewCountDisplay } from '../data';
import { SERVICES } from '../data/services';
import { AREAS, AREA_GROUPS } from '../data/areas';
import { BRANDS } from '../data/brands';
import { FAQ } from '../data/faq';

const abs = (path: string) => new URL(path, SITE_URL).href;

/**
 * /llms-full.txt — the extended companion to /llms.txt: full public content,
 * concatenated as markdown with `---` page separators and the page URL under
 * each heading (specification.website/spec/agent-readiness/llms-full-txt/).
 * Generated at build from the SAME data modules that render the pages, so it
 * never drifts from the HTML. English content; Spanish equivalents are listed
 * at the end (every page is hreflang-linked in its HTML).
 */
export const GET: APIRoute = () => {
  const fromPrice = Math.min(...offers.items.map((o) => o.priceNew));
  const trust = business.trust ?? { installs: '1000+', years: 5, guaranteeYears: 3, equipmentWarrantyYears: 3, certified: true };
  const out: string[] = [];
  const page = (title: string, url: string, body: string[]) => {
    out.push('---', '', `# ${title}`, `URL: ${abs(url)}`, '', ...body, '');
  };

  out.push(
    `# ${business.name} — full content`,
    '',
    `> All public content of ${SITE_URL}, concatenated for LLMs. Curated index: ${abs('/llms.txt')}`,
    '',
  );

  page(`About ${business.name}`, '/about', [
    `${business.name} is a local air-conditioning business run by ${business.manager} (self-employed / autónomo) serving the Costa Blanca and Costa Cálida, Spain — ${business.areasCount}+ towns across the Alicante and Murcia provinces.`,
    '',
    'Key facts:',
    `- ${trust.installs} installations completed; ${trust.years}th year on the market.`,
    `- ${business.rating.value}★ rating on Google (${reviewCountDisplay} reviews).`,
    `- ${trust.guaranteeYears}-year guarantee on workmanship plus ${trust.equipmentWarrantyYears}-year manufacturer warranty on equipment.`,
    '- Certified for fluorinated-gas handling.',
    '- Also installs heat pumps (aerotermia) and ventilation systems (no refrigeration).',
    `- Payment: ${(business.payment ?? []).join(', ')} — no instalments.`,
    '- English and Spanish spoken; most clients are international homeowners.',
    '',
    `Contact: phone/WhatsApp ${business.phone}, email ${business.email}. Quote form: ${abs('/contact')}`,
  ]);

  for (const s of SERVICES) {
    page(s.en.h1, `/services/${s.slug}`, [
      s.en.intro,
      '',
      `## ${s.en.includesTitle}`,
      ...s.en.includes.map((i) => `- ${i}`),
      '',
      `## ${s.en.pointsTitle}`,
      ...s.en.points.map((p) => `- ${p}`),
      '',
      '## Frequently asked',
      ...s.en.faq.flatMap((f) => [`**${f.q}**`, '', f.a, '']),
    ]);
  }

  page('Seasonal offers — A+++ units supplied and installed', '/offers', [
    `${offers.season.label.en}. Prices include supply and standard installation, from €${fromPrice}.`,
    '',
    ...offers.items.map(
      (o) =>
        `- ${o.brand} ${o.model}: €${o.priceNew}${o.priceOld ? ` (was €${o.priceOld})` : ''}${o.efficiency ? `, ${o.efficiency}` : ''}${o.coverage ? `, coverage ~${o.coverage}` : ''}`,
    ),
  ]);

  page('Frequently asked questions', '/faq', [
    ...FAQ.en.flatMap((f) => [`**${f.q}**`, '', f.a, '']),
  ]);

  page(`Service areas — ${business.areasCount}+ towns`, '/areas', [
    'Dedicated local pages:',
    ...AREAS.map((a) => `- [${a.en.name}](${abs(`/areas/${a.slug}`)}): ${a.en.intro}`),
    '',
    'Full coverage list:',
    ...AREA_GROUPS.map((g) => `- ${g.title.en}: ${g.towns.map((t) => t.name).join(', ')}`),
  ]);

  for (const a of AREAS) {
    page(`Air conditioning in ${a.en.name}`, `/areas/${a.slug}`, [...a.en.body]);
  }

  page('Brands we install and service', '/brands', [
    'No exclusive dealership — we install and service the brands our clients need:',
    '',
    ...BRANDS.flatMap((b) => [
      `## ${b.name}`,
      `URL: ${abs(`/brands/${b.slug}`)}`,
      '',
      b.en.intro,
      '',
      b.en.why,
      '',
    ]),
  ]);

  page('Spanish version (Español)', '/es/', [
    'Every page above has a Spanish equivalent, hreflang-linked in the HTML:',
    `- Home: ${abs('/es/')}`,
    `- Servicios: ${abs('/es/servicios')} (instalacion, reparacion, mantenimiento, limpieza)`,
    `- Ofertas: ${abs('/es/ofertas')}`,
    `- Zonas: ${abs('/es/zonas')}`,
    `- Marcas: ${abs('/es/marcas')}`,
    `- Preguntas frecuentes: ${abs('/es/preguntas-frecuentes')}`,
    `- Sobre nosotros: ${abs('/es/sobre-nosotros')}`,
    `- Contacto: ${abs('/es/contacto')}`,
  ]);

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
