import { type Locale } from '../config';

/**
 * "Our work" gallery — real air-conditioning jobs across the Costa Blanca.
 * Photos were taken from the live aerocomfort.es gallery (t1148) and stored
 * locally under /public/gallery as optimized webp. To add/remove a photo, drop
 * the file in /public/gallery and bump `GALLERY_COUNT`.
 */
const GALLERY_COUNT = 40;

export interface GalleryPhoto {
  src: string;
  /** Localized alt text (accessibility + image SEO). */
  alt: Record<Locale, string>;
}

const altFor = (n: number): Record<Locale, string> => ({
  en: `Air conditioning installation by Aerocomfort on the Costa Blanca — job ${n}`,
  es: `Instalación de aire acondicionado por Aerocomfort en la Costa Blanca — trabajo ${n}`,
});

export const galleryPhotos: GalleryPhoto[] = Array.from({ length: GALLERY_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    src: `/gallery/work-${String(n).padStart(2, '0')}.webp`,
    alt: altFor(n),
  };
});
