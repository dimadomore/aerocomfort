# Техническая архитектура — Aerocomfort

> Как сайт устроен внутри: стек, структура, формы, аналитика, производительность, безопасность. Цель — простота, скорость и «промптуемость».

## 1. Стек

- **Astro** (статический вывод) — контент-сайт, нулевой JS по умолчанию, острова интерактива по необходимости.
- **Tailwind CSS** — утилиты поверх дизайн-токенов (CSS-переменные из [04](04-design-system.md)).
- **TypeScript** — типобезопасность данных/схем.
- **Хостинг** — Cloudflare Worker со статикой (assets), CI на GitHub Actions (см. [README](../README.md)).
- **Минимум зависимостей.** Каждая новая — обоснована.

## 2. Структура репозитория

```
src/
  pages/                # маршруты; EN в корне, ES в /es (см. ниже)
    index.astro
    services/[…].astro
    [...]
  layouts/
    Base.astro          # html, head(SEO), header, footer, чат-лончер, sticky-bar
    Page.astro          # типовая внутренняя страница + breadcrumbs
    Article.astro       # блог
  components/
    ui/                 # Button, Badge, Stat, Container, Prose, Accordion…
    sections/           # Hero, ServicesGrid, OffersGrid, TrustBar, Reviews, AreaMap, FinalCTA…
    islands/            # интерактив: LeadForm, PhoneInput, ChatLauncher, StickyMobileBar, Gallery, CountUp
    seo/                # <Seo>, JSON-LD генераторы
  data/                 # ИСТОЧНИК ПРАВДЫ (yaml + zod-схемы)
    business.{en,es}.yml
    offers.yml
    services.{en,es}.yml
    areas.{en,es}.yml
    brands.{en,es}.yml
  content/              # content collections
    blog/{en,es}/*.md
  i18n/
    ui.{en,es}.json     # подписи интерфейса
    utils.ts            # t(), маршрутизация языков, hreflang
  styles/
    tokens.css          # CSS-переменные из дизайн-системы
    global.css
  lib/                  # хелперы (schema, формат телефона, аналитика-события)
  assets/               # изображения под Astro <Image>
public/                 # favicon, robots.txt, llms.txt, статичные og (если нужно)
worker/                 # endpoint формы (или /functions)
```

## 3. i18n (EN корень / ES `/es`)

- Astro i18n routing: `defaultLocale: 'en'` (без префикса), `locales: ['en','es']`, ES под `/es/`.
- Слаги локализованы (см. [05](05-information-architecture.md)); карта соответствий EN↔ES для переключателя языка и hreflang.
- Тексты UI — в `i18n/ui.*.json`; контент — в парных data/content-файлах.
- Хелпер `t(locale, key)`; компонент `<LangSwitch>` ведёт на парный URL; `<Seo>` генерит `hreflang` (en/es/x-default).

## 4. Стилизация

- Tailwind `theme.extend` мапит токены на классы (цвета `brand/blue/sky/accent/ink`, радиусы, тени, контейнер, fluid-типошкала через `clamp`).
- Шрифты self-hosted через `@fontsource-variable/archivo` и `@fontsource-variable/inter`; `font-display: swap`; preload основного веса; сабсет `latin` + `latin-ext` (ES-диакритика).
- Немного компонентных классов для повторяющихся паттернов (кнопки) — остальное утилитами.

## 5. Контент как данные

- `data/*.yml` валидируются **zod**-схемами (Astro content collections / кастомный лоадер) → ошибки ловятся на сборке.
- `business.*` — один источник: телефон, WhatsApp, email, часы, адрес/гео, соцсети, реквизиты. Потребляют: header, footer, `<Seo>`, JSON-LD, contact.
- Добавить оффер/зону/бренд/услугу = правка одного YAML. Статью = один `.md`. → «правки промптом».

## 6. Интерактив (острова, по минимуму)

Только там, где реально нужен JS; грузим лениво (`client:visible`/`client:idle`):
- **PhoneInput** — `libphonenumber-js` (lite-сборка): автоопределение страны (по языку/гео-хинту Cloudflare), флаг+код, маска, живая валидация, нормализация в E.164, тумблер «есть WhatsApp». Блокирует сабмит при невалидном.
- **LeadForm** — поля, состояния loading/success/error, honeypot, Turnstile.
- **ChatLauncher** — тултип, быстрые действия (WhatsApp/звонок/мини-форма). Свой, лёгкий.
- **StickyMobileBar** — появляется по скроллу.
- **Gallery** — лайтбокс/слайдер before-after (минимальный, без тяжёлых либ).
- **CountUp** — анимация цифр на скролле.
- FAQ — нативный `<details>` (ноль JS).
- Все уважают `prefers-reduced-motion`.

