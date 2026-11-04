import { copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE = 'https://airaluxury.in';
const OUT = 'dist/aira-web/browser';

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name === 'index.html') pages.push(relative(OUT, dir).split(sep).join('/'));
  }
})(OUT);

// Hosts serve /404.html for unknown URLs, with a real 404 status.
const notFound = join(OUT, 'not-found', 'index.html');
if (existsSync(notFound)) copyFileSync(notFound, join(OUT, '404.html'));

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((page) => page !== 'not-found')
  .sort()
  .map((page) => `  <url>\n    <loc>${SITE}/${page}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`);

writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
console.log(`sitemap.xml: ${urls.length} pages, 404.html: ${existsSync(notFound) ? 'yes' : 'no'}`);
