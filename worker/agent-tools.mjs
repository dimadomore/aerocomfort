/**
 * Agent tools, one definition for every channel: WebMCP in the browser
 * (src/lib/webmcp.ts) and the remote MCP server (worker/mcp.mjs). Everything here
 * is read-only and works on the public /data/business.json, so a tool can never
 * say something the site doesn't. Names are a public interface: don't rename.
 */

const LANGUAGE = { type: 'string', enum: ['en', 'es'], description: 'Reply language. Defaults to en.' };
const lang = (args) => (args?.language === 'es' ? 'es' : 'en');
const normalise = (v) =>
  String(v ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();

export const TOOLS = [
  {
    name: 'get_business_info',
    title: 'Business information',
    description:
      'Get Aerocomfort contact details, service region, languages, reply time, guarantee, Google rating and payment methods. Aerocomfort is an air conditioning company on the Costa Blanca, Spain.',
    inputSchema: { type: 'object', properties: { language: LANGUAGE } },
    run: (data, args) => {
      const l = lang(args);
      const { services, towns, offers, faq, ...info } = data;
      return { ...info, replyTime: data.replyTime[l], installTime: data.installTime[l], guarantee: data.guarantee[l] };
    },
  },
  {
    name: 'list_services',
    title: 'List services',
    description:
      'List the air conditioning services Aerocomfort offers (installation, repair, maintenance, cleaning) with a summary and page URL.',
    inputSchema: { type: 'object', properties: { language: LANGUAGE } },
    run: (data, args) => {
      const l = lang(args);
      return {
        services: data.services.map((s) => ({ id: s.id, title: s[l].title, summary: s[l].summary, url: s[l].url })),
        alsoOffered: data.alsoOffered[l],
      };
    },
  },
  {
    name: 'get_service',
    title: 'Service details',
    description:
      'Get what a service includes, how it works and common questions. Use this when someone asks about installing, repairing, servicing or cleaning air conditioning.',
    inputSchema: {
      type: 'object',
      properties: {
        service: { type: 'string', enum: ['installation', 'repair', 'maintenance', 'cleaning'], description: 'Service id.' },
        language: LANGUAGE,
      },
      required: ['service'],
    },
    run: (data, args) => {
      const s = data.services.find((x) => x.id === args?.service);
      if (!s) return { error: 'Unknown service', code: 'unknown_service', retryable: false };
      return { id: s.id, ...s[lang(args)] };
    },
  },
  {
    name: 'check_service_area',
    title: 'Check service area',
    description:
      'Check whether Aerocomfort works in a town. Returns the town page if it is listed. A town that is not listed may still be reachable, so suggest asking.',
    inputSchema: {
      type: 'object',
      properties: { town: { type: 'string', description: 'Town or urbanisation name.' }, language: LANGUAGE },
      required: ['town'],
    },
    run: (data, args) => {
      const l = lang(args);
      const q = normalise(args?.town);
      if (!q) return { error: 'Town is required', code: 'missing_town', retryable: false };
      const matches = data.towns.filter((t) => normalise(t.name).includes(q) || q.includes(normalise(t.name)));
      if (matches.length) return { listed: true, towns: matches.map((t) => ({ name: t.name, url: t[l] })) };
      return { listed: false, region: data.region, note: data.notListedNote[l], contact: data.contactUrl[l] };
    },
  },
  {
    name: 'list_offers',
    title: 'Seasonal offers',
    description:
      'List the current seasonal air conditioning units with prices. Prices include a standard turnkey installation; the free quote confirms the final price, so always mention that.',
    inputSchema: { type: 'object', properties: { language: LANGUAGE } },
    run: (data, args) => {
      const l = lang(args);
      return { validity: data.offers.validity[l], note: data.offers.note[l], url: data.offers.url[l], currency: 'EUR', units: data.offers.units };
    },
  },
  {
    name: 'search_faq',
    title: 'Search FAQ',
    description:
      'Search answers to common questions about prices, waiting times, guarantees, brands and payment. Returns the best matches.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Words to search for.' }, language: LANGUAGE },
      required: ['query'],
    },
    run: (data, args) => {
      const words = normalise(args?.query).split(/\s+/).filter((w) => w.length > 2);
      const scored = data.faq[lang(args)]
        .map((f) => ({ f, score: words.filter((w) => normalise(`${f.q} ${f.a}`).includes(w)).length }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      return { results: scored.map((x) => ({ question: x.f.q, answer: x.f.a })) };
    },
  },
  {
    name: 'get_contact_options',
    title: 'Contact options',
    description:
      'Build ready-to-use contact links: phone, a WhatsApp link with a pre-written message, and the quote form. Nothing is sent: the person chooses and sends it themselves.',
    inputSchema: {
      type: 'object',
      properties: {
        service: { type: 'string', enum: ['installation', 'repair', 'maintenance', 'cleaning', 'other'], description: 'What the person needs.' },
        town: { type: 'string', description: 'Town, if known.' },
        unit: { type: 'string', description: 'Brand and model, if known.' },
        language: LANGUAGE,
      },
    },
    run: (data, args) => {
      const l = lang(args);
      const service = data.services.find((s) => s.id === args?.service)?.[l].title;
      const labels = l === 'es' ? ['Servicio', 'Localidad', 'Equipo'] : ['Service', 'Town', 'Unit'];
      const details = [service, args?.town, args?.unit]
        .map((v, i) => (v ? `${labels[i]}: ${v}.` : ''))
        .filter(Boolean)
        .join(' ');
      const text = [data.whatsappMessage[l], details].filter(Boolean).join(' ');
      const form = new URL(data.contactUrl[l]);
      if (args?.service) form.searchParams.set('service', args.service);
      if (args?.unit) form.searchParams.set('unit', args.unit);
      return {
        phone: data.phone,
        telUrl: `tel:${data.phoneE164}`,
        whatsappUrl: `https://wa.me/${data.phoneE164.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`,
        quoteFormUrl: form.href,
        replyTime: data.replyTime[l],
      };
    },
  },
];
