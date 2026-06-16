import { z } from 'zod';

/** Validates src/data/business.yml at build time (errors fail the build). */
export const businessSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  taxId: z.string(),
  phone: z.string(),
  phoneE164: z.string(),
  whatsapp: z.string(),
  whatsappMessage: z.object({ en: z.string(), es: z.string() }),
  email: z.string(),
  emailFuture: z.string().optional(),
  addressRegion: z.string(),
  addressCountry: z.string(),
  geo: z.object({ lat: z.string(), lng: z.string() }),
  hours: z.string(),
  areasLead: z.array(z.string()).min(1),
  areasCount: z.number(),
  rating: z.object({ value: z.string(), count: z.number() }),
  social: z.object({
    google: z.string(),
    instagram: z.string(),
    facebook: z.string(),
  }),
  // Owner-provided facts (John, 2026-06-14)
  manager: z.string().optional(),
  legalForm: z.string().optional(),
  trust: z
    .object({
      installs: z.string(), // e.g. "1000+"
      years: z.number().optional(), // years in business
      guaranteeYears: z.number(), // workmanship guarantee
      equipmentWarrantyYears: z.number().optional(),
      certified: z.boolean(), // fluorinated-gas handling cert (number withheld)
    })
    .optional(),
  payment: z.array(z.string()).optional(),
});
export type Business = z.infer<typeof businessSchema>;

const offerItemSchema = z.object({
  brand: z.string(),
  model: z.string(),
  priceNew: z.number(),
  priceOld: z.number().nullable().default(null),
  efficiency: z.string().optional(),
  coverage: z.string().optional(),
  image: z.string().default(''),
});
export type OfferItem = z.infer<typeof offerItemSchema>;

export const offersSchema = z.object({
  season: z.object({
    start: z.string(),
    end: z.string(),
    label: z.object({ en: z.string(), es: z.string() }),
  }),
  items: z.array(offerItemSchema),
});
export type Offers = z.infer<typeof offersSchema>;

/** True when a field still holds an unfilled ‹PLACEHOLDER› (anywhere in the value,
 *  so partials like "Gregorio ‹apellidos›" also count as incomplete). */
export function isPlaceholder(value: string): boolean {
  return value.includes('‹');
}
