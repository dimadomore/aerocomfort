import businessRaw from './business.yml';
import offersRaw from './offers.yml';
import { businessSchema, offersSchema } from './schema';

/**
 * Validated, typed business data. Import from here everywhere (header, footer,
 * <Seo>, schema.ts). zod parsing happens once at build — bad data fails the build.
 */
export const business = businessSchema.parse(businessRaw);
export const offers = offersSchema.parse(offersRaw);

/**
 * Grow-friendly review count for marketing copy: "160+". Lives in one place so the
 * visible number never goes stale (stays true as reviews grow); bump
 * business.yml `rating.count` to refresh, or automate via Google Places API later.
 * The exact live count is shown by the Elfsight widget in the Reviews section.
 */
export const reviewCountDisplay = `${business.rating.count}+`;

export type { Business, OfferItem, Offers } from './schema';
export { isPlaceholder } from './schema';
