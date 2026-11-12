import { type Locale } from '../config';

/**
 * "Our work" gallery: real air-conditioning jobs across the Costa Blanca, stored
 * under /public/gallery as optimized webp (work-NN.webp).
 *   1-40   taken from the old aerocomfort.es gallery
 *   41-44  the owner's home-page picks (Nov 2026)
 *   45-102 the owner's "aero-photos" folder (Nov 2026), already sorted best first
 * To add photos: save them as the next numbers, raise GALLERY_COUNT, and put the
 * numbers where they belong in `order` below.
 */
const GALLERY_COUNT = 102;
/** The newest set leads the gallery, the home preview and the service pages. */
const LATEST = Array.from({ length: 58 }, (_, i) => 45 + i);
/** The owner's home-page picks come next. */
const FEATURED = [43, 42, 41, 44];
/** Same photo as another one in the set: 40 is 42. */
const HIDDEN = [40];

export interface GalleryPhoto {
  src: string;
  /** Localized alt text (accessibility + image SEO). */
  alt: Record<Locale, string>;
}

const altFor = (n: number): Record<Locale, string> => ({
  en: `Air conditioning installation by Aerocomfort on the Costa Blanca — job ${n}`,
  es: `Instalación de aire acondicionado por Aerocomfort en la Costa Blanca — trabajo ${n}`,
});

const lead = [...LATEST, ...FEATURED];
const order = [
  ...lead,
  ...Array.from({ length: GALLERY_COUNT }, (_, i) => i + 1).filter((n) => !lead.includes(n) && !HIDDEN.includes(n)),
];

export const galleryPhotos: GalleryPhoto[] = order.map((n) => {
  return {
    src: `/gallery/work-${String(n).padStart(2, '0')}.webp`,
    alt: altFor(n),
  };
});
