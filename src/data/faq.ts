import type { Locale } from '../config';

export interface Faq {
  q: string;
  a: string;
}

/**
 * FAQ, based on the owner's real customer questions plus the Nov 2026 notes
 * (team, Costa Blanca, reply within the hour). Direct Q→A is AEO gold (docs/06 §3).
 */
export const FAQ: Record<Locale, Faq[]> = {
  en: [
    { q: 'How quickly will you reply?', a: 'Within the hour during working hours, by phone or WhatsApp.' },
    { q: 'How soon can you install?', a: 'Usually within 24 to 72 hours of your request, depending on the season. In peak summer it can take a little longer, so ask us for the soonest slot.' },
    { q: 'What guarantee do you give?', a: 'A 3-year guarantee on our installation work, plus the manufacturer’s 3-year warranty on the equipment.' },
    { q: 'Can you install a unit I bought myself?', a: 'Yes. We fit units you already bought, as well as supplying new ones.' },
    { q: 'Do you cover my area?', a: 'We work across the Costa Blanca, including Torrevieja, Orihuela Costa, Pilar de la Horadada, Guardamar and 40+ towns. Not sure if we reach you? Just ask on WhatsApp.' },
    { q: 'How much does it cost?', a: 'AC cleaning starts from €50. Installation and repairs are quoted after a quick assessment, and the quote is always clear, free and without obligation.' },
  ],
  es: [
    { q: '¿Cuánto tardáis en responder?', a: 'Menos de una hora en horario laboral, por teléfono o WhatsApp.' },
    { q: '¿En cuánto tiempo instaláis?', a: 'Normalmente entre 24 y 72 horas desde tu solicitud, según la temporada. En pleno verano puede ser algo más, pregúntanos por la cita más próxima.' },
    { q: '¿Qué garantía dais?', a: '3 años de garantía en nuestra instalación, más los 3 años de garantía del fabricante en el equipo.' },
    { q: '¿Podéis instalar un equipo que he comprado yo?', a: 'Sí. Instalamos equipos que ya hayas comprado, además de suministrar equipos nuevos.' },
    { q: '¿Trabajáis en mi zona?', a: 'Trabajamos en toda la Costa Blanca, incluidas Torrevieja, Orihuela Costa, Pilar de la Horadada, Guardamar y más de 40 localidades. ¿No sabes si llegamos? Pregúntanos por WhatsApp.' },
    { q: '¿Cuánto cuesta?', a: 'La limpieza de aire acondicionado desde 50 €. La instalación y las reparaciones se presupuestan tras una breve valoración, y el presupuesto siempre es claro, gratuito y sin compromiso.' },
  ],
};

export interface FaqGroup {
  title: string;
  items: Faq[];
}

