# Aerocomfort

Website for Aerocomfort — HVAC / air conditioning services in Costa Blanca, Alicante, Spain (installation, repair, maintenance, sales).

- Current (legacy) site: https://aerocomfort.es/ (EN) / https://aerocomfort.es/es (ES), built on Tilda
- This repo: the new AI-built, natively-coded replacement (static, fast, SEO/AEO-first)

## Status

📋 Planning phase (scaffold deployed). All project documentation lives in [`docs/`](docs/):

- [docs/00-brief.md](docs/00-brief.md) — project brief and current-site audit
- [docs/01-interview.md](docs/01-interview.md) — discovery interview + answers
- [docs/02-questions-for-john.md](docs/02-questions-for-john.md) — questionnaire for the owner
- [docs/03-master-plan.md](docs/03-master-plan.md) — vision, principles, roadmap, risks, metrics
- [docs/04-design-system.md](docs/04-design-system.md) — colors, type, components, tone, a11y
- [docs/05-information-architecture.md](docs/05-information-architecture.md) — sitemap, URLs/i18n, page blocks
- [docs/06-seo-aeo.md](docs/06-seo-aeo.md) — SEO, AEO/GEO, structured data, analytics
- [docs/07-migration.md](docs/07-migration.md) — zero-regression cutover from Tilda
- [docs/08-content-and-assets.md](docs/08-content-and-assets.md) — content approach + asset/photo/animation specs

## Stack & deploy

- [Astro](https://astro.build) static site, deployed as a Cloudflare Worker with static assets ([wrangler.jsonc](wrangler.jsonc)).
- CI: [GitHub Actions](.github/workflows/deploy.yml), needs repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.
- Push to `main` → production: https://aero.dimadomore.com (temporary domain until switching to aerocomfort.es).
- Push to `dev` → preview version, unique URL printed in the Action log (`*-aerocomfort.dimadomore.workers.dev`).
- The custom domain is attached account-level via the Workers Domains API (not via wrangler routes — the CI token has no zone permissions).

```sh
npm install
npm run dev     # local dev server
npm run build   # build to dist/
```
