# Информационная архитектура — Aerocomfort

> Карта сайта, структура URL и i18n, поблочная раскладка каждой страницы.
> Контент-блоки — это и план вёрстки, и контейнеры под тексты/фото (см. [08](08-content-and-assets.md)).

## 1. Структура URL и i18n

- **EN — корень**, **ES — префикс `/es/`** (как на старом сайте, сохраняем привычное).
- Человекочитаемые слаги, латиница, без `.html`. Слаги локализуем (хорошо для SEO).
- `hreflang` на каждой странице: `en`, `es`, `x-default` → en.
- У каждой EN-страницы есть парная ES; переключатель языка ведёт на ту же страницу на другом языке (не на главную).
- Canonical на себя; sitemap включает обе версии с `hreflang`-аннотациями.

```
/                         → Home (EN)              /es/                       → Inicio
/services                 → Services overview      /es/servicios
/services/installation    → AC Installation        /es/servicios/instalacion
/services/repair          → AC Repair              /es/servicios/reparacion
/services/maintenance     → AC Maintenance         /es/servicios/mantenimiento
/services/cleaning        → AC Cleaning            /es/servicios/limpieza
/offers                   → Seasonal offers        /es/ofertas
/areas                    → Service areas (hub)    /es/zonas
/areas/torrevieja         → Area page              /es/zonas/torrevieja
/areas/orihuela-costa     → …                      /es/zonas/orihuela-costa
/brands                   → Brands (hub)           /es/marcas
/brands/daikin            → Brand page             /es/marcas/daikin
/about                    → About / trust          /es/sobre-nosotros
/faq                      → FAQ                     /es/preguntas-frecuentes
/contact                  → Contact                /es/contacto
/blog                     → Blog index             /es/blog
/blog/<slug>              → Article                /es/blog/<slug>
/thank-you                → Lead confirmation      /es/gracias       (цель конверсии — сохранить!)
/privacy                  → Privacy policy         /es/privacidad
/cookies                  → Cookie policy          /es/cookies
/legal                    → Aviso legal (LSSI)     /es/aviso-legal
/404                      → Not found              (локализуется по контексту)
```

Зоны/бренды в Фазе 2 — список финализируем по ответам Джона (D2, D4). Структура уже заложена.

## 2. Глобальные элементы (на всех страницах)

- **Header:** лого → `/`; меню: Services, Offers, Areas, About, FAQ, Contact; справа — переключатель EN/ES и кнопка-телефон. Моб: бургер + видимая WhatsApp-иконка. Sticky, компактится при скролле.
- **Footer:** колонки — о бизнесе+лого; услуги; зоны; контакты (NAP, часы, email, соцсети); юр-ссылки. Низ: © + reg-данные (autónomo/SL, NIF — плейсхолдер). Всё из `src/data/business`.
- **ChatLauncher** (плавающий, справа-снизу) + **StickyMobileBar** (моб): сквозные точки контакта.
- **CookieConsent** баннер (первый визит).

## 3. Поблочная раскладка страниц

Легенда: 🟦 секция · 🎯 точка конверсии · 🖼 ассет (детали в [08](08-content-and-assets.md)) · 🤖 structured data.

### 3.1 Home (`/`)
1. 🟦 **Hero** — H1-выгода («Air conditioning in Costa Blanca — installed, repaired, maintained»), подзаголовок, 🎯 2 CTA (Get a quote / WhatsApp), 🖼 фото-героя, плашка доверия (★5.0 · 160 отзывов · N установок). 🤖 HVACBusiness.
2. 🟦 **TrustBar** — лет опыта · установок · рейтинг · зон (count-up).
3. 🟦 **Services** — 4 карточки (установка/ремонт/обслуживание/чистка) → на страницы услуг.
4. 🟦 **Why us / доверие** — 3–4 пункта (сертифицирован, гарантия, быстрый выезд, локальный), 🖼 фото мастера за работой.
5. 🟦 **How it works** — 3 шага (заявка → выезд/оценка → работа). Снижает тревогу.
6. 🟦 **Offers (превью)** — 2–3 лучших оффера → `/offers`. Выделенная плашка. 🎯
7. 🟦 **Brands** — лого брендов (доверие) → `/brands`.
8. 🟦 **Gallery (превью)** — несколько фото работ (before/after) → больше в галерее. 🖼
9. 🟦 **Reviews** — Elfsight (★5.0), CTA «Review us on Google». 🤖 aggregateRating.
10. 🟦 **Areas** — карта + список зон → `/areas`. 🖼🤖 areaServed.
11. 🟦 **FAQ (превью)** — топ-5 вопросов → `/faq`. 🤖 FAQPage.
12. 🟦 **Final CTA** — крупная плашка «Готовы? Свяжитесь» + форма/WhatsApp. 🎯

