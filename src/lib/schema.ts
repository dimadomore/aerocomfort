import { SITE_URL } from '../config';
import { business, isPlaceholder, type OfferItem } from '../data';

/** Absolute URL helper for schema (which requires fully-qualified URLs). */
const abs = (path: string) => new URL(path, SITE_URL).href;

/** Drop ‹PLACEHOLDER› / empty values so we never emit fake structured data. */
const clean = <T,>(arr: (T | undefined | null)[]): T[] =>
  arr.filter((v): v is T => v != null && !(typeof v === 'string' && isPlaceholder(v)));

/**
 * HVACBusiness (a LocalBusiness subtype) — the primary entity, emitted site-wide.
 * Only includes facts that are real (placeholders are omitted, not faked).
 * Reflects docs/06 §2 + docs/11 §4.1.
 */
export function hvacBusinessLd() {
  const sameAs = clean([
    business.social.google,
    business.social.instagram,
    business.social.facebook,
  ]);

  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': abs('/#business'),
    name: business.name,
    url: SITE_URL + '/',
    image: abs('/og/aerocomfort-default.jpg'),
    logo: abs('/logo.png'),
    telephone: '+' + business.phoneE164.replace(/\D/g, ''),
    email: business.email,
    priceRange: '€€',
    areaServed: business.areasLead,
    address: {
      '@type': 'PostalAddress',
      addressRegion: business.addressRegion,
      addressCountry: business.addressCountry,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
    },
  };

  if (sameAs.length) ld.sameAs = sameAs;
  if (!isPlaceholder(business.geo.lat) && !isPlaceholder(business.geo.lng)) {
    ld.geo = {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    };
  }
  return ld;
}

/** Service schema for service pages (docs/11 §4.2). */
export function serviceLd(serviceType: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: { '@type': 'HVACBusiness', name: business.name, '@id': abs('/#business') },
    areaServed: 'Costa Blanca',
    url: abs(url),
  };
}

/** FAQPage schema (docs/11 §4.3). */
export function faqLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

/** BreadcrumbList schema for internal pages. */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

/** Product/Offer schema for the offers page (docs/06 §2 — honest prices only). */
export function offerProductsLd(items: OfferItem[], priceValidUntil: string, offersUrl: string) {
  return items.map((o) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${o.brand} ${o.model}`,
    brand: { '@type': 'Brand', name: o.brand },
    offers: {
      '@type': 'Offer',
      price: o.priceNew,
      priceCurrency: 'EUR',
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      url: abs(offersUrl),
    },
  }));
}
