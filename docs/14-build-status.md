# Build status & handover

> Snapshot to resume work in a new session. Updated: 2026-06-14.
> The plan lives in [03-master-plan.md](03-master-plan.md) and siblings (04–13); this file is **where we are against it**.

## TL;DR

- A full **bilingual (EN/ES) static site, 55 pages**, is built and deployed to the **`dev` branch** (12 commits, all CI-green). It covers **Phases 0–2** of the plan plus a polish pass.
- **Not yet merged to `main`.** Push/merge `dev → main` to deploy to the stable staging URL **aero.dimadomore.com** (still `noindex`). dev pushes only produce ephemeral preview URLs (printed in the GitHub Action log).
- Lighthouse (mobile, prod build): **Performance 99 · Best Practices 100 · Accessibility 96 · SEO 66** (SEO is low *only* because staging is `noindex`; it returns to ~100 at launch).
- The site is content-complete enough to **replace Tilda** structurally; what's left is mostly **owner facts/photos, analytics activation, and the migration/cutover**.

## Stack & where things live

- **Astro 6 + Tailwind v4** (CSS-first `@theme`), TypeScript, zod-validated YAML data.
- **Deploy:** Cloudflare Worker (`worker/index.ts`) serving static assets + handling the lead POST; GitHub Actions on push (`main` → `wrangler deploy` → aero.dimadomore.com; `dev` → `wrangler versions upload` → preview URL).
- **Run locally:** `npm install` → `npm run dev` (port 4321). Build: `npm run build`. Types: `npm run check`. Preview server config: `.claude/launch.json` (name `aero`).
- **Design tokens:** `src/styles/tokens.css` (palette) + `@theme` in `src/styles/global.css`. **Content as data:** `src/data/*` (business.yml, offers.yml, services.ts, areas.ts, brands.ts, faq.ts, legal.ts). **Copy/UI strings:** `src/i18n/ui.{en,es}.json`. **SITE_INDEXABLE / integration IDs:** `src/config.ts`.

## Built (Phases 0–2 + polish)

**Pages (each EN + ES, with hreflang/canonical/JSON-LD/sitemap):**
Home · Services overview + 4 service pages (installation/repair/maintenance/cleaning) · Offers · Areas hub + 6 area pages · Brands hub + 5 brand pages · About · FAQ · Contact · /thank-you (noindex) · Privacy · Cookies · Aviso Legal · 404.

**Cross-cutting:**
- Header (sticky; **Offers** = accent underline + "salut" confetti burst; **Get a free quote** = attention pulse; EN/ES switch; one-tap WhatsApp + phone; Offers also shown in mobile bar), Footer, **ChatLauncher**, **StickyMobileBar**.
- **LeadForm + PhoneInput** (libphonenumber-js validation across UK/IE/ES/DE+, E.164, WhatsApp toggle, honeypot) → **/api/lead Worker** → /thank-you. Works with and without JS.
- **Consent Mode v2 + cookie banner** (default-denied; banner only appears once analytics IDs are set), **Cloudflare Web Analytics** hook.
- **Elfsight Google-reviews** widget (LIVE — lazy-loads on viewport), gold rating stars.
- **AreaMap** on /areas (click-to-load Google Maps; until `MAP_EMBED_URL` is set, the button opens the GBP marker — works now).
- SEO plumbing: `<Seo>`, JSON-LD (HVACBusiness/Service/FAQPage/BreadcrumbList/Product), dynamic robots.txt, llms.txt, sitemap, branded favicon/app-icons/OG image (`scripts/gen-assets.mjs`).

## To ACTIVATE (paste values, no code changes — `src/config.ts`)

| What | Where | Effect |
|---|---|---|
| GA4 ID `G-…` (+ Ads `AW-…`, CF beacon token) | `ANALYTICS` | turns on analytics + the cookie banner |
| Google Maps embed `src` | `MAP_EMBED_URL` | inline interactive map on /areas (Maps → place → Share → Embed a map → copy src) |
| Elfsight widget id | `ELFSIGHT_ID` | ✅ already set & live |

**Worker secrets (lead delivery — set in Cloudflare/CI, not in repo):** `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` (email), `TURNSTILE_SECRET` + `PUBLIC_TURNSTILE_SITE_KEY` (anti-spam). Until set, leads are logged (`wrangler tail`).

## Remaining vs the plan

### A. Needs the owner (John) — placeholders are marked `‹…›` in data
- Trust facts: years experience, installs, certifications, guarantee terms, insurance (C1–C5) → TrustBar/About/schema.
- Prices "from €…" (D3); exact service-area list + local detail (D4); FAQ specifics (E1).
- Legal entity name + NIF/address (C3) → fills Privacy/Cookies/Aviso Legal (currently DRAFT templates — need a legal review too).
- Real photos (F1/F2) → hero, About, and the **Gallery section (not built yet — waiting on photos)**.
- Social links (G3); domain email decision (G4).
- **Access:** Google Search Console (A1) + Google Ads (A2) — needed to inventory current conversions before migration.

### B. Deferred technical
- **Conversion events** (form submit / WhatsApp click / tel click → gtag + `/thank-you`) — wire after the GA4/Ads IDs are in. Critical so ads don't regress.
- Lead-delivery secrets + Google Sheets append (mini-CRM).
- Blue logo SVG (light surfaces currently use the CSS-masked white PNG); per-page dynamic OG images; MapLibre alternative if Google embed is undesired.

### C. Phase 3 — Blog + automation
- Blog index + article template + evergreen EN/ES articles (BlogPosting schema). Then the Telegram-bot → auto-article pipeline (docs/12 §3).

### D. Phase 4 — Migration / cutover (docs/07)
- Inventory old Tilda URLs → 301 redirect map; content/keyword parity check.
- Move `aerocomfort.es` DNS to Cloudflare (preserve MX/SPF/DKIM); low TTL.
- Verify conversions in Tag Assistant; **flip `SITE_INDEXABLE` to `true`** + permissive robots; point domain at the Worker; submit sitemap; monitor 4–8 weeks; retire Tilda.

### E. Handover deliverable
- Care/maintenance guide for the owner (plan in docs/12) — finalize as the closing deliverable.

## Notes / gotchas (for prompt-edits)
- Content edits must be done in **both** EN and ES (Definition of Done).
- Astro-scoped `<style>` selectors beat Tailwind utilities (specificity) — for responsive show/hide of an element with a scoped `display`, use a scoped `@media`, not `lg:hidden`. Semantic color utilities (`text-warning` etc.) only work because they're mapped in `@theme`.
- Tailwind dev CSS can go stale after many HMR edits — restart the preview server; production `astro build` is unaffected.
- Everything is `noindex` while `SITE_INDEXABLE=false`.
