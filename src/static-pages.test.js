import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');

test('serves a branded 404 page with a way back to the portfolio', () => {
  const page = read('public', '404.html');
  expect(page).toContain('<meta name="robots" content="noindex" />');
  for (const href of ['/', '/#about', '/#projects', '/#skills', '/#contact']) expect(page).toContain(`href="${href}"`);
});

test('sets the 404 page in the site fonts and eyebrow style', () => {
  const page = read('public', '404.html');
  const css = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
  // The same font files as the site; absolute paths, because the page is served at any depth.
  for (const file of ['/fonts/manrope-variable.woff2', '/fonts/cormorant-garamond-medium.woff2']) {
    expect(css).toContain(`url("${file}")`);
    expect(page).toContain(`url("${file}")`);
  }
  expect(page).toMatch(/body \{[^}]*font-family: "Manrope"/);
  expect(page).toMatch(/h1 \{[^}]*font-family: "Cormorant Garamond"[^}]*font-weight: 500/);
  expect(page).toMatch(/\.eyebrow \{[^}]*letter-spacing: 0\.18em; text-transform: uppercase/);
});

// 404.html can't use the CSS custom properties, so it repeats their values; the brand refresh in
// #63 missed one, which left the old gold on the page.
test('uses only the design token colors on the 404 page', () => {
  const normalize = (color) => color.toLowerCase().replace(/\s+/g, '');
  const colors = (text) => (text.match(/#[0-9a-f]{6}\b|rgba?\([^)]*\)/gi) ?? []).map(normalize);
  const tokens = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8').match(/:root\s*\{[^}]*\}/)[0];
  const palette = new Set(colors(tokens));
  const used = colors(read('public', '404.html'));
  expect(used.length).toBeGreaterThan(5);
  for (const color of used) expect(palette, `${color} is not a token value`).toContain(color);
});

test('colors the browser chrome with the page background token', () => {
  const tokens = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
  const background = tokens.match(/--color-bg:\s*(#[0-9a-f]{6});/i)[1];
  const manifest = JSON.parse(read('public', 'manifest.json'));
  expect(read('index.html')).toContain(`<meta name="theme-color" content="${background}" />`);
  expect(read('public', '404.html')).toContain(`<meta name="theme-color" content="${background}" />`);
  expect(manifest.theme_color).toBe(background);
  expect(manifest.background_color).toBe(background);
});
