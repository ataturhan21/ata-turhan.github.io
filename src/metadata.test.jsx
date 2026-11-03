import fs from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import App from './App';

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const meta = (attr, name) => html.match(new RegExp(`${attr}="${name}" content="([^"]*)"`))?.[1];

// Width and height from the JPEG's start-of-frame segment.
const jpegSize = (file) => {
  const bytes = fs.readFileSync(file);
  for (let i = 2; i < bytes.length; ) {
    const marker = bytes[i + 1];
    if (marker >= 0xc0 && marker <= 0xc3) return { height: bytes.readUInt16BE(i + 5), width: bytes.readUInt16BE(i + 7) };
    i += 2 + bytes.readUInt16BE(i + 2);
  }
  throw new Error(`no frame header in ${file}`);
};

test('shows the landscape preview card at full size and declares its real size', () => {
  expect(meta('name', 'twitter:card')).toBe('summary_large_image');
  const image = meta('property', 'og:image').replace('https://ataturhan21.github.io/', '');
  const { width, height } = jpegSize(path.join(root, 'public', image));
  expect(meta('property', 'og:image:type')).toBe('image/jpeg');
  expect(Number(meta('property', 'og:image:width'))).toBe(width);
  expect(Number(meta('property', 'og:image:height'))).toBe(height);
});

test('describes the person behind the page with links the page already shows', () => {
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const person = JSON.parse(block);
  expect(person['@type']).toBe('Person');
  expect(person.name).toBe('Ata Turhan');
  expect(person.url).toBe(html.match(/<link rel="canonical" href="([^"]+)"/)[1]);

  // Every profile listed for search engines is one a visitor can follow from the page.
  const { container } = render(<App />);
  const hrefs = new Set([...container.querySelectorAll('a')].map((a) => a.getAttribute('href')));
  for (const link of person.sameAs) expect(hrefs).toContain(link);
  expect(person.worksFor.map((org) => org.name)).toEqual(['HP', 'Solarity AI']);
});
