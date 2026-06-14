/**
 * Cloudflare Worker: serves the static site (assets binding) and handles the
 * lead form POST at /api/lead. Delivery channels are best-effort and gated on
 * secrets — until they're set, leads are logged (visible in `wrangler tail`).
 * Wire real delivery by setting Worker secrets (see README / docs/09 §7):
 *   TURNSTILE_SECRET, RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM
 */
interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  LEAD_EMAIL_TO?: string;
  LEAD_EMAIL_FROM?: string;
}

interface Lead {
  name: string;
  phone: string;
  whatsapp: boolean;
  service: string;
  message: string;
  locale: string;
  page: string;
  ip: string;
  at: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/lead' && request.method === 'POST') {
      return handleLead(request, env);
    }
    // Everything else → static assets (pages, css, js, 404).
    return env.ASSETS.fetch(request);
  },
};

async function handleLead(request: Request, env: Env): Promise<Response> {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');

  const data: Record<string, string> = {};
  const ct = request.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      Object.assign(data, await request.json());
    } else {
      const fd = await request.formData();
      fd.forEach((v, k) => {
        data[k] = String(v);
      });
    }
  } catch {
    // fall through to validation
  }

  const locale = data.locale === 'es' ? 'es' : 'en';
  const thankYou = locale === 'es' ? '/es/gracias' : '/thank-you';
  const contact = locale === 'es' ? '/es/contacto' : '/contact';

  const respond = (ok: boolean): Response => {
    if (wantsJson) {
      return new Response(JSON.stringify({ ok }), {
        status: ok ? 200 : 400,
        headers: { 'content-type': 'application/json' },
      });
    }
    // No-JS path: redirect to thank-you on success, back to contact on failure.
    return new Response(null, {
      status: 303,
      headers: { Location: ok ? thankYou : `${contact}?error=1` },
    });
  };

  // Honeypot — silently accept (don't tip off bots), don't deliver.
  if (data.company) return respond(true);

  // Turnstile (only enforced once configured).
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(
      env.TURNSTILE_SECRET,
      data['cf-turnstile-response'],
      request.headers.get('cf-connecting-ip'),
    );
    if (!ok) return respond(false);
  }

  const name = (data.name || '').trim();
  const phone = (data.phone_e164 || data.phone || '').trim();
  if (!name || !phone) return respond(false);

  const lead: Lead = {
    name,
    phone,
    whatsapp: data.has_whatsapp === 'yes',
    service: data.service || '',
    message: data.message || '',
    locale,
    page: request.headers.get('referer') || '',
    ip: request.headers.get('cf-connecting-ip') || '',
    at: new Date().toISOString(),
  };

  try {
    await deliver(lead, env);
  } catch (err) {
    // Lead is still accepted for the user; we log for follow-up rather than lose it.
    console.error('lead delivery failed', err);
  }

  return respond(true);
}

async function verifyTurnstile(
  secret: string,
  token: string | undefined,
  ip: string | null,
): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const json = (await res.json().catch(() => ({ success: false }))) as { success?: boolean };
  return Boolean(json.success);
}

async function deliver(lead: Lead, env: Env): Promise<void> {
  if (env.RESEND_API_KEY && env.LEAD_EMAIL_TO && env.LEAD_EMAIL_FROM) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.LEAD_EMAIL_FROM,
        to: env.LEAD_EMAIL_TO,
        subject: `New lead: ${lead.name}${lead.service ? ` (${lead.service})` : ''}`,
        text: leadText(lead),
      }),
    });
    return;
  }
  // No delivery configured yet — log so nothing is lost (see `wrangler tail`).
  console.log('LEAD (no delivery channel configured):', JSON.stringify(lead));
}

function leadText(l: Lead): string {
  return [
    `Name: ${l.name}`,
    `Phone: ${l.phone}`,
    `WhatsApp on this number: ${l.whatsapp ? 'yes' : 'no'}`,
    `Service: ${l.service || '—'}`,
    `Message: ${l.message || '—'}`,
    `Language: ${l.locale}`,
    `From page: ${l.page || '—'}`,
    `Time: ${l.at}`,
  ].join('\n');
}
