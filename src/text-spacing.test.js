import fs from 'fs';
import path from 'path';

// jsdom has no layout, so these pin the rules that keep content on screen at 320 px when a
// reader widens text spacing (WCAG 1.4.12). Measured in a browser; see #76 and #77.
const css = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
const rule = (selector) => {
  const start = css.indexOf(`\n${selector} {`);
  return start === -1 ? '' : css.slice(start, css.indexOf('}', start));
};

test('header links wrap instead of running off a narrow screen', () => {
  expect(rule('.nav-list')).toMatch(/flex-wrap: wrap;/);
});

test('the contact card keeps the email address and buttons inside it', () => {
  expect(rule('.contact-card')).toMatch(/grid-template-columns: minmax\(0, 1fr\);/);
  const button = rule('.contact-actions .button');
  expect(button).toMatch(/max-width: 100%;/);
  expect(button).toMatch(/overflow-wrap: anywhere;/);
});
