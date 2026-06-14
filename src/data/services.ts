import type { Locale } from '../config';

type ServiceIcon = 'ac-unit' | 'wrench' | 'shield-check' | 'sparkles';

export interface Service {
  slug: 'installation' | 'repair' | 'maintenance' | 'cleaning';
  icon: ServiceIcon;
  en: { title: string; blurb: string };
  es: { title: string; blurb: string };
}

/** The four core services (docs/05 §3.3, copy docs/10 §3.3). Reused by the Home
 *  grid now and the service pages in Phase 1. */
export const SERVICES: Service[] = [
  {
    slug: 'installation',
    icon: 'ac-unit',
    en: { title: 'Installation', blurb: 'New AC units installed cleanly and correctly, sized for your space.' },
    es: { title: 'Instalación', blurb: 'Instalación de equipos nuevos, limpia y correcta, dimensionada para tu espacio.' },
  },
  {
    slug: 'repair',
    icon: 'wrench',
    en: { title: 'Repair', blurb: 'Not cooling, leaking or noisy? Fast diagnosis and a reliable fix.' },
    es: { title: 'Reparación', blurb: '¿No enfría, gotea o hace ruido? Diagnóstico rápido y reparación fiable.' },
  },
  {
    slug: 'maintenance',
    icon: 'shield-check',
    en: { title: 'Maintenance', blurb: 'Keep your AC efficient and healthy with regular servicing.' },
    es: { title: 'Mantenimiento', blurb: 'Mantén tu equipo eficiente y sano con un mantenimiento regular.' },
  },
  {
    slug: 'cleaning',
    icon: 'sparkles',
    en: { title: 'Cleaning', blurb: 'Deep cleaning for cleaner air and lower energy bills.' },
    es: { title: 'Limpieza', blurb: 'Limpieza a fondo para un aire más limpio y menos consumo.' },
  },
];

export const serviceCopy = (s: Service, locale: Locale) => s[locale];
