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
      intro: 'Torrevieja flats heat up fast and stay warm after dark, so AC must suit each room and its sun.',
      body: [
        'Much of Torrevieja is apartment blocks and compact urbanisations such as Los Balcones and Aguas Nuevas, and top floors take the sun all day. Size those units for the heat they absorb, not just the square metres, and check community rules before fixing anything to a façade.',
        'Our team of specialists handles AC installation, repair and servicing from the port to La Mata. For air conditioning in Torrevieja, send a photo on WhatsApp and we’ll reply within the hour during working hours.',
      ],
    },
    es: {
      name: 'Torrevieja',
      intro: 'Los pisos de Torrevieja se calientan rápido y tardan en refrescar de noche, así que cada estancia pide su equipo.',
      body: [
        'Torrevieja es sobre todo bloques y urbanizaciones compactas como Los Balcones o Aguas Nuevas, y las últimas plantas reciben sol todo el día. Calcula la potencia por el calor que acumula, no solo por los metros, y consulta a tu comunidad antes de tocar la fachada.',
        'Nuestro equipo de especialistas se ocupa de instalación, reparación y mantenimiento del puerto a La Mata. Para aire acondicionado en Torrevieja, mándanos una foto por WhatsApp y te contestamos en menos de una hora en horario laboral.',
      ],
    },
  },
  {
    slug: 'orihuela-costa',
    en: {
      name: 'Orihuela Costa',
      intro: 'From La Zenia to Cabo Roig, homes on Orihuela Costa need AC that copes with long summers and salty sea air.',
      body: [
        'Orihuela Costa takes in Playa Flamenca, La Zenia, Cabo Roig, Villamartín, Campoamor and Punta Prima, so one street can hold apartments, bungalows and detached villas. Each needs something different: a split, a multi-split or ducted air. Near the beach, keep the outdoor unit out of direct sea wind if you can.',
        'For air conditioning in Orihuela Costa we cover AC installation, repair and servicing on all major brands. Tell us what kind of property you have and we’ll send a free quote that shows exactly what’s included.',
      ],
    },
    es: {
      name: 'Orihuela Costa',
      intro: 'De La Zenia a Cabo Roig, las viviendas de Orihuela Costa necesitan una climatización que aguante veranos largos y salitre.',
      body: [
        'Orihuela Costa abarca Playa Flamenca, La Zenia, Cabo Roig, Villamartín, Campoamor y Punta Prima, y en una misma calle conviven apartamentos, bungalós y villas. Cada caso pide algo distinto: un split, un multisplit o conductos. Cerca de la playa, aleja la unidad exterior del viento directo del mar siempre que puedas.',
        'Para el aire acondicionado en Orihuela Costa hacemos instalación, reparación y mantenimiento de todas las grandes marcas. Cuéntanos qué vivienda tienes y te enviamos un presupuesto gratuito en el que verás claro qué incluye cada partida.',
      ],
    },
  },
  {
    slug: 'guardamar-del-segura',
    en: {
      name: 'Guardamar del Segura',
      intro: 'Between pine woods and the sea, Guardamar del Segura homes need outdoor units protected from salt and wind-blown sand.',
      body: [
        'Guardamar’s beaches are backed by dunes and pines, and the town has spread with apartments and townhouses towards El Moncayo and El Raso. Sand and salt attack outdoor units, so raise yours off the ground and rinse the coil gently with fresh water now and then, power off.',
        'We look after air conditioning in Guardamar del Segura from AC installation to AC repair and yearly AC servicing, with cleaning from €50. Already bought a unit? We fit those too, usually within 24 to 72 hours of your request, depending on season.',
      ],
    },
    es: {
      name: 'Guardamar del Segura',
      intro: 'Entre la pinada y el mar, las casas de Guardamar del Segura necesitan unidades exteriores protegidas de la sal y la arena.',
      body: [
        'Las playas de Guardamar tienen detrás dunas y pinos, y el pueblo ha crecido con apartamentos y adosados hacia El Moncayo y El Raso. La arena y la sal castigan la unidad exterior: elévala del suelo y enjuágala de vez en cuando con agua dulce, siempre sin corriente.',
        'Nos encargamos del aire acondicionado en Guardamar del Segura: instalación, reparación y mantenimiento anual, con limpiezas desde 50 €. Si ya tienes el equipo, te lo montamos, normalmente entre 24 y 72 horas desde tu aviso, según la temporada.',
      ],
    },
  },
  {
    slug: 'santa-pola',
    en: {
      name: 'Santa Pola',
      intro: 'The breeze helps in Santa Pola, but holiday flats still get stuffy and salt shortens the life of neglected outdoor units.',
      body: [
        'Santa Pola combines its fishing port, long beaches and salt pans with holiday apartments and, up on the cape, the homes of Gran Alacant. Flats left shut for weeks often smell musty when the AC first starts, so have filters and drain cleaned before your summer stay.',
        'Cleaning starts from €50 as part of our AC servicing, and we take on AC installation and repair across all major brands. For air conditioning in Santa Pola, call or WhatsApp us; we answer within the hour in working hours.',
      ],
    },
    es: {
      name: 'Santa Pola',
      intro: 'La brisa ayuda en Santa Pola, pero los pisos de vacaciones se cargan igual y la sal castiga las unidades exteriores descuidadas.',
      body: [
        'Santa Pola reúne puerto pesquero, playas largas y salinas con apartamentos de vacaciones y, arriba en el cabo, las casas de Gran Alacant. Un piso cerrado varias semanas suele oler a humedad cuando arranca el aire, así que limpia filtros y desagüe antes de tu estancia de verano.',
        'Las limpiezas empiezan en 50 € dentro de nuestro mantenimiento, y hacemos instalación y reparación de todas las grandes marcas. Para aire acondicionado en Santa Pola, llámanos o escribe por WhatsApp: respondemos en menos de una hora en horario laboral.',
      ],
    },
  },
  {
    slug: 'ciudad-quesada',
    en: {
      name: 'Ciudad Quesada',
      intro: 'Ciudad Quesada villas and bungalows need winter heating as much as summer cooling, which makes a heat pump worthwhile.',
      body: [
        'Up the hill from Rojales, Ciudad Quesada is mostly villas and bungalows with a large international community, many of them around La Marquesa golf course. Tiled floors feel chilly in January, and a split with a heat pump costs far less to run than plug-in electric heaters.',
        'Our team can fit a unit we supply or one you already own. We handle AC installation, repair and servicing, in English or Spanish. For air conditioning in Ciudad Quesada, start with a free quote and decide from there.',
      ],
    },
    es: {
      name: 'Ciudad Quesada',
      intro: 'En las villas de Ciudad Quesada el invierno importa tanto como el verano, y ahí compensa una bomba de calor.',
      body: [
        'Subiendo desde Rojales, Ciudad Quesada es sobre todo villas y bungalós con una gran comunidad internacional, muchos alrededor del campo de golf La Marquesa. En enero el suelo de baldosa se nota frío, y un split con bomba de calor gasta mucho menos que los radiadores eléctricos enchufables.',
        'Nuestro equipo te monta una unidad nuestra o la que ya tengas. Hacemos instalación, reparación y mantenimiento, en español o en inglés. Si piensas en aire acondicionado en Ciudad Quesada, pide presupuesto gratis y luego decides con calma.',
      ],
    },
  },
  {
    slug: 'san-miguel-de-salinas',
    en: {
      name: 'San Miguel de Salinas',
      intro: 'On the hills behind the coast, San Miguel de Salinas has hot, still summers, so correctly sized AC keeps your bills sensible.',
      body: [
        'San Miguel de Salinas looks down towards Orihuela Costa, with a large international community in villas and apartments. An oversized unit cycles on and off and leaves rooms clammy, while an undersized one runs flat out all afternoon. Correct sizing matters more than the brand.',
        'Tell us your room sizes and which way they face for a free quote on air conditioning in San Miguel de Salinas. AC installation, repair and servicing are all covered, with a 3-year guarantee on our work plus 3 years from the manufacturer.',
      ],
    },
    es: {
      name: 'San Miguel de Salinas',
      intro: 'En las lomas tras la costa, San Miguel de Salinas tiene veranos calurosos y sin brisa: un equipo bien dimensionado controla la factura.',
      body: [
        'San Miguel de Salinas mira hacia Orihuela Costa, con una gran comunidad internacional en villas y apartamentos. Un equipo demasiado grande arranca y se apaga continuamente y deja la casa pegajosa; uno pequeño va a tope toda la tarde. Acertar con la potencia importa más que la marca.',
        'Dinos metros y orientación de cada habitación y te preparamos un presupuesto gratuito de aire acondicionado en San Miguel de Salinas. Hacemos instalación, reparación y mantenimiento, con 3 años de garantía en nuestro trabajo y otros 3 del fabricante.',
      ],
    },
  },
  {
    slug: 'almoradi',
    en: {
      name: 'Almoradí',
      intro: 'Almoradí homes and shops need cooling that holds up through the inland heat, with a clear price agreed first.',
      body: [
        'Almoradí is a lively Vega Baja town of flats, town houses and shops, with no sea breeze to take the edge off July. In long, narrow town houses, a split placed so the air travels down the main room does far more than one tucked into a corner.',
        'Shops and small restaurants often suit a cassette, which sits flush in the ceiling and spreads air evenly. For air conditioning in Almoradí, ask the Aerocomfort team about AC installation, AC repair or AC servicing. You’ll get the full price, free, before we start.',
      ],
    },
    es: {
      name: 'Almoradí',
      intro: 'Casas y comercios de Almoradí necesitan un aire que aguante el calor de interior, con precio claro antes de empezar.',
      body: [
        'Almoradí es un pueblo animado de la Vega Baja, con pisos, casas y comercios y sin brisa que suavice julio. En las casas largas y estrechas, un split colocado para que el aire recorra la estancia principal rinde más que uno en una esquina.',
        'En tiendas y restaurantes pequeños suele encajar un cassette, que va enrasado en el techo y reparte bien el aire. Para el aire acondicionado en Almoradí, habla con el equipo de Aerocomfort sobre instalación, reparación o mantenimiento. El presupuesto es gratis y sabrás el precio antes de empezar.',
      ],
    },
  },
  {
    slug: 'pilar-de-la-horadada',
    en: {
      name: 'Pilar de la Horadada',
      intro: 'Homes in Pilar de la Horadada range from town houses to seaside flats, and the right AC differs for each.',
      body: [
        'The municipality runs from the inland town down to the beaches of Torre de la Horadada, mixing permanent homes with holiday properties. Inland, dust is the main enemy of filters; by the sea it’s salt. Book a spring check and any fault shows up before the first hot week.',
        'Spring suits AC installation too, which usually takes 24 to 72 hours from your request, depending on the season. For air conditioning in Pilar de la Horadada, including AC repair and servicing, message us your address and what you need.',
      ],
    },
    es: {
      name: 'Pilar de la Horadada',
      intro: 'En Pilar de la Horadada hay desde casas de pueblo hasta pisos junto al mar, y cada vivienda pide un equipo distinto.',
      body: [
        'El municipio va del pueblo interior a las playas de Torre de la Horadada, con viviendas habituales y de vacaciones. Tierra adentro el enemigo de los filtros es el polvo; junto al mar, la sal. Con una revisión en primavera, las averías salen antes del primer calor.',
        'La primavera también va bien para la instalación, que suele llevar entre 24 y 72 horas desde tu aviso, según la temporada. Para el aire acondicionado en Pilar de la Horadada, reparación y mantenimiento incluidos, escríbenos tu dirección y lo que necesitas.',
      ],
    },
  },
  {
    slug: 'san-pedro-del-pinatar',
    en: {
      name: 'San Pedro del Pinatar',
      intro: 'San Pedro del Pinatar and Lo Pagán fill up every summer, so plan AC work early rather than during a heatwave.',
      body: [
        'Beside the Mar Menor and the salt flats, San Pedro del Pinatar has town flats, beach apartments in Lo Pagán and plenty of second homes. Salt in the air attacks fins and fixings, so choose a sheltered spot for the outdoor unit and book a clean every year.',
        'We carry out AC installation, repair and servicing for homes, restaurants and small businesses. If you’re thinking about air conditioning in San Pedro del Pinatar, ask for your free quote before the summer crowds arrive.',
      ],
    },
    es: {
      name: 'San Pedro del Pinatar',
      intro: 'San Pedro del Pinatar y Lo Pagán se llenan cada verano, así que mejor planificar el aire antes de la ola de calor.',
      body: [
        'Junto al Mar Menor y las salinas, San Pedro del Pinatar tiene pisos en el pueblo, apartamentos de playa en Lo Pagán y muchas segundas residencias. La sal del ambiente ataca aletas y soportes, de modo que busca un sitio resguardado para la unidad exterior y programa una limpieza cada año.',
        'Hacemos instalación, reparación y mantenimiento en viviendas, restaurantes y pequeños negocios. Si te estás planteando el aire acondicionado en San Pedro del Pinatar, pide tu presupuesto gratuito antes de que empiece la temporada alta.',
      ],
    },
  },
  {
    slug: 'san-javier',
    en: {
      name: 'San Javier',
      intro: 'In San Javier, homes and businesses need AC that runs reliably through humid Mar Menor summers without huge bills.',
      body: [
        'San Javier pairs a working town centre with the seafront at Santiago de la Ribera, mixing family homes, apartments and businesses. Humid nights feel worse than the thermometer suggests. On sticky evenings try dry mode, which pulls moisture from the room without chilling it.',
        'Businesses can ask about cassette or ducted systems and ventilation; most homes need a split or multi-split. We cover air conditioning in San Javier from AC installation to AC repair and servicing. Phone or WhatsApp and you’ll hear back within the hour during working hours.',
      ],
    },
    es: {
      name: 'San Javier',
      intro: 'En San Javier, hogares y negocios necesitan un aire fiable para los veranos húmedos del Mar Menor, sin facturas desorbitadas.',
      body: [
        'San Javier une un centro con mucha actividad y la fachada marítima de Santiago de la Ribera, con casas, apartamentos y negocios. Las noches húmedas se hacen más duras de lo que marca el termómetro: prueba el modo seco, que quita humedad sin helar la habitación.',
        'Para negocios tenemos cassette, conductos y ventilación; en casa suele bastar un split o un multisplit. Del aire acondicionado en San Javier hacemos instalación, reparación y mantenimiento. Llama o escribe por WhatsApp y tendrás respuesta en menos de una hora en horario laboral.',
      ],
    },
  },
  {
    slug: 'los-alcazares',
    en: {
      name: 'Los Alcázares',
      intro: 'Los Alcázares holiday homes can sit empty for weeks, then need to cool fast when family or guests arrive in July.',
      body: [
        'Along the Mar Menor, Los Alcázares is a resort town of apartments, townhouses and second homes, with plenty of permanent residents too. Many newer units accept a Wi-Fi controller, so you can switch on the AC and confirm it works before you even leave home.',
        'The Aerocomfort team looks after air conditioning in Los Alcázares for residents and visitors alike. AC installation is easiest to schedule in the cooler months, and AC repair and servicing cover all major brands. Send us your dates and we’ll plan around them.',
      ],
    },
    es: {
      name: 'Los Alcázares',
      intro: 'Las casas de vacaciones de Los Alcázares pasan semanas vacías y luego deben enfriar rápido cuando llegan familia o huéspedes en julio.',
      body: [
        'A orillas del Mar Menor, Los Alcázares es un municipio turístico de apartamentos, adosados y segundas residencias, con muchos vecinos todo el año. Bastantes equipos nuevos admiten control por wifi: puedes encender el aire y comprobar que funciona antes de salir de casa.',
        'El equipo de Aerocomfort atiende el aire acondicionado en Los Alcázares de vecinos y visitantes. La instalación es más fácil de encajar en los meses frescos, y la reparación y el mantenimiento abarcan todas las grandes marcas. Pásanos tus fechas y nos organizamos.',
      ],
    },
  },
  {
    slug: 'torre-pacheco',
    en: {
      name: 'Torre Pacheco',
      intro: 'Torre Pacheco summers are hot and dry, and homes and businesses here need AC that won’t give up in August.',
      body: [
        'Inland on the Campo de Cartagena, Torre Pacheco has town houses, flats and shops, with golf-resort homes not far away. Dust from the surrounding farmland settles on filters and outdoor coils, so wash the filters every few weeks in summer. A clogged filter means a weaker unit and a bigger bill.',
        'Need air conditioning in Torre Pacheco for a home, a restaurant or a small business? We cover AC installation, AC repair on all major brands and regular AC servicing, and the quote is free and easy to follow.',
      ],
    },
    es: {
      name: 'Torre Pacheco',
      intro: 'Los veranos de Torre Pacheco son calurosos y secos, y casas y negocios necesitan un aire que no falle en agosto.',
      body: [
        'En pleno Campo de Cartagena, Torre Pacheco tiene casas de pueblo, pisos y comercios, con viviendas de resorts de golf no muy lejos. El polvo de los cultivos se posa en filtros y baterías exteriores, así que en verano lava los filtros cada pocas semanas. Un filtro sucio significa menos frío y más consumo.',
        '¿Necesitas aire acondicionado en Torre Pacheco para tu casa, un restaurante o un pequeño negocio? Hacemos instalación, reparación de todas las grandes marcas y mantenimiento periódico, y el presupuesto es gratuito y fácil de entender.',
      ],
    },
  },
  {
    slug: "la-mata",
    en: {
      name: "La Mata",
      intro: "La Mata apartments sit between the salt lagoon and the beach, so their outdoor units need more care than most.",
      body: [
        "Between Torrevieja’s salt lagoon and a long sandy beach, La Mata is a low-rise resort of seafront apartments and holiday lets that bake through July and August. Salty air off the dunes eats at condensers, so a sheltered position and a yearly clean both help a unit last.",
        "If you let your flat, book AC servicing between guests instead of waiting for a complaint; cleaning starts from €50. We handle AC installation and repair too, so air conditioning in La Mata is one message away.",
      ],
    },
    es: {
      name: "La Mata",
      intro: "Los apartamentos de La Mata están entre la laguna salada y la playa, y sus unidades exteriores piden más cuidado.",
      body: [
        "Entre la laguna salada de Torrevieja y una larga playa de arena, La Mata es un núcleo de baja altura, con apartamentos y pisos de alquiler que sufren el calor de julio y agosto. El aire salino de las dunas castiga los condensadores: un sitio resguardado y una limpieza anual alargan su vida.",
        "Si alquilas, programa el mantenimiento entre huéspedes en vez de esperar a la primera queja; las limpiezas empiezan en 50 €. También hacemos instalación y reparación, así que tu aire acondicionado en La Mata queda resuelto con un mensaje.",
      ],
    },
  },
  {
    slug: "la-zenia",
    en: {
      name: "La Zenia",
      intro: "La Zenia homes use AC for summer cooling and winter warmth, so a quiet, efficient heat pump is worth choosing carefully.",
      body: [
        "Around the Boulevard shopping centre and the coves, La Zenia mixes villas and townhouses with holiday rentals and a year-round international crowd. In a two-storey townhouse heat rises and bedrooms suffer first, so a multi-split lets you cool each floor separately.",
        "We fit heat-pump splits and multi-room systems, and AC repair covers all major brands. Every AC installation carries our 3-year guarantee plus 3 years from the manufacturer on the unit. For air conditioning in La Zenia, or simply yearly AC servicing, give us a ring.",
      ],
    },
    es: {
      name: "La Zenia",
      intro: "En La Zenia el aire refresca en verano y calienta en invierno, así que elige bien tu bomba de calor.",
      body: [
        "Alrededor del centro comercial Boulevard y de sus calas, La Zenia combina villas y adosados con alquileres vacacionales y un público internacional todo el año. En un adosado de dos plantas el calor sube y los dormitorios lo sufren primero; con un multisplit enfrías cada planta por separado.",
        "Instalamos splits con bomba de calor y sistemas para varias estancias, y hacemos reparación de todas las grandes marcas. Cada instalación lleva 3 años de garantía nuestra y 3 más del fabricante. Para el aire acondicionado en La Zenia, o el mantenimiento anual, llámanos.",
      ],
    },
  },
  {
    slug: "cabo-roig",
    en: {
      name: "Cabo Roig",
      intro: "Cabo Roig’s clifftop homes take strong sun and sea wind, so AC needs careful siting as well as the right capacity.",
      body: [
        "Above the marina and the Cabo Roig strip, villas and apartments stand close to the water with little shade. Big sea-facing windows add a lot of heat, so count them when sizing. Units this near the sea corrode sooner, so ask about anti-corrosion coils when replacing one.",
        "Ducted systems suit larger villas if you’d rather not see indoor units, while splits keep things simple in apartments. We offer AC installation, repair and servicing for air conditioning in Cabo Roig. Send photos for a free quote.",
      ],
    },
    es: {
      name: "Cabo Roig",
      intro: "Las casas sobre los acantilados de Cabo Roig reciben mucho sol y viento marino: importa dónde va el equipo, no solo su potencia.",
      body: [
        "Sobre el puerto deportivo, villas y apartamentos miran al agua con poca sombra. Los grandes ventanales al mar meten mucho calor, así que tenlos en cuenta al dimensionar. Tan cerca de la costa, las unidades exteriores se corroen antes: al cambiarlas, pregunta por baterías anticorrosión.",
        "Los conductos van bien en villas grandes si no quieres ver unidades interiores, y en apartamentos un split lo simplifica todo. Hacemos instalación, reparación y mantenimiento de aire acondicionado en Cabo Roig. Mándanos fotos y te preparamos presupuesto gratis.",
      ],
    },
  },
  {
    slug: "punta-prima",
    en: {
      name: "Punta Prima",
      intro: "Busy beachfront blocks in Punta Prima need compact AC that suits small rooms and follows the rules of each community.",
      body: [
        "Punta Prima is a dense stretch of apartment blocks and resort complexes on the shoreline, packed in summer. Before fitting anything on a balcony or roof, ask the community administrator where outdoor units may go, and plan the drain so it never drips onto a neighbour’s terrace.",
        "Own the unit already? We can usually complete the AC installation 24 to 72 hours from your request, depending on the season. For air conditioning in Punta Prima, AC repair or AC servicing, just tell us your block and floor.",
      ],
    },
    es: {
      name: "Punta Prima",
      intro: "Los bloques junto a la playa de Punta Prima piden equipos compactos para estancias pequeñas, y respetar las normas de cada comunidad.",
      body: [
        "Punta Prima es una franja densa de bloques y complejos turísticos junto al mar, a tope en verano. Antes de poner nada en el balcón o la azotea, pregunta al administrador dónde pueden ir las unidades exteriores, y prevé el desagüe para que no gotee en la terraza del vecino.",
        "¿Ya tienes el equipo? Hacemos la instalación normalmente entre 24 y 72 horas desde tu aviso, según la temporada. Para aire acondicionado en Punta Prima, reparación o mantenimiento, solo dinos tu bloque y tu planta.",
      ],
    },
  },
  {
    slug: "villamartin",
    en: {
      name: "Villamartín",
      intro: "Many Villamartín residents live here all year, so AC has to cool in summer and heat on cold evenings.",
      body: [
        "Built around its golf course and the lively Plaza, Villamartín is a settled community of villas and bungalows. When AC works in both seasons, filters need attention twice a year: before the heat and before the first cold spell. A heat pump with a dirty filter costs more and warms less.",
        "Our specialists look after single bedroom units and full villa systems alike. For air conditioning in Villamartín that means AC installation, repair and servicing. The quote is free.",
      ],
    },
    es: {
      name: "Villamartín",
      intro: "Muchos vecinos de Villamartín viven aquí todo el año y necesitan un equipo que enfríe en verano y caliente en invierno.",
      body: [
        "Levantada en torno a su campo de golf y a su Plaza, Villamartín es una comunidad asentada de villas y bungalós. Si el aire trabaja todo el año, limpia los filtros antes del calor y antes del primer frío. Una bomba de calor con el filtro sucio gasta más y calienta menos.",
        "Nuestros especialistas cuidan desde un split de dormitorio hasta el sistema de una villa. El aire acondicionado en Villamartín incluye instalación, reparación y mantenimiento. El presupuesto es gratis.",
      ],
    },
  },
  {
    slug: "dehesa-de-campoamor",
    en: {
      name: "Dehesa de Campoamor",
      intro: "Larger villas in Dehesa de Campoamor often need multi-zone AC, so every room stays comfortable without overworking one big unit.",
      body: [
        "One of the greener corners of Orihuela Costa, Dehesa de Campoamor mixes pine-shaded villas with a small marina and a sheltered beach. Rooms in a detached house warm at different hours, so separate zones usually beat one large unit. Pine needles collect around outdoor units too, so keep them clear.",
        "We handle AC installation for ducted and multi-split systems, then AC repair and servicing afterwards. Air conditioning in Dehesa de Campoamor comes with our 3-year guarantee on the work and a 3-year manufacturer warranty, so talk to us first.",
      ],
    },
    es: {
      name: "Dehesa de Campoamor",
      intro: "Las villas grandes de Dehesa de Campoamor suelen pedir un sistema por zonas, para que toda la casa esté cómoda.",
      body: [
        "Uno de los rincones más verdes de Orihuela Costa, Dehesa de Campoamor combina villas entre pinos, un pequeño puerto deportivo y una playa resguardada. En una casa unifamiliar cada estancia se calienta a su hora, así que las zonas independientes suelen rendir más que un equipo grande.",
        "Hacemos la instalación de sistemas por conductos y multisplit, y después la reparación y el mantenimiento. El aire acondicionado en Dehesa de Campoamor lleva 3 años de garantía en la mano de obra y 3 del fabricante: consúltanos antes de comprar.",
      ],
    },
  },
  {
    slug: "mil-palmeras",
    en: {
      name: "Mil Palmeras",
      intro: "Mil Palmeras holiday homes need AC that cools quickly on arrival and starts up cleanly after months shut away.",
      body: [
        "Known for its shallow, palm-lined beach, Mil Palmeras is a compact resort of modern apartments and townhouses, many of them second homes. Before you lock up, run the unit on fan for a while to dry it inside. That helps prevent a musty smell on your next visit.",
        "Away until June? Book AC servicing ahead of your stay, with cleaning from €50, so the air is fresh when you land. We also cover AC installation and repair, which keeps air conditioning in Mil Palmeras easy to manage from a distance.",
      ],
    },
    es: {
      name: "Mil Palmeras",
      intro: "Las casas de vacaciones de Mil Palmeras necesitan un aire que enfríe enseguida al llegar y arranque limpio tras meses cerradas.",
      body: [
        "Conocido por su playa de aguas poco profundas y sus palmeras, Mil Palmeras es un núcleo compacto de apartamentos y adosados modernos, muchos segundas residencias. Antes de cerrar, deja el equipo un rato en modo ventilador para que se seque por dentro. Así evitas el olor a cerrado en la siguiente visita.",
        "¿Vuelves en junio? Reserva el mantenimiento antes de venir, con limpiezas desde 50 €, y encontrarás el aire limpio al llegar. También hacemos instalación y reparación, para que tu aire acondicionado en Mil Palmeras se gestione fácil a distancia.",
      ],
    },
  },
  {
    slug: "torre-de-la-horadada",
    en: {
      name: "Torre de la Horadada",
      intro: "Seafront homes in Torre de la Horadada run their AC hard all summer while wind and salt wear down the outdoor units.",
      body: [
        "Built around its old watchtower, small marina and string of beaches, Torre de la Horadada has apartments and villas right by the water. Fixings rust first, so check the brackets as well as the unit, and deal with spreading rust in spring, not August.",
        "Worn-out unit? AC installation can usually follow within 24 to 72 hours of your request, depending on the season. AC repair covers all major brands, and AC servicing keeps sound units going. For air conditioning in Torre de la Horadada, send us a photo.",
      ],
    },
    es: {
      name: "Torre de la Horadada",
      intro: "Las casas de primera línea en Torre de la Horadada exigen mucho al aire, y el viento y la sal desgastan las unidades exteriores.",
      body: [
        "En torno a su antigua torre vigía, su pequeño puerto y sus playas, Torre de la Horadada tiene apartamentos y villas pegados al agua. Los soportes se oxidan primero, así que míralos también, y si el óxido avanza, revísalo en primavera y no en agosto.",
        "¿Equipo agotado? La instalación del nuevo suele hacerse entre 24 y 72 horas desde tu aviso, según la temporada. La reparación cubre todas las grandes marcas y el mantenimiento alarga su vida. Para aire acondicionado en Torre de la Horadada, mándanos una foto.",
      ],
    },
  },
  {
    slug: "el-raso",
    en: {
      name: "El Raso",
      intro: "El Raso’s modern apartments and bungalows suit neat split systems that cool quickly and stay economical to run.",
      body: [
        "El Raso is a large development near Guardamar del Segura, popular with international owners for its pools, bars and walkable layout. Neighbours are close, so place the outdoor unit away from bedroom windows and pick a quiet inverter. Check your community’s rules on what can show from the street.",
        "Just bought a resale? An older unit may only need AC servicing or a small AC repair, and we’ll say so. For new air conditioning in El Raso, AC installation generally follows 24 to 72 hours after you ask, depending on the season.",
      ],
    },
    es: {
      name: "El Raso",
      intro: "Los apartamentos y bungalós modernos de El Raso son ideales para splits discretos que enfrían rápido y consumen poco.",
      body: [
        "El Raso es una gran urbanización junto a Guardamar del Segura, muy apreciada por propietarios internacionales por sus piscinas, bares y trazado peatonal. Los vecinos están cerca: coloca la unidad exterior lejos de los dormitorios y elige un inverter silencioso. Consulta además las normas de tu comunidad.",
        "¿Piso de segunda mano? Quizá el equipo solo necesite mantenimiento o una pequeña reparación, y te lo diremos. Si partes de cero con el aire acondicionado en El Raso, la instalación suele llevar entre 24 y 72 horas desde tu petición, según la temporada.",
      ],
    },
  },
  {
    slug: "la-marina",
    en: {
      name: "La Marina",
      intro: "In La Marina’s bungalows and quad houses, summer heat builds quickly and pine pollen finds its way into AC filters.",
      body: [
        "Between the pine forest, the dunes and a wide beach, La Marina urbanisation is home to a big international community. Upstairs rooms under a sunny roof terrace warm first, so start there if you’re cooling in stages. Pollen and dust off the pines clog filters, so wash them monthly in summer.",
        "One room or the whole house, AC installation, repair and servicing are all part of our air conditioning in La Marina. Ring or WhatsApp us, in English or Spanish, for an answer within the hour in working hours.",
      ],
    },
    es: {
      name: "La Marina",
      intro: "En los bungalós y casas pareadas de La Marina el calor sube pronto y el polen del pinar acaba en los filtros.",
      body: [
        "Entre el pinar, las dunas y una amplia playa, la urbanización de La Marina reúne una gran comunidad internacional. Las habitaciones bajo una terraza soleada se calientan antes, así que empieza por ahí si climatizas por fases. El polen y el polvo del pinar atascan los filtros: lávalos cada mes en verano.",
        "Una habitación o toda la casa: hacemos instalación, reparación y mantenimiento de aire acondicionado en La Marina. Llámanos o escribe por WhatsApp, en español o en inglés, y respondemos en menos de una hora en horario laboral.",
      ],
    },
  },
  {
    slug: "rojales",
    en: {
      name: "Rojales",
      intro: "From old Rojales town houses by the Segura to villas up the hill, each home calls for a different AC setup.",
      body: [
        "Rojales straddles the River Segura, with its stone bridge and historic cave houses, while Ciudad Quesada adds villas and apartments up the hill. Cave homes stay naturally cool but can be damp, so ventilation often matters more than cooling. A sun-facing villa is the opposite and needs real capacity.",
        "We work with splits, multi-splits, ducted systems and ventilation, so air conditioning in Rojales can match the house. AC repair covers all major brands, and AC installation or AC servicing starts with a free quote. Tell us about your home.",
      ],
    },
    es: {
      name: "Rojales",
      intro: "De las casas antiguas de Rojales junto al Segura a las villas de la loma, cada vivienda necesita una solución distinta.",
      body: [
        "Rojales se extiende a ambas orillas del Segura, con su puente de piedra y sus históricas casas cueva, y Ciudad Quesada suma villas y apartamentos en lo alto. Las cuevas son frescas pero pueden tener humedad, y ahí importa más la ventilación. Una villa al sol es lo contrario y pide potencia de verdad.",
        "Trabajamos con split, multisplit, conductos y ventilación, para que el aire acondicionado en Rojales se ajuste a cada casa. La reparación cubre todas las grandes marcas, y la instalación o el mantenimiento empiezan con un presupuesto gratuito.",
      ],
    },
  },
  {
    slug: "san-fulgencio",
    en: {
      name: "San Fulgencio",
      intro: "San Fulgencio has old village houses and big urbanisations, so good AC advice depends on your kind of home.",
      body: [
        "A small Vega Baja town surrounded by farmland, San Fulgencio also includes the large La Marina urbanisation and a sizeable international population. If you’re adding several units to an older village house, check your contracted electrical power first. Starting them all on a hot afternoon can trip the main switch.",
        "Air conditioning in San Fulgencio covers everything from AC installation in a new bungalow to AC repair on an ageing split, and AC servicing with cleaning from €50. We’re certified for refrigerant handling, so ring us if your unit has stopped cooling.",
      ],
    },
    es: {
      name: "San Fulgencio",
      intro: "San Fulgencio tiene casas antiguas de pueblo y grandes urbanizaciones, y el mejor consejo depende de cuál sea tu vivienda.",
      body: [
        "Pequeño municipio de la Vega Baja rodeado de huerta, San Fulgencio incluye además la gran urbanización de La Marina y una numerosa población internacional. Si vas a poner varios equipos en una casa antigua del pueblo, mira antes la potencia contratada: con todos en marcha puede saltar el general.",
        "El aire acondicionado en San Fulgencio abarca desde la instalación en un bungaló nuevo hasta la reparación de un split veterano, y el mantenimiento con limpieza desde 50 €. Estamos certificados para manipular refrigerantes: llámanos si tu equipo ya no enfría.",
      ],
    },
  },
  {
    slug: "benijofar",
    en: {
      name: "Benijófar",
      intro: "Quiet and close to the Segura, Benijófar feels little sea breeze in high summer, so reliable home cooling really matters.",
      body: [
        "Benijófar is a compact Vega Baja village with traditional terraced houses in the centre and modern villas around the edges. Terraced homes usually have few outside walls, so settle the outdoor unit’s position first, often in a patio or on the roof, and then choose the model.",
        "Bought a unit online? We’ll fit that, or supply one for you. AC installation, repair and servicing are all available, and you’ll get a free quote for your air conditioning in Benijófar with nothing left vague.",
      ],
    },
    es: {
      name: "Benijófar",
      intro: "Tranquilo y cerca del Segura, Benijófar apenas nota la brisa en pleno verano, y una buena refrigeración se agradece de verdad.",
      body: [
        "Benijófar es un pueblo compacto de la Vega Baja, con casas tradicionales entre medianeras en el centro y villas modernas en las afueras. Una casa así tiene pocos muros exteriores: decide primero dónde va la unidad exterior, a menudo en el patio o la azotea, y después el modelo.",
        "¿Has comprado el equipo por internet? Te lo instalamos, y si no, te lo suministramos nosotros. Hacemos instalación, reparación y mantenimiento, y te damos un presupuesto gratuito para tu aire acondicionado en Benijófar sin ambigüedades.",
      ],
    },
  },
  {
    slug: "algorfa",
    en: {
      name: "Algorfa",
      intro: "Around La Finca golf resort and the old village, Algorfa homes benefit from AC that also heats on cool nights.",
      body: [
        "Algorfa is a quiet inland village beside La Finca, where villas and apartments look out over fairways and lemon groves. Nights here cool down more than on the coast, so a heat-pump split can replace old heaters.",
        "We price it for you free of charge. For air conditioning in Algorfa we also provide AC installation in village properties, plus AC repair and servicing on existing systems. Message us the size of your home.",
      ],
    },
    es: {
      name: "Algorfa",
      intro: "Junto al resort de golf La Finca y el pueblo antiguo, en Algorfa compensa un equipo que también caliente las noches frescas.",
      body: [
        "Algorfa es un tranquilo pueblo de interior junto a La Finca, donde villas y apartamentos miran a los greens y a los limonares. Aquí refresca más de noche que en la costa, y un split con bomba de calor puede sustituir a las estufas viejas.",
        "Te lo presupuestamos sin coste. Para el aire acondicionado en Algorfa también hacemos instalación en casas del pueblo, además de reparación y mantenimiento. Escríbenos con los metros de tu vivienda y empezamos.",
      ],
    },
  },
  {
    slug: "benejuzar",
    en: {
      name: "Benejúzar",
      intro: "Benejúzar’s year-round households need AC that handles humid inland summers and stays affordable to run every day.",
      body: [
        "Among the citrus and vegetable fields along the Segura, Benejúzar is a traditional farming town where most homes are lived in all year. If your AC runs daily, the thermostat matters: 25 or 26 degrees feels comfortable coming in from the heat and costs far less than 20.",
        "Fitting a first split in a town house? AC installation usually happens 24 to 72 hours after you ask, depending on the season. We also do AC repair and servicing, so air conditioning in Benejúzar stays looked after long after the fitting day.",
      ],
    },
    es: {
      name: "Benejúzar",
      intro: "Las familias de Benejúzar necesitan un aire que soporte el bochorno y resulte asequible de usar cada día.",
      body: [
        "Entre campos de cítricos y hortalizas junto al Segura, Benejúzar es un pueblo agrícola tradicional donde la mayoría de las casas se habitan todo el año. Si usas el aire a diario, el termostato cuenta: a 25 o 26 grados se está bien y se gasta mucho menos que a 20.",
        "¿Tu primer split en una casa de pueblo? La instalación suele hacerse entre 24 y 72 horas después de pedirla, según la temporada. También hacemos reparación y mantenimiento, para que el aire acondicionado en Benejúzar siga bien atendido mucho después del montaje.",
      ],
    },
  },
  {
    slug: "jacarilla",
    en: {
      name: "Jacarilla",
      intro: "Village houses and newer builds in Jacarilla both need dependable cooling once the still inland heat settles in each summer.",
      body: [
        "Known for its palace and gardens, Jacarilla sits among the Vega Baja orchards near Orihuela. Bedrooms off a corridor rarely cool properly from a single split in the lounge, so a multi-split, with several indoor units on one outdoor unit, is often the tidier answer.",
        "Our AC repair and servicing cover the refrigerant checks that keep systems efficient, carried out by certified staff. AC installation is available for any home size. If you’re comparing options for air conditioning in Jacarilla, we’ll happily give you a free, clear quote.",
      ],
    },
    es: {
      name: "Jacarilla",
      intro: "Casas de pueblo y viviendas nuevas de Jacarilla necesitan una refrigeración fiable cuando llega el calor quieto del interior.",
      body: [
        "Conocida por su palacio y sus jardines, Jacarilla se asienta entre los huertos de la Vega Baja, cerca de Orihuela. Los dormitorios de un pasillo rara vez se enfrían con un solo split en el salón; un multisplit, con varias unidades interiores y una exterior, suele ser más limpio.",
        "Nuestra reparación y nuestro mantenimiento incluyen las comprobaciones de refrigerante, a cargo de personal certificado. La instalación la hacemos en casas de cualquier tamaño. Si estás comparando opciones de aire acondicionado en Jacarilla, te damos un presupuesto claro y gratuito.",
      ],
    },
  },
  {
    slug: "bigastro",
    en: {
      name: "Bigastro",
      intro: "Bigastro sits inland among orange groves where little sea breeze reaches, so well-fitted AC makes summer nights far easier.",
      body: [
        "Close to Orihuela, Bigastro is a tight-knit town of family homes. Bedrooms hold the day’s heat long after sunset, so a timer or night mode can cool them before bed without running until morning. Ask for the indoor unit to be placed so the air doesn’t blow straight onto the bed.",
        "Details like that make a good AC installation. We also take on AC repair and servicing on all major brands. For air conditioning in Bigastro, call or WhatsApp during working hours and you’ll have a reply within the hour.",
      ],
    },
    es: {
      name: "Bigastro",
      intro: "Bigastro está tierra adentro, entre naranjos, donde apenas llega la brisa, y un aire bien instalado cambia las noches de verano.",
      body: [
        "Cerca de Orihuela, Bigastro es un pueblo de casas familiares. Los dormitorios guardan el calor del día hasta bien entrada la noche: con el temporizador o el modo noche los enfrías antes de acostarte sin dejarlo toda la noche. Pide que la unidad interior no sople sobre la cama.",
        "Esos detalles forman parte de una buena instalación. También hacemos reparación y mantenimiento de todas las grandes marcas. Para el aire acondicionado en Bigastro, llámanos en horario laboral o déjanos un WhatsApp y te contestamos en menos de una hora.",
      ],
    },
  },
  {
    slug: "vistabella",
    en: {
      name: "Vistabella",
      intro: "Modern homes around Vistabella Golf want efficient comfort all year, and any existing AC pre-installation can make fitting simpler.",
      body: [
        "Close to Jacarilla, Vistabella blends a small original village with rows of modern villas and golf-side homes popular with international buyers. Check if your new-build came with pre-installed pipework or ducts. If it did, AC installation is usually simpler, though the system still needs sizing for your home.",
        "A heat-pump split handles both summer and winter here. We also carry out AC repair and servicing across the area. To plan air conditioning in Vistabella, send us your floor plan, or a sketch of it, for a free quote.",
      ],
    },
    es: {
      name: "Vistabella",
      intro: "Las casas modernas de Vistabella Golf buscan confort todo el año, y una preinstalación, si la tienes, simplifica mucho el montaje.",
      body: [
        "Junto a Jacarilla, Vistabella mezcla un pequeño núcleo original con hileras de villas modernas y casas junto al golf populares entre compradores internacionales. Comprueba si tu obra nueva trae preinstalación de tubos o conductos. Si la trae, la instalación suele ser más sencilla, aunque el equipo hay que dimensionarlo igual.",
        "Aquí un split con bomba de calor sirve para verano e invierno. También hacemos reparación y mantenimiento en toda la zona. Para organizar tu aire acondicionado en Vistabella, envíanos el plano, o un croquis, y te hacemos un presupuesto gratuito.",
      ],
    },
  },
  {
    slug: "los-montesinos",
    en: {
      name: "Los Montesinos",
      intro: "Behind Torrevieja’s salt lakes, Los Montesinos has plenty of bungalows and villas where the right split keeps running costs down.",
      body: [
        "Los Montesinos has grown around areas such as La Herrada, with Spanish and international neighbours in modern bungalows and villas. For most of these homes an inverter split is the economical choice, because it slows down once the room is cool instead of switching fully on and off.",
        "Replacing an older model? AC installation usually follows 24 to 72 hours after your request, depending on the season. For air conditioning in Los Montesinos we handle AC repair and servicing too, whatever the make.",
      ],
    },
    es: {
      name: "Los Montesinos",
      intro: "Detrás de las salinas de Torrevieja, Los Montesinos tiene muchos bungalós y villas donde el split adecuado reduce el gasto de luz.",
      body: [
        "Los Montesinos ha crecido alrededor de zonas como La Herrada, con vecinos españoles e internacionales en bungalós y villas modernos. En la mayoría de estas casas lo más económico es un split inverter, que baja el ritmo cuando la habitación ya está fresca.",
        "Si vas a cambiar un equipo antiguo, la instalación suele hacerse entre 24 y 72 horas tras tu petición, según la temporada. Para el aire acondicionado en Los Montesinos también nos ocupamos de la reparación y el mantenimiento, sea cual sea la marca.",
      ],
    },
  },
  {
    slug: "daya-nueva",
    en: {
      name: "Daya Nueva",
      intro: "Far from the coast, Daya Nueva gets hot and still in summer, which makes properly fitted AC a sensible investment.",
      body: [
        "In the flat, irrigated heart of the Vega Baja, Daya Nueva is a quiet farming village of traditional homes with a small international community. West-facing rooms take the worst of the late sun, so close the shutters by day and your unit has far less to do at night.",
        "We offer AC installation for new splits, AC repair for faults and AC servicing for neglected units. If air conditioning in Daya Nueva is on your list, ask for a free quote and we’ll go through the options in plain language.",
      ],
    },
    es: {
      name: "Daya Nueva",
      intro: "Lejos de la costa, Daya Nueva se vuelve calurosa y sin viento en verano, y un aire bien instalado es una buena inversión.",
      body: [
        "En el corazón llano y de regadío de la Vega Baja, Daya Nueva es un tranquilo pueblo agrícola de casas tradicionales con una pequeña comunidad internacional. Las habitaciones al oeste se llevan el sol de la tarde: baja las persianas durante el día y el equipo trabajará mucho menos por la noche.",
        "Hacemos instalación de splits nuevos, reparación de averías y mantenimiento de equipos sin revisar. Si el aire acondicionado en Daya Nueva está en tu lista, pide presupuesto gratis y te explicamos las opciones sin tecnicismos.",
      ],
    },
  },
  {
    slug: "daya-vieja",
    en: {
      name: "Daya Vieja",
      intro: "In Daya Vieja, one well-placed split can be enough to keep a small house cool through heavy, breeze-free summer nights.",
      body: [
        "One of the smallest villages in the Vega Baja, Daya Vieja sits among orange groves with a close community of locals and overseas residents. Not every home needs a big system. In a small house, a single split in the main bedroom may be all you need.",
        "We’ll take on a one-room AC installation, a single AC repair or routine AC servicing, with cleaning from €50. So if air conditioning in Daya Vieja seems like a small job to you, get in touch anyway.",
      ],
    },
    es: {
      name: "Daya Vieja",
      intro: "En Daya Vieja, un split bien colocado puede bastar para mantener fresca una casa pequeña durante las noches pesadas y sin brisa.",
      body: [
        "Uno de los pueblos más pequeños de la Vega Baja, Daya Vieja es un rincón entre naranjos con una comunidad cercana de vecinos locales y extranjeros. No todas las casas necesitan un gran sistema: en una vivienda pequeña, puede que te llegue con un split en el dormitorio principal.",
        "Hacemos la instalación de una sola habitación, una reparación puntual o el mantenimiento habitual, con limpiezas desde 50 €. Si crees que tu aire acondicionado en Daya Vieja es poca cosa, escríbenos igualmente.",
      ],
    },
  },
  {
    slug: "santiago-de-la-ribera",
    en: {
      name: "Santiago de la Ribera",
      intro: "Apartments along the Santiago de la Ribera seafront need AC that can take lagoon humidity and long, warm evenings.",
      body: [
        "On the calm western shore of the Mar Menor, Santiago de la Ribera has a long promenade, the San Javier air base nearby and a strong year-round community. Muggy air means plenty of condensation, and a blocked drain often causes drips indoors, so have it cleared at each service.",
        "If water is running down your wall, call us for AC repair. Our AC servicing and AC installation cover apartments and townhouses along the front. For air conditioning in Santiago de la Ribera, start with a free quote, in Spanish or English.",
      ],
    },
    es: {
      name: "Santiago de la Ribera",
      intro: "Los apartamentos del paseo de Santiago de la Ribera necesitan un aire que soporte la humedad de la laguna y las noches templadas.",
      body: [
        "En la tranquila orilla oeste del Mar Menor, Santiago de la Ribera tiene un largo paseo marítimo, la base aérea de San Javier cerca y mucha vida todo el año. El ambiente húmedo genera mucha condensación, y un desagüe atascado es causa habitual de goteras interiores: pide que lo limpien en cada revisión.",
        "Si te cae agua por la pared, avísanos para la reparación. Hacemos mantenimiento e instalación en pisos y adosados de todo el paseo. Tu aire acondicionado en Santiago de la Ribera empieza con un presupuesto gratuito.",
      ],
    },
  },
  {
    slug: "balsicas",
    en: {
      name: "Balsicas",
      intro: "Balsicas misses the Mar Menor breeze, so its dry, scorching summers call for efficient AC sized to the local heat.",
      body: [
        "A working inland village in the Torre-Pacheco area, Balsicas has its train station, town homes and a steady flow of people heading for the coast. Outdoor units left in full sun on a roof work harder. A ventilated shade helps, but never box one in.",
        "Our AC installation includes finding the best spot for the unit, and our AC repair and servicing cover all major brands. For air conditioning in Balsicas, a phone call or WhatsApp gets you a reply within the hour during the working day.",
      ],
    },
    es: {
      name: "Balsicas",
      intro: "A Balsicas no llega la brisa del Mar Menor, y sus veranos secos y abrasadores piden un equipo eficiente y bien dimensionado.",
      body: [
        "Pueblo trabajador de interior en la zona de Torre-Pacheco, Balsicas tiene su estación de tren, casas de pueblo y un trasiego constante de gente hacia la costa. Una unidad exterior a pleno sol en la azotea trabaja más. Una sombra ventilada ayuda, pero nunca la encierres.",
        "En la instalación buscamos el mejor sitio para la unidad, y la reparación y el mantenimiento abarcan todas las grandes marcas. Para aire acondicionado en Balsicas, con una llamada o un WhatsApp tienes respuesta en menos de una hora durante la jornada laboral.",
      ],
    },
  },
  {
    slug: "roldan",
    en: {
      name: "Roldán",
      intro: "Roldán’s modern villas and apartments need neat AC that handles dry, intense summers and stays economical to run.",
      body: [
        "Roldán is a growing town in the Torre-Pacheco area, with modern homes close to golf resorts and within reach of the Mar Menor beaches. If your AC has lost its punch, don’t settle for a gas top-up alone. A sealed system shouldn’t lose refrigerant, so find the leak first.",
        "We’re certified for refrigerant handling, which makes AC repair like this routine work. AC installation and AC servicing are covered too, on units we supply or you bought. For air conditioning in Roldán, describe the fault and we’ll tell you the next step.",
      ],
    },
    es: {
      name: "Roldán",
      intro: "Las villas y apartamentos modernos de Roldán necesitan un aire discreto que aguante veranos secos e intensos y gaste poco.",
      body: [
        "Roldán es una localidad en crecimiento de la zona de Torre-Pacheco, con viviendas modernas cerca de resorts de golf y de las playas del Mar Menor. Si tu aire ha perdido fuerza, no te conformes con recargar gas: un circuito sellado no debería perderlo, así que primero hay que encontrar la fuga.",
        "Estamos certificados para manipular refrigerantes, así que esa reparación es cosa nuestra. También hacemos instalación y mantenimiento, con equipos nuestros o comprados por ti. Para el aire acondicionado en Roldán, cuéntanos qué le pasa y te decimos el siguiente paso.",
      ],
    },
  },
  {
    slug: "gea-y-truyols",
    en: {
      name: "Gea y Truyols",
      intro: "Country homes in Gea y Truyols often have big, open rooms, so AC must suit the layout as well as the heat.",
      body: [
        "Gea y Truyols is a small rural settlement near Sucina, surrounded by farmland, with fincas and newer villas facing hot, dry summers. A large open room may need more than one indoor unit, and a long pipe run to the outdoor unit costs efficiency, so keep the two reasonably close.",
        "Fincas can also suit ducted air or a heat pump for winter, and we’ll explain the difference. For air conditioning in Gea y Truyols, covering AC installation, repair and servicing, start with a free quote.",
      ],
    },
    es: {
      name: "Gea y Truyols",
      intro: "Las casas de campo de Gea y Truyols tienen a menudo estancias amplias, y el equipo debe adaptarse a la distribución.",
      body: [
        "Gea y Truyols es una pequeña pedanía rural cerca de Sucina, rodeada de cultivos, con fincas y villas nuevas y veranos calurosos y secos. Un salón grande y abierto puede necesitar más de una unidad interior, y un tramo largo de tubería resta eficiencia, así que conviene acercar la exterior.",
        "Las fincas también pueden ir bien con conductos o con bomba de calor para el invierno, y te explicamos la diferencia. Para el aire acondicionado en Gea y Truyols, con instalación, reparación y mantenimiento, lo primero es un presupuesto gratuito.",
      ],
    },
  },
  {
    slug: "la-tercia",
    en: {
      name: "La Tercia",
      intro: "Sun-exposed country properties in La Tercia get very hot, so they need well-sized AC and filters kept free of dust.",
      body: [
        "La Tercia is a quiet rural area of country homes and newer plots, within reach of the Mar Menor and its golf courses. On an open plot, put the outdoor unit on the shadiest side of the house, and check the filters after windy days, because dust from the fields builds up fast.",
        "A clean costs from €50, and a dust-free unit cools better. We also do AC installation and repair, plus regular AC servicing. Air conditioning in La Tercia can be arranged by phone or WhatsApp, whichever suits you.",
      ],
    },
    es: {
      name: "La Tercia",
      intro: "Muy expuestas al sol, las casas de campo de La Tercia necesitan un equipo bien dimensionado y filtros sin polvo.",
      body: [
        "La Tercia es una zona rural tranquila de casas de campo y parcelas más nuevas, a poca distancia del Mar Menor y sus campos de golf. En una parcela abierta, coloca la unidad exterior en la cara más sombreada de la casa y mira los filtros tras los días de viento: el polvo del campo se acumula rápido.",
        "Una limpieza cuesta desde 50 €, y un equipo sin polvo enfría mejor. También hacemos instalación, reparación y mantenimiento periódico. Tu aire acondicionado en La Tercia se organiza por teléfono o por WhatsApp.",
      ],
    },
  },
  {
    slug: "sucina",
    en: {
      name: "Sucina",
      intro: "Sucina’s village houses and golf-resort homes sit inland, where summers run hotter and drier than on the coast.",
      body: [
        "Sucina is a small village in the Murcia countryside, with the Hacienda Riquelme and Peraleja golf resorts close by and plenty of second homes among them. Inland heat builds through the afternoon and lingers. An oversized unit cools fast, then keeps switching on and off and leaves the room clammy, so the right size matters more than raw power.",
        "Tell us the room sizes and which way they face, and we’ll recommend the power you need. For air conditioning in Sucina we handle AC installation, repair and servicing, and many owners book a service before they arrive for the season.",
      ],
    },
    es: {
      name: "Sucina",
      intro: "Las casas de pueblo y de resort de golf de Sucina están en el interior, donde el verano es más seco y caluroso que en la costa.",
      body: [
        "Sucina es un pueblo pequeño del campo de Murcia, con los resorts de golf Hacienda Riquelme y Peraleja al lado y muchas segundas residencias. El calor del interior se acumula por la tarde y tarda en irse. Un equipo sobredimensionado enfría rápido, pero arranca y para sin parar y deja la estancia húmeda: importa más acertar con la potencia que tener mucha.",
        "Dinos los metros de cada estancia y su orientación y te recomendamos la potencia adecuada. Para el aire acondicionado en Sucina hacemos instalación, reparación y mantenimiento, y muchos propietarios piden la revisión antes de llegar para la temporada.",
      ],
    },
  },
  {
    slug: "avileses",
    en: {
      name: "Avileses",
      intro: "In Avileses, single-storey village houses take the full inland sun, so shade and unit placement count.",
      body: [
        "Avileses is a small village between Sucina and Balsicas, surrounded by farmland. Many homes are single-storey, with roofs that soak up heat all day. Dust from the fields also clogs filters sooner, so rinse them more often in summer.",
        "We fit the outdoor unit where it gets air and some shade, and keep the pipe run short and tidy. For air conditioning in Avileses, including AC installation, repair and servicing, send us a WhatsApp and we reply within the hour during working hours.",
      ],
    },
    es: {
      name: "Avileses",
      intro: "En Avileses, las casas de una planta reciben todo el sol del interior: la sombra y el sitio de la unidad cuentan.",
      body: [
        "Avileses es un pueblo pequeño entre Sucina y Balsicas, rodeado de campo. Muchas casas son de una sola planta, con cubiertas que acumulan calor todo el día. El polvo de los cultivos también ensucia antes los filtros, así que lávalos más a menudo en verano.",
        "Colocamos la unidad exterior donde tenga aire y algo de sombra, con la tubería corta y bien rematada. Para el aire acondicionado en Avileses, con instalación, reparación y mantenimiento, escríbenos por WhatsApp y te contestamos en menos de una hora en horario laboral.",
      ],
    },
  },
  {
    slug: "el-jimenado",
    en: {
      name: "El Jimenado",
      intro: "El Jimenado is a quiet village near Roldán, where older houses often still need their first proper AC.",
      body: [
        "A small village in the Torre-Pacheco area, El Jimenado sits a few minutes from Roldán, among fields and country houses. Older homes with thick walls stay cool in the morning but hold the heat at night, which is when a quiet bedroom unit earns its keep.",
        "In an older house we plan the pipe route before drilling, so the installation stays neat inside and out. For air conditioning in El Jimenado we cover AC installation, repair and servicing on all major brands, with a free quote first.",
      ],
    },
    es: {
      name: "El Jimenado",
      intro: "El Jimenado es un pueblo tranquilo junto a Roldán, donde muchas casas antiguas aún no tienen un buen aire acondicionado.",
      body: [
        "Pequeño pueblo de la zona de Torre-Pacheco, El Jimenado está a pocos minutos de Roldán, entre campos y casas de campo. Las casas antiguas de muros gruesos aguantan frescas por la mañana, pero guardan el calor de noche, y ahí es donde se agradece un equipo silencioso en el dormitorio.",
        "En una casa antigua estudiamos el recorrido de la tubería antes de taladrar, para que la instalación quede limpia por dentro y por fuera. Para el aire acondicionado en El Jimenado hacemos instalación, reparación y mantenimiento de todas las grandes marcas, siempre con presupuesto gratis antes.",
      ],
    },
  },
  {
    slug: "dolores-de-pacheco",
    en: {
      name: "Dolores de Pacheco",
      intro: "Dolores de Pacheco lies between Torre-Pacheco and the Mar Menor, close enough to the lagoon for humid summer nights.",
      body: [
        "Dolores de Pacheco is a village in the Torre-Pacheco area, a short drive from Los Alcázares and San Javier. The air here carries more humidity than further inland, so the dry mode on your unit helps on sticky nights and uses less power than full cooling.",
        "If water drips indoors, the drain is usually blocked, and that is a quick fix. For air conditioning in Dolores de Pacheco we provide AC installation, AC repair and AC servicing, in English or Spanish. Message us and we’ll arrange a visit.",
      ],
    },
    es: {
      name: "Dolores de Pacheco",
      intro: "Dolores de Pacheco queda entre Torre-Pacheco y el Mar Menor, lo bastante cerca de la laguna para notar la humedad en verano.",
      body: [
        "Dolores de Pacheco es un pueblo de la zona de Torre-Pacheco, a un paso de Los Alcázares y San Javier. Aquí el aire trae más humedad que tierra adentro, y el modo deshumidificación ayuda en las noches pegajosas gastando menos que el frío a tope.",
        "Si gotea agua dentro de casa, lo normal es que el desagüe esté atascado, y se arregla rápido. Para el aire acondicionado en Dolores de Pacheco hacemos instalación, reparación y mantenimiento, en español o en inglés. Escríbenos y organizamos la visita.",
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
    // The owner's map of the Murcia zone (Nov 2026): north to Sucina, west to
    // El Jimenado, south to Los Alcázares. Nothing towards Cartagena or La Manga.
    title: { en: 'Mar Menor · Murcia', es: 'Mar Menor · Murcia' },
    towns: [
      { name: 'San Pedro del Pinatar', slug: 'san-pedro-del-pinatar' },
      { name: 'Santiago de la Ribera', slug: 'santiago-de-la-ribera' },
      { name: 'San Javier', slug: 'san-javier' },
      { name: 'Los Alcázares', slug: 'los-alcazares' },
      { name: 'Dolores de Pacheco', slug: 'dolores-de-pacheco' },
      { name: 'Torre Pacheco', slug: 'torre-pacheco' },
      { name: 'El Jimenado', slug: 'el-jimenado' },
      { name: 'Roldán', slug: 'roldan' },
      { name: 'Balsicas', slug: 'balsicas' },
      { name: 'Avileses', slug: 'avileses' },
      { name: 'Sucina', slug: 'sucina' },
      { name: 'Gea y Truyols', slug: 'gea-y-truyols' },
      { name: 'La Tercia', slug: 'la-tercia' },
    ],
  },
];
