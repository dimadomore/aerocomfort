import businessRaw from './business.yml';
import ratingRaw from './rating.json';
import offersRaw from './offers.yml';
import { businessSchema, offersSchema } from './schema';

/**
 * Validated, typed business data. Import from here everywhere (header, footer,
 * <Seo>, schema.ts). zod parsing happens once at build — bad data fails the build.
 */
export const business = businessSchema.parse({ ...(businessRaw as object), rating: ratingRaw });
export const offers = offersSchema.parse(offersRaw);

/**
 * Google rating, shown across the site. Update src/data/rating.json by hand from
 * time to time. The copy rounds down to "200+" so it stays true as reviews grow;
 * the exact live count is in the Elfsight widget.
 */
export const reviewCountDisplay = `${Math.floor(business.rating.count / 10) * 10}+`;
export const ratingLabel = (locale: 'en' | 'es') =>
  locale === 'es' ? business.rating.value.replace('.', ',') : business.rating.value;

export { galleryPhotos, type GalleryPhoto } from './gallery';

export type { Business, OfferItem, Offers } from './schema';
export { isPlaceholder } from './schema';
