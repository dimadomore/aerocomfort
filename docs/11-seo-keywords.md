# SEO: ключевые темы, мета-шаблоны, schema — Aerocomfort

> Карта тем/запросов, шаблоны мета-тегов и конкретные примеры structured data. Финальные приоритеты сверим с Search Console (после доступа), но кластеры строим уже сейчас.

## 1. Тематические кластеры (topic clusters)

1. **Услуги** (коммерческий интент): installation / repair / maintenance / cleaning + «air conditioning».
2. **Зоны** (локальный интент): услуга × город (Torrevieja, Orihuela Costa, Alicante, …).
3. **Бренды** (выбор/интент): бренд × установка/ремонт (Daikin, Mitsubishi Electric, LG, Panasonic, Giatsu).
4. **Информационные** (AEO/блог, верх воронки): «как выбрать», «сколько стоит», «как часто чистить», «инвертор vs обычный», «какая мощность для 25 м²».

Стратегия: коммерческие кластеры (1–3) — на статичные страницы (хабы + листы); информационный (4) — блог, с перелинковкой на услуги/зоны.

## 2. Целевые запросы по страницам (черновик, EN + ES)

| Страница | Основной запрос (EN) | Основной запрос (ES) | Интент |
|---|---|---|---|
| Home | air conditioning Costa Blanca | aire acondicionado Costa Blanca | бренд/общий |
| Installation | air conditioning installation Costa Blanca | instalación aire acondicionado Costa Blanca | коммерч. |
| Repair | air conditioning repair Costa Blanca | reparación aire acondicionado Costa Blanca | коммерч./срочный |
| Maintenance | AC maintenance / servicing Costa Blanca | mantenimiento aire acondicionado | коммерч. |
| Cleaning | air conditioning cleaning | limpieza aire acondicionado | коммерч. |
| Area: Torrevieja | air conditioning Torrevieja | aire acondicionado Torrevieja | локальный |
| Area: Orihuela Costa | air conditioning Orihuela Costa | aire acondicionado Orihuela Costa | локальный |
| Brand: Daikin | Daikin installation Costa Blanca | instalador Daikin Costa Blanca | бренд |
| Offers | air conditioning offers / deals | ofertas aire acondicionado | коммерч./цена |
| Blog: cost | how much does AC installation cost Spain | precio instalación aire acondicionado | информац. |

> Полную таблицу (все зоны × услуги, все бренды) разворачиваем в Фазе 2 из `areas.yml`/`brands.yml`. Избегаем дублей: каждая страница — уникальный контент и запрос.

## 3. Шаблоны мета-тегов

- **Home** — Title: `Air Conditioning in Costa Blanca | Install, Repair & Service — Aerocomfort` · Desc: `Trusted AC installation, repair & maintenance across Torrevieja, Orihuela Costa & 30+ areas. 5.0★ on Google. Free quote — call or WhatsApp.`
- **Service** — Title: `{Service} in Costa Blanca | Aerocomfort` · Desc: `{Service} for homes & businesses across the Costa Blanca. Clear pricing, guarantee, 5.0★. Get a free quote today.`
- **Area** — Title: `Air Conditioning in {Area} | Install & Repair — Aerocomfort` · Desc: `Local AC services in {Area}: installation, repair, maintenance. Fast, tidy, guaranteed. Free quote by call or WhatsApp.`
- **Brand** — Title: `{Brand} Air Conditioning — Install & Service in Costa Blanca` · Desc: `{Brand} AC supplied, installed and serviced across the Costa Blanca by Aerocomfort. 5.0★. Free quote.`
- **Offers** — Title: `Air Conditioning Offers — A+++ Units from €{min} | Aerocomfort` · Desc: `Seasonal deals on Daikin, Mitsubishi, LG & more. A+++ efficiency. Supply & install across the Costa Blanca.`
- ES — те же шаблоны на испанском (см. [10](10-copy-deck.md)). Title ≤60, Desc ≤155.

## 4. Structured data — конкретные примеры

### 4.1 HVACBusiness (глобально, из `business`-data)
```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Aerocomfort",
  "url": "https://aerocomfort.es/",
  "image": "https://aerocomfort.es/og/aerocomfort.jpg",
  "logo": "https://aerocomfort.es/logo.png",
  "telephone": "+34643265007",
  "email": "info@aerocomfort.es",
  "priceRange": "€€",
  "areaServed": ["Torrevieja","Orihuela Costa","Alicante","‹…›"],
  "address": {"@type":"PostalAddress","addressRegion":"Alicante","addressCountry":"ES","‹…›":"‹…›"},
  "geo": {"@type":"GeoCoordinates","latitude":"‹…›","longitude":"‹…›"},
  "openingHoursSpecification": [{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","…"],"opens":"‹…›","closes":"‹…›"}],
  "sameAs": ["‹instagram›","‹facebook›","‹google business url›"],
  "aggregateRating": {"@type":"AggregateRating","ratingValue":"5.0","reviewCount":"160"}
}
```
> `aggregateRating` — из реального GBP; обновляем по факту. Не выдумываем отзывы.

### 4.2 Service (на странице услуги)
```json
{"@context":"https://schema.org","@type":"Service","serviceType":"Air conditioning installation","provider":{"@type":"HVACBusiness","name":"Aerocomfort"},"areaServed":"Costa Blanca","url":"https://aerocomfort.es/services/installation"}
```

### 4.3 FAQPage (FAQ и мини-FAQ)
```json
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does AC installation cost?","acceptedAnswer":{"@type":"Answer","text":"‹…›"}}]}
```

### 4.4 BreadcrumbList, Offer, Article — по аналогии (генераторы в `lib/schema.ts`, см. [09](09-tech-architecture.md)).

## 5. Внутренняя перелинковка
- Home → услуги, офферы, зоны, FAQ.
- Услуга ↔ релевантные бренды ↔ зоны ↔ смежные услуги ↔ статьи блога.
- Зона → все услуги в этой зоне + соседние зоны.
- Блог → соответствующая услуга/зона (CTA).
- Хлебные крошки на всех внутренних (+ BreadcrumbList).

## 6. AEO-паттерны (для ИИ-агентов)
- Краткий фактический «summary» в начале ключевых страниц (кто/что/где/как связаться).
- FAQ прямыми Q→A.
- `public/llms.txt` (пример):
```
# Aerocomfort
> Air conditioning installation, repair, maintenance and cleaning on the Costa Blanca, Spain (Torrevieja, Orihuela Costa, Alicante and 30+ areas). 5.0★ on Google. EN/ES. Contact: WhatsApp/phone +34 643 265 007.
## Key pages
- Services: /services
- Offers: /offers
- Areas: /areas
- Contact: /contact
```
- Консистентность фактов сайт ↔ schema ↔ GBP ↔ каталоги.

## 7. Локальное SEO / GBP чек-лист
- NAP идентичен везде.
- GBP: верные категории (Air conditioning contractor / HVAC), услуги, зоны, фото, посты, ответы на отзывы.
- Поток новых отзывов (CTA «Review us on Google»).
- Каталоги/цитаты (Páginas Amarillas, локальные) с единым NAP — по возможности.
