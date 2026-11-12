/**
 * One-off asset generator (run: `node scripts/gen-assets.mjs`).
 * Produces brand favicon + app icons + a default OG share image into public/,
 * using the brand palette (docs/04) and the existing white logo. Re-run if the
 * logo or brand colour changes. Output PNGs are committed (no build-time cost).
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const BRAND = '#1c62b8';
const BRAND_DEEP = '#11305c';
const CYAN = '#29b6e6';

// --- Favicon / app-icon mark: a split AC unit breathing cool air, on brand. ---
const markGlyph = (size, pad = 0) => `
  <g transform="translate(${pad},${pad})">
    <rect x="13" y="16" width="38" height="12" rx="5" fill="none" stroke="#fff" stroke-width="3.5"/>
    <circle cx="20" cy="22" r="2.2" fill="${CYAN}"/>
    <g stroke="#fff" stroke-width="3.6" stroke-linecap="round" fill="none">
      <path d="M23 33c-2.5 4-2.5 8 0 12"/>
      <path d="M41 33c-2.5 4-2.5 8 0 12"/>
    </g>
    <path d="M32 33c-2.5 4-2.5 9 0 13" stroke="${CYAN}" stroke-width="3.6" stroke-linecap="round" fill="none"/>
  </g>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${BRAND}"/>
  ${markGlyph(64)}
</svg>`;

// Maskable: same glyph but on a full-bleed background with generous safe padding.
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="${BRAND}"/>
  <g transform="translate(6,6) scale(0.82)">${markGlyph(64)}</g>
</svg>`;

// --- Default OG share image (1200x630) ---
const logoB64 = readFileSync('assets/brand/aerocomfort-logo.png').toString('base64');
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BRAND}"/>
  <g stroke="#ffffff" stroke-opacity="0.10" stroke-width="3" fill="none">
    <path d="M-50 150 C 320 70, 560 230, 950 150 S 1300 80, 1300 150"/>
    <path d="M-50 330 C 300 250, 620 410, 980 330 S 1300 260, 1300 330"/>
    <path d="M-50 500 C 280 420, 640 560, 1000 480 S 1300 420, 1300 480"/>
  </g>
  <image href="data:image/png;base64,${logoB64}" x="84" y="150" width="150" height="133"/>
  <text x="84" y="380" font-family="Helvetica, Arial, sans-serif" font-size="62" font-weight="800" fill="#ffffff">Air conditioning</text>
  <text x="84" y="452" font-family="Helvetica, Arial, sans-serif" font-size="62" font-weight="800" fill="#ffffff">on the Costa Blanca</text>
  <text x="84" y="520" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="#dcebfc">Installation · Repair · Maintenance · 5.0★ on Google</text>
</svg>`;

// --- Black Friday share image (1200x630), one per language. Price, unit name and
// photo are copied from src/data/promo.ts: re-run after changing the promotion. ---
const PROMO_OG = { price: 589, name: 'Giatsu Black Edition 3', kw: { en: '3.5 kW', es: '3,5 kW' } };
const promoPhotoB64 = readFileSync('public/offers/giatsu-black-edition-3.webp');
const promoSvg = (locale, photoB64) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0c10"/>
  <clipPath id="r"><rect x="690" y="96" width="438" height="438" rx="10"/></clipPath>
  <rect x="690" y="96" width="438" height="438" rx="10" fill="#c23030"/>
  <image href="data:image/png;base64,${photoB64}" x="690" y="144" width="438" height="342" clip-path="url(#r)"/>
  <image href="data:image/png;base64,${logoB64}" x="72" y="64" width="90" height="80"/>
  <text x="72" y="226" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="800" letter-spacing="3" fill="#ffffff">BLACK <tspan fill="#f5b301">FRIDAY</tspan></text>
  <text x="72" y="430" font-family="Helvetica, Arial, sans-serif" font-weight="800" fill="#ffffff"><tspan font-size="110" dy="-78" fill="#f5b301">€</tspan><tspan font-size="220" dy="78" letter-spacing="-8">${PROMO_OG.price}</tspan></text>
  <text x="72" y="496" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff">${PROMO_OG.name} · ${PROMO_OG.kw[locale]}</text>
  <text x="72" y="544" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="500" fill="#d6d9de">${locale === 'es' ? 'Instalación básica incluida · Oferta limitada' : 'Basic installation included · Limited offer'}</text>
</svg>`;

mkdirSync('public/og', { recursive: true });

writeFileSync('public/favicon.svg', faviconSvg);

const out = async () => {
  await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile('public/favicon-32.png');
  await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(Buffer.from(maskableSvg)).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(Buffer.from(maskableSvg)).resize(512, 512).png().toFile('public/icon-512.png');
  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 86 }).toFile('public/og/aerocomfort-default.jpg');
  // Flat JPEG at quality 86 stays far below the 300 KB some messengers allow.
  const photoPng = (await sharp(promoPhotoB64).png().toBuffer()).toString('base64');
  for (const locale of ['en', 'es']) {
    await sharp(Buffer.from(promoSvg(locale, photoPng))).jpeg({ quality: 86, mozjpeg: true }).toFile(`public/og/black-friday-${locale}.jpg`);
  }
  console.log('Assets generated → public/: favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png, og/aerocomfort-default.jpg');
};
out();
