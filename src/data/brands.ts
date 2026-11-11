import type { Locale } from '../config';

interface BrandCopy {
  intro: string;
  why: string;
}

export interface Brand {
  slug: string;
  name: string;
  /** Official manufacturer logo, served from /public/brands. Shown nominatively
   *  (we service these brands) — no dealership claim. SVG where available. */
  logo: string;
  en: BrandCopy;
  es: BrandCopy;
}

/**
 * Brands we install and service (owner-confirmed, 2026-06-14; Daikin and Fujitsu
 * added Nov 2026).
 * No official dealership — we don't claim "official installer".
 */
export const BRANDS: Brand[] = [
  {
    slug: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    logo: '/brands/mitsubishi-electric.svg',
    en: {
      intro: 'Mitsubishi Electric is a premium choice, known for quiet running and units that last.',
      why: 'A good fit if you plan to keep the unit for years and want quiet bedrooms. We install and service the range across the Costa Blanca.',
    },
    es: {
      intro: 'Mitsubishi Electric es una opción de gama alta, conocida por su funcionamiento silencioso y sus equipos duraderos.',
      why: 'Encaja si quieres un equipo para muchos años y dormitorios silenciosos. Instalamos y mantenemos la gama en toda la Costa Blanca.',
    },
  },
  {
    slug: 'daikin',
    name: 'Daikin',
    logo: '/brands/daikin.svg',
    en: {
      intro: 'Daikin is a Japanese air conditioning specialist, known for quiet, efficient units that last.',
      why: 'A strong choice if you want a premium unit with app control as standard. The Sensira is often in our seasonal offers, and we install and service the Daikin range.',
    },
    es: {
      intro: 'Daikin es un especialista japonés en climatización, conocido por sus equipos silenciosos, eficientes y duraderos.',
      why: 'Una buena elección si buscas un equipo de gama alta con control por app de serie. El Sensira suele estar en nuestras ofertas de temporada, e instalamos y mantenemos la gama Daikin.',
    },
  },
  {
    slug: 'panasonic',
    name: 'Panasonic',
    logo: '/brands/panasonic.svg',
    en: {
      intro: 'Panasonic is known for its clean-air technology and dependable everyday performance.',
      why: 'A sensible all-rounder, especially if air quality matters to you. We supply, install and service Panasonic systems.',
    },
    es: {
      intro: 'Panasonic destaca por su tecnología de aire limpio y su rendimiento fiable en el día a día.',
      why: 'Una opción equilibrada, sobre todo si te importa la calidad del aire. Suministramos, instalamos y mantenemos equipos Panasonic.',
    },
  },
  {
    slug: 'fujitsu',
    name: 'Fujitsu',
    logo: '/brands/fujitsu.svg',
    en: {
      intro: 'Fujitsu is a long-established Japanese brand with a reputation for reliable, quiet air conditioning.',
      why: 'A dependable option for bedrooms and living rooms alike. We install and service Fujitsu systems across the Costa Blanca.',
    },
    es: {
      intro: 'Fujitsu es una marca japonesa veterana, con fama de aire acondicionado fiable y silencioso.',
      why: 'Una opción de confianza tanto para dormitorios como para salones. Instalamos y mantenemos equipos Fujitsu en toda la Costa Blanca.',
    },
  },
  {
    slug: 'lg',
    name: 'LG',
    logo: '/brands/lg.svg',
    en: {
      intro: 'LG makes modern units with clean designs and Wi-Fi control from your phone.',
      why: 'Good value and efficient, and handy for holiday homes you want to cool before you arrive. We fit and service LG units across the Costa Blanca.',
    },
    es: {
      intro: 'LG fabrica equipos modernos, de diseño limpio y con control Wi-Fi desde el móvil.',
      why: 'Buena relación calidad-precio, eficiente y muy práctico en segundas residencias que quieres enfriar antes de llegar. Instalamos y mantenemos equipos LG en toda la Costa Blanca.',
    },
  },
  {
    slug: 'giatsu',
    name: 'Giatsu',
    logo: '/brands/giatsu.png',
    en: {
      intro: 'Giatsu offers good-value air conditioning that is popular across Spain.',
      why: 'An affordable way to get an efficient inverter unit, and often in our seasonal offers. We install and service Giatsu units.',
    },
    es: {
      intro: 'Giatsu ofrece aire acondicionado con buena relación calidad-precio, muy popular en España.',
      why: 'Una forma asequible de tener un equipo inverter eficiente, habitual en nuestras ofertas de temporada. Instalamos y mantenemos equipos Giatsu.',
    },
  },
  {
    slug: 'haier',
    name: 'Haier',
    logo: '/brands/haier.svg',
    en: {
      intro: 'Haier is one of the world’s largest appliance makers, with a wide, well-priced air conditioning range.',
      why: 'Efficient units at a competitive price, a good match for rentals and second homes. We supply, install and service the Haier range.',
    },
    es: {
      intro: 'Haier es uno de los mayores fabricantes de electrodomésticos del mundo, con una amplia gama de aire acondicionado a buen precio.',
      why: 'Equipos eficientes a un precio competitivo, muy adecuados para alquileres y segundas residencias. Suministramos, instalamos y mantenemos la gama Haier.',
    },
  },
  {
    slug: 'samsung',
    name: 'Samsung',
    logo: '/brands/samsung.svg',
    en: {
      intro: 'Samsung pairs a distinctive design with features like WindFree cooling.',
      why: 'Worth a look if cold draughts bother you, especially in bedrooms. We install and service Samsung systems.',
    },
    es: {
      intro: 'Samsung combina un diseño propio con funciones como la climatización WindFree.',
      why: 'Merece la pena si te molestan las corrientes de aire frío, sobre todo en dormitorios. Instalamos y mantenemos equipos Samsung.',
    },
  },
  {
    slug: 'gree',
    name: 'Gree',
    logo: '/brands/gree.svg',
    en: {
      intro: 'Gree is one of the world’s biggest air conditioning makers, known for good value.',
      why: 'Dependable cooling at a sharp price, if budget comes first. We supply, install and service Gree units across the Costa Blanca.',
    },
    es: {
      intro: 'Gree es uno de los mayores fabricantes de aire acondicionado del mundo, conocido por su buena relación calidad-precio.',
      why: 'Frío fiable a un precio ajustado, si lo primero es el presupuesto. Suministramos, instalamos y mantenemos equipos Gree en la Costa Blanca.',
    },
  },
];
