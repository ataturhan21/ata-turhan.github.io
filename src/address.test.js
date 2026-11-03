import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');

test('builds with relative asset paths so the site works at any Pages address', () => {
  const config = fs.readFileSync(path.join(root, 'vite.config.js'), 'utf8');
  expect(config).toMatch(/^\s*base: '\.\/',$/m);
  // Vite rewrites these root paths to the base when it builds; a %PUBLIC_URL% placeholder would ship as is.
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  expect(html).not.toContain('%PUBLIC_URL%');
  expect(html).toContain('<script type="module" src="/src/index.jsx"></script>');
});

test('redirects the old project-site address to the root portfolio', () => {
  const page = fs.readFileSync(path.join(root, 'public', 'ata-turhan.github.io', 'index.html'), 'utf8');
  expect(page).toContain('content="0; url=https://ataturhan21.github.io/"');
  expect(page).toContain('<link rel="canonical" href="https://ataturhan21.github.io/" />');
});
