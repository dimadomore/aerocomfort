import type { Locale } from '../config';

interface AreaCopy {
  name: string;
  /** Short line for the hub card + page intro. */
  intro: string;
  /** 1–2 paragraphs of genuinely local context (unique per zone, not cloned). */
  body: string[];
}

export interface Area {
  slug: string; // same in EN/ES (place names aren't translated)
  en: AreaCopy;
  es: AreaCopy;
}

/**
 * Priority service-area pages — towns with the most demand get a dedicated page
 * with UNIQUE local copy (docs/05 §3.5 warns against clones). Every town we serve
 * is listed in AREA_GROUPS below; smaller localities are folded into a parent zone.
 * (Hybrid approach chosen by the owner, 2026-06-14.)
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
        'From Playa Flamenca and La Zenia to Cabo Roig, Villamartín, Campoamor, Mil Palmeras and Punta Prima, Orihuela Costa is full of villas and townhouses where good air conditioning makes the difference. We supply and install efficient units and keep existing systems running cleanly.',
        'We know the area’s communities well and can advise on the right unit for apartments, bungalows and detached villas alike.',
      ],
    },
    es: {
      name: 'Orihuela Costa',
      intro: 'Servicios locales de aire acondicionado en Orihuela Costa y sus urbanizaciones.',
      body: [
        'De Playa Flamenca y La Zenia a Cabo Roig, Villamartín, Campoamor, Mil Palmeras y Punta Prima, Orihuela Costa está llena de villas y adosados donde un buen aire acondicionado marca la diferencia. Suministramos e instalamos equipos eficientes y mantenemos los sistemas existentes en perfecto estado.',
        'Conocemos bien las comunidades de la zona y te asesoramos sobre el equipo adecuado para apartamentos, bungalós y villas.',
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
    slug: 'santa-pola',
    en: {
      name: 'Santa Pola',
      intro: 'Air conditioning installation, repair and maintenance across Santa Pola.',
      body: [
        'Santa Pola is a busy coastal town — fishing port, long beaches and plenty of holiday apartments — so reliable air conditioning is a must through the long summer. We install, repair, clean and service AC across the town and its urbanisations.',
        'Sea air is hard on outdoor units, so a regular clean and service keeps them efficient and trouble-free.',
      ],
    },
    es: {
      name: 'Santa Pola',
      intro: 'Instalación, reparación y mantenimiento de aire acondicionado en Santa Pola.',
      body: [
        'Santa Pola es un municipio costero con puerto pesquero, playas largas y muchos apartamentos de vacaciones — un buen aire acondicionado es imprescindible en el largo verano. Instalamos, reparamos, limpiamos y mantenemos equipos en el pueblo y sus urbanizaciones.',
        'El aire del mar castiga las unidades exteriores; una limpieza y un mantenimiento regulares las mantienen eficientes y sin averías.',
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
    slug: 'san-miguel-de-salinas',
    en: {
      name: 'San Miguel de Salinas',
      intro: 'Air conditioning installation, repair and maintenance in San Miguel de Salinas.',
      body: [
        'San Miguel de Salinas sits on the hills above Orihuela Costa, with a large international community and many villas and apartments. We install, repair and service air conditioning throughout the town and its urbanisations.',
        'Its inland position brings hot, still summers — we help you size and fit a unit that cools efficiently without driving up the bills.',
      ],
    },
    es: {
      name: 'San Miguel de Salinas',
      intro: 'Instalación, reparación y mantenimiento de aire acondicionado en San Miguel de Salinas.',
      body: [
        'San Miguel de Salinas se asienta en las lomas sobre Orihuela Costa, con una gran comunidad internacional y muchas villas y apartamentos. Instalamos, reparamos y mantenemos aire acondicionado en todo el municipio y sus urbanizaciones.',
        'Su ubicación interior trae veranos calurosos y sin brisa — te ayudamos a dimensionar e instalar un equipo que enfríe de forma eficiente sin disparar la factura.',
      ],
    },
  },
  {
    slug: 'almoradi',
    en: {
      name: 'Almoradí',
      intro: 'AC installation, repair and maintenance in Almoradí.',
      body: [
        'Almoradí is a lively inland town in the Vega Baja, where summer heat makes reliable air conditioning essential for homes and shops alike. We install, repair, clean and service all major brands.',
        'We work in English and Spanish and give a clear, free quote before any work.',
      ],
    },
    es: {
      name: 'Almoradí',
      intro: 'Instalación, reparación y mantenimiento de aire acondicionado en Almoradí.',
      body: [
        'Almoradí es un pueblo activo del interior de la Vega Baja, donde el calor del verano hace imprescindible un buen aire acondicionado en casas y comercios. Instalamos, reparamos, limpiamos y mantenemos todas las marcas.',
        'Trabajamos en español e inglés y damos un presupuesto claro y gratuito antes de empezar.',
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
  {
    slug: 'san-pedro-del-pinatar',
    en: {
      name: 'San Pedro del Pinatar',
      intro: 'Air conditioning across San Pedro del Pinatar and Lo Pagán.',
      body: [
        'On the northern edge of the Mar Menor, San Pedro del Pinatar and Lo Pagán are busy year-round and packed in summer — so dependable cooling matters. We install, repair, clean and service air conditioning across the area.',
        'Salt-laden coastal air is tough on outdoor units; regular servicing keeps them running well.',
      ],
    },
    es: {
      name: 'San Pedro del Pinatar',
      intro: 'Aire acondicionado en San Pedro del Pinatar y Lo Pagán.',
      body: [
        'En el extremo norte del Mar Menor, San Pedro del Pinatar y Lo Pagán tienen mucha actividad todo el año y se llenan en verano — la refrigeración fiable importa. Instalamos, reparamos, limpiamos y mantenemos equipos en toda la zona.',
        'El aire salino de la costa castiga las unidades exteriores; un mantenimiento regular las mantiene en forma.',
      ],
    },
  },
  {
    slug: 'san-javier',
    en: {
      name: 'San Javier',
      intro: 'Air conditioning in San Javier and Santiago de la Ribera.',
      body: [
        'San Javier and its seafront Santiago de la Ribera sit on the Mar Menor, with homes, apartments and businesses that rely on good air conditioning each summer. We install, repair, clean and service all brands.',
        'Coastal air is hard on equipment — a yearly clean and service keeps it efficient.',
      ],
    },
    es: {
      name: 'San Javier',
      intro: 'Aire acondicionado en San Javier y Santiago de la Ribera.',
      body: [
        'San Javier y su paseo marítimo de Santiago de la Ribera se asoman al Mar Menor, con viviendas, apartamentos y negocios que dependen de un buen aire acondicionado cada verano. Instalamos, reparamos, limpiamos y mantenemos todas las marcas.',
        'El aire de costa castiga los equipos — una limpieza y un mantenimiento anuales los mantienen eficientes.',
      ],
    },
  },
  {
    slug: 'los-alcazares',
    en: {
      name: 'Los Alcázares',
      intro: 'AC installation, repair and maintenance in Los Alcázares.',
      body: [
        'Los Alcázares is a popular Mar Menor resort town packed with holiday and permanent homes that all need cooling through the long Murcia summer. We supply, install and service air conditioning across the town.',
        'Book ahead of the season to avoid the rush — off-season is ideal for installs and servicing.',
      ],
    },
    es: {
      name: 'Los Alcázares',
      intro: 'Instalación, reparación y mantenimiento de aire acondicionado en Los Alcázares.',
      body: [
        'Los Alcázares es un popular municipio turístico del Mar Menor lleno de viviendas de vacaciones y habituales que necesitan refrigeración durante el largo verano murciano. Suministramos, instalamos y reparamos aire acondicionado en todo el municipio.',
        'Reserva antes de la temporada para evitar las prisas — la temporada baja es ideal para instalar y mantener.',
      ],
    },
  },
  {
    slug: 'torre-pacheco',
    en: {
      name: 'Torre Pacheco',
      intro: 'AC installation, repair and maintenance in Torre Pacheco.',
      body: [
        'Torre Pacheco is a busy inland Murcia town with hot, dry summers where air conditioning is a must for homes and businesses. We supply, install, repair and service all major brands.',
        'We give honest advice on the right unit for your space and a clear, free quote.',
      ],
    },
    es: {
      name: 'Torre Pacheco',
      intro: 'Instalación, reparación y mantenimiento de aire acondicionado en Torre Pacheco.',
      body: [
        'Torre Pacheco es un activo municipio del interior de Murcia con veranos calurosos y secos donde el aire acondicionado es imprescindible en casas y negocios. Suministramos, instalamos, reparamos y mantenemos todas las marcas.',
        'Te asesoramos con honestidad sobre el equipo adecuado y damos un presupuesto claro y gratuito.',
      ],
    },
  },
  {
    slug: 'la-manga',
    en: {
      name: 'La Manga del Mar Menor',
      intro: 'Air conditioning across La Manga del Mar Menor.',
      body: [
        'La Manga is a thin strip of apartments and holiday flats between the Mar Menor and the sea — and they all need efficient cooling in summer. We install, repair, clean and service air conditioning the length of La Manga.',
        'Sea air on both sides is tough on outdoor units, so regular cleaning really pays off here.',
      ],
    },
    es: {
      name: 'La Manga del Mar Menor',
      intro: 'Aire acondicionado en La Manga del Mar Menor.',
      body: [
        'La Manga es una estrecha franja de apartamentos y pisos de vacaciones entre el Mar Menor y el mar — y todos necesitan una refrigeración eficiente en verano. Instalamos, reparamos, limpiamos y mantenemos aire acondicionado a lo largo de toda La Manga.',
        'El aire marino por ambos lados castiga las unidades exteriores, así que aquí una limpieza regular merece mucho la pena.',
      ],
    },
  },
  {
    slug: 'mazarron',
    en: {
      name: 'Mazarrón',
      intro: 'AC installation, repair and maintenance in Mazarrón and Puerto de Mazarrón.',
      body: [
        'At the southern end of our coverage on the Costa Cálida, Mazarrón and its coastal Puerto de Mazarrón combine local homes and holiday properties needing reliable summer cooling. We install, repair, clean and service all major brands.',
        'We work in English and Spanish, with a clear, free quote before any job.',
      ],
    },
    es: {
      name: 'Mazarrón',
      intro: 'Instalación, reparación y mantenimiento de aire acondicionado en Mazarrón y Puerto de Mazarrón.',
      body: [
        'En el extremo sur de nuestra cobertura, en la Costa Cálida, Mazarrón y su costero Puerto de Mazarrón combinan viviendas locales y de vacaciones que necesitan una refrigeración fiable en verano. Instalamos, reparamos, limpiamos y mantenemos todas las marcas.',
        'Trabajamos en español e inglés, con un presupuesto claro y gratuito antes de cada trabajo.',
      ],
    },
  },
];

/**
 * Every town we serve, grouped by comarca, for the full coverage list on /areas.
 * `slug` links to a dedicated page (one of AREAS); the rest are served but folded
 * into the list / a parent zone. Owner's list (John, 2026-06-14).
 */
