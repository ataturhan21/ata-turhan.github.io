import fs from 'fs';
import path from 'path';

const readPublic = (file) => fs.readFileSync(path.join(__dirname, '..', 'public', file), 'utf8');

test('names the installed app after the portfolio, not the Create React App template', () => {
  const manifest = JSON.parse(readPublic('manifest.json'));
  const title = readPublic('index.html').match(/<title>(.*?)<\/title>/)[1].replace(/&amp;/g, '&');
  expect(manifest.name).toBe(title);
  expect(manifest.short_name).toBe('Ata Turhan');
});
