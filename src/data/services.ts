import type { Locale } from '../config';

type ServiceIcon = 'ac-unit' | 'wrench' | 'shield-check' | 'sparkles';

interface ServiceCopy {
  title: string; // short label (cards, nav)
  blurb: string; // one-line (home cards)
  h1: string; // page heading
  intro: string; // page intro paragraph
  meta: string; // search-result description
  includesTitle: string;
  includes: string[];
  pointsTitle: string;
  points: string[];
  stepsTitle: string;
  steps: string[]; // a real sequence, shown numbered
  guideTitle: string;
  guide: string[]; // useful long-form advice: the page's organic-search content
  faq: { q: string; a: string }[];
}

export interface Service {
  slug: 'installation' | 'repair' | 'maintenance' | 'cleaning';
  esSlug: 'instalacion' | 'reparacion' | 'mantenimiento' | 'limpieza';
  icon: ServiceIcon;
  /** Real job photo used on cards and the page header. */
  image: string;
  en: ServiceCopy;
  es: ServiceCopy;
}

/**
 * The four core services. Facts follow the owner's brief (Nov 2026): reply within
 * the hour in working hours; no percentage or hygiene claims without proof.
 */
export const SERVICES: Service[] = [
  {
    slug: 'installation',
    esSlug: 'instalacion',
    icon: 'ac-unit',
    image: '/gallery/work-43.webp',
    en: {
      title: 'Installation',
      blurb: 'New units sized for your rooms, fitted cleanly and guaranteed for 3 years.',
      h1: 'Air conditioning installation on the Costa Blanca',
      intro:
        'We supply and fit split, multi-split, ducted and cassette air conditioning for homes, restaurants and small businesses. Most installs happen within 24 to 72 hours of your request, with a 3-year guarantee on the work.',
      meta: 'AC installation on the Costa Blanca: split, multi-split, ducted and cassette. Free quote, usually fitted within 24 to 72 hours, 3-year guarantee.',
      includesTitle: "What's included",
      includes: [
        'A free visit to check the rooms and advise on the right unit and power',
        'Efficient inverter units from leading brands, or your own unit if you already have one',
        'Neat pipework, drainage and electrical connection',
        'Testing, start-up and a walkthrough of the controls',
        '3-year guarantee on our work, plus the 3-year manufacturer warranty on the unit',
      ],
      pointsTitle: 'Which system suits you',
      points: [
        'Split: one indoor unit, ideal for a bedroom or living room',
        'Multi-split: several indoor units on one outdoor unit, good for apartments and townhouses',
        'Ducted: hidden in a false ceiling, with air sent to each room through grilles',
        'Cassette: set into the ceiling, common in shops and restaurants',
      ],
      stepsTitle: 'How an installation works',
      steps: [
        'Tell us what you need by phone, WhatsApp or the form. We reply within the hour during working hours.',
        'We advise on the unit, visit if needed and give you a clear, free quote.',
        'Our team fits the system, usually within 24 to 72 hours of your request, depending on the season.',
        'We test everything, show you the controls and leave the place tidy.',
      ],
      guideTitle: 'Choosing the right air conditioning',
      guide: [
        'The right size matters more than the brand. A unit that is too small runs flat out and never quite cools the room, while one that is too big switches on and off and wastes energy. Before recommending anything, we look at the room size, sun exposure, insulation and how you use the space.',
        'Most systems sold on the Costa Blanca are heat pumps, so the same unit cools in summer and heats on winter evenings. If you are building or reforming, we can do the pre-installation, running the pipework and cabling in advance so the unit goes in later without mess. Your quote sets out what is included, so you know the price before any work starts.',
      ],
      faq: [
        { q: 'How long does an installation take?', a: 'Most single-split installations are finished in a few hours, usually the same day. Larger multi-split or ducted systems take longer, and we tell you how long when we quote.' },
        { q: 'How soon can you fit my air conditioning?', a: 'Usually within 24 to 72 hours of your request. In peak summer it can take a little longer, so ask us for the soonest slot.' },
        { q: 'Do you supply the unit or just install it?', a: 'Both. We can supply a unit from our seasonal offers or fit one you already bought.' },
        { q: 'How much does installation cost?', a: 'It depends on the unit and the property, so we give you a clear, free quote first. Seasonal offers with basic installation included start from €609.' },
      ],
    },
    es: {
      title: 'Instalación',
      blurb: 'Equipos nuevos a la medida de tu vivienda, instalados con limpieza y 3 años de garantía.',
      h1: 'Instalación de aire acondicionado en la Costa Blanca',
      intro:
        'Suministramos e instalamos aire acondicionado split, multisplit, por conductos y cassette para viviendas, restaurantes y pequeños negocios. La mayoría de instalaciones se hacen entre 24 y 72 horas después de tu solicitud, con 3 años de garantía en el trabajo.',
      meta: 'Instalación de aire acondicionado en la Costa Blanca: split, multisplit, conductos y cassette. Presupuesto gratis, normalmente en 24 a 72 horas y 3 años de garantía.',
      includesTitle: 'Qué incluye',
      includes: [
        'Visita gratuita para ver las estancias y aconsejarte el equipo y la potencia',
        'Equipos inverter eficientes de marcas líderes, o el tuyo si ya lo tienes',
        'Tubería, desagüe y conexión eléctrica bien rematados',
        'Pruebas, puesta en marcha y explicación del mando',
        '3 años de garantía en nuestro trabajo, más los 3 años del fabricante en el equipo',
      ],
      pointsTitle: 'Qué sistema te conviene',
      points: [
        'Split: una unidad interior, ideal para un dormitorio o salón',
        'Multisplit: varias unidades interiores con una sola exterior, perfecto para pisos y adosados',
        'Conductos: oculto en el falso techo, con rejillas en cada estancia',
        'Cassette: empotrado en el techo, habitual en tiendas y restaurantes',
      ],
      stepsTitle: 'Cómo funciona una instalación',
      steps: [
        'Cuéntanos qué necesitas por teléfono, WhatsApp o el formulario. Respondemos en menos de una hora en horario laboral.',
        'Te aconsejamos el equipo, vamos a verlo si hace falta y te damos un presupuesto claro y gratuito.',
        'Nuestro equipo hace la instalación, normalmente entre 24 y 72 horas después de tu solicitud, según la temporada.',
        'Lo probamos todo, te explicamos el mando y lo dejamos todo limpio.',
      ],
      guideTitle: 'Cómo elegir el aire acondicionado adecuado',
      guide: [
        'La potencia importa más que la marca. Un equipo pequeño trabaja al máximo y nunca llega a enfriar la estancia, y uno demasiado grande arranca y para sin parar y gasta de más. Antes de recomendarte nada miramos los metros, la orientación, el aislamiento y cómo usas el espacio.',
        'La mayoría de equipos que se instalan en la Costa Blanca son bomba de calor: el mismo aparato enfría en verano y calienta las noches de invierno. Si estás construyendo o reformando, podemos hacer la preinstalación y dejar la tubería y el cableado listos para colocar el equipo después sin obras. El presupuesto detalla qué incluye, así que sabes el precio antes de empezar.',
      ],
      faq: [
        { q: '¿Cuánto tarda una instalación?', a: 'La mayoría de splits se instalan en unas horas, normalmente en el mismo día. Los multisplit o por conductos llevan más tiempo y te lo decimos al presupuestar.' },
        { q: '¿Cuándo podéis instalarlo?', a: 'Normalmente entre 24 y 72 horas después de tu solicitud. En pleno verano puede ser algo más, pregúntanos por la cita más próxima.' },
        { q: '¿Suministráis el equipo o solo lo instaláis?', a: 'Las dos cosas. Podemos suministrar un equipo de nuestras ofertas o instalar el que ya hayas comprado.' },
        { q: '¿Cuánto cuesta la instalación?', a: 'Depende del equipo y de la vivienda, por eso primero te damos un presupuesto claro y gratuito. Las ofertas de temporada con instalación básica incluida empiezan en 609 €.' },
      ],
    },
  },
  {
    slug: 'repair',
    esSlug: 'reparacion',
    icon: 'wrench',
    image: '/gallery/work-01.webp',
    en: {
      title: 'Repair',
      blurb: 'Not cooling, leaking or noisy? We find the fault and fix it, on any brand.',
      h1: 'Air conditioning repair on the Costa Blanca',
      intro:
        'Not cooling, leaking, noisy or showing an error code? We repair all makes of air conditioning across the Costa Blanca. Send us a message and we reply within the hour during working hours.',
      meta: 'AC repair on the Costa Blanca, all brands: not cooling, leaks, noise, error codes. We reply within the hour during working hours. Call or WhatsApp.',
      includesTitle: 'What we do',
      includes: [
        'Fault diagnosis on site',
        'Repairs for cooling, leaks, noise and electrical faults',
        'Leak detection and refrigerant top-up by certified staff',
        'Replacement of worn or faulty parts',
        'Any brand: Daikin, Mitsubishi, LG, Panasonic, Giatsu and more',
        'Straight advice on whether to repair or replace',
      ],
      pointsTitle: 'Common faults we fix',
      points: [
        "It runs but doesn't cool or heat",
        'Water dripping from the indoor unit',
        'Noise, rattling or vibration',
        "It won't start or ignores the remote",
        'An error code on the display',
        'A bad smell or weak airflow',
      ],
      stepsTitle: 'How a repair works',
      steps: [
        'Tell us the symptoms, the brand and any error code. A photo on WhatsApp helps.',
        'We reply within the hour during working hours and arrange a visit.',
        'We find the cause and tell you the cost before we start.',
        'Once you agree, we fix it and check the whole system is working properly.',
      ],
      guideTitle: 'Quick checks before you call',
      guide: [
        'Some problems are simple. Check the remote batteries and the mode (cool, not fan or dry), make sure the breaker has not tripped, and look at the filters. Blocked filters are one of the most common reasons a unit stops cooling properly.',
        'If water is dripping indoors, switch the unit off, as the drain is probably blocked. If it cools weakly or ice forms on the pipes, it may be short of refrigerant, which points to a leak that needs a certified technician. Note down any error code on the display, because it tells us a lot before we arrive.',
      ],
      faq: [
        { q: 'Do you repair all brands?', a: 'Yes, we repair all major brands of air conditioning, including units we did not install.' },
        { q: 'How quickly will you answer?', a: 'We reply within the hour during working hours. WhatsApp is the fastest way, and we arrange the visit from there.' },
        { q: 'How much does a repair cost?', a: 'It depends on the fault, so we quote once we have diagnosed it. You know the price before we start.' },
        { q: 'Is it worth repairing an old unit?', a: 'Often, yes. If the repair would cost close to a new unit, we tell you so you can decide.' },
      ],
    },
    es: {
      title: 'Reparación',
      blurb: '¿No enfría, gotea o hace ruido? Encontramos la avería y la reparamos, sea cual sea la marca.',
      h1: 'Reparación de aire acondicionado en la Costa Blanca',
      intro:
        '¿No enfría, gotea, hace ruido o muestra un código de error? Reparamos aire acondicionado de todas las marcas en la Costa Blanca. Escríbenos y te respondemos en menos de una hora en horario laboral.',
      meta: 'Reparación de aire acondicionado en la Costa Blanca, todas las marcas: no enfría, fugas, ruidos, códigos de error. Respondemos en menos de una hora en horario laboral.',
      includesTitle: 'Qué hacemos',
      includes: [
        'Diagnóstico de la avería en tu casa o negocio',
        'Reparación de problemas de frío, fugas, ruidos y fallos eléctricos',
        'Detección de fugas y recarga de gas por personal certificado',
        'Sustitución de piezas gastadas o defectuosas',
        'Cualquier marca: Daikin, Mitsubishi, LG, Panasonic, Giatsu y más',
        'Te decimos claramente si compensa reparar o cambiar el equipo',
      ],
      pointsTitle: 'Averías que reparamos',
      points: [
        'Funciona pero no enfría ni calienta',
        'Gotea agua de la unidad interior',
        'Ruidos, golpeteo o vibración',
        'No arranca o no responde al mando',
        'Un código de error en la pantalla',
        'Mal olor o poco caudal de aire',
      ],
      stepsTitle: 'Cómo funciona una reparación',
      steps: [
        'Cuéntanos los síntomas, la marca y el código de error si lo hay. Una foto por WhatsApp ayuda.',
        'Te respondemos en menos de una hora en horario laboral y acordamos la visita.',
        'Localizamos la causa y te decimos el precio antes de empezar.',
        'Cuando das el visto bueno, lo reparamos y comprobamos que todo funciona bien.',
      ],
      guideTitle: 'Comprobaciones rápidas antes de llamar',
      guide: [
        'Algunos problemas son sencillos. Revisa las pilas del mando y el modo (frío, no ventilación ni deshumidificación), comprueba que no haya saltado el diferencial y mira los filtros. Unos filtros sucios son una de las causas más habituales de que un equipo deje de enfriar bien.',
        'Si gotea agua por dentro, apaga el equipo, porque lo más probable es que el desagüe esté atascado. Si enfría poco o se forma hielo en los tubos, puede faltarle gas, lo que apunta a una fuga que debe revisar un técnico certificado. Apunta el código de error de la pantalla, nos dice mucho antes de llegar.',
      ],
      faq: [
        { q: '¿Reparáis todas las marcas?', a: 'Sí, reparamos todas las marcas principales, también equipos que no hemos instalado nosotros.' },
        { q: '¿Con qué rapidez respondéis?', a: 'Respondemos en menos de una hora en horario laboral. Lo más rápido es WhatsApp, y desde ahí acordamos la visita.' },
        { q: '¿Cuánto cuesta una reparación?', a: 'Depende de la avería, por eso la presupuestamos tras el diagnóstico. Sabes el precio antes de empezar.' },
        { q: '¿Merece la pena reparar un equipo antiguo?', a: 'Muchas veces sí. Si la reparación se acerca al precio de uno nuevo, te lo decimos para que decidas.' },
      ],
    },
  },
  {
    slug: 'maintenance',
    esSlug: 'mantenimiento',
    icon: 'shield-check',
    image: '/gallery/work-55.webp',
    en: {
      title: 'Maintenance',
      blurb: 'A yearly service keeps your AC efficient and helps avoid summer breakdowns.',
      h1: 'Air conditioning maintenance & servicing on the Costa Blanca',
      intro:
        'A yearly service keeps your air conditioning cooling properly, costs less to run and makes a breakdown in a heatwave far less likely. We service homes and businesses across the Costa Blanca, on all major brands.',
      meta: 'AC maintenance and servicing on the Costa Blanca: inspection, filters, coils, drainage and performance check. All major brands. Free quote by phone or WhatsApp.',
      includesTitle: 'What a service includes',
      includes: [
        'Inspection of the indoor and outdoor units',
        'Filter and coil cleaning',
        'Drainage check',
        'Refrigerant pressure check',
        'Electrical connections check',
        'Performance test, and a clear note of anything that needs attention',
      ],
      pointsTitle: 'Why service your AC',
      points: [
        'Lower bills from an efficient system',
        'Cleaner air indoors',
        'Fewer breakdowns and a longer life',
        'Many manufacturers ask for regular servicing to keep the warranty valid',
      ],
      stepsTitle: 'How a service works',
      steps: [
        'Book by phone, WhatsApp or the form, ideally before the summer.',
        'We inspect, clean and test each unit.',
        'We tell you how the system is doing and flag anything that needs attention.',
      ],
      guideTitle: 'When to service your air conditioning',
      guide: [
        'Spring is the best time, before the heat arrives and everyone calls at once. Near the sea, salty air is hard on outdoor units, so a yearly check matters even more on the coast. Inland, dust is usually the bigger problem for filters and coils.',
        'Holiday homes need attention too. A unit left off for months can smell musty or block its drain, and it is better to find that out before you arrive. A service does not include repairs or parts: if we find a fault, we tell you and quote before doing anything else.',
      ],
      faq: [
        { q: 'How often should AC be serviced?', a: 'Once a year is ideal, usually before the summer. Heavy use, such as in restaurants or holiday lets, can call for more.' },
        { q: 'Do you offer a maintenance plan?', a: 'Yes, ask us about regular servicing for your home or business.' },
        { q: 'Can you service a unit you did not install?', a: 'Yes, we service all major brands, wherever the unit was bought.' },
      ],
    },
    es: {
      title: 'Mantenimiento',
      blurb: 'Una revisión al año mantiene tu equipo eficiente y ayuda a evitar averías en verano.',
      h1: 'Mantenimiento de aire acondicionado en la Costa Blanca',
      intro:
        'Una revisión al año hace que tu aire acondicionado enfríe bien, gaste menos y sea mucho menos probable que se averíe en plena ola de calor. Hacemos el mantenimiento de viviendas y negocios en la Costa Blanca, en todas las marcas principales.',
      meta: 'Mantenimiento de aire acondicionado en la Costa Blanca: revisión, filtros, baterías, desagüe y prueba de rendimiento. Todas las marcas. Presupuesto gratis.',
      includesTitle: 'Qué incluye la revisión',
      includes: [
        'Inspección de las unidades interior y exterior',
        'Limpieza de filtros y baterías',
        'Revisión del desagüe',
        'Comprobación de presiones de gas',
        'Revisión de las conexiones eléctricas',
        'Prueba de rendimiento y aviso claro de lo que necesite atención',
      ],
      pointsTitle: 'Por qué revisar tu equipo',
      points: [
        'Menos consumo con un equipo eficiente',
        'Aire más limpio en casa',
        'Menos averías y más años de vida útil',
        'Muchos fabricantes piden revisiones periódicas para mantener la garantía',
      ],
      stepsTitle: 'Cómo funciona la revisión',
      steps: [
        'Reserva por teléfono, WhatsApp o el formulario, mejor antes del verano.',
        'Inspeccionamos, limpiamos y probamos cada unidad.',
        'Te contamos cómo está el equipo y qué necesita atención.',
      ],
      guideTitle: 'Cuándo hacer el mantenimiento',
      guide: [
        'La primavera es el mejor momento, antes de que llegue el calor y llame todo el mundo a la vez. Cerca del mar, el aire salino castiga las unidades exteriores, así que en la costa la revisión anual importa todavía más. En el interior, el polvo suele ser el mayor problema para filtros y baterías.',
        'Las segundas residencias también lo necesitan. Un equipo parado durante meses puede oler a humedad o atascar el desagüe, y es mejor saberlo antes de llegar. La revisión no incluye reparaciones ni piezas: si encontramos una avería, te avisamos y te damos presupuesto antes de hacer nada más.',
      ],
      faq: [
        { q: '¿Cada cuánto hay que revisar el aire acondicionado?', a: 'Una vez al año es lo ideal, normalmente antes del verano. Con mucho uso, como en restaurantes o alquileres vacacionales, puede hacer falta más.' },
        { q: '¿Ofrecéis plan de mantenimiento?', a: 'Sí, pregúntanos por el mantenimiento periódico para tu casa o negocio.' },
        { q: '¿Revisáis equipos que no habéis instalado?', a: 'Sí, revisamos todas las marcas principales, se hayan comprado donde se hayan comprado.' },
      ],
    },
  },
  {
    slug: 'cleaning',
    esSlug: 'limpieza',
    icon: 'sparkles',
    image: '/gallery/work-33.webp',
    en: {
      title: 'Cleaning',
      blurb: 'Deep cleaning from €50 for fresher air and better cooling.',
      h1: 'Air conditioning cleaning on the Costa Blanca',
      intro:
        'Bad smell, dust or weak airflow? A deep clean clears what filters alone can’t reach, so your unit cools better and the air smells fresh again. AC cleaning starts from €50 across the Costa Blanca.',
      meta: 'AC deep cleaning on the Costa Blanca from €50: filters, coils, fan and drain. Gets rid of bad smells and restores airflow. Free quote by phone or WhatsApp.',
      includesTitle: "What's included",
      includes: [
        'Deep clean of filters, coils and fans',
        'Sanitising treatment for mould and odours',
        'Clearing the drain to help prevent leaks',
        'Airflow check once it’s back together',
      ],
      pointsTitle: 'When your AC needs a clean',
      points: [
        'A musty or stale smell when it starts',
        'Dust coming from the vents',
        'Weak airflow or slower cooling',
        'Black marks on the vents or the fan',
      ],
      stepsTitle: 'How a deep clean works',
      steps: [
        'We protect the area around the unit.',
        'We take out and clean the filters and covers.',
        'We clean the coil, fan and drain, and apply a sanitising treatment.',
        'We put it back together and check the airflow and cooling.',
      ],
      guideTitle: 'Cleaning or servicing: what is the difference?',
      guide: [
        'Cleaning is about hygiene and airflow: it removes the dirt, mould and smells that build up inside a unit. A service also checks the mechanics, such as gas pressures, electrics and overall performance. If your unit works but smells or blows weakly, cleaning is usually what it needs.',
        'Rinsing the filters yourself every few weeks in summer helps a lot, but it doesn’t reach the coil or fan where most of the dirt collects. A professional clean once a year is a good rule, and more often with pets, allergies or heavy use.',
      ],
      faq: [
        { q: 'How much does a cleaning cost?', a: 'AC cleaning starts from €50.' },
        { q: 'How often should I clean my AC?', a: 'At least once a year, more often with heavy use, pets or allergies.' },
        { q: 'Is cleaning different from a service?', a: 'Yes. Cleaning focuses on hygiene and airflow, while a full service also checks gas pressures, electrics and performance.' },
      ],
    },
    es: {
      title: 'Limpieza',
      blurb: 'Limpieza a fondo desde 50 € para un aire más fresco y un equipo que enfría mejor.',
      h1: 'Limpieza de aire acondicionado en la Costa Blanca',
      intro:
        '¿Mal olor, polvo o poco aire? Una limpieza a fondo llega donde el filtro no alcanza, para que tu equipo enfríe mejor y el aire vuelva a oler bien. La limpieza de aire acondicionado desde 50 € en toda la Costa Blanca.',
      meta: 'Limpieza a fondo de aire acondicionado en la Costa Blanca desde 50 €: filtros, batería, ventilador y desagüe. Elimina malos olores y recupera el caudal de aire.',
      includesTitle: 'Qué incluye',
      includes: [
        'Limpieza a fondo de filtros, baterías y ventiladores',
        'Tratamiento higienizante contra moho y olores',
        'Limpieza del desagüe para ayudar a evitar goteos',
        'Comprobación del caudal de aire al terminar',
      ],
      pointsTitle: 'Cuándo necesita limpieza tu equipo',
      points: [
        'Huele a humedad o a cerrado al arrancar',
        'Sale polvo por las rejillas',
        'Poco caudal de aire o enfría más despacio',
        'Manchas negras en las rejillas o el ventilador',
      ],
      stepsTitle: 'Cómo es una limpieza a fondo',
      steps: [
        'Protegemos la zona alrededor del equipo.',
        'Desmontamos y limpiamos filtros y carcasas.',
        'Limpiamos batería, ventilador y desagüe, y aplicamos el tratamiento higienizante.',
        'Montamos todo de nuevo y comprobamos el caudal y el frío.',
      ],
      guideTitle: 'Limpieza o mantenimiento: ¿en qué se diferencian?',
      guide: [
        'La limpieza se centra en la higiene y el caudal de aire: elimina la suciedad, el moho y los olores que se acumulan dentro del equipo. El mantenimiento revisa además la parte mecánica, como las presiones de gas, la electricidad y el rendimiento. Si tu equipo funciona pero huele mal o sopla poco, normalmente lo que necesita es una limpieza.',
        'Enjuagar los filtros cada pocas semanas en verano ayuda mucho, pero no llega a la batería ni al ventilador, que es donde se acumula la mayor parte de la suciedad. Una limpieza profesional al año es una buena regla, y más a menudo con mascotas, alergias o mucho uso.',
      ],
      faq: [
        { q: '¿Cuánto cuesta una limpieza?', a: 'La limpieza de aire acondicionado desde 50 €.' },
        { q: '¿Cada cuánto debo limpiar el aire acondicionado?', a: 'Al menos una vez al año, más a menudo con mucho uso, mascotas o alergias.' },
        { q: '¿La limpieza es lo mismo que el mantenimiento?', a: 'No. La limpieza se centra en la higiene y el caudal de aire, y el mantenimiento revisa además presiones, electricidad y rendimiento.' },
      ],
    },
  },
];

export const serviceCopy = (s: Service, locale: Locale) => s[locale];
