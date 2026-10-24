// Captura la página en celular, tablet y escritorio para revisarla antes de entregar.
// Uso: node tools/screenshots.js [ruta-o-url] [carpeta-salida]
const { chromium } = require('playwright');
const path = require('path');

const target = process.argv[2] || path.resolve(__dirname, '../web/index.html');
const outDir = process.argv[3] || path.resolve(__dirname, '../.screenshots');
const url = target.startsWith('http') ? target : 'file://' + path.resolve(target);
const viewports = [
  { name: 'phone-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

(async () => {
  const browser = await chromium.launch();
  const fs = require('fs');
  fs.mkdirSync(outDir, { recursive: true });
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const problems = [];
    page.on('console', (m) => m.type() === 'error' && problems.push('console: ' + m.text()));
    page.on('requestfailed', (r) => problems.push('request failed: ' + r.url()));
    await page.goto(url, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow) problems.push('horizontal scroll');
    await page.screenshot({ path: path.join(outDir, vp.name + '.png'), fullPage: true });
    console.log(vp.name + ': ' + (problems.length ? problems.join('; ') : 'ok'));
    await page.close();
  }
  await browser.close();
})();
