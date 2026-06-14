import type { Locale } from '../config';

type ServiceIcon = 'ac-unit' | 'wrench' | 'shield-check' | 'sparkles';

interface ServiceCopy {
  title: string; // short label (cards, nav)
  blurb: string; // one-line (home cards)
  h1: string; // page heading
  intro: string; // page intro paragraph
  includesTitle: string;
  includes: string[];
  pointsTitle: string;
  points: string[];
  faq: { q: string; a: string }[];
}

export interface Service {
  slug: 'installation' | 'repair' | 'maintenance' | 'cleaning';
  esSlug: 'instalacion' | 'reparacion' | 'mantenimiento' | 'limpieza';
  icon: ServiceIcon;
  en: ServiceCopy;
  es: ServiceCopy;
}

/**
 * The four core services (docs/05 §3.3). Reused by the Home grid and the service
 * pages (Phase 1). Body copy is professional draft — refine prices/waiting times
 * with the owner (D3/E4). No unverified claims (certs/insurance) until confirmed.
 */
export const SERVICES: Service[] = [
  {
    slug: 'installation',
    esSlug: 'instalacion',
    icon: 'ac-unit',
    en: {
      title: 'Installation',
      blurb: 'New AC units installed cleanly and correctly, sized for your space.',
      h1: 'Air conditioning installation on the Costa Blanca',
      intro:
        'Professional supply and installation of split and multi-split air conditioning for homes and businesses. We size the right unit for your space, install it cleanly, and leave everything tidy and working.',
      includesTitle: "What's included",
      includes: [
        'Free site visit and honest advice on the right unit and size',
        'Supply of A+++ energy-efficient units from leading brands',
        'Clean installation of indoor and outdoor units',
        'Neat pipework, drainage and electrical connection',
        'Testing, commissioning and a walkthrough of your new system',
        'Workmanship guarantee on every installation',
      ],
      pointsTitle: 'Why it matters',
      points: [
        'Correct sizing means lower bills and better cooling',
        'Tidy routing of pipes and cabling — no mess left behind',
        'Energy-efficient A+++ units that pay back over time',
      ],
      faq: [
        { q: 'How long does an installation take?', a: 'Most single-split installations are completed in a few hours, usually the same day.' },
        { q: 'Do you supply the unit or just install it?', a: 'Both — we can supply an A+++ unit from our seasonal offers or install a unit you already have.' },
        { q: 'How much does installation cost?', a: 'We give a clear, free quote after a quick site visit. Seasonal supply offers start from €609.' },
      ],
    },
    es: {
      title: 'Instalación',
      blurb: 'Instalación de equipos nuevos, limpia y correcta, dimensionada para tu espacio.',
      h1: 'Instalación de aire acondicionado en la Costa Blanca',
      intro:
        'Suministro e instalación profesional de aire acondicionado split y multisplit para hogares y negocios. Elegimos el equipo del tamaño adecuado, lo instalamos de forma limpia y lo dejamos todo ordenado y funcionando.',
      includesTitle: 'Qué incluye',
      includes: [
        'Visita gratuita y asesoramiento honesto sobre el equipo y la potencia',
        'Suministro de equipos A+++ de eficiencia energética de marcas líderes',
        'Instalación limpia de las unidades interior y exterior',
        'Tubería, desagüe y conexión eléctrica ordenados',
        'Pruebas, puesta en marcha y explicación de tu nuevo equipo',
        'Garantía de instalación en todos los trabajos',
      ],
      pointsTitle: 'Por qué importa',
      points: [
        'El dimensionado correcto reduce el consumo y enfría mejor',
        'Tubos y cableado bien colocados — sin dejar suciedad',
        'Equipos A+++ eficientes que se amortizan con el tiempo',
      ],
      faq: [
        { q: '¿Cuánto tarda una instalación?', a: 'La mayoría de instalaciones de un split se completan en unas horas, normalmente el mismo día.' },
        { q: '¿Suministráis el equipo o solo lo instaláis?', a: 'Ambos — podemos suministrar un equipo A+++ de nuestras ofertas o instalar uno que ya tengas.' },
        { q: '¿Cuánto cuesta la instalación?', a: 'Damos un presupuesto claro y gratuito tras una breve visita. Las ofertas de temporada desde 609 €.' },
      ],
    },
  },
  {
    slug: 'repair',
    esSlug: 'reparacion',
    icon: 'wrench',
    en: {
      title: 'Repair',
      blurb: 'Not cooling, leaking or noisy? Fast diagnosis and a reliable fix.',
      h1: 'Air conditioning repair on the Costa Blanca',
      intro:
        'Fast, reliable repairs for any make of air conditioning. Not cooling, leaking, noisy or showing an error code? We diagnose the problem and fix it properly.',
      includesTitle: 'What we do',
      includes: [
        'Quick diagnosis of the fault',
        'Repair of cooling, leaks, noise and electrical faults',
        'Refrigerant top-up and leak detection',
        'Replacement of worn or faulty parts',
        'Any brand — Daikin, Mitsubishi, LG, Panasonic, Giatsu and more',
        'Honest advice on repair vs. replacement',
      ],
      pointsTitle: 'Signs you need a repair',
      points: [
        "It runs but doesn't cool (or doesn't heat)",
        'Water dripping from the indoor unit',
        'Unusual noise, rattling or vibration',
        'A bad smell or weak airflow',
        'An error code on the display',
      ],
      faq: [
        { q: 'Do you repair all brands?', a: 'Yes — we service and repair all major brands of air conditioning.' },
        { q: 'How quickly can you come out?', a: 'We aim for fast callouts across the Costa Blanca — message us on WhatsApp for the soonest slot.' },
      ],
    },
    es: {
      title: 'Reparación',
      blurb: '¿No enfría, gotea o hace ruido? Diagnóstico rápido y reparación fiable.',
      h1: 'Reparación de aire acondicionado en la Costa Blanca',
      intro:
        'Reparaciones rápidas y fiables para cualquier marca de aire acondicionado. ¿No enfría, gotea, hace ruido o muestra un código de error? Diagnosticamos el problema y lo solucionamos como es debido.',
      includesTitle: 'Qué hacemos',
      includes: [
        'Diagnóstico rápido de la avería',
        'Reparación de refrigeración, fugas, ruidos y fallos eléctricos',
        'Recarga de gas y detección de fugas',
        'Sustitución de piezas gastadas o defectuosas',
        'Cualquier marca — Daikin, Mitsubishi, LG, Panasonic, Giatsu y más',
        'Consejo honesto sobre reparar o sustituir',
      ],
      pointsTitle: 'Señales de que necesitas una reparación',
      points: [
        'Funciona pero no enfría (o no calienta)',
        'Gotea agua de la unidad interior',
        'Ruido raro, vibración o traqueteo',
        'Mal olor o poco caudal de aire',
        'Un código de error en la pantalla',
      ],
      faq: [
        { q: '¿Reparáis todas las marcas?', a: 'Sí — reparamos y mantenemos todas las marcas principales de aire acondicionado.' },
        { q: '¿Con qué rapidez podéis venir?', a: 'Intentamos salidas rápidas en toda la Costa Blanca — escríbenos por WhatsApp para la cita más próxima.' },
      ],
    },
  },
  {
    slug: 'maintenance',
    esSlug: 'mantenimiento',
    icon: 'shield-check',
    en: {
      title: 'Maintenance',
      blurb: 'Keep your AC efficient and healthy with regular servicing.',
      h1: 'Air conditioning maintenance & servicing on the Costa Blanca',
      intro:
        'Regular servicing keeps your air conditioning efficient, healthy and reliable — and helps avoid breakdowns when you need it most.',
      includesTitle: 'What a service includes',
      includes: [
        'Full check of the indoor and outdoor units',
        'Cleaning of filters and coils',
        'Checking refrigerant levels and pressures',
        'Inspecting electrical connections and drainage',
        'Performance and efficiency test',
        'Advice on getting the most from your system',
      ],
      pointsTitle: 'Why service your AC',
      points: [
        'Lower energy bills from an efficient system',
        'Cleaner, healthier air indoors',
        'Fewer breakdowns and longer equipment life',
        'Helps keep manufacturer warranties valid',
      ],
      faq: [
        { q: 'How often should AC be serviced?', a: 'Once a year is ideal — usually before the summer season.' },
        { q: 'Do you offer a maintenance plan?', a: 'Yes — ask us about regular servicing for your home or business.' },
      ],
    },
    es: {
      title: 'Mantenimiento',
      blurb: 'Mantén tu equipo eficiente y sano con un mantenimiento regular.',
      h1: 'Mantenimiento de aire acondicionado en la Costa Blanca',
      intro:
        'Un mantenimiento regular mantiene tu aire acondicionado eficiente, sano y fiable — y ayuda a evitar averías cuando más lo necesitas.',
      includesTitle: 'Qué incluye un mantenimiento',
      includes: [
        'Revisión completa de las unidades interior y exterior',
        'Limpieza de filtros y baterías',
        'Comprobación de niveles y presiones de gas',
        'Inspección de conexiones eléctricas y desagüe',
        'Prueba de rendimiento y eficiencia',
        'Consejos para aprovechar al máximo tu equipo',
      ],
      pointsTitle: 'Por qué mantener tu equipo',
      points: [
        'Menos consumo gracias a un equipo eficiente',
        'Aire más limpio y saludable en casa',
        'Menos averías y mayor vida útil del equipo',
        'Ayuda a mantener válidas las garantías del fabricante',
      ],
      faq: [
        { q: '¿Cada cuánto hay que hacer el mantenimiento?', a: 'Una vez al año es lo ideal — normalmente antes del verano.' },
        { q: '¿Ofrecéis plan de mantenimiento?', a: 'Sí — pregúntanos por el mantenimiento regular para tu hogar o negocio.' },
      ],
    },
  },
  {
    slug: 'cleaning',
    esSlug: 'limpieza',
    icon: 'sparkles',
    en: {
      title: 'Cleaning',
      blurb: 'Deep cleaning for cleaner air and lower energy bills.',
      h1: 'Air conditioning cleaning on the Costa Blanca',
      intro:
        'Deep cleaning of your air conditioning for cleaner air, fresher rooms and lower running costs. Ideal before the season, or whenever you notice dust or smells.',
      includesTitle: "What's included",
      includes: [
        'Deep clean of filters, coils and fans',
        'Sanitising treatment against mould and bacteria',
        'Clearing the drainage to prevent leaks',
        'Removing dust and odours for fresher air',
        'Restoring airflow and efficiency',
      ],
      pointsTitle: 'Why clean your AC',
      points: [
        'Healthier air — fewer allergens and odours',
        'Better cooling and lower energy use',
        'Prevents leaks and bad smells',
      ],
      faq: [
        { q: 'How often should I clean my AC?', a: 'At least once a year — more often with heavy use, pets or allergies.' },
        { q: 'Is cleaning different from a service?', a: 'Cleaning focuses on hygiene and airflow; a full service also checks the mechanics of the system.' },
      ],
    },
    es: {
      title: 'Limpieza',
      blurb: 'Limpieza a fondo para un aire más limpio y menos consumo.',
      h1: 'Limpieza de aire acondicionado en la Costa Blanca',
      intro:
        'Limpieza a fondo de tu aire acondicionado para un aire más limpio, estancias más frescas y menos consumo. Ideal antes de la temporada o cuando notes polvo u olores.',
      includesTitle: 'Qué incluye',
      includes: [
        'Limpieza a fondo de filtros, baterías y ventiladores',
        'Tratamiento desinfectante contra moho y bacterias',
        'Limpieza del desagüe para evitar fugas',
        'Eliminación de polvo y olores para un aire más fresco',
        'Recuperación del caudal de aire y la eficiencia',
      ],
      pointsTitle: 'Por qué limpiar tu equipo',
      points: [
        'Aire más sano — menos alérgenos y olores',
        'Mejor refrigeración y menor consumo',
        'Evita fugas y malos olores',
      ],
      faq: [
        { q: '¿Cada cuánto debo limpiar el aire acondicionado?', a: 'Al menos una vez al año — más a menudo con mucho uso, mascotas o alergias.' },
        { q: '¿La limpieza es lo mismo que el mantenimiento?', a: 'La limpieza se centra en la higiene y el caudal de aire; un mantenimiento completo también revisa la mecánica del equipo.' },
      ],
    },
  },
];

export const serviceCopy = (s: Service, locale: Locale) => s[locale];
