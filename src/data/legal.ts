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
 * Plain-language legal TEMPLATES (Spain: RGPD + LSSI-CE). DRAFTS — must be reviewed
 * and the company details (‹legal name / NIF / address›, C3) filled before launch.
 * {EMAIL}/{NAME} are substituted from business data in LegalBody.astro.
 */
export const LEGAL: Record<LegalKey, Record<Locale, LegalDoc>> = {
  privacy: {
    en: {
      title: 'Privacy Policy',
      intro: 'This template explains how {NAME} handles your personal data. Company details and specifics are to be confirmed before launch.',
      sections: [
        { h: 'Who we are', p: ['{NAME} (‹legal name / NIF — to confirm›) provides air conditioning services on the Costa Blanca, Spain. You can contact us at {EMAIL}.'] },
        { h: 'What we collect', p: ['When you contact us through this website, we collect only what you provide:'], ul: ['Your name', 'Your phone number', 'Whether that number uses WhatsApp', 'Any message you send'] },
        { h: 'Why we use it', p: ['We use this information solely to respond to your enquiry and to provide a quote or service. We never sell your data.'] },
        { h: 'Legal basis', p: ['We process your data on the basis of your consent, given when you submit the form.'] },
        { h: 'How long we keep it', p: ['We keep enquiry data only as long as needed to handle your request and our business records, then delete it.'] },
        { h: 'Who else processes it', p: ['Your data may be handled by our hosting and email providers solely to deliver your enquiry to us. They act on our instructions and do not use it for their own purposes.'] },
        { h: 'Your rights', p: ['You can ask to access, correct or delete your data, or withdraw your consent, at any time. To do so, email us at {EMAIL}. You may also complain to the Spanish Data Protection Agency (AEPD).'] },
        { h: 'Changes', p: ['We may update this policy; the current version is always shown on this page.'] },
      ],
    },
    es: {
      title: 'Política de Privacidad',
      intro: 'Esta plantilla explica cómo {NAME} trata tus datos personales. Los datos de empresa y detalles se confirmarán antes del lanzamiento.',
      sections: [
        { h: 'Quiénes somos', p: ['{NAME} (‹razón social / NIF — por confirmar›) presta servicios de aire acondicionado en la Costa Blanca, España. Puedes contactarnos en {EMAIL}.'] },
        { h: 'Qué datos recogemos', p: ['Cuando nos contactas a través de esta web, recogemos solo lo que nos facilitas:'], ul: ['Tu nombre', 'Tu número de teléfono', 'Si ese número usa WhatsApp', 'Cualquier mensaje que envíes'] },
        { h: 'Para qué los usamos', p: ['Usamos esta información únicamente para responder a tu solicitud y darte presupuesto o servicio. Nunca vendemos tus datos.'] },
        { h: 'Base legal', p: ['Tratamos tus datos sobre la base de tu consentimiento, otorgado al enviar el formulario.'] },
        { h: 'Cuánto los conservamos', p: ['Conservamos los datos de la solicitud solo el tiempo necesario para gestionarla y para nuestros registros, y después los eliminamos.'] },
        { h: 'Quién más los trata', p: ['Tus datos pueden ser tratados por nuestros proveedores de alojamiento y correo, únicamente para hacernos llegar tu solicitud. Actúan según nuestras instrucciones y no los usan para fines propios.'] },
        { h: 'Tus derechos', p: ['Puedes solicitar acceder, rectificar o suprimir tus datos, o retirar tu consentimiento, en cualquier momento, escribiendo a {EMAIL}. También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).'] },
        { h: 'Cambios', p: ['Podemos actualizar esta política; la versión vigente siempre se muestra en esta página.'] },
      ],
    },
  },
  cookies: {
    en: {
      title: 'Cookie Policy',
      intro: 'How {NAME} uses cookies on this website.',
      sections: [
        { h: 'About cookies', p: ['Cookies are small files stored on your device. We keep cookie use to a minimum.'] },
        { h: 'What we use', ul: ['Essential cookies needed for the site to work and remember your choices.', 'Analytics and advertising cookies — only with your consent — to understand traffic and measure our ads.'] },
        { h: 'Managing cookies', p: ['You can accept or reject non-essential cookies through our consent banner, and change your choice at any time in your browser settings.'] },
        { h: 'More information', p: ['For how we handle personal data, see our Privacy Policy.'] },
      ],
    },
    es: {
      title: 'Política de Cookies',
      intro: 'Cómo usa {NAME} las cookies en esta web.',
      sections: [
        { h: 'Sobre las cookies', p: ['Las cookies son pequeños archivos que se guardan en tu dispositivo. Usamos el mínimo de cookies.'] },
        { h: 'Qué usamos', ul: ['Cookies esenciales necesarias para que la web funcione y recuerde tus preferencias.', 'Cookies de analítica y publicidad — solo con tu consentimiento — para entender el tráfico y medir nuestros anuncios.'] },
        { h: 'Gestionar las cookies', p: ['Puedes aceptar o rechazar las cookies no esenciales mediante nuestro banner de consentimiento, y cambiar tu elección cuando quieras en los ajustes de tu navegador.'] },
        { h: 'Más información', p: ['Para saber cómo tratamos los datos personales, consulta nuestra Política de Privacidad.'] },
      ],
    },
  },
  legal: {
    en: {
      title: 'Legal Notice',
      intro: 'Legal information in compliance with Spanish Law 34/2002 (LSSI-CE). Company details to be confirmed before launch.',
      sections: [
        { h: 'Identity', ul: ['Owner: ‹legal name — to confirm›', 'NIF/CIF: ‹NIF — to confirm›', 'Address: ‹address — to confirm›', 'Email: {EMAIL}'] },
        { h: 'Purpose', p: ['This website presents the air conditioning services offered by {NAME} on the Costa Blanca and lets visitors request a quote.'] },
        { h: 'Use of the site', p: ['By using this site you agree to use it lawfully and not to misuse its content or contact forms.'] },
        { h: 'Liability', p: ['We take care to keep information accurate and the site available, but cannot guarantee it is free of errors or always accessible.'] },
        { h: 'Intellectual property', p: ["The site's content, design and brand belong to {NAME} unless stated otherwise."] },
        { h: 'Applicable law', p: ['This notice is governed by Spanish law.'] },
      ],
    },
    es: {
      title: 'Aviso Legal',
      intro: 'Información legal conforme a la Ley 34/2002 (LSSI-CE). Los datos de empresa se confirmarán antes del lanzamiento.',
      sections: [
        { h: 'Identidad', ul: ['Titular: ‹razón social — por confirmar›', 'NIF/CIF: ‹NIF — por confirmar›', 'Dirección: ‹dirección — por confirmar›', 'Correo: {EMAIL}'] },
        { h: 'Objeto', p: ['Esta web presenta los servicios de aire acondicionado que ofrece {NAME} en la Costa Blanca y permite a los visitantes solicitar presupuesto.'] },
        { h: 'Uso del sitio', p: ['Al usar esta web te comprometes a hacerlo de forma lícita y a no hacer un uso indebido de sus contenidos o formularios.'] },
        { h: 'Responsabilidad', p: ['Procuramos mantener la información actualizada y la web disponible, pero no podemos garantizar que esté libre de errores ni accesible en todo momento.'] },
        { h: 'Propiedad intelectual', p: ['Los contenidos, el diseño y la marca del sitio pertenecen a {NAME} salvo que se indique lo contrario.'] },
        { h: 'Legislación aplicable', p: ['Este aviso se rige por la legislación española.'] },
      ],
    },
  },
};
