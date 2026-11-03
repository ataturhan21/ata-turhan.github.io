import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');

test('builds with relative asset paths so the site works at any Pages address', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  expect(pkg.homepage).toBe('.');
});

test('redirects the old project-site address to the root portfolio', () => {
  const page = fs.readFileSync(path.join(root, 'public', 'ata-turhan.github.io', 'index.html'), 'utf8');
  expect(page).toContain('content="0; url=https://ataturhan21.github.io/"');
  expect(page).toContain('<link rel="canonical" href="https://ataturhan21.github.io/" />');
});
