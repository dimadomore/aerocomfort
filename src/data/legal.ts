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
 * Owner name and registered address confirmed by Dima, Nov 2026. The owner's
 * name appears here only: public copy speaks of the team, not one person.
 * Everything else states what the site actually does — if data flows change
 * (new analytics, new processors), update BOTH languages here.
 */
/** Date of the last change to the text below. Update it when you edit a document. */
export const LEGAL_UPDATED = '2026-11-11';

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
            '{NAME} is the trading name of Grigore Camendo, a self-employed professional (autónomo) registered in Spain, NIE Y9274595C, providing air-conditioning, heat-pump and ventilation services on the Costa Blanca (province of Alicante) and nearby areas.',
            'Contact for anything related to your data: {EMAIL} or {PHONE}.',
          ],
        },
        {
          h: 'What we collect',
          p: ['We only collect what you give us or what is strictly needed to run the site securely:'],
          ul: [
            'Quote form: your name, phone number, whether that number uses WhatsApp, the service you are interested in and any message you write.',
            'Technical data with each form submission: IP address and the time, used solely for security and spam prevention.',
            'Where your request came from: the page of our site you were on before the form and the button you pressed. If you accepted analytics in the cookie banner, also the first page of your visit, the pages you viewed, and the website or advert that brought you. We use this to understand which pages and adverts work.',
            'An anonymous count of clicks on our WhatsApp, phone and email links, by page. It holds no IP address and nothing that identifies you.',
            'If you call or WhatsApp us directly, we process the contact details you share there in order to reply.',
            'That is all: identification and contact details. We never ask for sensitive data such as health, beliefs or ID numbers, so please don’t send any.',
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
          p: [
            'Tell us which right you want to use and how to reach you. We reply within one month. We don’t make automated decisions about you or build profiles.',
          ],
        },
        {
          h: 'Children',
          p: [
            'This site and our services are for adults. In Spain a person must be 14 or older to consent to the use of their data, so we don’t knowingly collect data from anyone younger: a parent or guardian should contact us instead.',
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
            'The site is served exclusively over HTTPS, so what you send is encrypted on the way. Form submissions are stored in access-restricted, password-protected systems and are only accessible to the business owner.',
            'No system is perfectly safe. If a security incident ever put your data at risk, we would tell you and the supervisory authority without undue delay, as the law requires.',
          ],
        },
        {
          h: 'Changes',
          p: [
            'We may update this policy if the site, our providers or the law change. The current version is always the one on this page, with the date of its last change at the top.',
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
            '{NAME} es el nombre comercial de Grigore Camendo, profesional autónomo registrado en España, NIE Y9274595C, que presta servicios de aire acondicionado y ventilación en la Costa Blanca (provincia de Alicante) y zonas cercanas.',
            'Contacto para cualquier cuestión sobre tus datos: {EMAIL} o {PHONE}.',
          ],
        },
        {
          h: 'Qué datos recogemos',
          p: ['Solo recogemos lo que tú nos facilitas o lo estrictamente necesario para que la web funcione con seguridad:'],
          ul: [
            'Formulario de presupuesto: tu nombre, tu teléfono, si ese número usa WhatsApp, el servicio que te interesa y el mensaje que escribas.',
            'Datos técnicos con cada envío: dirección IP y hora, solo para seguridad y prevención de spam.',
            'De dónde viene tu solicitud: la página de nuestra web en la que estabas antes del formulario y el botón que pulsaste. Si aceptaste la analítica en el banner de cookies, también la primera página de tu visita, las páginas que viste y la web o el anuncio que te trajo. Lo usamos para saber qué páginas y anuncios funcionan.',
            'Un recuento anónimo de clics en nuestros enlaces de WhatsApp, teléfono y correo, por página. No guarda la dirección IP ni nada que te identifique.',
            'Si nos llamas o escribes por WhatsApp, tratamos los datos de contacto que compartas para poder responderte.',
            'Nada más: datos identificativos y de contacto. Nunca pedimos datos sensibles como salud, creencias o números de documento, así que no nos los envíes.',
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
          p: [
            'Indícanos qué derecho quieres ejercer y cómo contactarte. Respondemos en el plazo de un mes. No tomamos decisiones automatizadas sobre ti ni elaboramos perfiles.',
          ],
        },
        {
          h: 'Menores',
          p: [
            'Esta web y nuestros servicios se dirigen a personas adultas. En España hay que tener 14 años o más para consentir el uso de los datos propios, por lo que no recogemos conscientemente datos de menores de esa edad: debe contactarnos su padre, madre o tutor.',
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
            'La web se sirve exclusivamente por HTTPS, de modo que lo que envías viaja cifrado. Los envíos del formulario se guardan en sistemas protegidos con contraseña y acceso restringido, accesibles solo al titular del negocio.',
            'Ningún sistema es totalmente seguro. Si un incidente de seguridad pusiera en riesgo tus datos, te lo comunicaríamos a ti y a la autoridad de control sin dilación indebida, como exige la ley.',
          ],
        },
        {
          h: 'Cambios',
          p: [
            'Podemos actualizar esta política si cambian la web, nuestros proveedores o la ley. La versión vigente es siempre la de esta página, con la fecha del último cambio arriba.',
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
            '<strong>aero-journey</strong> (session storage) — remembers the first page of your visit, the pages you viewed and the website or advert that brought you, so a quote request can show where it came from. Deleted when you close the tab.',
          ],
        },
        {
          h: 'Third-party content (only with your consent)',
          ul: [
            'Google reviews widget (served via Elfsight) and the embedded Google Map — when loaded, Google may set its own cookies under its own policies. Until you accept, the widget stays blocked and the map shows a button instead: it loads only if you press it.',
          ],
        },
        {
          h: 'Changing your mind',
          p: [
            'You can change or withdraw your consent at any time: reopen the banner via the "Cookie settings" link in the footer, or delete cookies and site data in your browser settings (look for "Clear browsing data" / "Site settings").',
          ],
        },
        {
          h: 'Blocking or deleting cookies in your browser',
          p: [
            'You can also block or delete cookies and site data in your browser. The steps differ by browser: <a href="https://support.google.com/chrome/answer/95647" rel="noopener" target="_blank">Chrome</a>, <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" rel="noopener" target="_blank">Safari</a>, <a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" rel="noopener" target="_blank">Firefox</a>, <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" rel="noopener" target="_blank">Edge</a>. The site keeps working without them; you will simply be asked about cookies again.',
          ],
        },
        {
          h: 'Social networks and outside links',
          p: [
            'Our links to Google, Instagram, Facebook and WhatsApp are plain links. Those services set nothing on your device from this site; once you open them, their own cookie and privacy policies apply.',
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
            '<strong>aero-journey</strong> (almacenamiento de sesión) — recuerda la primera página de tu visita, las páginas que has visto y la web o el anuncio que te trajo, para que una solicitud de presupuesto indique de dónde viene. Se borra al cerrar la pestaña.',
          ],
        },
        {
          h: 'Contenido de terceros (solo con tu consentimiento)',
          ul: [
            'El widget de reseñas de Google (servido por Elfsight) y el mapa de Google incrustado — al cargarse, Google puede instalar sus propias cookies según sus políticas. Hasta que aceptes, el widget queda bloqueado y el mapa muestra un botón: solo se carga si lo pulsas.',
          ],
        },
        {
          h: 'Cambiar de opinión',
          p: [
            'Puedes cambiar o retirar tu consentimiento en cualquier momento: reabre el banner desde el enlace «Configuración de cookies» del pie de página, o borra las cookies y datos del sitio en los ajustes de tu navegador («Borrar datos de navegación» / «Configuración de sitios»).',
          ],
        },
        {
          h: 'Bloquear o borrar cookies en tu navegador',
          p: [
            'También puedes bloquear o borrar las cookies y los datos del sitio desde tu navegador. Los pasos cambian según el navegador: <a href="https://support.google.com/chrome/answer/95647" rel="noopener" target="_blank">Chrome</a>, <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" rel="noopener" target="_blank">Safari</a>, <a href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox" rel="noopener" target="_blank">Firefox</a>, <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" rel="noopener" target="_blank">Edge</a>. La web sigue funcionando sin ellas; simplemente volveremos a preguntarte por las cookies.',
          ],
        },
        {
          h: 'Redes sociales y enlaces externos',
          p: [
            'Nuestros enlaces a Google, Instagram, Facebook y WhatsApp son enlaces normales. Esos servicios no instalan nada en tu dispositivo desde esta web; cuando los abres, se aplican sus propias políticas de cookies y privacidad.',
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
            'Owner: Grigore Camendo, self-employed professional (autónomo).',
            'NIE: Y9274595C.',
            'Registered address: C. Zaragoza, 03190 Pilar de la Horadada, Alicante, Spain.',
            'Email: {EMAIL} · Phone / WhatsApp: {PHONE}.',
            'Activity: installation, repair, maintenance and cleaning of air-conditioning systems; ventilation. Certified for the handling of fluorinated gases.',
          ],
        },
        {
          h: 'Purpose of the site',
          p: [
            'This website presents the services offered by {NAME} on the Costa Blanca and lets visitors request a quote by form, phone or WhatsApp. Prices shown in offers are indicative and confirmed in the individual quote.',
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
            'Titular: Grigore Camendo, profesional autónomo.',
            'NIE: Y9274595C.',
            'Domicilio: C. Zaragoza, 03190 Pilar de la Horadada, Alicante, España.',
            'Correo: {EMAIL} · Teléfono / WhatsApp: {PHONE}.',
            'Actividad: instalación, reparación, mantenimiento y limpieza de sistemas de aire acondicionado; ventilación. Certificado para la manipulación de gases fluorados.',
          ],
        },
        {
          h: 'Objeto del sitio',
          p: [
            'Esta web presenta los servicios que ofrece {NAME} en la Costa Blanca y permite a los visitantes solicitar presupuesto por formulario, teléfono o WhatsApp. Los precios mostrados en las ofertas son orientativos y se confirman en el presupuesto individual.',
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
