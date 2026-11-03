import fs from 'fs';
import path from 'path';
import { render, screen, within } from '@testing-library/react';
import Body from './components/Body';

const root = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');

test('self-hosts the brand fonts and ships their license', () => {
  const css = read('src', 'index.css');
  const files = [...css.matchAll(/url\("\/fonts\/([^"]+)"\)/g)].map((match) => match[1]);
  expect(files).toEqual(['manrope-variable.woff2', 'cormorant-garamond-medium.woff2', 'cormorant-garamond-italic.woff2']);
  for (const file of files) expect(fs.existsSync(path.join(root, 'public', 'fonts', file))).toBe(true);
  // Only the body font is preloaded, so the hero text paints in it without a swap. Preloading the
  // heading font too competed with the app script on slow phones and delayed the first content.
  const preloads = [...read('index.html').matchAll(/<link rel="preload" href="\/fonts\/([^"]+)" as="font"/g)].map((match) => match[1]);
  expect(preloads).toEqual(['manrope-variable.woff2']);
  expect(css.match(/font-display: swap;/g)).toHaveLength(3);
  expect(read('public', 'fonts', 'LICENSE.txt')).toContain('SIL Open Font License');
});

test('shows the highlights from ataturhan.com under the hero', () => {
  render(<Body />);
  expect(screen.getByRole('heading', { level: 1, name: 'Ata Turhan' })).toBeInTheDocument();
  const highlights = screen.getByRole('list', { name: 'Highlights' });
  expect(within(highlights).getAllByRole('listitem').map((item) => item.textContent.trim())).toEqual([
    'AI Engineer & Manager at HP', 'Founder & CEO, Solarity AI', '2× Valedictorian · 4.0 GPA',
  ]);
  const portrait = screen.getByRole('img', { name: 'Ata Turhan' });
  expect(portrait).toHaveAttribute('width', '720');
  // Phones get the 360 px file for their 11rem card.
  expect(portrait.getAttribute('srcset')).toMatch(/ 360w, .+ 720w$/);
  expect(portrait).not.toHaveAttribute('fetchpriority');
});
