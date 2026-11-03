import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');

test('names the installed app after the portfolio, not the Create React App template', () => {
  const manifest = JSON.parse(read('public', 'manifest.json'));
  const title = read('index.html').match(/<title>(.*?)<\/title>/)[1].replace(/&amp;/g, '&');
  expect(manifest.name).toBe(title);
  expect(manifest.short_name).toBe('Ata Turhan');
});
