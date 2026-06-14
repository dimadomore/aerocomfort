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