### 3.2 Service overview (`/services`)
Интро + 4 карточки услуг с расширенным описанием + блок доверия + CTA. Хаб, раздающий вес на под-страницы. 🤖 Service × N.

### 3.3 Service page (шаблон, ×4)
1. Hero услуги (H1 = услуга + регион), 🎯 CTA. 🤖 Service + BreadcrumbList.
2. Что входит / процесс (списком, конкретно).
3. Для кого / признаки, что пора (для repair — симптомы; для maintenance — польза).
4. 🖼 Фото именно этой услуги.
5. Цена «от …€» (если Джон даст, D3) или «бесплатная оценка».
6. Мини-FAQ по услуге. 🤖 FAQPage.
7. Перелинковка: бренды, зоны, смежные услуги.
8. Финальный CTA + форма. 🎯

### 3.4 Offers (`/offers`)
Сетка 🟦 OfferCard (5 шт: бренд/модель, старая→новая цена, A+++/25m², 🖼 фото юнита, 🎯 CTA «Заказать»). Условие сезона (1 окт–30 апр) и «что входит» (D5). 🤖 Product/Offer (аккуратно, без обмана). Источник — один data-файл (промптуемо).

### 3.5 Areas hub + area page (Фаза 2)
- **Hub:** интро, 🖼 карта всех зон, список-ссылки. 🤖 areaServed.
- **Area page:** H1 «AC services in {Зона}», локальный текст (районы/особенности), услуги, отзывы из этой зоны (если есть), 🎯 CTA. Уникальный контент на зону (не клон!) — иначе SEO накажет.

### 3.6 Brand page (Фаза 2)
H1 «{Бренд} installation & service», о бренде, популярные модели, почему выбрать, офферы этого бренда, 🎯 CTA. Статус партнёрства (D2).

### 3.7 About / trust (`/about`)
История Джона, 🖼 портрет + фото за работой, опыт/числа, сертификаты/лицензии (C2), страховка (C5), гарантия (C4), зоны, философия сервиса. Сильнейшая страница доверия для 40+. 🤖 Person/Organization.

### 3.8 FAQ (`/faq`)
Сгруппированные вопросы (общие / установка / ремонт / цены / гарантия). Источник — Джон (E1). 🤖 FAQPage. Это ещё и AEO-золото (прямые ответы для ИИ).

### 3.9 Contact (`/contact`)
🎯 Большая форма (валидный телефон), все каналы (WhatsApp/тел/email), часы, 🖼 карта, зоны. 🤖 HVACBusiness + ContactPoint.

### 3.10 Thank-you (`/thank-you`)
Подтверждение, что заявка принята, ожидаемое время ответа, ссылки на WhatsApp/телефон «пока ждёте». 🎯 Триггер конверсии Google Ads (сохранить URL!). `noindex`.

### 3.11 Blog (Фаза 3)
Index с карточками + статья (Prose, оглавление, дата, автор, связанные услуги, CTA). 🤖 Article/BlogPosting.

### 3.12 Legal (`/privacy`, `/cookies`, `/legal`)
Prose-страницы. Шаблоны под испанское право (LSSI-CE, RGPD). Реквизиты — плейсхолдеры до C3.

## 4. Контент как данные (промптуемость)

```
src/
  data/
    business.{en,es}.yml     # NAP, часы, телефоны, соцсети, реквизиты — один источник правды
    offers.yml               # 5 офферов: модель, цены, бейджи, фото, период
    services.{en,es}.yml     # услуги: заголовки, что входит, цены-от, FAQ
    areas.{en,es}.yml        # зоны: имя, слаг, текст, гео
    brands.{en,es}.yml       # бренды: имя, слаг, модели, статус
    reviews.yml              # (если уйдём с Elfsight) курируемые отзывы
  content/
    blog/{en,es}/*.md        # статьи (content collections)
  i18n/
    ui.{en,es}.json          # подписи интерфейса
```

Принцип: добавить оффер/зону/бренд/статью = правка/добавление одного файла → одна команда сборки. Идеально для «правок промптами».