/** Grouped FAQ for the full /faq page (docs/05 §3.8). Owner-confirmed answers. */
export const FAQ_GROUPS: Record<Locale, FaqGroup[]> = {
  en: [
    {
      title: 'General',
      items: [
        { q: 'Do you cover my area?', a: 'We work across the Costa Blanca, including Torrevieja, Orihuela Costa, Pilar de la Horadada, Guardamar and 40+ towns. Not sure if we reach you? Just ask on WhatsApp.' },
        { q: 'How quickly will you reply?', a: 'Within the hour during working hours, by phone or WhatsApp.' },
        { q: 'Who comes to my home?', a: 'The Aerocomfort team of air conditioning specialists. We work in English and Spanish.' },
        { q: 'Do you work with businesses?', a: 'Yes. As well as homes, we work with restaurants and small businesses.' },
        { q: 'Do you install ventilation?', a: 'Yes, we also fit ventilation systems. We don’t work on commercial refrigeration.' },
        { q: 'Which brands do you work with?', a: 'We install and service Mitsubishi Electric, Daikin, Panasonic, Fujitsu, LG, Giatsu, Haier, Samsung and Gree, and repair all major brands.' },
        { q: 'Can you recommend which unit to buy?', a: 'Yes. Tell us your room size and budget and we’ll recommend the right unit, with no pressure to spend more.' },
        { q: 'Do you speak English?', a: 'Yes, we work in both English and Spanish.' },
      ],
    },
    {
      title: 'Installation',
      items: [
        { q: 'What is the waiting time for an installation?', a: 'Usually 24 to 72 hours from your request, depending on the season.' },
        { q: 'Can you install a unit I bought myself?', a: 'Yes, we fit units you already bought as well as units we supply.' },
        { q: 'Do you offer pre-installation (preinstalación)?', a: 'Yes. During a build or reform we can run the pipework and cabling in advance, so the unit goes in later cleanly and without mess.' },
        { q: 'How much does installation cost?', a: 'It depends on the unit and the property. We give you a clear, free quote after a quick assessment.' },
      ],
    },
    {
      title: 'Repair & maintenance',
      items: [
        { q: 'My AC isn’t cooling. Can you help?', a: 'Yes. We fix the most common faults on any brand: not cooling, the outdoor unit not running, no response to the remote, error codes, leaks and a noisy outdoor unit.' },
        { q: 'How often should AC be serviced?', a: 'Once a year is ideal, usually before the summer. It keeps the unit efficient and makes a breakdown less likely.' },
        { q: 'How much is a cleaning or service?', a: 'AC cleaning starts from €50. A repair is quoted after we diagnose the fault.' },
      ],
    },
    {
      title: 'Pricing & payment',
      items: [
        { q: 'Are quotes free?', a: 'Yes, every quote is clear and free, with no obligation.' },
        { q: 'What guarantee do you give?', a: '3 years on our installation work, plus the manufacturer’s 3-year warranty on the equipment.' },
        { q: 'How can I pay?', a: 'Card, bank transfer or cash. We don’t offer instalment plans.' },
      ],
    },
  ],
  es: [
    {
      title: 'General',
      items: [
        { q: '¿Trabajáis en mi zona?', a: 'Trabajamos en toda la Costa Blanca, incluidas Torrevieja, Orihuela Costa, Pilar de la Horadada, Guardamar y más de 40 localidades. ¿No sabes si llegamos? Pregúntanos por WhatsApp.' },
        { q: '¿Cuánto tardáis en responder?', a: 'Menos de una hora en horario laboral, por teléfono o WhatsApp.' },
        { q: '¿Quién viene a mi casa?', a: 'El equipo de especialistas en aire acondicionado de Aerocomfort. Trabajamos en español e inglés.' },
        { q: '¿Trabajáis con negocios?', a: 'Sí. Además de viviendas, trabajamos con restaurantes y pequeños negocios.' },
        { q: '¿Instaláis ventilación?', a: 'Sí, también instalamos sistemas de ventilación. No trabajamos con refrigeración comercial.' },
        { q: '¿Con qué marcas trabajáis?', a: 'Instalamos y mantenemos Mitsubishi Electric, Daikin, Panasonic, Fujitsu, LG, Giatsu, Haier, Samsung y Gree, y reparamos todas las marcas principales.' },
        { q: '¿Podéis recomendarme qué equipo comprar?', a: 'Sí. Dinos el tamaño de la estancia y tu presupuesto y te recomendamos el equipo adecuado, sin presionarte a gastar de más.' },
        { q: '¿Habláis inglés?', a: 'Sí, trabajamos en español e inglés.' },
      ],
    },
    {
      title: 'Instalación',
      items: [
        { q: '¿Cuál es el plazo para una instalación?', a: 'Normalmente entre 24 y 72 horas desde tu solicitud, según la temporada.' },
        { q: '¿Podéis instalar un equipo que he comprado yo?', a: 'Sí, instalamos los equipos que ya hayas comprado además de los que suministramos nosotros.' },
        { q: '¿Hacéis preinstalación?', a: 'Sí. Durante una obra o reforma dejamos hecha la tubería y el cableado, para colocar después el equipo limpiamente y sin destrozos.' },
        { q: '¿Cuánto cuesta la instalación?', a: 'Depende del equipo y de la vivienda. Te damos un presupuesto claro y gratuito tras una breve valoración.' },
      ],
    },
    {
      title: 'Reparación y mantenimiento',
      items: [
        { q: 'Mi aire no enfría, ¿podéis ayudarme?', a: 'Sí. Resolvemos las averías más habituales en cualquier marca: no enfría, la unidad exterior no arranca, no responde al mando, códigos de error, fugas y ruido en la unidad exterior.' },
        { q: '¿Cada cuánto hay que hacer el mantenimiento?', a: 'Una vez al año es lo ideal, normalmente antes del verano. Mantiene el equipo eficiente y reduce el riesgo de avería.' },
        { q: '¿Cuánto cuesta una limpieza o mantenimiento?', a: 'La limpieza de aire acondicionado desde 50 €. La reparación se presupuesta tras diagnosticar la avería.' },
      ],
    },
    {
      title: 'Precios y pago',
      items: [
        { q: '¿Los presupuestos son gratis?', a: 'Sí, cada presupuesto es claro y gratuito, sin compromiso.' },
        { q: '¿Qué garantía dais?', a: '3 años en nuestra instalación, más los 3 años de garantía del fabricante en el equipo.' },
        { q: '¿Cómo puedo pagar?', a: 'Tarjeta, transferencia o efectivo. No ofrecemos pago a plazos.' },
      ],
    },
  ],
};
