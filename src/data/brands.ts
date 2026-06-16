import type { Locale } from '../config';

interface BrandCopy {
  intro: string;
  why: string;
}

export interface Brand {
  slug: string;
  name: string;
  en: BrandCopy;
  es: BrandCopy;
}

/**
 * Brands we install and service (owner-confirmed, John 2026-06-14):
 * Mitsubishi Electric, Panasonic, LG, Giatsu, Haier, Samsung, Gree.
 * No official dealership — we don't claim "official installer". Logos (SVG) TBD.
 */
export const BRANDS: Brand[] = [
  {
    slug: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    en: {
      intro: 'Mitsubishi Electric is renowned for durable, premium air conditioning with excellent build quality.',
      why: 'A great long-term investment for homes that want top reliability and quiet comfort. We install and service the full range.',
    },
    es: {
      intro: 'Mitsubishi Electric es reconocida por sus equipos de aire acondicionado duraderos y de gama alta, con un acabado excelente.',
      why: 'Una gran inversión a largo plazo para quien busca máxima fiabilidad y confort silencioso. Instalamos y reparamos toda la gama.',
    },
  },
  {
    slug: 'panasonic',
    name: 'Panasonic',
    en: {
      intro: 'Panasonic air conditioning is known for clean-air technology and dependable performance.',
      why: 'A solid all-round choice with a focus on air quality. We supply, install and maintain Panasonic systems.',
    },
    es: {
      intro: 'El aire acondicionado Panasonic destaca por su tecnología de aire limpio y su rendimiento fiable.',
      why: 'Una opción sólida y equilibrada, centrada en la calidad del aire. Suministramos, instalamos y mantenemos sistemas Panasonic.',
    },
  },
  {
    slug: 'lg',
    name: 'LG',
    en: {
      intro: 'LG offers modern, feature-rich air conditioning with sleek designs and smart controls.',
      why: 'Good value with strong efficiency and Wi-Fi features. We fit and service LG units throughout the area.',
    },
    es: {
      intro: 'LG ofrece equipos de aire acondicionado modernos y completos, con diseños elegantes y control inteligente.',
      why: 'Buena relación calidad-precio, con buena eficiencia y funciones Wi-Fi. Instalamos y reparamos equipos LG en toda la zona.',
    },
  },
  {
    slug: 'giatsu',
    name: 'Giatsu',
    en: {
      intro: 'Giatsu offers excellent value air conditioning that is popular across Spain.',
      why: 'A budget-friendly way to get efficient A+++ cooling — often featured in our seasonal offers. We install and service Giatsu units.',
    },
    es: {
      intro: 'Giatsu ofrece aire acondicionado con una excelente relación calidad-precio, muy popular en España.',
      why: 'Una forma económica de conseguir refrigeración eficiente A+++ — habitual en nuestras ofertas. Instalamos y reparamos equipos Giatsu.',
    },
  },
  {
    slug: 'haier',
    name: 'Haier',
    en: {
      intro: 'Haier is one of the world’s largest appliance makers, with a wide, well-priced air conditioning range.',
      why: 'Reliable, efficient units at a competitive price. We supply, install and service the Haier range.',
    },
    es: {
      intro: 'Haier es uno de los mayores fabricantes de electrodomésticos del mundo, con una amplia gama de aire acondicionado a buen precio.',
      why: 'Equipos fiables y eficientes a un precio competitivo. Suministramos, instalamos y reparamos la gama Haier.',
    },
  },
  {
    slug: 'samsung',
    name: 'Samsung',
    en: {
      intro: 'Samsung air conditioning combines striking design with features like Wind-Free comfort.',
      why: 'A great pick if you want a stylish unit with even, draught-free cooling. We install and service Samsung systems.',
    },
    es: {
      intro: 'El aire acondicionado Samsung combina un diseño llamativo con funciones como la climatización Wind-Free.',
      why: 'Ideal si quieres un equipo elegante con un frío uniforme y sin corrientes. Instalamos y reparamos sistemas Samsung.',
    },
  },
  {
    slug: 'gree',
    name: 'Gree',
    en: {
      intro: 'Gree is the world’s largest dedicated air conditioning manufacturer, known for great value.',
      why: 'Dependable cooling at a sharp price. We supply, install and service Gree units across the Costa Blanca and Costa Cálida.',
    },
    es: {
      intro: 'Gree es el mayor fabricante del mundo dedicado al aire acondicionado, conocido por su buena relación calidad-precio.',
      why: 'Frío fiable a un precio ajustado. Suministramos, instalamos y reparamos equipos Gree en la Costa Blanca y la Costa Cálida.',
    },
  },
];
