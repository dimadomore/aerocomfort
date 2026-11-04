import type { APIRoute } from 'astro';
import { SITE_URL } from '../../config';
import { business, offers } from '../../data';
import { SERVICES } from '../../data/services';
import { AREA_GROUPS } from '../../data/areas';
import { FAQ_GROUPS } from '../../data/faq';
import { localizedPath } from '../../i18n/utils';

const abs = (path: string) => new URL(path, SITE_URL).href;
const both = (path: string) => ({ en: abs(localizedPath(path, 'en')), es: abs(localizedPath(path, 'es')) });

/**
 * /data/business.json: the public facts every agent channel reads (WebMCP, the
 * /mcp server, the agent skill). Built from the same data as the pages, so an
 * agent can't be told something the site doesn't say.
 */
export const GET: APIRoute = () => {
  const trust = business.trust;
  const towns = AREA_GROUPS.flatMap((g) => g.towns)
    .filter((t) => t.slug)
    .map((t) => ({ name: t.name, ...both(`/areas/${t.slug}`) }));

  const service = (s: (typeof SERVICES)[number], locale: 'en' | 'es') => {
    const c = s[locale];
    return {
      title: c.title,
      summary: c.blurb,
      description: c.intro,
      url: abs(localizedPath(`/services/${s.slug}`, locale)),
      includes: c.includes,
      steps: c.steps,
      advice: c.guide,
      faq: c.faq,
    };
  };

  const data = {
    name: business.name,
    url: SITE_URL + '/',
    region: 'Costa Blanca (province of Alicante), Spain',
    baseLocation: `${business.addressLocality}, ${business.addressRegion}, Spain`,
    phone: business.phone,
    phoneE164: business.phoneE164,
    email: business.email,
    languages: ['en', 'es'],
    payment: business.payment,
    leadership: 'A local team of specialists led by Gregorio, who also works on site.',
    customers: ['homes', 'restaurants', 'small businesses'],
    brandsInstalled: ['Mitsubishi Electric', 'Panasonic', 'LG', 'Giatsu', 'Haier', 'Samsung', 'Gree'],
    brandsRepaired: 'All major brands',
    rating: { value: business.rating.value, count: business.rating.count, source: 'Google', url: business.social.google },
    installationsCompleted: trust?.installs,
    replyTime: {
      en: 'Within the hour during working hours, by phone or WhatsApp.',
      es: 'En menos de una hora en horario laboral, por teléfono o WhatsApp.',
    },
    installTime: {
      en: 'Usually 24 to 72 hours from the request, depending on the season.',
      es: 'Normalmente entre 24 y 72 horas desde la solicitud, según la temporada.',
    },
    guarantee: {
      en: `${trust?.guaranteeYears}-year guarantee on the work, plus the ${trust?.equipmentWarrantyYears}-year manufacturer warranty on the unit.`,
      es: `${trust?.guaranteeYears} años de garantía en el trabajo, más ${trust?.equipmentWarrantyYears} años del fabricante en el equipo.`,
    },
    alsoOffered: {
      en: ['Heat pumps (aerotermia)', 'Ventilation', 'Pre-installation during builds and reforms'],
      es: ['Bombas de calor (aerotermia)', 'Ventilación', 'Preinstalación durante obras y reformas'],
    },
    whatsappMessage: business.whatsappMessage,
    contactUrl: both('/contact'),
    notListedNote: {
      en: 'This town is not listed, but Aerocomfort may still reach it. Ask by WhatsApp or phone.',
      es: 'Esta localidad no aparece en la lista, pero Aerocomfort puede llegar. Pregunta por WhatsApp o teléfono.',
    },
    services: SERVICES.map((s) => ({ id: s.slug, en: service(s, 'en'), es: service(s, 'es') })),
    towns,
    offers: {
      url: both('/offers'),
      validity: offers.season.label,
      note: {
        en: 'Prices include a standard turnkey installation. Your free quote confirms the final price for your home.',
        es: 'Los precios incluyen una instalación estándar llave en mano. Tu presupuesto gratuito confirma el precio final para tu vivienda.',
      },
      units: offers.items.map((o) => ({
        brand: o.brand,
        model: o.model,
        price: o.priceNew,
        previousPrice: o.priceOld,
        efficiency: o.efficiency,
        roomSize: o.coverage,
        installation: 'Standard turnkey installation included',
        wifiIncluded: Boolean(o.wifi),
      })),
    },
    faq: {
      en: FAQ_GROUPS.en.flatMap((g) => g.items),
      es: FAQ_GROUPS.es.flatMap((g) => g.items),
    },
  };

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
