/**
 * Agent tools, one definition for every channel: WebMCP in the browser
 * (src/lib/webmcp.ts) and the remote MCP server (worker/mcp.mjs). The read tools
 * work on the public /data/business.json, so a tool can never say something the
 * site doesn't. Names are a public interface: don't rename.
 *
 * One tool writes: `send_quote_request` (owner's decision, Nov 2026: an assistant
 * may leave a request for the person it is helping). It has `write: true` and a
 * `prepare` step instead of `run`: prepare checks the input and builds the body
 * for POST /api/lead, and each channel sends it. The server checks it all again.
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
      'List the current seasonal air conditioning units with prices. Prices include basic installation (up to 3 m of pipework); the free quote confirms the final price, so always mention that.',
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
  {
    name: 'send_quote_request',
    title: 'Send a quote request',
    write: true,
    description:
      'Send a quote or callback request to Aerocomfort for the person you are helping. Aerocomfort replies by phone or WhatsApp, within the hour during working hours. Call this only when the person has asked you to send it and has agreed that Aerocomfort may use these details to contact them (privacy policy: https://aerocomfort.es/privacy). Every call reaches the business, so never use it to test.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the person.' },
        phone: {
          type: 'string',
          pattern: '^\\+[1-9][0-9]{6,14}$',
          description: 'Their mobile number in international format with the country code, for example +34612345678.',
        },
        has_whatsapp: { type: 'boolean', description: 'True if they use WhatsApp on this number.' },
        service: { type: 'string', enum: ['installation', 'repair', 'maintenance', 'cleaning', 'other'], description: 'What they need.' },
        town: { type: 'string', description: 'Town or urbanisation of the property.' },
        unit: { type: 'string', description: 'Brand and model, if they want a specific unit from the offers.' },
        message: { type: 'string', description: 'Anything else: number of rooms, the fault, error code, preferred time to call.' },
        consent: {
          type: 'boolean',
          description: 'Must be true: the person agreed to the privacy policy and to being contacted about this request.',
        },
        agent: { type: 'string', description: 'Name of the assistant sending this, for example "ChatGPT" or "Claude".' },
        language: LANGUAGE,
      },
      required: ['name', 'phone', 'consent'],
    },
    prepare: (data, args) => {
      const l = lang(args);
      const name = String(args?.name ?? '').trim();
      const phone = String(args?.phone ?? '').replace(/[\s().-]/g, '');
      if (args?.consent !== true) {
        return {
          error: 'The person must agree first. Ask them, then call again with consent: true.',
          code: 'consent_required',
          retryable: true,
          privacyPolicy: data.privacyUrl?.[l],
        };
      }
      if (!name) return { error: 'Name is required', code: 'invalid_name', retryable: true };
      if (!/^\+[1-9][0-9]{6,14}$/.test(phone)) {
        return { error: 'Phone must be in international format, for example +34612345678', code: 'invalid_phone', retryable: true };
      }
      const labels = l === 'es' ? ['Localidad', 'Equipo'] : ['Town', 'Unit'];
      const message = [
        ...[args?.town, args?.unit].map((v, i) => (v ? `${labels[i]}: ${String(v).trim()}.` : '')),
        String(args?.message ?? '').trim(),
      ]
        .filter(Boolean)
        .join(' ');
      return {
        body: {
          name,
          phone_e164: phone,
          has_whatsapp: args?.has_whatsapp ? 'yes' : '',
          service: ['installation', 'repair', 'maintenance', 'cleaning', 'other'].includes(args?.service) ? args.service : '',
          message,
          locale: l,
          consent: 'yes',
          agent: String(args?.agent ?? '').trim() || 'assistant',
        },
        sent: { sent: true, replyTime: data.replyTime[l], phone: data.phone, whatsapp: `https://wa.me/${data.phoneE164.replace(/\D/g, '')}` },
      };
    },
  },
];

/** Turns the answer of POST /api/lead into a tool result. Shared by every channel. */
export function leadResult(prepared, response) {
  if (response?.ok) return prepared.sent;
  return {
    error: response?.message || 'The request could not be sent. Offer the phone or WhatsApp instead.',
    code: response?.error || 'unavailable',
    retryable: response?.error !== 'rate_limited',
  };
}
