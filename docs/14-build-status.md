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
- Header (sticky; **Offers** = accent underline + "salut" confetti burst; **Get a free quote** = attention pulse; EN/ES switch; one-tap WhatsApp + phone; Offers also shown in mobile bar), Footer, **ChatLauncher** (desktop-only ≥1024px since 2026-07-06 — on mobile it duplicated the sticky bar), **StickyMobileBar**.
- **CoolAir backdrop** (`src/components/ui/CoolAir.astro`, 2026-07-06): the signature animated cold-air background — drifting streamline fields (seamless 1200-unit tile), a cyan "current" pulse, frost crystals, cyan glow. Used in Hero (`variant="hero"`) and FinalCta (`variant="panel"`); pure CSS/SVG, reduced-motion safe. Hero band now has a "temperature" gradient (brand-800 → brand-700). The **hero illustration (split-unit SVG + 21° chip) was removed entirely** — the animated backdrop IS the hero visual now; content column is `max-w-3xl`, `hero.imageAlt` i18n keys dropped.
- **Icon duotone v2** (2026-07-06): air strokes in the HVAC glyphs (`ac-unit` louver streams, `wind` middle line, `sparkles` small star) render in `var(--icon-air, var(--cyan-400))` — cyan = cool air, semantic accent only. **Frost sweep**: interactive `.group.card-cool` cards get a faint cyan→white sheen sweeping across on hover (`::before`, reduced-motion off).
- **Legal docs are production copy now** (2026-07-06): privacy/cookies/aviso legal rewritten with real facts (autónomo Gregorio, NIE, processors: Cloudflare/Resend/Google, actual cookie inventory incl. `aero-consent`, retention, RGPD arts., AEPD). Only ‹surname› + ‹address› remain placeholders. `{PHONE}` now substituted in LegalBody.
- `/leads` Basic-Auth uses a constant-time compare; `WebSite` JSON-LD got `alternateName` variants (sitelinks groundwork).
- **Agent-readiness pass (2026-07-06, per specification.website):** `/llms.txt` is now a build-time endpoint (`src/pages/llms.txt.ts`, llmstxt.org format, generated from the data modules) + new **`/llms-full.txt`** (~40 KB, full EN content with `---` page separators and URLs). **robots.txt** (indexable mode) now welcomes named AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended, PerplexityBot, CCBot) and carries `Content-Signal: search=yes, ai-input=yes, ai-train=yes` (visibility is the business goal). **`/.well-known/security.txt`** added (RFC 9116; ⛔ bump `Expires:` before 2027-07-01). **Security + Link headers** on every response: static assets via `public/_headers` (Workers Assets serves them without invoking the Worker), dynamic routes via `SITE_HEADERS` in `worker/index.ts` — keep the two in sync. Verified on `wrangler dev` (headers on `/` and `/leads`; auth flow intact). Deliberately skipped as N/A for a small marketing site: per-page `.md` endpoints, RSS (until the Phase-3 blog), MCP/A2A/NLWeb/WebMCP/agent-skills/api-catalog, strict CSP (GA4/Elfsight inline scripts).
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

**Worker secrets (set in Cloudflare/CI, not in repo):** `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` (email); `LEADS_PASSWORD` (+ optional `LEADS_USER`) for the private `/leads` CRM login; `TURNSTILE_SECRET` + `PUBLIC_TURNSTILE_SITE_KEY` (anti-spam). Locally these live in `.dev.vars` (git-ignored), read by both `astro dev` and `wrangler dev`.

## Remaining vs the plan

### A. Owner facts — mostly ANSWERED & integrated (2026-06-14)
- ✅ In the site now: 1000+ installs · certified for fluorinated-gas handling (cert number withheld) · 3-yr workmanship + 3-yr equipment guarantee · payments card/transfer/Bizum/cash (no instalments) · brands Mitsubishi Electric, Panasonic, LG, Giatsu, Haier, Samsung, Gree · also heat pumps (aerotermia) + ventilation (no refrigeration) · cleaning from €50 (install/repair on quote) · install time 24–72h · real FAQ · full service-area list (Costa Blanca & Costa Cálida, 45+ towns, 14 with pages) · autónomo, NIE Y9274595C, manager Gregorio.
- ⛔ Still needed: full legal **surname** (Aviso Legal + footer reg line stay hidden until then) · **insurance** (seguro RC) yes/no · years-in-business (not given) · confirm the **Daikin** seasonal offer (Daikin isn't in the brand list) · real **photos** → hero/About + a **Gallery** (not built yet) · social links (G3) · domain email (G4) · Search Console (A1) + Google Ads (A2) access for the migration.

### B. Deferred technical
- **Conversion events** (form submit / WhatsApp click / tel click → gtag + `/thank-you`) — wire after the GA4/Ads IDs are in. Critical so ads don't regress.
- **Lead email + mini-CRM (DONE, verified locally).** Lead logic is shared in `worker/lead-core.mjs` (parse, anti-spam, Resend email, table render, Basic-Auth) and runs identically in the Worker (prod) and the local Astro dev middleware (`worker/dev-lead-middleware.mjs`, wired in `astro.config.mjs`).
  - **Email:** Russian notification via Resend (HTTP 200 confirmed). Recipient `dimadomore@gmail.com`, sender `onboarding@resend.dev` (Resend test sender — only delivers to the Resend account's own address until a domain is verified; ⛔ verify `aerocomfort.es` in Resend to send anywhere + improve deliverability).
  - **Storage:** Cloudflare **D1** `aerocomfort-leads` (id `0f7286b3-9422-4d6b-99d2-56381adb9545`), bound as `DB` in `wrangler.jsonc`; schema in `migrations/0001_init.sql` (applied **remote**; apply **local** with `wrangler d1 migrations apply aerocomfort-leads --local`). Worker writes each lead to D1; `astro dev` writes the file `data/leads.{csv,ndjson}` instead (no FS in the Worker).
  - **Private CRM viewer:** `GET /leads` (HTML table, newest-first) + `GET /leads.csv`, gated by Basic Auth (`LEADS_PASSWORD`, username ignored unless `LEADS_USER` set), `X-Robots-Tag: noindex` + `Disallow: /leads` in robots.txt. Same domain as the site (`…/leads`). Verified end-to-end on `wrangler dev` (POST→D1→/leads) and `astro dev` (file). ⛔ Set `LEADS_PASSWORD` as a Worker secret for prod; current local test password is in `.dev.vars`.
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
