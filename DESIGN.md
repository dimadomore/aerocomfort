# Design

> Captures the **existing, shipping** visual system (source of truth: `src/styles/tokens.css` + the `@theme` block in `src/styles/global.css`) plus the agreed polish direction. Identity-preservation wins: variants and polish refine this system, they do not replace it.

## Direction

**Tasteful enrichment, fresh & cool-air.** Keep the layouts and the blue/red identity. Add real depth, texture and micro-detail to icons, cards, buttons and borders so the UI feels crafted and complete — while staying calm and credible for a 40+ audience. Lean into the product: light, airy, cool-blue depth with subtle air / temperature / breeze motifs and crisp edges.

## Theme

Light only (`color-scheme: light`). White (`--surface`) and a cool near-white (`--surface-cool #f4f9fd`) alternate sections; deep brand blues carry hero / footer / dark bands. Color strategy: **Committed** — cool blue is the dominant brand surface; warm red is the single CTA accent (≤10%); WhatsApp green is reserved exclusively for the WhatsApp channel.

## Color

Cool-blue brand + warm-red CTA, on cool-tinted neutrals. (Hex below mirror `tokens.css`.)

- **Brand blue (anchor / surfaces):** `--brand-900 #11305c` (footer, deepest) · `--brand-800 #16498f` · `--brand-700 #1c62b8` (hero bg) · `--brand-600 #2479e0`.
- **Interactive blue (links / secondary):** `--blue-600 #2c82e6` · `--blue-500 #4a97f0` · `--blue-300 #93c2f6` · `--blue-100 #dcebfc`.
- **Sky (cool-air backgrounds / illustration):** `--sky-300 #bfe1f7` · `--sky-200 #dceffb` · `--sky-100 #eaf5fd` · `--sky-50 #f5fafe`.
- **Cyan micro-accent ("cool air"):** `--cyan-400 #29b6e6` — sparingly, for air/breeze details.
- **Accent — warm CTA red:** `--accent-700 #b82e2e` (hover / text-on-light) · `--accent-600 #d12f2f` (primary CTA) · `--accent-500 #ed5453`. White text on `-600` clears AA.
- **WhatsApp (channel only):** `--wa-600 #1fb457` · `--wa-500 #25d366`.
- **Ink (cool-tinted neutrals):** `--ink-900 #0f1e36` (headings/body) · `--ink-700 #31415c` · `--ink-500 #61708a` (secondary) · `--ink-400 #6b7689` (captions, ~4.6:1 on white). `--line #e4eaf2` borders.
- **Semantic:** `--success #1fa971` · `--warning #f5b400` (gold review stars) · `--error #da3b3b`.

Rule: never gray text on a colored band — use a tint of the band's own hue or a white/ink transparency. Cyan is a detail accent, not a third brand color.

## Typography

- **Display (headings):** "Archivo Variable" (weight 800), letter-spacing −0.015em, `text-wrap: balance`.
- **Body / UI:** "Inter Variable", 18px base (`--text-body 1.125rem`), line-height 1.6. *(Inter is on impeccable's reflex-reject list; it is the committed shipping body face here, so identity-preservation wins — do not swap it during polish. Earn distinctiveness through Archivo display contrast, weight, and detail, not a font change.)*
- **Fluid scale (clamp):** display `clamp(2.5→3.75rem)` (lh 1.05) · h1 `→3rem` · h2 `→2.25rem` · h3 `→1.625rem` · body-lg 1.25rem · body 1.125rem · small 1rem · caption .875rem. Hero display max ≤ 6rem ✓, letter-spacing ≥ −0.04em ✓.

## Spacing & Layout

- Container max `1200px`, pad 20px (32px ≥768px). Responsive grids use `repeat(auto-fit, minmax(280px, 1fr))`.
- **Radii:** sm 8 · md 12 · lg 16 · xl 24 · pill 999.
- **Shadows (cool, soft, blue-tinted):** sm `0 1px 2px rgba(20,38,74,.06)` · md `0 8px 24px rgba(20,38,74,.08)` · lg `0 16px 48px rgba(20,38,74,.1)`. Enrichment may add layered/inset cool shadows in this same blue-tinted family — never neutral-black or hard drop shadows.
- Vary spacing for rhythm; avoid uniform stacks.

## Components

- **Button** (pill, `font-display` bold): `primary` red, `secondary` white + blue ring, `whatsapp` green, `ghost`. Hover lift `-translate-y-0.5` + shadow step. Tap target ≥44px.
- **Cards** (OfferCard, service/area/brand tiles): white, `border-line`, `shadow-sm`, radius xl, hover `-translate-y-1` + `shadow-md`. *Risk area:* must avoid the identical-icon-tile-grid tell — differentiate via real depth, content, and cool-air detailing, not just a border.
- **Icon** (`src/components/ui/Icon.astro`): one consistent Lucide-style stroke-1.75 set + filled brand glyphs (WhatsApp, star). Single-path = clean but generic; enrichment target for duotone / cool-air character on the HVAC glyphs (ac-unit, wind, snow, thermometer).
- **SectionHeading:** currently `eyebrow` = uppercase tracked label, used on ~15 sections. *De-slop target:* the repeated tracked eyebrow is AI section-grammar; replace the default cadence (keep at most one deliberate kicker as a named brand device).
- Forms: `.lead-control` 52px min-height, 1.5px border, blue focus ring. Header sticky; ChatLauncher + StickyMobileBar persistent contact.

## Motion

Ease-out only (no bounce/elastic), 150–200ms. Existing signatures: CTA attention pulse (`cta-pulse`), "Offers" nav accent underline + periodic confetti (`salut`), hover lifts. Every animation has a `prefers-reduced-motion` off-switch (honored globally). Enrichment may add intentional, staggered, air/breeze-flavored motion — never fade-on-scroll on every section.

## Imagery & Iconography

Owner photos pending; current hero/offer art is custom SVG (line-drawn AC unit + airflow). Treat SVG/canvas as first-class imagery: enrich toward depth and the cool-air motif rather than adding stock. Keep one consistent icon set; no mismatched emoji.
