import type { Locale } from '../config';

interface AreaCopy {
  name: string;
  /** Short line for the hub card + page intro. */
  intro: string;
  /** 1–2 paragraphs of genuinely local context for the area page (unique, not cloned). */
  body: string[];
}

export interface Area {
  slug: string; // same in EN/ES (place names aren't translated)
  en: AreaCopy;
  es: AreaCopy;
}

/**
 * Seed service areas with UNIQUE per-zone copy (docs/05 §3.5 warns against clones).
 * Expand the list and refine local detail with the owner's exact zones (D4).
 */
export const AREAS: Area[] = [
  {
    slug: 'torrevieja',
    en: {
      name: 'Torrevieja',
      intro: 'Air conditioning installation, repair and maintenance throughout Torrevieja.',
      body: [
        'Torrevieja’s long, hot summers and dense apartment blocks make reliable air conditioning essential. We install, repair, clean and service AC across the town and its urbanisations — from the centre and the port to Los Balcones, La Mata and Aguas Nuevas.',
        'Whether you need a new split fitted in a holiday apartment or a quick repair before the heat peaks, we work locally and respond fast.',
      ],
    },
    es: {
      name: 'Torrevieja',
      intro: 'Instalación, reparación y mantenimiento de aire acondicionado en todo Torrevieja.',
      body: [
        'Los veranos largos y calurosos de Torrevieja y sus bloques de apartamentos hacen imprescindible un buen aire acondicionado. Instalamos, reparamos, limpiamos y mantenemos equipos en toda la ciudad y sus urbanizaciones — del centro y el puerto a Los Balcones, La Mata y Aguas Nuevas.',
        'Tanto si necesitas instalar un split nuevo en un apartamento como una reparación rápida antes del pico de calor, trabajamos en la zona y respondemos rápido.',
      ],
    },
  },
  {
    slug: 'orihuela-costa',
    en: {
      name: 'Orihuela Costa',
      intro: 'Local AC services across Orihuela Costa and its urbanisations.',
      body: [
        'From Playa Flamenca and La Zenia to Cabo Roig, Villamartín and Punta Prima, Orihuela Costa is full of villas and townhouses where good air conditioning makes the difference. We supply and install efficient units and keep existing systems running cleanly.',
        'We know the area’s communities well and can advise on the right unit for apartments, bungalows and detached villas alike.',
      ],
    },
    es: {
      name: 'Orihuela Costa',
      intro: 'Servicios locales de aire acondicionado en Orihuela Costa y sus urbanizaciones.',
      body: [
        'De Playa Flamenca y La Zenia a Cabo Roig, Villamartín y Punta Prima, Orihuela Costa está llena de villas y adosados donde un buen aire acondicionado marca la diferencia. Suministramos e instalamos equipos eficientes y mantenemos los sistemas existentes en perfecto estado.',
        'Conocemos bien las comunidades de la zona y te asesoramos sobre el equipo adecuado para apartamentos, bungalós y villas.',
      ],
    },
  },
  {
    slug: 'alicante',
    en: {
      name: 'Alicante',
      intro: 'Air conditioning for homes and businesses across Alicante city.',
      body: [
        'In the city of Alicante we install and service air conditioning for flats, offices and shops — from the centre and Playa de San Juan to the surrounding neighbourhoods. Efficient cooling matters all summer, and we help you get it sized and fitted right.',
        'For businesses we can advise on multi-split systems to cool several rooms cleanly and economically.',
      ],
    },
    es: {
      name: 'Alicante',
      intro: 'Aire acondicionado para hogares y negocios en la ciudad de Alicante.',
      body: [
        'En la ciudad de Alicante instalamos y reparamos aire acondicionado para pisos, oficinas y comercios — del centro y la Playa de San Juan a los barrios de alrededor. El frío eficiente importa todo el verano, y te ayudamos a dimensionarlo e instalarlo bien.',
        'Para negocios te asesoramos sobre sistemas multisplit para climatizar varias estancias de forma limpia y económica.',
      ],
    },
  },
  {
    slug: 'guardamar-del-segura',
    en: {
      name: 'Guardamar del Segura',
      intro: 'Installation and repair of air conditioning in Guardamar del Segura.',
      body: [
        'Guardamar’s pine-backed beaches and growing residential areas mean plenty of homes that need cooling through the long season. We fit new units and keep existing ones efficient, across the town and nearby El Raso and El Moncayo.',
        'Coastal air can be hard on outdoor units — regular cleaning and servicing keeps them running well for longer.',
      ],
    },
    es: {
      name: 'Guardamar del Segura',
      intro: 'Instalación y reparación de aire acondicionado en Guardamar del Segura.',
      body: [
        'Las playas con pinada de Guardamar y sus zonas residenciales en crecimiento suponen muchas viviendas que necesitan refrigeración durante la larga temporada. Instalamos equipos nuevos y mantenemos los existentes, en el pueblo y en El Raso y El Moncayo.',
        'El aire de costa castiga las unidades exteriores — una limpieza y mantenimiento regulares las mantienen en forma más tiempo.',
      ],
    },
  },
  {
    slug: 'ciudad-quesada',
    en: {
      name: 'Ciudad Quesada',
      intro: 'AC installation, servicing and repair in Ciudad Quesada and Rojales.',
      body: [
        'Ciudad Quesada and Rojales are popular with international residents, with many villas and bungalows fitted with split air conditioning. We install new systems, service and clean existing ones, and repair any brand.',
        'We speak English and Spanish, so getting a clear quote and a tidy job is straightforward.',
      ],
    },
    es: {
      name: 'Ciudad Quesada',
      intro: 'Instalación, mantenimiento y reparación de aire acondicionado en Ciudad Quesada y Rojales.',
      body: [
        'Ciudad Quesada y Rojales son muy populares entre residentes internacionales, con muchas villas y bungalós con aire acondicionado por split. Instalamos sistemas nuevos, mantenemos y limpiamos los existentes y reparamos cualquier marca.',
        'Hablamos español e inglés, así que conseguir un presupuesto claro y un trabajo limpio es muy fácil.',
      ],
    },
  },
  {
    slug: 'pilar-de-la-horadada',
    en: {
      name: 'Pilar de la Horadada',
      intro: 'Trusted air conditioning services in Pilar de la Horadada and Torre de la Horadada.',
      body: [
        'At the southern edge of the Costa Blanca, Pilar de la Horadada and the coastal Torre de la Horadada combine permanent homes and holiday properties — all needing dependable cooling in summer. We install, repair and maintain across the area.',
        'Booking ahead of the season avoids the rush; off-season is the ideal time for installations and servicing.',
      ],
    },
    es: {
      name: 'Pilar de la Horadada',
      intro: 'Servicios de aire acondicionado de confianza en Pilar de la Horadada y Torre de la Horadada.',
      body: [
        'En el extremo sur de la Costa Blanca, Pilar de la Horadada y la costera Torre de la Horadada combinan viviendas habituales y de vacaciones — todas necesitan una refrigeración fiable en verano. Instalamos, reparamos y mantenemos en toda la zona.',
        'Reservar antes de la temporada evita las prisas; la temporada baja es el momento ideal para instalaciones y mantenimientos.',
      ],
    },
  },
];
