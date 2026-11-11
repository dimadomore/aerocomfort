import { type Locale } from '../config';

/**
 * "Our work" gallery — real air-conditioning jobs across the Costa Blanca.
 * Photos were taken from the live aerocomfort.es gallery (t1148) and stored
 * locally under /public/gallery as optimized webp. To add/remove a photo, drop
 * the file in /public/gallery and bump `GALLERY_COUNT`.
 */
const GALLERY_COUNT = 44;
/** The owner's chosen photos (Nov 2026) lead the gallery and the home preview. */
const FEATURED = [43, 42, 41, 44];

export interface GalleryPhoto {
  src: string;
  /** Localized alt text (accessibility + image SEO). */
  alt: Record<Locale, string>;
}

const altFor = (n: number): Record<Locale, string> => ({
  en: `Air conditioning installation by Aerocomfort on the Costa Blanca — job ${n}`,
  es: `Instalación de aire acondicionado por Aerocomfort en la Costa Blanca — trabajo ${n}`,
});

const order = [...FEATURED, ...Array.from({ length: GALLERY_COUNT }, (_, i) => i + 1).filter((n) => !FEATURED.includes(n))];

export const galleryPhotos: GalleryPhoto[] = order.map((n) => {
  return {
    src: `/gallery/work-${String(n).padStart(2, '0')}.webp`,
    alt: altFor(n),
  };
});
