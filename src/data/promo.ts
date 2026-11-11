import type { Locale } from '../config';

/**
 * The one temporary offer the site pushes: a badge in the phone header, a slim
 * bar under the desktop header, and its own landing page.
 *
 * To end the promotion set `active` to false: the badge and the bar disappear,
 * and the landing page says the offer has ended and points to the regular offers.
 * To run a new one, change the fields below (and the page files if the path changes).
 *
 * Unit facts are read from Giatsu's data sheet for the Black Edition 3
 * (GIA-S12BLED3, 3.5 kW). Price: owner, Nov 2026. No end date is shown on purpose.
 */
export const PROMO = {
  active: true,
  /** EN route key; the ES path is in ROUTES (src/i18n/utils.ts). */
  path: '/black-friday',
  label: 'Black Friday',
  price: 589,
  brand: 'Giatsu',
  model: 'Black Edition 3',
  code: 'GIA-S12BLED3',
  image: '/offers/giatsu-black-edition-3.webp',
  /** The price includes basic installation, as in the seasonal offers (confirmed by Dima, 11 Nov 2026). */
  installationIncluded: true,
  kw: 3.5,
  btu: 12000,
  energyCool: 'A++',
  energyHeat: 'A+',
  noiseIndoorMin: 23,
  warrantyYears: 3,
  wifi: true,
  whatsapp: {
    en: 'Hi Aerocomfort, I’d like the Black Friday offer: Giatsu Black Edition 3 (3.5 kW) for €589.',
    es: 'Hola Aerocomfort, me interesa la oferta de Black Friday: Giatsu Black Edition 3 (3,5 kW) por 589 €.',
  } satisfies Record<Locale, string>,
};
