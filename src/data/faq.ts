import type { Locale } from '../config';

export interface Faq {
  q: string;
  a: string;
}

/**
 * FAQ — based on the owner's real customer questions (John, 2026-06-14): coverage,
 * client-supplied units, install time (24–72h), guarantee (3+3), pre-installation,
 * cleaning from €50, brands, common repair faults. Direct Q→A is AEO gold (docs/06 §3).
 */
export const FAQ: Record<Locale, Faq[]> = {
  en: [
    {
      q: 'How soon can you install — what is the waiting time?',
      a: 'Typically 24–72 hours from your request, depending on the season. In peak summer it can be a little longer — ask us for the soonest slot.',
    },
    {
      q: 'What guarantee do you give?',
      a: 'A 3-year guarantee on our installation work, plus the manufacturer’s 3-year warranty on the equipment.',
    },
    {
      q: 'Can you install a unit I bought myself?',
      a: 'Yes — we’re happy to install air conditioning you’ve already purchased, as well as supply and fit new units.',
    },
    {
      q: 'Do you cover my area?',
      a: 'We cover the Costa Blanca and Costa Cálida — Torrevieja, Orihuela Costa, Guardamar, the Mar Menor, Mazarrón and 45+ towns. Not sure if we reach you? Just ask on WhatsApp.',
    },
    {
      q: 'How much does it cost?',
      a: 'AC cleaning starts from €50. Installation and repairs are quoted after a quick assessment — always a clear, free quote with no obligation.',
    },
  ],
  es: [
    {
      q: '¿En cuánto tiempo instaláis — cuál es el plazo?',
      a: 'Normalmente entre 24 y 72 horas desde tu solicitud, según la temporada. En pleno verano puede ser algo más — pregúntanos por la cita más próxima.',
    },
    {
      q: '¿Qué garantía dais?',
      a: '3 años de garantía en nuestra instalación, más la garantía del fabricante de 3 años sobre el equipo.',
    },
    {
      q: '¿Podéis instalar un equipo que he comprado yo?',
      a: 'Sí — instalamos equipos de aire acondicionado que ya hayas comprado, además de suministrar e instalar equipos nuevos.',
    },
    {
      q: '¿Trabajáis en mi zona?',
      a: 'Cubrimos la Costa Blanca y la Costa Cálida — Torrevieja, Orihuela Costa, Guardamar, el Mar Menor, Mazarrón y más de 45 localidades. ¿No sabes si llegamos? Pregúntanos por WhatsApp.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'La limpieza de aire acondicionado desde 50 €. La instalación y las reparaciones se presupuestan tras una breve valoración — siempre un presupuesto claro y gratuito, sin compromiso.',
    },
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
        { q: 'Do you cover my area?', a: 'We cover the Costa Blanca and Costa Cálida — Torrevieja, Orihuela Costa, Guardamar, the Mar Menor, Mazarrón and 45+ towns. Not sure if we reach you? Just ask on WhatsApp.' },
        { q: 'Which brands do you work with?', a: 'We install and service Mitsubishi Electric, Panasonic, LG, Giatsu, Haier, Samsung and Gree — and repair all major brands.' },
        { q: 'Can you recommend which unit to buy?', a: 'Yes — tell us your room size and budget and we’ll recommend the right unit, with no pressure to spend more.' },
        { q: 'Do you speak English?', a: 'Yes — we work in both English and Spanish.' },
      ],
    },
    {
      title: 'Installation',
      items: [
        { q: 'What is the waiting time for an installation?', a: 'Usually 24–72 hours from your request, depending on the season.' },
        { q: 'Can you install a unit I bought myself?', a: 'Yes — we install client-supplied equipment as well as units we supply.' },
        { q: 'Do you offer pre-installation (pre-instalación)?', a: 'Yes. During a build or reform we can run the pipework and cabling in advance, so the unit is fitted later cleanly and without mess.' },
        { q: 'How much does installation cost?', a: 'It’s quoted after a quick assessment of the unit and the property — always a clear, free quote.' },
      ],
    },
    {
      title: 'Repair & maintenance',
      items: [
        { q: 'My AC isn’t cooling — can you help?', a: 'Yes. We fix the most common faults: not cooling, the outdoor unit not running, no response to the remote, error codes, leaks and a noisy outdoor unit — on any brand.' },
        { q: 'How often should AC be serviced?', a: 'Once a year is ideal — an annual service keeps it efficient, healthy and reliable.' },
        { q: 'How much is a cleaning or service?', a: 'AC cleaning starts from €50. A repair is quoted after we diagnose the fault.' },
      ],
    },
    {
      title: 'Pricing & payment',
      items: [
        { q: 'Are quotes free?', a: 'Yes — every quote is clear and free, with no obligation.' },
        { q: 'What guarantee do you give?', a: '3 years on our installation work, plus the manufacturer’s 3-year warranty on the equipment.' },
        { q: 'How can I pay?', a: 'Card, bank transfer, Bizum or cash. (We don’t offer instalment plans.)' },
      ],
    },
  ],
  es: [
    {
      title: 'General',
      items: [
        { q: '¿Trabajáis en mi zona?', a: 'Cubrimos la Costa Blanca y la Costa Cálida — Torrevieja, Orihuela Costa, Guardamar, el Mar Menor, Mazarrón y más de 45 localidades. ¿No sabes si llegamos? Pregúntanos por WhatsApp.' },
        { q: '¿Con qué marcas trabajáis?', a: 'Instalamos y reparamos Mitsubishi Electric, Panasonic, LG, Giatsu, Haier, Samsung y Gree — y reparamos todas las marcas principales.' },
        { q: '¿Podéis recomendarme qué equipo comprar?', a: 'Sí — dinos el tamaño de la estancia y tu presupuesto y te recomendamos el equipo adecuado, sin presionarte a gastar de más.' },
        { q: '¿Habláis inglés?', a: 'Sí — trabajamos en español e inglés.' },
      ],
    },
    {
      title: 'Instalación',
      items: [
        { q: '¿Cuál es el plazo para una instalación?', a: 'Normalmente entre 24 y 72 horas desde tu solicitud, según la temporada.' },
        { q: '¿Podéis instalar un equipo que he comprado yo?', a: 'Sí — instalamos equipos aportados por el cliente además de los que suministramos nosotros.' },
        { q: '¿Hacéis preinstalación?', a: 'Sí. Durante una obra o reforma dejamos hecha la tubería y el cableado, para instalar después el equipo de forma limpia y sin destrozos.' },
        { q: '¿Cuánto cuesta la instalación?', a: 'Se presupuesta tras una breve valoración del equipo y la vivienda — siempre un presupuesto claro y gratuito.' },
      ],
    },
    {
      title: 'Reparación y mantenimiento',
      items: [
        { q: 'Mi aire no enfría, ¿podéis ayudar?', a: 'Sí. Resolvemos las averías más habituales: no enfría, la unidad exterior no arranca, no responde al mando, códigos de error, fugas y ruido en la unidad exterior — de cualquier marca.' },
        { q: '¿Cada cuánto hay que hacer el mantenimiento?', a: 'Una vez al año es lo ideal — un mantenimiento anual lo mantiene eficiente, sano y fiable.' },
        { q: '¿Cuánto cuesta una limpieza o mantenimiento?', a: 'La limpieza de aire acondicionado desde 50 €. La reparación se presupuesta tras diagnosticar la avería.' },
      ],
    },
    {
      title: 'Precios y pago',
      items: [
        { q: '¿Los presupuestos son gratis?', a: 'Sí — cada presupuesto es claro y gratuito, sin compromiso.' },
        { q: '¿Qué garantía dais?', a: '3 años en nuestra instalación, más la garantía del fabricante de 3 años sobre el equipo.' },
        { q: '¿Cómo puedo pagar?', a: 'Tarjeta, transferencia, Bizum o efectivo. (No ofrecemos pago a plazos.)' },
      ],
    },
  ],
};