export interface AreaGroup {
  title: { en: string; es: string };
  towns: { name: string; slug?: string }[];
}

export const AREA_GROUPS: AreaGroup[] = [
  {
    title: { en: 'Costa Blanca South · Vega Baja', es: 'Costa Blanca Sur · Vega Baja' },
    towns: [
      { name: 'Torrevieja', slug: 'torrevieja' },
      { name: 'La Mata' },
      { name: 'Orihuela Costa', slug: 'orihuela-costa' },
      { name: 'La Zenia' },
      { name: 'Cabo Roig' },
      { name: 'Punta Prima' },
      { name: 'Villamartín' },
      { name: 'Dehesa de Campoamor' },
      { name: 'Mil Palmeras' },
      { name: 'Pilar de la Horadada', slug: 'pilar-de-la-horadada' },
      { name: 'Torre de la Horadada' },
      { name: 'Guardamar del Segura', slug: 'guardamar-del-segura' },
      { name: 'El Raso' },
      { name: 'La Marina' },
      { name: 'Santa Pola', slug: 'santa-pola' },
      { name: 'Ciudad Quesada', slug: 'ciudad-quesada' },
      { name: 'Rojales' },
      { name: 'San Miguel de Salinas', slug: 'san-miguel-de-salinas' },
      { name: 'Almoradí', slug: 'almoradi' },
      { name: 'San Fulgencio' },
      { name: 'Benijófar' },
      { name: 'Algorfa' },
      { name: 'Benejúzar' },
      { name: 'Jacarilla' },
      { name: 'Bigastro' },
      { name: 'Vistabella' },
      { name: 'Los Montesinos' },
      { name: 'Daya Nueva' },
      { name: 'Daya Vieja' },
    ],
  },
  {
    title: { en: 'Costa Cálida · Mar Menor · Murcia', es: 'Costa Cálida · Mar Menor · Murcia' },
    towns: [
      { name: 'San Pedro del Pinatar', slug: 'san-pedro-del-pinatar' },
      { name: 'Santiago de la Ribera' },
      { name: 'San Javier', slug: 'san-javier' },
      { name: 'Los Alcázares', slug: 'los-alcazares' },
      { name: 'Torre Pacheco', slug: 'torre-pacheco' },
      { name: 'Balsicas' },
      { name: 'Roldán' },
      { name: 'Gea y Truyols' },
      { name: 'La Tercia' },
      { name: 'El Algar' },
      { name: 'Los Urrutias' },
      { name: 'Playa Honda' },
      { name: 'La Manga del Mar Menor', slug: 'la-manga' },
      { name: 'Atamaría' },
      { name: 'Mazarrón', slug: 'mazarron' },
      { name: 'Puerto de Mazarrón' },
      { name: 'Mazarrón Country Club' },
    ],
  },
];
