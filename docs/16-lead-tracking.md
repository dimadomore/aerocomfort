# Lead source and contact clicks

How the site answers "where did this request come from?" and "which pages make people get in touch?". Built 11 Nov 2026.

## What is recorded

**With every form request** (table `leads`, shown in the email and on `/leads`):

| Field | Meaning | Example | Needs analytics consent |
|---|---|---|---|
| `from_page` | Page the visitor was on before the form | `/offers` | no |
| `cta` | Button area they pressed there | `offer-card` | no |
| `landing` | First page of the visit | `/` | yes |
| `referrer` | Outside site that sent them | `www.google.com` | yes |
| `utm_source`, `utm_medium`, `utm_campaign` | Ad or campaign tags from the link | `google / cpc / black-friday` | yes |
| `click_id` | Which ad click id was in the link (name only) | `gclid` | yes |
| `journey` | Pages seen during the visit, in order | `/ > /offers > /contact` | yes |
| `channel` | `form`, or `agent` when an assistant sent it | `form` | no |

Without consent the last five are filled only when the form page itself is the first page of the visit.

**With every contact click** (table `events`, summary on `/leads`, export at `/leads/clicks.csv`): the type (`whatsapp`, `call`, `email`, `quote_click`), the page, the button area, language, phone or desktop, and the campaign if known. No IP address, no browser details, no visitor id. One row is one click: it counts presses, not people, and a press on a phone link is not a confirmed call.

**In WhatsApp:** a message started from any page except the home page ends with `Page: <page title>`, so the source is visible in the chat itself.

## How it works

- `src/lib/journey.ts` runs on every page (loaded by `src/components/analytics/Journey.astro` from the base layout).
- The form sends its result in the hidden field `src`; `worker/lead-source.mjs` cleans it and turns it into plain Russian for the email and `/leads`.
- Clicks go to `POST /api/event`. Google Analytics gets the same clicks as `whatsapp_click`, `phone_click`, `email_click`, `quote_click`, and a sent form as `generate_lead`, once a GA id is set in `src/config.ts`.
- The button's name travels to the contact page inside the link (`/contact#cta=offer-card`) and is removed from the address bar on arrival.

## Privacy

The visit (first page, pages seen, campaign) is kept in `sessionStorage` under `aero-journey`, only after the visitor allows analytics in the cookie dialog, and it disappears when the tab closes. If they refuse, nothing is stored: the page before the form comes from the browser's referrer and the button from the link. Both policies describe this (`src/data/legal.ts`).

## New pages and buttons

Nothing to set up. A new page, for example `/black-friday`, is tracked as soon as it exists and appears under its own path.

Optional, for nicer labels:

- Name a button area: add `data-cta="black-friday-banner"` to the element or any parent. Without it the nearest header, footer or section heading is used (`section:lg-wifi-pro-for-589`).
- Give a page or area a Russian name: add it to `PAGE_NAMES` or `CTA_NAMES` in `worker/lead-source.mjs`.

Areas named today: `hero`, `page-header`, `header`, `mobile-menu`, `sticky-bar`, `final-cta`, `offer-card`, `contact-panel`, `chat-launcher`, `footer`.

For ads, tag the links: `https://aerocomfort.es/offers?utm_source=instagram&utm_medium=social&utm_campaign=black-friday`.

## Database

`migrations/0002_lead_source.sql` adds the columns and the `events` table:

```sh
npx wrangler d1 migrations apply aerocomfort-leads --remote
```

Deploy and migrate in either order. Until the migration is applied the Worker stores leads in the old columns and skips the click counter.

## Checking it

Locally (`npm run dev`): clicks are appended to `data/events.ndjson`, leads to `data/leads.ndjson`, and `/leads` shows both. A local form submit sends a real email if `RESEND_API_KEY` is set in `.dev.vars`, and a real Telegram message if `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set.
