# Чек-лист сборки и Definition of Done — Aerocomfort

> Операционализация плана: что именно делаем в Фазе 0/1, что считается «готово», как тестируем, что нужно от Джона.

## 1. Фаза 0 — фундамент (не требует фактуры Джона)

- [ ] Tailwind + `tokens.css` из [04](04-design-system.md) (цвета v2, типошкала, spacing, радиусы, тени).
- [ ] Шрифты self-hosted (Archivo + Inter), preload/swap, сабсеты.
- [ ] `Base.astro` layout: `<head>`/`<Seo>`, header, footer, чат-лончер, sticky-bar, cookie-баннер.
- [ ] i18n-каркас (EN корень / ES `/es`), `t()`, `<LangSwitch>`, hreflang.
- [ ] Структура `data/*` + zod-схемы; `business.*` (плейсхолдеры).
- [ ] UI-кит: Button, Container, Badge, Stat, SectionHeading, Prose, Accordion.
- [ ] Секции-каркасы: Hero, TrustBar, ServicesGrid, OffersGrid, Reviews(Elfsight lazy), AreaMap, FAQ, FinalCTA.
- [ ] LeadForm + PhoneInput (libphonenumber, E.164, маска, валидация) + состояния.
- [ ] Form endpoint (Worker): Turnstile + honeypot + email + Google Sheets + redirect `/thank-you`.
- [ ] ChatLauncher (тултип + быстрые действия) и StickyMobileBar.
- [ ] SEO-плумбинг: `<Seo>`, JSON-LD генераторы, sitemap, robots, `llms.txt`, OG-шаблон.
- [ ] Аналитика-каркас: GTM + Consent Mode v2 + события (форма/WhatsApp/звонок) + Cloudflare Web Analytics.
- [ ] Favicon/иконки/manifest, theme-color, 404.
- [ ] Снять плейсхолдер-страницу; `noindex` на проде до запуска.

## 2. Фаза 1 — страницы (MVP, EN+ES)

- [ ] Home (все секции из [05 §3.1](05-information-architecture.md)).
- [ ] Services overview + 4 страницы услуг (installation/repair/maintenance/cleaning).
- [ ] Offers (из `offers.yml`).
- [ ] About / trust (скелет + плейсхолдеры фактов).
- [ ] FAQ (стартовые вопросы + FAQPage schema).
- [ ] Contact (форма + карта + каналы).
- [ ] `/thank-you` (noindex, конверсия).
- [ ] Legal: Privacy, Cookies, Aviso Legal (шаблоны, реквизиты-плейсхолдеры).
- [ ] Перелинковка и хлебные крошки.

## 3. Definition of Done (на каждую страницу/компонент)

- [ ] **Адаптив:** отлично на 360px / планшет / десктоп; тач-таргеты ≥44px.
- [ ] **Первый экран** (где применимо) отвечает что/где/как-связаться (см. [05](05-information-architecture.md)).
- [ ] **Два языка:** EN и ES синхронны.
- [ ] **SEO:** уникальные title/description, canonical, hreflang, OG; корректная иерархия H1–H3.
- [ ] **Schema:** нужный JSON-LD присутствует и валиден.
- [ ] **a11y:** контраст AA, фокус, alt, labels, клавиатура; `prefers-reduced-motion`.
- [ ] **Производительность:** изображения оптимизированы, нет CLS, JS в бюджете.
- [ ] **Детали/полировка:** состояния, микро-взаимодействия, выравнивание (см. [04 §8.5](04-design-system.md)).
- [ ] **Конверсия:** CTA на месте, события стреляют.
- [ ] Проверено на превью-деплое (`dev`).

## 4. QA-матрица перед запуском

- Устройства: iPhone (Safari), Android (Chrome), планшет, десктоп (Chrome/Firefox/Safari/Edge).
- Сценарии: отправка формы (валид/невалид телефон) → лид дошёл (email+Sheets) → редирект → конверсия в Tag Assistant; клик WhatsApp/звонок → события; переключение языков; навигация/меню/аккордеон/лончер с клавиатуры.
- Lighthouse mobile: Perf/SEO/Best/a11y ≥ цели ([03 §5](03-master-plan.md)).
- Контроль: hreflang, sitemap, robots, 404, битые ссылки.

## 5. Запуск — см. [07-migration.md](07-migration.md)
Карта редиректов, перенос DNS, cutover, мониторинг, вывод Tilda.

## 6. Что нужно от Джона (блокеры по приоритету)

| Приоритет | Нужно | Вопрос |
|---|---|---|
| 🔴 до запуска | Доступ Search Console + Google Ads (конверсии) | A1, A2, B1 |
| 🔴 до запуска | Реквизиты (autónomo/SL, NIF) для legal/footer | C3 |
| 🔴 контент | Факты доверия: опыт, установки, сертификаты, гарантия | C1–C5 |
| 🔴 контент | Точные услуги/бренды/зоны/что входит в офферы | D1–D5 |
| 🔴 контент | FAQ (частые вопросы клиентов) | E1 |
| 🔴 ассеты | Фото работ (оригиналы), портрет Джона | F1, F2 |
| 🟡 | Цены «от …€», часы, способы оплаты, страховка | C6,C7,D3 |
| 🟡 | Соцсети, решение по доменной почте | G3, G4 |

> Всё это вставляется в готовый каркас (плейсхолдеры уже размечены) — разработка Фаз 0/1 не заблокирована.
