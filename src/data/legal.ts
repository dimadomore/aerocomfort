import type { Locale } from '../config';

export type LegalKey = 'privacy' | 'cookies' | 'legal';

interface LegalSection {
  h?: string;
  p?: string[];
  ul?: string[];
}
interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Legal documents (Spain: RGPD/GDPR + LOPDGDD + LSSI-CE), production copy.
 * {EMAIL} / {NAME} / {PHONE} are substituted from business data in LegalBody.astro.
 *
 * Still ‹por confirmar› (blocks nothing, but complete before launch):
 *   - the owner's full legal surname (Identity sections)
 *   - the registered address (LSSI requires a domicilio)
 * Everything else states what the site actually does — if data flows change
 * (new analytics, new processors), update BOTH languages here.
 */
export const LEGAL: Record<LegalKey, Record<Locale, LegalDoc>> = {
  privacy: {
    en: {
      title: 'Privacy Policy',
      intro:
        'How {NAME} collects, uses and protects your personal data when you use this website or contact us.',
      sections: [
        {
          h: 'Who is responsible for your data',
          p: [
            '{NAME} is the trading name of Gregorio ‹surname — to be confirmed›, a self-employed professional (autónomo) registered in Spain, NIE Y9274595C, providing air-conditioning, heat-pump and ventilation services in the provinces of Alicante and Murcia.',
            'Contact for anything related to your data: {EMAIL} or {PHONE}.',
          ],
        },
        {
          h: 'What we collect',
          p: ['We only collect what you give us or what is strictly needed to run the site securely:'],
          ul: [
            'Quote form: your name, phone number, whether that number uses WhatsApp, the service you are interested in and any message you write.',
            'Technical data with each form submission: IP address, the page you sent it from and the time — used solely for security and spam prevention.',
            'If you call or WhatsApp us directly, we process the contact details you share there in order to reply.',
            'Anonymous, cookie-less traffic statistics (Cloudflare Web Analytics), and — only if you accept them in the cookie banner — Google Analytics measurement data. See the Cookie Policy.',
          ],
        },
        {
          h: 'Why and on what legal basis',
          ul: [
            'To answer your enquiry and prepare a quote — pre-contractual steps taken at your request (art. 6.1.b GDPR).',
            'To provide and invoice the service if you hire us — performance of a contract and legal (tax) obligations (art. 6.1.b and 6.1.c GDPR).',
            'Traffic measurement with Google Analytics — only with your consent (art. 6.1.a GDPR), given through the cookie banner.',
            'Site security and spam prevention — our legitimate interest in keeping the service working (art. 6.1.f GDPR).',
            'We never sell your data, and we do not use it for profiling or automated decisions.',
          ],
        },
        {
          h: 'How long we keep it',
          ul: [
            'Enquiries that do not become a job: up to 1 year after our last contact, then deleted.',
            'Data linked to a completed job (quotes, invoices): for the periods Spanish tax and civil law require (generally 4–6 years).',
            'Analytics data: per the retention configured in Google Analytics (never used to identify you).',
          ],
        },
        {
          h: 'Who processes it for us',
          p: [
            'Your data is handled by a small set of providers, acting only on our instructions as data processors:',
          ],
          ul: [
            'Cloudflare, Inc. — website hosting and secure storage of form submissions.',
            'Resend, Inc. — delivers the form submission to our inbox by email.',
            'Google Ireland Ltd. — analytics and advertising measurement, only if you consent to those cookies.',
            'If you contact us by WhatsApp, the conversation is subject to WhatsApp (Meta) terms and privacy policy.',
          ],
        },
        {
          h: 'International transfers',
          p: [
            'Some providers (Cloudflare, Resend, Google) are US companies. Transfers are covered by the EU–US Data Privacy Framework and/or the European Commission’s Standard Contractual Clauses.',
          ],
        },
        {
          h: 'Your rights',
          p: [
            'You can exercise these rights at any time, free of charge, by writing to {EMAIL} (attach some proof of identity so we know it’s you):',
          ],
          ul: [
            'Access the data we hold about you.',
            'Correct inaccurate data or complete incomplete data.',
            'Delete your data ("right to be forgotten").',
            'Restrict or object to our processing.',
            'Receive your data in a portable format.',
            'Withdraw any consent you have given, without affecting prior processing.',
          ],
        },
        {
          h: 'Complaints',
          p: [
            'If you believe we have mishandled your data, you can complain to the Spanish supervisory authority: Agencia Española de Protección de Datos (AEPD), C/ Jorge Juan 6, 28001 Madrid — www.aepd.es.',
          ],
        },
        {
          h: 'Security',
          p: [
            'The site is served exclusively over HTTPS. Form submissions are stored in access-restricted, password-protected systems and are only accessible to the business owner.',
          ],
        },
        {
          h: 'Changes',
          p: [
            'We may update this policy if the site or our providers change; the current version is always the one published on this page.',
          ],
        },
      ],
    },
    es: {
      title: 'Política de Privacidad',
      intro:
        'Cómo {NAME} recoge, utiliza y protege tus datos personales cuando usas esta web o contactas con nosotros.',
      sections: [
        {
          h: 'Responsable del tratamiento',
          p: [
            '{NAME} es el nombre comercial de Gregorio ‹apellidos — por confirmar›, profesional autónomo registrado en España, NIE Y9274595C, que presta servicios de aire acondicionado, aerotermia y ventilación en las provincias de Alicante y Murcia.',
            'Contacto para cualquier cuestión sobre tus datos: {EMAIL} o {PHONE}.',
          ],
        },
        {
          h: 'Qué datos recogemos',
          p: ['Solo recogemos lo que tú nos facilitas o lo estrictamente necesario para que la web funcione con seguridad:'],
          ul: [
            'Formulario de presupuesto: tu nombre, tu teléfono, si ese número usa WhatsApp, el servicio que te interesa y el mensaje que escribas.',
            'Datos técnicos con cada envío: dirección IP, página desde la que enviaste y hora — solo para seguridad y prevención de spam.',
            'Si nos llamas o escribes por WhatsApp, tratamos los datos de contacto que compartas para poder responderte.',
            'Estadísticas de tráfico anónimas y sin cookies (Cloudflare Web Analytics) y — solo si las aceptas en el banner — datos de medición de Google Analytics. Consulta la Política de Cookies.',
          ],
        },
        {
          h: 'Para qué y con qué base legal',
          ul: [
            'Responder a tu solicitud y preparar un presupuesto — medidas precontractuales a petición tuya (art. 6.1.b RGPD).',
            'Prestar y facturar el servicio si nos contratas — ejecución de contrato y obligaciones legales (fiscales) (art. 6.1.b y 6.1.c RGPD).',
            'Medición de tráfico con Google Analytics — solo con tu consentimiento (art. 6.1.a RGPD), otorgado en el banner de cookies.',
            'Seguridad de la web y prevención de spam — interés legítimo en mantener el servicio operativo (art. 6.1.f RGPD).',
            'Nunca vendemos tus datos ni los usamos para elaborar perfiles o tomar decisiones automatizadas.',
          ],
        },
        {
          h: 'Cuánto tiempo los conservamos',
          ul: [
            'Solicitudes que no acaban en un trabajo: hasta 1 año desde el último contacto; después se eliminan.',
            'Datos vinculados a un trabajo realizado (presupuestos, facturas): durante los plazos que exige la normativa fiscal y civil española (en general, de 4 a 6 años).',
            'Datos de analítica: según la retención configurada en Google Analytics (nunca se usan para identificarte).',
          ],
        },
        {
          h: 'Quién los trata por nosotros',
          p: [
            'Tus datos los manejan unos pocos proveedores, que actúan únicamente según nuestras instrucciones como encargados del tratamiento:',
          ],
          ul: [
            'Cloudflare, Inc. — alojamiento de la web y almacenamiento seguro de los envíos del formulario.',
            'Resend, Inc. — entrega del formulario a nuestro correo electrónico.',
            'Google Ireland Ltd. — analítica y medición publicitaria, solo si consientes esas cookies.',
            'Si nos contactas por WhatsApp, la conversación se rige por las condiciones y la política de privacidad de WhatsApp (Meta).',
          ],
        },
        {
          h: 'Transferencias internacionales',
          p: [
            'Algunos proveedores (Cloudflare, Resend, Google) son empresas estadounidenses. Las transferencias están amparadas por el Marco de Privacidad de Datos UE–EE. UU. y/o las Cláusulas Contractuales Tipo de la Comisión Europea.',
          ],
        },
        {
          h: 'Tus derechos',
          p: [
            'Puedes ejercer estos derechos en cualquier momento y de forma gratuita escribiendo a {EMAIL} (adjunta algún justificante de identidad para que sepamos que eres tú):',
          ],
          ul: [
            'Acceder a los datos que tenemos sobre ti.',
            'Rectificar datos inexactos o completar los incompletos.',
            'Suprimir tus datos («derecho al olvido»).',
            'Limitar el tratamiento u oponerte a él.',
            'Recibir tus datos en un formato portable.',
            'Retirar cualquier consentimiento otorgado, sin que afecte al tratamiento anterior.',
          ],
        },
        {
          h: 'Reclamaciones',
          p: [
            'Si crees que hemos tratado mal tus datos, puedes reclamar ante la autoridad de control española: Agencia Española de Protección de Datos (AEPD), C/ Jorge Juan 6, 28001 Madrid — www.aepd.es.',
          ],
        },
        {
          h: 'Seguridad',
          p: [
            'La web se sirve exclusivamente por HTTPS. Los envíos del formulario se guardan en sistemas protegidos con contraseña y acceso restringido, accesibles solo al titular del negocio.',
          ],
        },
        {
          h: 'Cambios',
          p: [
            'Podemos actualizar esta política si la web o nuestros proveedores cambian; la versión vigente es siempre la publicada en esta página.',
          ],
        },
      ],
    },
  },
  cookies: {
    en: {
      title: 'Cookie Policy',
      intro:
        'What this website stores on your device, why, and how you stay in control. Short version: almost nothing without your consent.',
      sections: [
        {
          h: 'How this site approaches cookies',
          p: [
            'Cookies are small files a website stores on your device; similar information can also be kept in your browser’s local storage. We keep this to the bare minimum, and nothing non-essential runs until you allow it in the consent banner (all categories are OFF by default).',
          ],
        },
        {
          h: 'Strictly necessary (always on, no consent needed)',
          ul: [
            '<strong>aero-consent</strong> (local storage) — remembers the cookie choices you made in the banner, so we don’t ask again. Kept until you clear your browser data.',
            '<strong>aero-chat-tip-seen</strong> (local storage) — remembers that you closed the contact-widget greeting, so it doesn’t pop up again.',
            'Cloudflare Web Analytics — cookie-less, anonymous performance measurement; it stores nothing on your device.',
          ],
        },
        {
          h: 'Analytics & advertising (only with your consent)',
          ul: [
            'Google Analytics 4 — cookies such as <strong>_ga</strong> and <strong>_ga_*</strong> (up to 2 years) to measure visits anonymously.',
            'Google Ads conversion measurement — tells us that an ad led to an enquiry. No cookie is set until you accept this category.',
          ],
        },
        {
          h: 'Third-party content (only with your consent)',
          ul: [
            'Google reviews widget (served via Elfsight) and the embedded Google Map — when loaded, Google may set its own cookies under its own policies. Until you accept, the widget stays blocked and the map is replaced by an external link.',
          ],
        },
        {
          h: 'Changing your mind',
          p: [
            'You can change or withdraw your consent at any time: reopen the banner via the "Cookie settings" link in the footer, or delete cookies and site data in your browser settings (look for "Clear browsing data" / "Site settings").',
          ],
        },
        {
          h: 'More information',
          p: ['For how we handle personal data in general, see our Privacy Policy.'],
        },
      ],
    },
    es: {
      title: 'Política de Cookies',
      intro:
        'Qué guarda esta web en tu dispositivo, para qué, y cómo mantienes el control. Versión corta: casi nada sin tu consentimiento.',
      sections: [
        {
          h: 'Nuestro enfoque',
          p: [
            'Las cookies son pequeños archivos que una web guarda en tu dispositivo; también puede guardarse información similar en el almacenamiento local del navegador. Lo reducimos al mínimo, y nada no esencial se activa hasta que lo permitas en el banner de consentimiento (todas las categorías están desactivadas por defecto).',
          ],
        },
        {
          h: 'Estrictamente necesarias (siempre activas, sin consentimiento)',
          ul: [
            '<strong>aero-consent</strong> (almacenamiento local) — recuerda las opciones que elegiste en el banner para no volver a preguntarte. Se conserva hasta que borres los datos del navegador.',
            '<strong>aero-chat-tip-seen</strong> (almacenamiento local) — recuerda que cerraste el saludo del widget de contacto para que no vuelva a aparecer.',
            'Cloudflare Web Analytics — medición anónima y sin cookies; no guarda nada en tu dispositivo.',
          ],
        },
        {
          h: 'Analítica y publicidad (solo con tu consentimiento)',
          ul: [
            'Google Analytics 4 — cookies como <strong>_ga</strong> y <strong>_ga_*</strong> (hasta 2 años) para medir visitas de forma anónima.',
            'Medición de conversiones de Google Ads — nos indica que un anuncio generó una solicitud. No se instala ninguna cookie hasta que aceptes esta categoría.',
          ],
        },
        {
          h: 'Contenido de terceros (solo con tu consentimiento)',
          ul: [
            'El widget de reseñas de Google (servido por Elfsight) y el mapa de Google incrustado — al cargarse, Google puede instalar sus propias cookies según sus políticas. Hasta que aceptes, el widget queda bloqueado y el mapa se sustituye por un enlace externo.',
          ],
        },
        {
          h: 'Cambiar de opinión',
          p: [
            'Puedes cambiar o retirar tu consentimiento en cualquier momento: reabre el banner desde el enlace «Configuración de cookies» del pie de página, o borra las cookies y datos del sitio en los ajustes de tu navegador («Borrar datos de navegación» / «Configuración de sitios»).',
          ],
        },
        {
          h: 'Más información',
          p: ['Para saber cómo tratamos los datos personales en general, consulta nuestra Política de Privacidad.'],
        },
      ],
    },
  },
  legal: {
    en: {
      title: 'Legal Notice',
      intro:
        'Website owner identification and terms of use, in compliance with Spanish Law 34/2002 on Information Society Services (LSSI-CE).',
      sections: [
        {
          h: 'Identity of the owner',
          ul: [
            'Owner: Gregorio ‹surname — to be confirmed›, self-employed professional (autónomo).',
            'NIE: Y9274595C.',
            'Registered address: ‹address — to be confirmed›, province of Alicante, Spain.',
            'Email: {EMAIL} · Phone / WhatsApp: {PHONE}.',
            'Activity: installation, repair, maintenance and cleaning of air-conditioning systems; heat pumps (aerotermia) and ventilation. Certified for the handling of fluorinated gases.',
          ],
        },
        {
          h: 'Purpose of the site',
          p: [
            'This website presents the services offered by {NAME} on the Costa Blanca and Costa Cálida and lets visitors request a quote by form, phone or WhatsApp. Prices shown in offers are indicative and confirmed in the individual quote.',
          ],
        },
        {
          h: 'Terms of use',
          p: [
            'By using this site you agree to use it lawfully, to provide truthful contact details in the forms, and not to misuse its content, forms or infrastructure (including automated or abusive submissions).',
          ],
        },
        {
          h: 'Liability',
          p: [
            'We take care to keep the information accurate and the site available, but we cannot guarantee it is free of errors or accessible at all times. The site links to external services (Google Maps, Google reviews, WhatsApp); we are not responsible for their content or practices.',
          ],
        },
        {
          h: 'Intellectual property',
          p: [
            'The content, design, texts, illustrations and brand of this site belong to {NAME} unless stated otherwise. Third-party trademarks (equipment brands such as Mitsubishi Electric, Panasonic, LG and others) belong to their respective owners and appear only to identify the products with which we work.',
          ],
        },
        {
          h: 'Applicable law and jurisdiction',
          p: [
            'This notice is governed by Spanish law. Any dispute will be submitted to the courts of the owner’s domicile, except where consumer law grants you the courts of your own domicile.',
          ],
        },
      ],
    },
    es: {
      title: 'Aviso Legal',
      intro:
        'Identificación del titular de la web y condiciones de uso, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE).',
      sections: [
        {
          h: 'Identidad del titular',
          ul: [
            'Titular: Gregorio ‹apellidos — por confirmar›, profesional autónomo.',
            'NIE: Y9274595C.',
            'Domicilio: ‹dirección — por confirmar›, provincia de Alicante, España.',
            'Correo: {EMAIL} · Teléfono / WhatsApp: {PHONE}.',
            'Actividad: instalación, reparación, mantenimiento y limpieza de sistemas de aire acondicionado; aerotermia y ventilación. Certificado para la manipulación de gases fluorados.',
          ],
        },
        {
          h: 'Objeto del sitio',
          p: [
            'Esta web presenta los servicios que ofrece {NAME} en la Costa Blanca y la Costa Cálida y permite a los visitantes solicitar presupuesto por formulario, teléfono o WhatsApp. Los precios mostrados en las ofertas son orientativos y se confirman en el presupuesto individual.',
          ],
        },
        {
          h: 'Condiciones de uso',
          p: [
            'Al usar esta web te comprometes a hacerlo de forma lícita, a facilitar datos de contacto veraces en los formularios y a no hacer un uso indebido de sus contenidos, formularios o infraestructura (incluidos envíos automatizados o abusivos).',
          ],
        },
        {
          h: 'Responsabilidad',
          p: [
            'Procuramos mantener la información actualizada y la web disponible, pero no podemos garantizar que esté libre de errores ni accesible en todo momento. La web enlaza con servicios externos (Google Maps, reseñas de Google, WhatsApp); no respondemos de sus contenidos ni de sus prácticas.',
          ],
        },
        {
          h: 'Propiedad intelectual',
          p: [
            'Los contenidos, el diseño, los textos, las ilustraciones y la marca de este sitio pertenecen a {NAME} salvo que se indique lo contrario. Las marcas de terceros (fabricantes como Mitsubishi Electric, Panasonic, LG y otros) pertenecen a sus respectivos titulares y aparecen únicamente para identificar los productos con los que trabajamos.',
          ],
        },
        {
          h: 'Legislación aplicable y jurisdicción',
          p: [
            'Este aviso se rige por la legislación española. Cualquier controversia se someterá a los juzgados del domicilio del titular, salvo que la normativa de consumo te reconozca los de tu propio domicilio.',
          ],
        },
      ],
    },
  },
};
