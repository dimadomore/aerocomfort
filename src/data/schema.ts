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
  streetAddress: z.string().optional(),
  addressLocality: z.string(),
  postalCode: z.string(),
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
  /** Manufacturer kit / unit codes, as printed on the data sheet. */
  code: z.string().optional(),
  priceNew: z.number(),
  priceOld: z.number().nullable().default(null),
  coverage: z.string().optional(),
  wifi: z.boolean().optional(),
  image: z.string().default(''),
  // Data-sheet facts. All optional so a unit can be listed before its sheet arrives.
  energyCool: z.string().optional(), // EU label class, cooling
  energyHeat: z.string().optional(), // EU label class, heating (average climate)
  coolKw: z.number().optional(), // nominal cooling capacity
  coolRange: z.string().optional(), // min–max, kW
  heatKw: z.number().optional(),
  heatRange: z.string().optional(),
  seer: z.number().optional(),
  scop: z.number().optional(),
  scopNote: z.enum(['warm']).optional(), // SCOP quoted for the warmer zone
  noiseIndoorMin: z.number().optional(), // quietest indoor setting, dB(A)
  noiseOutdoor: z.number().optional(), // outdoor sound pressure, cooling, dB(A)
  indoorSize: z.string().optional(), // width × height × depth, mm
  pipeMax: z.number().optional(), // longest pipe run the unit allows, m
});
export type OfferItem = z.infer<typeof offerItemSchema>;

export const offersSchema = z.object({
  season: z.object({
    start: z.string(),
    end: z.string(),
    label: z.object({ en: z.string(), es: z.string() }),
  }),
  installation: z.object({
    title: z.object({ en: z.string(), es: z.string() }),
    items: z.object({ en: z.array(z.string()), es: z.array(z.string()) }),
  }),
  items: z.array(offerItemSchema),
});
export type Offers = z.infer<typeof offersSchema>;

/** True when a field still holds an unfilled ‹PLACEHOLDER› (anywhere in the value,
 *  so partials like "Gregorio ‹apellidos›" also count as incomplete). */
export function isPlaceholder(value: string): boolean {
  return value.includes('‹');
}
