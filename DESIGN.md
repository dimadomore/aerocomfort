# Design

> Captures the **existing, shipping** visual system (source of truth: `src/styles/tokens.css` + the `@theme` block in `src/styles/global.css`) plus the agreed polish direction. Identity-preservation wins: variants and polish refine this system, they do not replace it.

## Direction

**The rating plate.** The site borrows from the objects of the trade: the spec plate on an outdoor unit and the EU energy label. Facts sit in plain hairline tables, real job photos carry the weight, and nothing is decorated for its own sake. Calm and credible for a 40+ reader, with the hero as the one rich, animated moment.

## Theme

Light only. Surfaces are white plus **one** tint (`--surface-cool #f1f5f9`), alternated without borders. **One dark colour: `--brand-900 #11305c`**, used for the hero, page headers, the final CTA, the footer, headings and dark buttons. Never mix other blues as surfaces. Red is the single primary-CTA accent; WhatsApp green is reserved for WhatsApp.

## Color

Cool-blue brand + warm-red CTA, on cool-tinted neutrals. (Hex below mirror `tokens.css`.)

- **Navy, the one dark colour:** `--brand-900 #11305c`. **Link blue:** `--brand-700 #1c62b8` (text links and hovers only, never a surface).
- **Interactive blue (links / secondary):** `--blue-600 #2c82e6` · `--blue-500 #4a97f0` · `--blue-300 #93c2f6` · `--blue-100 #dcebfc`.
- **Sky (cool-air backgrounds / illustration):** `--sky-300 #bfe1f7` · `--sky-200 #dceffb` · `--sky-100 #eaf5fd` · `--sky-50 #f5fafe`.
- **Cyan micro-accent ("cool air"):** `--cyan-400 #29b6e6` — sparingly, for air/breeze details.
- **Accent — warm CTA red:** `--accent-700 #b82e2e` (hover / text-on-light) · `--accent-600 #d12f2f` (primary CTA) · `--accent-500 #ed5453`. White text on `-600` clears AA.
- **WhatsApp (channel only):** `--wa-600 #1fb457` · `--wa-500 #25d366`.
- **Ink (cool-tinted neutrals):** `--ink-900 #0f1e36` (headings/body) · `--ink-700 #31415c` · `--ink-500 #61708a` (secondary) · `--ink-400 #6b7689` (captions, ~4.6:1 on white). `--line #e4eaf2` borders.
- **Semantic:** `--success #1fa971` · `--warning #f5b400` (gold review stars) · `--error #da3b3b`.

Rule: never gray text on a colored band — use a tint of the band's own hue or a white/ink transparency. Cyan is a detail accent, not a third brand color.

## Typography

- **Display (headings):** "Schibsted Grotesk Variable", weight 800, `text-wrap: balance`. No kickers or eyebrows above section headings; only the home hero has a short audience line.
- **Body / UI:** "Inter Variable", 18px base, line-height 1.6. Secondary text is `--ink-700`, never lighter on white.
- **Scale:** display to 3.75rem, h1 to 3rem, h2 to 2.75rem, h3 to 1.625rem.

## Spacing & Layout

- Container max `1200px`, pad 20px (32px ≥768px). Responsive grids use `repeat(auto-fit, minmax(280px, 1fr))`.
- **Radii:** sm 8 · md 12 · lg 16 · xl 24 · pill 999.
- **Shadows (cool, soft, blue-tinted):** sm `0 1px 2px rgba(20,38,74,.06)` · md `0 8px 24px rgba(20,38,74,.08)` · lg `0 16px 48px rgba(20,38,74,.1)`. Enrichment may add layered/inset cool shadows in this same blue-tinted family — never neutral-black or hard drop shadows.
- Vary spacing for rhythm; avoid uniform stacks.

## Components

- **Card** (`.card`): flat white, 1px `--line`, 4px radius, border turns navy on hover. No shadows, gradients or hover lifts. Use only where a box is truly needed.
- **OfferCard:** the unit as a rating plate: photo, spec rows, EU energy arrow, navy price, navy button.
- **ServiceRow:** photo + title + blurb + arrow in a hairline list. Never icon tiles.
- **AreaFinder:** searchable town list; every town is a real link, `limit` only trims the display.
- **FaqList:** the one accordion. **PageHero:** navy header with an optional real photo fading in on the right.
- **Header:** solid white, navy logo and links. Hover and active share one rule growing from the left; Offers is a quiet price-tag chip; language is a two-segment switch. **Mobile menu:** full-height navy panel with large links.
- **Button** (4px radius, `font-display` bold): `primary` red, `secondary` white, `whatsapp` green, `ghost`. Tap target at least 44px.
- Forms: `.lead-control` 52px min-height, 1.5px `--ink-400` border, blue focus ring.

## Motion

Ease-out only, 150–400ms. Signature motion lives in the hero (photo crossfade, slow push-in). Elsewhere: photo zoom and arrow nudge on hover, nothing else. Every animation has a `prefers-reduced-motion` off-switch.

## Imagery & Iconography

Real Aerocomfort jobs first. Photos replace icons wherever a service or place is shown. Gallery files are only 900px wide, so use them at modest sizes until originals arrive. Icons are for small UI affordances only.
