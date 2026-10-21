import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CHROME = '"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"';
const OUT_DIR = path.resolve('logos');
const PUBLIC_DIR = path.resolve('tera-frontend/public/logos');

const SVG_MARK = (size = 40) => `
<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4.5" y="4.5" width="32" height="32" rx="8" fill="#171715" />
  <rect x="2.5" y="2.5" width="32" height="32" rx="8" fill="#0B1912" stroke="#171715" stroke-width="1.75" />
  <path d="M10 27.5H27" stroke="#F59E0B" stroke-width="1.75" stroke-linecap="round" />
  <path d="M13.5 30.5H23.5" stroke="#2F6C4C" stroke-width="1.5" stroke-linecap="round" />
  <path d="M18.5 27.5V18" stroke="#F59E0B" stroke-width="1.75" stroke-linecap="round" />
  <path d="M18.5 22C14.5 22 11.5 18 12.5 14C15.5 14 18.5 17 18.5 21Z" fill="#FBBF24" stroke="#171715" stroke-width="1.2" stroke-linejoin="round" />
  <path d="M18.5 19C18.5 14 22.5 10 26.5 11C26.5 15 23.5 19 18.5 19Z" fill="#22C55E" stroke="#171715" stroke-width="1.2" stroke-linejoin="round" />
  <circle cx="18.5" cy="22" r="1.25" fill="#FAF9F6" />
</svg>
`;

const SVG_MARK_DARK = (size = 40) => `
<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4.5" y="4.5" width="32" height="32" rx="8" fill="#171715" opacity="0.6" />
  <rect x="2.5" y="2.5" width="32" height="32" rx="8" fill="#122B1E" stroke="#FCD34D" stroke-width="1.75" />
  <path d="M10 27.5H27" stroke="#FCD34D" stroke-width="1.75" stroke-linecap="round" />
  <path d="M13.5 30.5H23.5" stroke="#68BA88" stroke-width="1.5" stroke-linecap="round" />
  <path d="M18.5 27.5V18" stroke="#FCD34D" stroke-width="1.75" stroke-linecap="round" />
  <path d="M18.5 22C14.5 22 11.5 18 12.5 14C15.5 14 18.5 17 18.5 21Z" fill="#FDE68A" stroke="#171715" stroke-width="1.2" stroke-linejoin="round" />
  <path d="M18.5 19C18.5 14 22.5 10 26.5 11C26.5 15 23.5 19 18.5 19Z" fill="#4ADE80" stroke="#171715" stroke-width="1.2" stroke-linejoin="round" />
  <circle cx="18.5" cy="22" r="1.25" fill="#FAF9F6" />
</svg>
`;

const templates = [
  // 1. Icon Only 512x512 Transparent
  {
    name: 'terastani-icon-512.png',
    width: 512,
    height: 512,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 512px; height: 512px; display: flex; align-items: center; justify-content: center; background: transparent; }
        </style>
      </head>
      <body>
        ${SVG_MARK(440)}
      </body>
      </html>
    `
  },
  // 2. Icon Only 1024x1024 Transparent Ultra-High-Res
  {
    name: 'terastani-icon-1024.png',
    width: 1024,
    height: 1024,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 1024px; height: 1024px; display: flex; align-items: center; justify-content: center; background: transparent; }
        </style>
      </head>
      <body>
        ${SVG_MARK(880)}
      </body>
      </html>
    `
  },
  // 3. Full Brand Lockup Horizontal Transparent (1200x360)
  {
    name: 'terastani-logo-horizontal-transparent.png',
    width: 1200,
    height: 360,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=JetBrains+Mono:wght@600&family=Plus+Jakarta+Sans:wght@700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 360px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .container {
            display: flex;
            align-items: center;
            gap: 28px;
          }
          .brand-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
            font-size: 72px;
            letter-spacing: -0.03em;
            color: #171715;
            line-height: 1;
          }
          .title em {
            font-family: 'Fraunces', serif;
            font-style: italic;
            font-weight: 400;
            color: #1B3D2B;
          }
          .subtitle {
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.28em;
            color: #565550;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${SVG_MARK(150)}
          <div class="brand-text">
            <div class="title">Teras<em>Tani</em></div>
            <div class="subtitle">Agrikultur Presisi Komunal</div>
          </div>
        </div>
      </body>
      </html>
    `
  },
  // 4. Full Brand Lockup on Tactile Paper Card (1200x630 Social / Presentation)
  {
    name: 'terastani-logo-card-paper.png',
    width: 1200,
    height: 630,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=JetBrains+Mono:wght@600&family=Plus+Jakarta+Sans:wght@700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 630px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #FAF9F6;
            background-image: radial-gradient(#171715 0.75px, transparent 0.75px);
            background-size: 24px 24px;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .card {
            background: #FFFFFF;
            border: 3px solid #171715;
            border-radius: 28px;
            padding: 56px 72px;
            display: flex;
            align-items: center;
            gap: 36px;
            box-shadow: 8px 8px 0px 0px #171715;
          }
          .brand-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
            font-size: 76px;
            letter-spacing: -0.03em;
            color: #171715;
            line-height: 1;
          }
          .title em {
            font-family: 'Fraunces', serif;
            font-style: italic;
            font-weight: 400;
            color: #1B3D2B;
          }
          .subtitle {
            font-family: 'JetBrains Mono', monospace;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.28em;
            color: #565550;
            margin-top: 12px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          ${SVG_MARK(140)}
          <div class="brand-text">
            <div class="title">Teras<em>Tani</em></div>
            <div class="subtitle">Platform Agrikultur Komunal Terdesentralisasi</div>
          </div>
        </div>
      </body>
      </html>
    `
  },
  // 5. Dark Mode Luxury Lockup (1200x400)
  {
    name: 'terastani-logo-dark.png',
    width: 1200,
    height: 400,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=JetBrains+Mono:wght@600&family=Plus+Jakarta+Sans:wght@700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0B1912;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .container {
            display: flex;
            align-items: center;
            gap: 32px;
          }
          .brand-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
            font-size: 74px;
            letter-spacing: -0.03em;
            color: #FAF9F6;
            line-height: 1;
          }
          .title em {
            font-family: 'Fraunces', serif;
            font-style: italic;
            font-weight: 400;
            color: #FCD34D;
          }
          .subtitle {
            font-family: 'JetBrains Mono', monospace;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.28em;
            color: #9EBFAD;
            margin-top: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${SVG_MARK_DARK(150)}
          <div class="brand-text">
            <div class="title">Teras<em>Tani</em></div>
            <div class="subtitle">Platform Agrikultur Komunal &bull; Est. 2026</div>
          </div>
        </div>
      </body>
      </html>
    `
  }
];

const tmpHtml = path.resolve('/tmp/logo_render.html');

for (const t of templates) {
  fs.writeFileSync(tmpHtml, t.html);
  const outPath = path.join(OUT_DIR, t.name);
  const publicOutPath = path.join(PUBLIC_DIR, t.name);

  const cmd = `${CHROME} --headless=new --disable-gpu --default-background-color=00000000 --window-size=${t.width},${t.height} --screenshot="${outPath}" "file://${tmpHtml}"`;
  execSync(cmd);
  fs.copyFileSync(outPath, publicOutPath);
  console.log(`✓ Rendered: ${t.name} (${t.width}x${t.height})`);
}

console.log('✅ All logo PNG files generated successfully!');
