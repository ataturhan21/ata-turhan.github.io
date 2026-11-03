import fs from 'fs';
import path from 'path';

const publicDir = path.join(__dirname, '..', 'public');
const read = (file) => fs.readFileSync(path.join(publicDir, file), 'utf8');
const contacts = [
  'https://github.com/ataturhan21',
  'https://www.linkedin.com/in/ataturhan21/',
  'mailto:ataturhan21@gmail.com',
  'https://medium.com/@ataturhan21',
];

test('shows who this is and how to get in touch without JavaScript', () => {
  const noscript = read('index.html').match(/<noscript>([\s\S]*?)<\/noscript>/)[1];
  expect(noscript).toContain('<h1');
  expect(noscript).toContain('Ata Turhan');
  for (const href of contacts) expect(noscript).toContain(`href="${href}"`);
});

test('serves a branded 404 page with a way back to the portfolio', () => {
  const page = read('404.html');
  expect(page).toContain('<meta name="robots" content="noindex" />');
  for (const href of ['/', '/#about', '/#projects', '/#skills']) expect(page).toContain(`href="${href}"`);
});

test('colors the browser chrome like the header', () => {
  expect(read('index.html')).toContain('<meta name="theme-color" content="#222222" />');
  expect(JSON.parse(read('manifest.json')).theme_color).toBe('#222222');
});
