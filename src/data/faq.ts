import type { Locale } from '../config';

export interface Faq {
  q: string;
  a: string;
}

/**
 * Starter FAQ (docs/10 §3.8). Answers are safe, generic drafts — refine with the
 * owner's real specifics (waiting times, exact guarantee terms) from John (E1).
 * Direct Q→A is also AEO gold for LLM agents (docs/06 §3).
 */
export const FAQ: Record<Locale, Faq[]> = {
  en: [
    {
      q: 'How much does AC installation cost?',
      a: 'It depends on the unit and the room, but we always give a clear, free quote before any work — no surprises. Seasonal supply offers start from €609.',
    },
    {
      q: 'How long does an installation take?',
      a: 'Most single-split installations are completed in a few hours, usually the same day.',
    },
    {
      q: 'Which brand should I choose?',
      a: 'We help you pick the right unit for your space and budget. We install and service Daikin, Mitsubishi Electric, LG, Panasonic and Giatsu.',
    },
    {
      q: 'Do you cover my area?',
      a: 'We work across the Costa Blanca — Torrevieja, Orihuela Costa, Alicante and 30+ towns. Not sure if we reach you? Just ask on WhatsApp.',
    },
    {
      q: 'Do you offer a guarantee?',
      a: 'Yes. Our installation work is guaranteed and your equipment carries the manufacturer warranty.',
    },
  ],
  es: [
    {
      q: '¿Cuánto cuesta instalar el aire acondicionado?',
      a: 'Depende del equipo y de la estancia, pero siempre damos un presupuesto claro y gratuito antes de empezar — sin sorpresas. Las ofertas de temporada desde 609 €.',
    },
    {
      q: '¿Cuánto tarda una instalación?',
      a: 'La mayoría de instalaciones de un split se completan en unas horas, normalmente el mismo día.',
    },
    {
      q: '¿Qué marca debo elegir?',
      a: 'Te ayudamos a elegir el equipo adecuado para tu espacio y presupuesto. Instalamos y reparamos Daikin, Mitsubishi Electric, LG, Panasonic y Giatsu.',
    },
    {
      q: '¿Trabajáis en mi zona?',
      a: 'Trabajamos en toda la Costa Blanca — Torrevieja, Orihuela Costa, Alicante y más de 30 localidades. ¿No sabes si llegamos? Pregúntanos por WhatsApp.',
    },
    {
      q: '¿Ofrecéis garantía?',
      a: 'Sí. Nuestro trabajo de instalación está garantizado y el equipo cuenta con la garantía del fabricante.',
    },
  ],
};

export interface FaqGroup {
  title: string;
  items: Faq[];
}

/** Grouped FAQ for the full /faq page (docs/05 §3.8). Drafts — refine with E1. */
export const FAQ_GROUPS: Record<Locale, FaqGroup[]> = {
  en: [
    {
      title: 'General',
      items: [
        { q: 'Do you cover my area?', a: 'We work across the Costa Blanca — Torrevieja, Orihuela Costa, Alicante and 30+ towns. Not sure if we reach you? Just ask on WhatsApp.' },
        { q: 'Which brands do you work with?', a: 'We install and service all major brands — Daikin, Mitsubishi Electric, LG, Panasonic, Giatsu and more.' },
        { q: 'Do you speak English?', a: 'Yes — we work in both English and Spanish.' },
      ],
    },
    {
      title: 'Installation',
      items: [
        { q: 'How much does installation cost?', a: 'We give a clear, free quote after a quick site visit. Seasonal supply offers start from €609.' },
        { q: 'How long does an installation take?', a: 'Most single-split installations are completed in a few hours, usually the same day.' },
        { q: 'Do you supply the unit or just install it?', a: 'Both — we can supply an A+++ unit from our seasonal offers or install one you already have.' },
      ],
    },
    {
      title: 'Repair & maintenance',
      items: [
        { q: "My AC isn't cooling — can you help?", a: 'Yes — we diagnose and fix cooling faults, leaks, noise and error codes on any brand.' },
        { q: 'How often should AC be serviced?', a: 'Once a year is ideal, usually before the summer season.' },
        { q: 'Do you repair all brands?', a: 'Yes — we repair and service all major brands.' },
      ],
    },
    {
      title: 'Pricing & guarantee',
      items: [
        { q: 'Are quotes free?', a: 'Yes — every quote is clear and free, with no obligation.' },
        { q: 'Do you offer a guarantee?', a: 'Yes. Our installation work is guaranteed and your equipment carries the manufacturer warranty.' },
      ],
    },
  ],
  es: [
    {
      title: 'General',
      items: [
        { q: '¿Trabajáis en mi zona?', a: 'Trabajamos en toda la Costa Blanca — Torrevieja, Orihuela Costa, Alicante y más de 30 localidades. ¿No sabes si llegamos? Pregúntanos por WhatsApp.' },
        { q: '¿Con qué marcas trabajáis?', a: 'Instalamos y reparamos todas las marcas principales — Daikin, Mitsubishi Electric, LG, Panasonic, Giatsu y más.' },
        { q: '¿Habláis inglés?', a: 'Sí — trabajamos en español e inglés.' },
      ],
    },
    {
      title: 'Instalación',
      items: [
        { q: '¿Cuánto cuesta la instalación?', a: 'Damos un presupuesto claro y gratuito tras una breve visita. Las ofertas de temporada desde 609 €.' },
        { q: '¿Cuánto tarda una instalación?', a: 'La mayoría de instalaciones de un split se completan en unas horas, normalmente el mismo día.' },
        { q: '¿Suministráis el equipo o solo lo instaláis?', a: 'Ambos — podemos suministrar un equipo A+++ de nuestras ofertas o instalar uno que ya tengas.' },
      ],
    },
    {
      title: 'Reparación y mantenimiento',
      items: [
        { q: 'Mi aire no enfría, ¿podéis ayudar?', a: 'Sí — diagnosticamos y reparamos fallos de refrigeración, fugas, ruidos y códigos de error de cualquier marca.' },
        { q: '¿Cada cuánto hay que hacer el mantenimiento?', a: 'Una vez al año es lo ideal, normalmente antes del verano.' },
        { q: '¿Reparáis todas las marcas?', a: 'Sí — reparamos y mantenemos todas las marcas principales.' },
      ],
    },
    {
      title: 'Precios y garantía',
      items: [
        { q: '¿Los presupuestos son gratis?', a: 'Sí — cada presupuesto es claro y gratuito, sin compromiso.' },
        { q: '¿Ofrecéis garantía?', a: 'Sí. Nuestro trabajo de instalación está garantizado y el equipo cuenta con la garantía del fabricante.' },
      ],
    },
  ],
};

