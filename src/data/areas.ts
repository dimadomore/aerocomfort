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
  {
    slug: "la-mata",
    en: {
      name: "La Mata",
      intro: "Air conditioning installation, repair and maintenance in La Mata.",
      body: [
        "Sitting between Torrevieja’s salt lagoon and a long sandy beach, La Mata is a low-rise resort where seafront apartments and holiday lets bake through July and August. We fit new splits, recharge tired units and keep filters clean so the place stays cool the moment owners or guests arrive.",
        "The salty air off the dunes is hard on outdoor condensers here, so we pay special attention to corrosion when we service. Call us in English or Spanish — we’re local and turn jobs around quickly.",
      ],
    },
    es: {
      name: "La Mata",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en La Mata.",
      body: [
        "Entre la laguna salada de Torrevieja y una larga playa de arena, La Mata es un núcleo de baja altura donde los apartamentos de primera línea y los pisos de alquiler aguantan el calor de julio y agosto. Instalamos splits nuevos, recargamos equipos cansados y limpiamos los filtros para que todo esté fresco en cuanto llegan propietarios o huéspedes.",
        "El aire salino de las dunas castiga las unidades exteriores, así que cuidamos especialmente la corrosión en cada mantenimiento. Llámanos en inglés o español: somos de aquí y resolvemos rápido.",
      ],
    },
  },
  {
    slug: "la-zenia",
    en: {
      name: "La Zenia",
      intro: "Air conditioning installation, repair and maintenance across La Zenia.",
      body: [
        "La Zenia’s smart villas, the Boulevard shopping centre and its blue-flag coves draw a year-round international crowd, and most homes here rely on AC for both summer cooling and a bit of winter warmth. We install heat-pump splits, repair breakdowns and service multi-room systems in villas and townhouses alike.",
        "Whether it’s a holiday rental near the beach or a permanent family home off the Boulevard, we work locally and answer fast. Our team speaks English and Spanish, so there’s never any confusion over what your system needs.",
      ],
    },
    es: {
      name: "La Zenia",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en La Zenia.",
      body: [
        "Las villas modernas de La Zenia, el centro comercial Boulevard y sus calas con bandera azul atraen a un público internacional todo el año, y casi todas las casas dependen del aire para refrescar en verano y calentar algo en invierno. Instalamos splits con bomba de calor, reparamos averías y mantenemos sistemas multisplit tanto en villas como en adosados.",
        "Ya sea un alquiler vacacional junto a la playa o una vivienda familiar cerca del Boulevard, trabajamos en la zona y respondemos rápido. Nuestro equipo habla inglés y español, así que nunca habrá dudas sobre lo que necesita tu equipo.",
      ],
    },
  },
  {
    slug: "cabo-roig",
    en: {
      name: "Cabo Roig",
      intro: "Air conditioning installation, repair and maintenance in Cabo Roig.",
      body: [
        "Perched on cliffs above a busy marina and the Cabo Roig strip, this is villa-and-apartment territory where exposed seafront properties take the full force of the coastal sun. We install discreet splits and ducted systems, fix faults and clean coils so homes here cool quickly without driving up the electricity bill.",
        "Because outdoor units so close to the water corrode faster, our maintenance focuses on keeping them protected and efficient. Get in touch in English or Spanish for a fast, local visit.",
      ],
    },
    es: {
      name: "Cabo Roig",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Cabo Roig.",
      body: [
        "Asomado a los acantilados sobre un concurrido puerto deportivo y la zona del Cabo Roig, es terreno de villas y apartamentos donde las viviendas de primera línea reciben todo el sol de la costa. Instalamos splits discretos y sistemas por conductos, reparamos averías y limpiamos baterías para que las casas enfríen rápido sin disparar la factura de la luz.",
        "Como las unidades exteriores tan cerca del mar se corroen antes, nuestro mantenimiento se centra en protegerlas y mantenerlas eficientes. Contáctanos en inglés o español para una visita local y rápida.",
      ],
    },
  },
  {
    slug: "punta-prima",
    en: {
      name: "Punta Prima",
      intro: "Air conditioning installation, repair and maintenance throughout Punta Prima.",
      body: [
        "Punta Prima is a dense stretch of beachfront apartment blocks and resort complexes right on the Orihuela Costa shoreline, where summer occupancy is high and demand for reliable cooling peaks. We install splits in compact apartments, repair systems mid-season and carry out the cleaning that keeps communal blocks comfortable.",
        "We’re used to working around holiday-let schedules and community access here, fitting jobs in quickly between changeovers. Reach us in English or Spanish whenever the heat catches you out.",
      ],
    },
    es: {
      name: "Punta Prima",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Punta Prima.",
      body: [
        "Punta Prima es una franja densa de bloques de apartamentos y complejos turísticos junto al mar, en plena Orihuela Costa, con alta ocupación en verano y una gran demanda de refrigeración fiable. Instalamos splits en apartamentos compactos, reparamos equipos en plena temporada y hacemos la limpieza que mantiene cómodos los bloques comunitarios.",
        "Estamos acostumbrados a trabajar entre cambios de alquiler vacacional y accesos de comunidad, encajando los trabajos con rapidez. Llámanos en inglés o español cuando el calor te pille por sorpresa.",
      ],
    },
  },
  {
    slug: "villamartin",
    en: {
      name: "Villamartín",
      intro: "Air conditioning installation, repair and maintenance in Villamartín.",
      body: [
        "Built around one of the Costa Blanca’s best-known golf courses and the lively Villamartín Plaza, this is a settled community of villas and bungalows where many residents live all year. AC here does double duty — cooling through the long summers and warming on cooler winter evenings — so we install efficient heat pumps and keep them running with regular servicing.",
        "From a single bedroom unit to a full villa system, we repair, clean and maintain whatever you’ve got. We’re based locally, speak English and Spanish, and don’t keep you waiting.",
      ],
    },
    es: {
      name: "Villamartín",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Villamartín.",
      body: [
        "Levantada en torno a uno de los campos de golf más conocidos de la Costa Blanca y a la animada Villamartín Plaza, es una comunidad asentada de villas y bungalós donde muchos residentes viven todo el año. Aquí el aire trabaja doble — refresca durante los largos veranos y calienta en las tardes frías de invierno — por eso instalamos bombas de calor eficientes y las mantenemos a punto con revisiones periódicas.",
        "Desde una unidad para un dormitorio hasta el sistema completo de una villa, reparamos, limpiamos y mantenemos lo que tengas. Somos de la zona, hablamos inglés y español y no te hacemos esperar.",
      ],
    },
  },
  {
    slug: "dehesa-de-campoamor",
    en: {
      name: "Dehesa de Campoamor",
      intro: "Air conditioning installation, repair and maintenance in Dehesa de Campoamor.",
      body: [
        "One of the greener, more exclusive corners of the Orihuela Costa, Dehesa de Campoamor mixes pine-shaded villas, its little marina and a sheltered sandy beach. Larger detached homes here often need multi-zone systems, and we design, install and balance those so every room stays comfortable.",
        "We also handle repairs and seasonal servicing to keep premium equipment running efficiently year after year. Call us in English or Spanish and we’ll be out quickly.",
      ],
    },
    es: {
      name: "Dehesa de Campoamor",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Dehesa de Campoamor.",
      body: [
        "Uno de los rincones más verdes y exclusivos de la Orihuela Costa, Dehesa de Campoamor combina villas entre pinos, su pequeño puerto deportivo y una playa de arena resguardada. Las viviendas unifamiliares grandes suelen necesitar sistemas por zonas, y nosotros los diseñamos, instalamos y equilibramos para que cada estancia esté cómoda.",
        "También nos ocupamos de las reparaciones y del mantenimiento estacional para que los equipos de gama alta rindan bien año tras año. Llámanos en inglés o español y acudiremos enseguida.",
      ],
    },
  },
  {
    slug: "mil-palmeras",
    en: {
      name: "Mil Palmeras",
      intro: "Air conditioning installation, repair and maintenance in Mil Palmeras.",
      body: [
        "Mil Palmeras is a compact, family-friendly resort known for its shallow, palm-lined beach and clusters of modern apartments and townhouses. With so many properties used as holiday homes, owners want AC that cools fast on arrival and is simple to leave shut up safely between visits — exactly what we install and set up.",
        "We repair and clean systems too, and the salty seafront air means we always check outdoor units for wear. Reach out in English or Spanish for a prompt local appointment.",
      ],
    },
    es: {
      name: "Mil Palmeras",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Mil Palmeras.",
      body: [
        "Mil Palmeras es un núcleo turístico compacto y familiar, conocido por su playa de aguas poco profundas bordeada de palmeras y por sus conjuntos de apartamentos y adosados modernos. Como muchas casas son segundas residencias, los propietarios quieren un aire que enfríe rápido al llegar y sea fácil de dejar cerrado con seguridad entre visitas: justo lo que instalamos y configuramos.",
        "También reparamos y limpiamos equipos, y el aire salino del paseo nos obliga a revisar siempre el desgaste de las unidades exteriores. Escríbenos en inglés o español para una cita local sin demora.",
      ],
    },
  },
  {
    slug: "torre-de-la-horadada",
    en: {
      name: "Torre de la Horadada",
      intro: "Air conditioning installation, repair and maintenance in Torre de la Horadada.",
      body: [
        "The southernmost village on the Alicante coast, Torre de la Horadada is built around its old watchtower, fishing marina and a string of small beaches before the Murcia border. Seafront apartments and villas here run their AC hard in summer, and we install, repair and service systems to keep them cool through the busiest months.",
        "Being right on the water, condensers face plenty of salt and wind, so corrosion checks are part of every service we do. We’re local, bilingual and quick to respond.",
      ],
    },
    es: {
      name: "Torre de la Horadada",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Torre de la Horadada.",
      body: [
        "El pueblo más al sur de la costa de Alicante, Torre de la Horadada se organiza en torno a su antigua torre vigía, el puerto pesquero y una sucesión de pequeñas playas antes del límite con Murcia. Los apartamentos y villas de primera línea exigen mucho a su aire en verano, y nosotros instalamos, reparamos y mantenemos los equipos para que aguanten frescos los meses de más afluencia.",
        "Al estar pegados al mar, los condensadores soportan mucha sal y viento, así que las revisiones anticorrosión forman parte de cada mantenimiento. Somos de aquí, bilingües y rápidos.",
      ],
    },
  },
  {
    slug: "el-raso",
    en: {
      name: "El Raso",
      intro: "Air conditioning installation, repair and maintenance in El Raso.",
      body: [
        "El Raso is a large, self-contained residential development near Guardamar del Segura, popular with international owners for its pools, bars and walkable layout. The homes are mostly modern apartments and bungalows, well suited to neat split installations that cool quickly and run cheaply.",
        "We install new systems on new-builds and resales, fix faults and clean units across the whole urbanisation. Call in English or Spanish — we know the development well and respond fast.",
      ],
    },
    es: {
      name: "El Raso",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en El Raso.",
      body: [
        "El Raso es una gran urbanización residencial junto a Guardamar del Segura, muy apreciada por propietarios internacionales por sus piscinas, bares y trazado peatonal. Las viviendas son sobre todo apartamentos y bungalós modernos, ideales para instalaciones de split limpias que enfrían rápido y consumen poco.",
        "Instalamos equipos nuevos en obra nueva y segunda mano, reparamos averías y limpiamos unidades por toda la urbanización. Llama en inglés o español: conocemos bien el desarrollo y respondemos rápido.",
      ],
    },
  },
  {
    slug: "la-marina",
    en: {
      name: "La Marina",
      intro: "Air conditioning installation, repair and maintenance throughout La Marina.",
      body: [
        "Between the pine forest, the dunes and a wide Blue Flag beach, La Marina’s urbanisation is one of the busiest expat communities in the Vega Baja, full of bungalows and quad houses. These properties heat up fast in summer, so we install efficient splits and keep them serviced for year-round comfort.",
        "We repair breakdowns and clean filters and coils to stop the dust and pollen off the pine woods clogging things up. We’re local, speak English and Spanish, and won’t leave you sweating for long.",
      ],
    },
    es: {
      name: "La Marina",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en todo La Marina.",
      body: [
        "Entre el pinar, las dunas y una amplia playa con bandera azul, la urbanización de La Marina es una de las comunidades de extranjeros más activas de la Vega Baja, llena de bungalós y casas pareadas. Estas viviendas se calientan rápido en verano, así que instalamos splits eficientes y los mantenemos a punto para un confort durante todo el año.",
        "Reparamos averías y limpiamos filtros y baterías para evitar que el polvo y el polen del pinar lo atasquen todo. Somos de la zona, hablamos inglés y español y no te dejamos sudando mucho tiempo.",
      ],
    },
  },
  {
    slug: "rojales",
    en: {
      name: "Rojales",
      intro: "Air conditioning installation, repair and maintenance in Rojales.",
      body: [
        "Rojales straddles the River Segura with its historic cave houses and stone bridge, while up the hill the sprawling Ciudad Quesada urbanisation adds thousands of villas and apartments. That mix means everything from traditional town homes to modern golf-side villas, and we install, repair and service AC across all of them.",
        "Inland and shielded from the sea breeze, summers here feel particularly heavy, so a well-sized, properly maintained system makes a real difference. Get in touch in English or Spanish for a quick local visit.",
      ],
    },
    es: {
      name: "Rojales",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Rojales.",
      body: [
        "Rojales se extiende a ambas orillas del río Segura, con sus históricas cuevas y su puente de piedra, mientras que en lo alto la gran urbanización de Ciudad Quesada suma miles de villas y apartamentos. Esa mezcla abarca desde casas tradicionales de pueblo hasta villas modernas junto al golf, y en todas instalamos, reparamos y mantenemos el aire.",
        "Tierra adentro y resguardado de la brisa marina, aquí el verano se siente especialmente pesado, así que un equipo bien dimensionado y mantenido marca la diferencia. Contáctanos en inglés o español para una visita local rápida.",
      ],
    },
  },
  {
    slug: "san-fulgencio",
    en: {
      name: "San Fulgencio",
      intro: "Air conditioning installation, repair and maintenance in San Fulgencio.",
      body: [
        "A small Vega Baja town surrounded by farmland, San Fulgencio is best known to many for the huge La Marina urbanisation within its boundaries and its large international population. Whether it’s an older village house or a newer bungalow, we install splits that cool effectively against the heavy inland summer heat.",
        "We also repair faults and carry out the regular cleaning that keeps systems efficient and healthy. Our bilingual team works locally and gets to you fast.",
      ],
    },
    es: {
      name: "San Fulgencio",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en San Fulgencio.",
      body: [
        "Pequeño municipio de la Vega Baja rodeado de huerta, San Fulgencio es conocido por la enorme urbanización de La Marina dentro de su término y por su numerosa población internacional. Ya sea una casa antigua del pueblo o un bungaló más reciente, instalamos splits que enfrían de verdad frente al fuerte calor del verano de interior.",
        "También reparamos averías y realizamos la limpieza periódica que mantiene los equipos eficientes y saludables. Nuestro equipo bilingüe trabaja en la zona y llega rápido.",
      ],
    },
  },
  {
    slug: "benijofar",
    en: {
      name: "Benijófar",
      intro: "Air conditioning installation, repair and maintenance in Benijófar.",
      body: [
        "Benijófar is a compact, friendly Vega Baja village on the banks of the Segura, popular with residents who want a quieter, more Spanish feel within easy reach of the coast. Homes range from traditional terraced houses to modern villas on the edges, and we install, repair and service AC throughout.",
        "Set inland, the village gets little relief from the sea breeze in high summer, making a reliable, well-maintained system worth having. Call us in English or Spanish for fast, local help.",
      ],
    },
    es: {
      name: "Benijófar",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Benijófar.",
      body: [
        "Benijófar es un pueblo compacto y acogedor de la Vega Baja a orillas del Segura, apreciado por quienes buscan un ambiente más tranquilo y español cerca de la costa. Las viviendas van de las casas tradicionales entre medianeras a las villas modernas de las afueras, y en todas instalamos, reparamos y mantenemos el aire.",
        "Al estar tierra adentro, el pueblo apenas nota la brisa marina en pleno verano, por lo que conviene contar con un equipo fiable y bien mantenido. Llámanos en inglés o español para una ayuda local y rápida.",
      ],
    },
  },
  {
    slug: "algorfa",
    en: {
      name: "Algorfa",
      intro: "Air conditioning installation, repair and maintenance in Algorfa.",
      body: [
        "This quiet inland village is flanked by the well-known La Finca golf resort, where smart villas and apartments overlook the fairways and the surrounding lemon groves. We install efficient heat-pump systems for these homes, balancing cooling in summer with gentle warmth on cool nights, and keep them serviced.",
        "We also look after the older village properties with repairs, cleaning and upgrades. Wherever you are in Algorfa, our bilingual team responds quickly and works locally.",
      ],
    },
    es: {
      name: "Algorfa",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Algorfa.",
      body: [
        "Este tranquilo pueblo de interior está flanqueado por el conocido resort de golf La Finca, donde villas y apartamentos elegantes miran a los greens y a los limonares del entorno. Instalamos sistemas de bomba de calor eficientes para estas casas, combinando la refrigeración del verano con un calor suave en las noches frescas, y los mantenemos a punto.",
        "También cuidamos las viviendas más antiguas del pueblo con reparaciones, limpiezas y mejoras. Estés donde estés en Algorfa, nuestro equipo bilingüe responde rápido y trabaja en la zona.",
      ],
    },
  },
  {
    slug: "benejuzar",
    en: {
      name: "Benejúzar",
      intro: "Air conditioning installation, repair and maintenance in Benejúzar.",
      body: [
        "Benejúzar is a traditional agricultural town in the fertile heart of the Vega Baja, set among citrus and vegetable fields along the Segura. Its mostly Spanish, year-round households need AC that handles the fierce, humid inland summers, and we install and size systems to do exactly that.",
        "From fitting a new split in a town house to repairing and cleaning existing units, we keep things straightforward and affordable. We’re local, work in English and Spanish, and respond fast.",
      ],
    },
    es: {
      name: "Benejúzar",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Benejúzar.",
      body: [
        "Benejúzar es un pueblo agrícola tradicional en el corazón fértil de la Vega Baja, entre campos de cítricos y hortalizas junto al Segura. Sus hogares, en su mayoría españoles y de todo el año, necesitan un aire capaz de afrontar los veranos de interior, intensos y húmedos, y nosotros instalamos y dimensionamos equipos para lograrlo.",
        "Desde montar un split nuevo en una casa de pueblo hasta reparar y limpiar las unidades existentes, lo mantenemos sencillo y asequible. Somos de aquí, trabajamos en inglés y español y respondemos rápido.",
      ],
    },
  },
  {
    slug: "jacarilla",
    en: {
      name: "Jacarilla",
      intro: "Air conditioning installation, repair and maintenance in Jacarilla.",
      body: [
        "A small, peaceful village known for its grand palace and gardens, Jacarilla sits among the orchards of the Vega Baja just south of Orihuela. Its homes are a mix of older village houses and newer builds, all needing dependable cooling once the airless inland heat sets in.",
        "We install new splits, repair breakdowns and carry out the cleaning and gas checks that keep systems efficient. Call in English or Spanish and we’ll be there quickly.",
      ],
    },
    es: {
      name: "Jacarilla",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Jacarilla.",
      body: [
        "Pueblo pequeño y tranquilo, conocido por su imponente palacio y sus jardines, Jacarilla se asienta entre los huertos de la Vega Baja, al sur de Orihuela. Sus viviendas combinan casas antiguas del pueblo con construcciones más recientes, y todas necesitan una refrigeración fiable cuando llega el calor sofocante del interior.",
        "Instalamos splits nuevos, reparamos averías y hacemos las limpiezas y comprobaciones de gas que mantienen los equipos eficientes. Llama en inglés o español y acudiremos enseguida.",
      ],
    },
  },
  {
    slug: "bigastro",
    en: {
      name: "Bigastro",
      intro: "Air conditioning installation, repair and maintenance in Bigastro.",
      body: [
        "One of the smallest municipalities in the province, Bigastro is a tight-knit inland town surrounded by orange groves close to Orihuela. With little sea breeze to soften the summer, residents here depend on properly fitted AC, and we install and size systems to suit each home’s layout.",
        "We handle repairs, deep cleans and routine servicing too, keeping running costs down and air quality up. Our bilingual team is local and quick to respond.",
      ],
    },
    es: {
      name: "Bigastro",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Bigastro.",
      body: [
        "Uno de los municipios más pequeños de la provincia, Bigastro es un pueblo de interior muy unido, rodeado de naranjos y cerca de Orihuela. Con apenas brisa marina que suavice el verano, sus vecinos dependen de un aire bien instalado, y nosotros montamos y dimensionamos los equipos según la distribución de cada casa.",
        "También nos ocupamos de reparaciones, limpiezas a fondo y revisiones periódicas, reduciendo el consumo y mejorando la calidad del aire. Nuestro equipo bilingüe es de la zona y responde rápido.",
      ],
    },
  },
  {
    slug: "vistabella",
    en: {
      name: "Vistabella",
      intro: "Air conditioning installation, repair and maintenance in Vistabella.",
      body: [
        "Vistabella, near Jacarilla and the new Vistabella Golf development, blends a small original village with rows of modern villas and golf-side homes popular with international buyers. These newer properties suit clean, energy-efficient split installations, which we plan and fit to keep both summer and winter comfortable.",
        "We repair, service and clean existing systems across the area too. Get in touch in English or Spanish — we work locally and don’t keep you waiting.",
      ],
    },
    es: {
      name: "Vistabella",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Vistabella.",
      body: [
        "Vistabella, junto a Jacarilla y al nuevo desarrollo de Vistabella Golf, mezcla un pequeño núcleo original con hileras de villas modernas y casas junto al campo de golf muy demandadas por compradores internacionales. Estas viviendas recientes se prestan a instalaciones de split limpias y eficientes, que planificamos y montamos para un confort tanto en verano como en invierno.",
        "También reparamos, mantenemos y limpiamos los equipos existentes de toda la zona. Contáctanos en inglés o español: trabajamos en la zona y no te hacemos esperar.",
      ],
    },
  },
  {
    slug: "los-montesinos",
    en: {
      name: "Los Montesinos",
      intro: "Air conditioning installation, repair and maintenance in Los Montesinos.",
      body: [
        "A young, friendly inland town just behind Torrevieja’s salt lakes, Los Montesinos has grown around developments like La Herrada and is home to a big mix of Spanish and international residents. Modern bungalows and villas here cool well with the right split system, which we install, size and set up to run economically.",
        "We also take care of repairs and seasonal maintenance to keep equipment reliable. Call in English or Spanish for a fast, local appointment.",
      ],
    },
    es: {
      name: "Los Montesinos",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Los Montesinos.",
      body: [
        "Pueblo joven y acogedor del interior, justo detrás de las salinas de Torrevieja, Los Montesinos ha crecido alrededor de zonas como La Herrada y reúne una gran mezcla de vecinos españoles e internacionales. Los bungalós y villas modernos enfrían bien con el split adecuado, que instalamos, dimensionamos y configuramos para un consumo económico.",
        "También nos encargamos de las reparaciones y del mantenimiento estacional para que los equipos sigan siendo fiables. Llama en inglés o español para una cita local y rápida.",
      ],
    },
  },
  {
    slug: "daya-nueva",
    en: {
      name: "Daya Nueva",
      intro: "Air conditioning installation, repair and maintenance in Daya Nueva.",
      body: [
        "Daya Nueva is a quiet farming village in the flat, irrigated heart of the Vega Baja, with a small but growing international community among its traditional Spanish homes. Surrounded by fields and far from the cooling coast, it gets hot and still in summer, so a well-fitted AC system is genuinely worth it.",
        "We install new splits, repair faults and clean and service existing units to keep them efficient. Our bilingual team works locally and responds quickly.",
      ],
    },
    es: {
      name: "Daya Nueva",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Daya Nueva.",
      body: [
        "Daya Nueva es un tranquilo pueblo agrícola en el corazón llano y de regadío de la Vega Baja, con una comunidad internacional pequeña pero creciente entre sus casas españolas tradicionales. Rodeada de campos y lejos del frescor de la costa, en verano se vuelve calurosa y sin viento, así que un aire bien instalado merece la pena de verdad.",
        "Instalamos splits nuevos, reparamos averías y limpiamos y mantenemos las unidades existentes para que sean eficientes. Nuestro equipo bilingüe trabaja en la zona y responde rápido.",
      ],
    },
  },
  {
    slug: "daya-vieja",
    en: {
      name: "Daya Vieja",
      intro: "Air conditioning installation, repair and maintenance in Daya Vieja.",
      body: [
        "One of the tiniest villages in the Vega Baja, Daya Vieja is a sleepy spot among the orange groves with a small, close community of locals and overseas residents. Its handful of village houses and modern bungalows still need solid cooling against the heavy, breeze-free inland summer, and we install systems sized to each one.",
        "We’re happy with the smaller jobs others overlook — a single repair, a filter clean or a one-room split. Reach us in English or Spanish for fast, friendly local service.",
      ],
    },
    es: {
      name: "Daya Vieja",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Daya Vieja.",
      body: [
        "Uno de los pueblos más diminutos de la Vega Baja, Daya Vieja es un rincón tranquilo entre naranjos con una comunidad pequeña y cercana de vecinos locales y extranjeros. Sus pocas casas de pueblo y bungalós modernos también necesitan una buena refrigeración frente al verano de interior, pesado y sin brisa, y nosotros instalamos equipos a la medida de cada vivienda.",
        "Nos encantan los trabajos pequeños que otros pasan por alto: una reparación, una limpieza de filtros o un split de una sola estancia. Escríbenos en inglés o español para un servicio local rápido y cercano.",
      ],
    },
  },
  {
    slug: "santiago-de-la-ribera",
    en: {
      name: "Santiago de la Ribera",
      intro: "Air conditioning installation, repair and maintenance in Santiago de la Ribera.",
      body: [
        "On the calm western shore of the Mar Menor, Santiago de la Ribera is an elegant seaside town with its long promenade, the San Javier air base nearby and a strong year-round community. Apartments and townhouses along the lagoon front rely on AC through the long Murcian summer, and we install, repair and service them all.",
        "The mild, salty lagoon air still takes its toll on outdoor units, so corrosion and cleaning checks are part of every visit. Call us in English or Spanish for prompt, local help.",
      ],
    },
    es: {
      name: "Santiago de la Ribera",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Santiago de la Ribera.",
      body: [
        "En la tranquila orilla oeste del Mar Menor, Santiago de la Ribera es un elegante pueblo costero con su largo paseo marítimo, la cercana base aérea de San Javier y una comunidad fuerte todo el año. Los apartamentos y adosados frente a la laguna dependen del aire durante el largo verano murciano, y nosotros los instalamos, reparamos y mantenemos.",
        "El aire suave y salino de la laguna también pasa factura a las unidades exteriores, así que las revisiones de corrosión y limpieza forman parte de cada visita. Llámanos en inglés o español para una ayuda local sin demora.",
      ],
    },
  },
  {
    slug: "balsicas",
    en: {
      name: "Balsicas",
      intro: "Air conditioning installation, repair and maintenance in Balsicas.",
      body: [
        "Balsicas is a busy inland village in the Torre-Pacheco area, a working Murcian town with its train station and a steady flow of residents heading to and from the Mar Menor coast. Away from the lagoon breeze, summers are dry and scorching, so we install efficient splits sized for the local heat.",
        "We repair, clean and maintain existing systems too, keeping bills sensible and air clean. Our team speaks English and Spanish, works locally and turns up fast.",
      ],
    },
    es: {
      name: "Balsicas",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Balsicas.",
      body: [
        "Balsicas es un activo pueblo de interior de la zona de Torre-Pacheco, una localidad murciana trabajadora con su estación de tren y un trasiego constante de vecinos que van y vienen de la costa del Mar Menor. Lejos de la brisa de la laguna, los veranos son secos y abrasadores, así que instalamos splits eficientes dimensionados para el calor de aquí.",
        "También reparamos, limpiamos y mantenemos los equipos existentes, manteniendo a raya las facturas y limpio el aire. Nuestro equipo habla inglés y español, trabaja en la zona y llega rápido.",
      ],
    },
  },
  {
    slug: "roldan",
    en: {
      name: "Roldán",
      intro: "Air conditioning installation, repair and maintenance in Roldán.",
      body: [
        "Roldán is a growing town in Torre-Pacheco country, close to the popular Hacienda del Álamo style golf resorts and within easy reach of the Mar Menor beaches. Its modern villas and apartments suit clean split installations, and we plan and fit them for efficient cooling through the dry, intense inland summers.",
        "We also handle repairs, gas top-ups and the regular cleaning that keeps systems healthy. Get in touch in English or Spanish — we’re local and quick to respond.",
      ],
    },
    es: {
      name: "Roldán",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Roldán.",
      body: [
        "Roldán es una localidad en crecimiento en la zona de Torre-Pacheco, cerca de los populares resorts de golf y a poca distancia de las playas del Mar Menor. Sus villas y apartamentos modernos se prestan a instalaciones de split limpias, que planificamos y montamos para una refrigeración eficiente durante los veranos de interior, secos e intensos.",
        "También nos ocupamos de reparaciones, recargas de gas y de la limpieza periódica que mantiene los equipos saludables. Contáctanos en inglés o español: somos de la zona y respondemos rápido.",
      ],
    },
  },
  {
    slug: "gea-y-truyols",
    en: {
      name: "Gea y Truyols",
      intro: "Air conditioning installation, repair and maintenance in Gea y Truyols.",
      body: [
        "Gea y Truyols is a small rural settlement in the Murcia countryside near Sucina, surrounded by farmland and within reach of the golf resorts of the Mar Menor hinterland. Homes here, from country fincas to newer villas, face hot, dry inland summers, and we install systems matched to larger, more open layouts.",
        "We repair, service and clean existing units across the area, keeping them efficient in dusty rural conditions. Call in English or Spanish for fast, local attention.",
      ],
    },
    es: {
      name: "Gea y Truyols",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Gea y Truyols.",
      body: [
        "Gea y Truyols es una pequeña pedanía rural del campo de Murcia, cerca de Sucina, rodeada de tierras de cultivo y próxima a los resorts de golf del interior del Mar Menor. Las viviendas, desde fincas de campo a villas más nuevas, afrontan veranos de interior calurosos y secos, y nosotros instalamos equipos adaptados a espacios más amplios y abiertos.",
        "Reparamos, mantenemos y limpiamos las unidades existentes de la zona, conservándolas eficientes en un entorno rural con polvo. Llama en inglés o español para una atención local y rápida.",
      ],
    },
  },
  {
    slug: "la-tercia",
    en: {
      name: "La Tercia",
      intro: "Air conditioning installation, repair and maintenance in La Tercia.",
      body: [
        "La Tercia is a quiet rural area near Sucina and Roldán in the Murcia interior, dotted with country homes and newer residential plots within striking distance of the Mar Menor and its golf courses. Its open, sun-exposed properties get very hot in summer, so we install well-sized systems that cool effectively without wasting energy.",
        "We also repair faults and carry out the cleaning and servicing that rural dust makes essential. Our bilingual team works locally and responds quickly.",
      ],
    },
    es: {
      name: "La Tercia",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en La Tercia.",
      body: [
        "La Tercia es una zona rural tranquila cerca de Sucina y Roldán, en el interior de Murcia, salpicada de casas de campo y nuevas parcelas residenciales a poca distancia del Mar Menor y sus campos de golf. Sus viviendas, abiertas y expuestas al sol, se calientan mucho en verano, así que instalamos equipos bien dimensionados que enfrían de forma eficaz sin malgastar energía.",
        "También reparamos averías y realizamos la limpieza y el mantenimiento que el polvo del campo hace imprescindibles. Nuestro equipo bilingüe trabaja en la zona y responde rápido.",
      ],
    },
  },
  {
    slug: "el-algar",
    en: {
      name: "El Algar",
      intro: "Air conditioning installation, repair and maintenance in El Algar.",
      body: [
        "El Algar is a lively working town between Cartagena and the southern Mar Menor, a handy local hub for the surrounding villages and beaches like Los Urrutias. Its mix of town houses and apartments runs AC hard through the long, hot Campo de Cartagena summers, and we install, repair and maintain it all.",
        "From a quick repair before a heatwave to a full new installation, we keep things simple and fairly priced. We’re local, speak English and Spanish, and respond fast.",
      ],
    },
    es: {
      name: "El Algar",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en El Algar.",
      body: [
        "El Algar es una localidad activa y trabajadora entre Cartagena y el sur del Mar Menor, un práctico centro de servicios para los pueblos y playas del entorno, como Los Urrutias. Su mezcla de casas y apartamentos exige mucho al aire durante los largos y calurosos veranos del Campo de Cartagena, y nosotros lo instalamos, reparamos y mantenemos.",
        "Desde una reparación rápida antes de una ola de calor hasta una instalación nueva completa, lo hacemos sencillo y a buen precio. Somos de aquí, hablamos inglés y español y respondemos rápido.",
      ],
    },
  },
  {
    slug: "los-urrutias",
    en: {
      name: "Los Urrutias",
      intro: "Air conditioning installation, repair and maintenance in Los Urrutias.",
      body: [
        "Los Urrutias is a relaxed beach village right on the southern shore of the Mar Menor, known for its shallow, warm lagoon waters and its rows of seafront holiday homes. With apartments and bungalows used heavily in summer, owners want AC that cools fast on arrival, and we install and set up systems to do just that.",
        "The humid lagoon air is tough on outdoor units, so we always check for corrosion when we service or repair. Reach us in English or Spanish for prompt local help.",
      ],
    },
    es: {
      name: "Los Urrutias",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Los Urrutias.",
      body: [
        "Los Urrutias es un tranquilo pueblo de playa en la orilla sur del Mar Menor, conocido por las aguas cálidas y poco profundas de la laguna y por sus hileras de casas vacacionales frente al mar. Con apartamentos y bungalós muy usados en verano, los propietarios quieren un aire que enfríe rápido al llegar, y nosotros instalamos y configuramos los equipos para lograrlo.",
        "El aire húmedo de la laguna es duro con las unidades exteriores, así que siempre revisamos la corrosión al mantener o reparar. Escríbenos en inglés o español para una ayuda local sin demora.",
      ],
    },
  },
  {
    slug: "playa-honda",
    en: {
      name: "Playa Honda",
      intro: "Air conditioning installation, repair and maintenance in Playa Honda.",
      body: [
        "Playa Honda lines the strip of coast at the base of La Manga, with high-rise apartment towers looking out over both the Mar Menor and the Mediterranean. Sea air hits from both sides here, so these holiday and rental flats need AC that copes with humidity and salt, which we install, repair and service.",
        "Outdoor units in this exposed position need regular cleaning and corrosion checks to last, and that’s built into how we work. Call in English or Spanish — we’re local and fast to respond.",
      ],
    },
    es: {
      name: "Playa Honda",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Playa Honda.",
      body: [
        "Playa Honda bordea la franja de costa a los pies de La Manga, con torres de apartamentos que miran al Mar Menor y al Mediterráneo a la vez. El aire marino llega por ambos lados, así que estos pisos vacacionales y de alquiler necesitan un aire capaz de soportar la humedad y la sal, que instalamos, reparamos y mantenemos.",
        "Las unidades exteriores en una posición tan expuesta requieren limpiezas y revisiones anticorrosión periódicas para durar, y eso forma parte de cómo trabajamos. Llama en inglés o español: somos de la zona y respondemos rápido.",
      ],
    },
  },
  {
    slug: "atamaria",
    en: {
      name: "Atamaría",
      intro: "Air conditioning installation, repair and maintenance in Atamaría.",
      body: [
        "Atamaría is the upmarket residential and golf enclave within La Manga Club, set on the hills above the resort among pine slopes and championship fairways. The high-end villas and apartments here often run multi-zone systems, and we design, install and balance them for quiet, even comfort throughout.",
        "We service and repair premium equipment to keep it running discreetly and efficiently season after season. Our bilingual team knows the resort and responds quickly.",
      ],
    },
    es: {
      name: "Atamaría",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Atamaría.",
      body: [
        "Atamaría es el exclusivo enclave residencial y de golf dentro de La Manga Club, en las laderas sobre el resort, entre pinos y campos de campeonato. Las villas y apartamentos de alto nivel suelen contar con sistemas por zonas, y nosotros los diseñamos, instalamos y equilibramos para un confort silencioso y uniforme en toda la vivienda.",
        "Mantenemos y reparamos equipos de gama alta para que funcionen de forma discreta y eficiente temporada tras temporada. Nuestro equipo bilingüe conoce el resort y responde rápido.",
      ],
    },
  },
  {
    slug: "puerto-de-mazarron",
    en: {
      name: "Puerto de Mazarrón",
      intro: "Air conditioning installation, repair and maintenance in Puerto de Mazarrón.",
      body: [
        "Puerto de Mazarrón is a lively fishing port and beach resort on the Costa Cálida, with its marina, long beaches and a busy summer population swelling its apartments and villas. We install splits and ducted systems across the town, from seafront flats to inland urbanisations, and keep them serviced year-round.",
        "The strong coastal sun and salt-laden air mean outdoor units need proper care, which is central to our maintenance. Call us in English or Spanish for fast, local service.",
      ],
    },
    es: {
      name: "Puerto de Mazarrón",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Puerto de Mazarrón.",
      body: [
        "Puerto de Mazarrón es un animado puerto pesquero y destino de playa de la Costa Cálida, con su puerto deportivo, largas playas y una población veraniega que llena sus apartamentos y villas. Instalamos splits y sistemas por conductos por toda la localidad, desde pisos de primera línea hasta urbanizaciones del interior, y los mantenemos durante todo el año.",
        "El fuerte sol de la costa y el aire cargado de sal exigen cuidar bien las unidades exteriores, algo central en nuestro mantenimiento. Llámanos en inglés o español para un servicio local y rápido.",
      ],
    },
  },
  {
    slug: "mazarron-country-club",
    en: {
      name: "Mazarrón Country Club",
      intro: "Air conditioning installation, repair and maintenance in Mazarrón Country Club.",
      body: [
        "Mazarrón Country Club is a self-contained urbanisation of villas and apartments inland of the coast, popular with international owners for its pools, social club and relaxed pace. Many homes are second residences, so owners want AC that cools quickly on arrival and is easy to leave secure between stays — exactly what we install and configure.",
        "We repair and clean systems across the development and keep them maintained for reliability. Our team speaks English and Spanish, knows the complex well, and responds fast.",
      ],
    },
    es: {
      name: "Mazarrón Country Club",
      intro: "Instalación, reparación y mantenimiento de aire acondicionado en Mazarrón Country Club.",
      body: [
        "Mazarrón Country Club es una urbanización independiente de villas y apartamentos del interior de la costa, muy apreciada por propietarios internacionales por sus piscinas, su club social y su ritmo tranquilo. Muchas viviendas son segundas residencias, así que sus dueños quieren un aire que enfríe rápido al llegar y sea fácil de dejar cerrado entre estancias: justo lo que instalamos y configuramos.",
        "Reparamos y limpiamos equipos por toda la urbanización y los mantenemos a punto para que sean fiables. Nuestro equipo habla inglés y español, conoce bien el complejo y responde rápido.",
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
      { name: 'La Mata', slug: "la-mata" },
      { name: 'Orihuela Costa', slug: 'orihuela-costa' },
      { name: 'La Zenia', slug: "la-zenia" },
      { name: 'Cabo Roig', slug: "cabo-roig" },
      { name: 'Punta Prima', slug: "punta-prima" },
      { name: 'Villamartín', slug: "villamartin" },
      { name: 'Dehesa de Campoamor', slug: "dehesa-de-campoamor" },
      { name: 'Mil Palmeras', slug: "mil-palmeras" },
      { name: 'Pilar de la Horadada', slug: 'pilar-de-la-horadada' },
      { name: 'Torre de la Horadada', slug: "torre-de-la-horadada" },
      { name: 'Guardamar del Segura', slug: 'guardamar-del-segura' },
      { name: 'El Raso', slug: "el-raso" },
      { name: 'La Marina', slug: "la-marina" },
      { name: 'Santa Pola', slug: 'santa-pola' },
      { name: 'Ciudad Quesada', slug: 'ciudad-quesada' },
      { name: 'Rojales', slug: "rojales" },
      { name: 'San Miguel de Salinas', slug: 'san-miguel-de-salinas' },
      { name: 'Almoradí', slug: 'almoradi' },
      { name: 'San Fulgencio', slug: "san-fulgencio" },
      { name: 'Benijófar', slug: "benijofar" },
      { name: 'Algorfa', slug: "algorfa" },
      { name: 'Benejúzar', slug: "benejuzar" },
      { name: 'Jacarilla', slug: "jacarilla" },
      { name: 'Bigastro', slug: "bigastro" },
      { name: 'Vistabella', slug: "vistabella" },
      { name: 'Los Montesinos', slug: "los-montesinos" },
      { name: 'Daya Nueva', slug: "daya-nueva" },
      { name: 'Daya Vieja', slug: "daya-vieja" },
    ],
  },
  {
    title: { en: 'Costa Cálida · Mar Menor · Murcia', es: 'Costa Cálida · Mar Menor · Murcia' },
    towns: [
      { name: 'San Pedro del Pinatar', slug: 'san-pedro-del-pinatar' },
      { name: 'Santiago de la Ribera', slug: "santiago-de-la-ribera" },
      { name: 'San Javier', slug: 'san-javier' },
      { name: 'Los Alcázares', slug: 'los-alcazares' },
      { name: 'Torre Pacheco', slug: 'torre-pacheco' },
      { name: 'Balsicas', slug: "balsicas" },
      { name: 'Roldán', slug: "roldan" },
      { name: 'Gea y Truyols', slug: "gea-y-truyols" },
      { name: 'La Tercia', slug: "la-tercia" },
      { name: 'El Algar', slug: "el-algar" },
      { name: 'Los Urrutias', slug: "los-urrutias" },
      { name: 'Playa Honda', slug: "playa-honda" },
      { name: 'La Manga del Mar Menor', slug: 'la-manga' },
      { name: 'Atamaría', slug: "atamaria" },
      { name: 'Mazarrón', slug: 'mazarron' },
      { name: 'Puerto de Mazarrón', slug: "puerto-de-mazarron" },
      { name: 'Mazarrón Country Club', slug: "mazarron-country-club" },
    ],
  },
];
