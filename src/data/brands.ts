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
 * Brands we install and service (docs/05 §3.6). Copy is generic-true; official
 * partnership/dealer status to confirm before claiming "official installer" (D2).
 * Brand logos (SVG) to be added once usage rights are confirmed.
 */
export const BRANDS: Brand[] = [
  {
    slug: 'daikin',
    name: 'Daikin',
    en: {
      intro: 'Daikin is one of the world’s leading air conditioning makers, known for reliable, highly efficient split systems.',
      why: 'A popular choice for quiet operation and strong energy ratings. We supply, install and service the full Daikin range across the Costa Blanca.',
    },
    es: {
      intro: 'Daikin es uno de los mayores fabricantes de aire acondicionado del mundo, conocido por sus splits fiables y muy eficientes.',
      why: 'Una opción muy popular por su funcionamiento silencioso y su buena eficiencia energética. Suministramos, instalamos y reparamos toda la gama Daikin en la Costa Blanca.',
    },
  },
  {
    slug: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    en: {
      intro: 'Mitsubishi Electric is renowned for durable, premium air conditioning with excellent build quality.',
      why: 'A great long-term investment for homes that want top reliability and comfort. We install and service the Mitsubishi Electric range.',
    },
    es: {
      intro: 'Mitsubishi Electric es reconocida por sus equipos de aire acondicionado duraderos y de gama alta, con un acabado excelente.',
      why: 'Una gran inversión a largo plazo para hogares que buscan máxima fiabilidad y confort. Instalamos y reparamos la gama Mitsubishi Electric.',
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
    slug: 'panasonic',
    name: 'Panasonic',
    en: {
      intro: 'Panasonic air conditioning is known for clean-air technology and dependable performance.',
      why: 'A solid all-round choice, with models that focus on air quality. We supply, install and maintain Panasonic systems.',
    },
    es: {
      intro: 'El aire acondicionado Panasonic destaca por su tecnología de aire limpio y su rendimiento fiable.',
      why: 'Una opción sólida y equilibrada, con modelos centrados en la calidad del aire. Suministramos, instalamos y mantenemos sistemas Panasonic.',
    },
  },
  {
    slug: 'giatsu',
    name: 'Giatsu',
    en: {
      intro: 'Giatsu offers excellent value air conditioning that’s popular across Spain.',
      why: 'A budget-friendly way to get efficient A+++ cooling — featured in our seasonal offers. We install and service Giatsu units.',
    },
    es: {
      intro: 'Giatsu ofrece aire acondicionado con una excelente relación calidad-precio, muy popular en España.',
      why: 'Una forma económica de conseguir refrigeración eficiente A+++ — presente en nuestras ofertas de temporada. Instalamos y reparamos equipos Giatsu.',
    },
  },
];
