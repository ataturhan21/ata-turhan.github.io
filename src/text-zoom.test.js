import fs from 'fs';
import path from 'path';

// Zooming narrows the layout, so a heading sized in vw would shrink as it is zoomed. From 30rem up
// the headings hold a fixed size, so a desktop window zoomed to 200% doubles them (WCAG 1.4.4, #79).
const css = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');

test('headings hold their full size from 30rem up', () => {
  const block = css.slice(css.indexOf('@media (min-width: 30rem)'));
  expect(block).toMatch(/^@media \(min-width: 30rem\) \{\s*:root \{\s*--text-2xl: 3\.25rem;\s*--text-display: 6rem;/);
});