## 7. Формы и доставка лида

Поток: **клиент валидирует → POST на endpoint → проверка Turnstile → доставка → редирект `/thank-you`.**

- **Endpoint** — Cloudflare Worker/Pages Function (TypeScript).
- **Доставка лида (резервируется в 2+ канала):**
  1. **Email** Джону (Resend или MailChannels) — со всеми деталями (имя, телефон E.164, услуга, сообщение, язык, источник/UTM, страница).
  2. **Google Sheets** (append через service account) — мини-CRM.
  3. (Опц.) уведомление в Telegram/WhatsApp.
- **Анти-спам:** Turnstile (бесплатно, невидимо) + honeypot + базовый rate-limit (KV).
- **Данные/GDPR:** согласие чекбоксом, хранение минимально, политика в [privacy]; секреты — в Worker secrets, не в клиенте.
- **Надёжность:** ошибки логируются; если канал доставки упал — лид не теряется (очередь/повтор, ответ пользователю всё равно успех при принятом запросе).

## 8. Аналитика, согласие, конверсии

- **GTM** (или прямой gtag) + **Consent Mode v2**: по умолчанию `denied` до согласия (требование ЕС); cookie-баннер сохраняет выбор и обновляет consent.
- **GA4** + связь с Google Ads.
- **События-конверсии (1:1 со старым сайтом):** `generate_lead` (сабмит формы) + просмотр `/thank-you`, `whatsapp_click`, `call_click` (tel:). Точный маппинг — после доступа к Ads (см. [06](06-seo-aeo.md) §5).
- **Cloudflare Web Analytics** — бесплатный безкуковый базовый трафик (не зависит от согласия).
- Проверка через Google Tag Assistant до запуска.

## 9. Изображения и производительность

- Astro `<Image>`/`<Picture>`: AVIF+WebP, адаптивный `srcset`, нужные размеры; LCP-герой — `eager` + `preload`, остальное — `lazy`.
- **Бюджет производительности:** интерактивный JS суммарно ориентир ≤ ~60 КБ gzip; шрифты сабсет+preload; ноль render-blocking; третьи стороны (Elfsight) — ленивая загрузка по `IntersectionObserver` с резервом высоты (ноль CLS).
- Цели: Lighthouse mobile Perf ≥95, LCP <2.5s, INP <200ms, CLS <0.1.
- Кэш через Cloudflare; иммутабельные ассеты с хэшем.

## 10. SEO-плумбинг (технически)

- `<Seo>`-компонент: `title`, `description`, canonical, hreflang, OG/Twitter, robots (для `/thank-you` и превью — `noindex`).
- JSON-LD генераторы в `lib/schema.ts` (HVACBusiness, Service, FAQPage, BreadcrumbList, Offer, Article) — из `business`-data.
- `@astrojs/sitemap` (с hreflang), `robots.txt`, `public/llms.txt`.

## 11. Безопасность и приватность

- Security-заголовки (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) через Cloudflare/Worker.
- Секреты только на сервере (Worker secrets / GitHub secrets).
- Минимизация персональных данных, прозрачная политика, Turnstile вместо инвазивных капч.

## 12. Зависимости (предполагаемые)

`astro`, `@astrojs/sitemap`, `tailwindcss` (+`@tailwindcss/vite`), `@fontsource-variable/archivo`, `@fontsource-variable/inter`, `libphonenumber-js`, `zod` (через Astro), `wrangler` (деплой). Всё лёгкое, поддерживаемое.

## 13. Конвенции и рабочий процесс

- Ветки: `dev` (превью) → `main` (прод). Маленькие осмысленные коммиты.
- Скрипты: `dev`, `build`, `preview`, `astro check`, (позже) `lint`.
- Каждая страница/компонент проходит Definition of Done (см. [13](13-build-checklist.md)).
- Код пишется «читаемо для LLM»: понятные имена, изоляция данных, комментарии где нужно — чтобы будущие правки промптами были надёжны.
