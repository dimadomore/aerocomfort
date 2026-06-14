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

mkdirSync('public/og', { recursive: true });

writeFileSync('public/favicon.svg', faviconSvg);

const out = async () => {
  await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile('public/favicon-32.png');
  await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(Buffer.from(maskableSvg)).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(Buffer.from(maskableSvg)).resize(512, 512).png().toFile('public/icon-512.png');
  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 86 }).toFile('public/og/aerocomfort-default.jpg');
  console.log('Assets generated → public/: favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png, og/aerocomfort-default.jpg');
};
out();
