import fs from 'fs';
import path from 'path';

// jsdom has no layout, so these pin the rules behind the top10-design fixes (#92), each measured in a
// browser when it shipped.
const root = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const app = strip(read('src', 'App.css'));
const base = strip(read('src', 'index.css'));

// Every rule in `css` as { media, selectors, body }, with `media` the enclosing @media prelude, if any.
const rules = (css) => {
  const found = [];
  const stack = [];
  let start = 0;
  for (let i = 0; i < css.length; i += 1) {
    if (css[i] === '{') {
      stack.push(css.slice(start, i).trim());
      start = i + 1;
    } else if (css[i] === '}') {
      const prelude = stack.pop();
      if (prelude !== undefined && !prelude.startsWith('@')) {
        const media = stack.find((p) => p.startsWith('@media')) || '';
        found.push({ media, selectors: prelude.split(',').map((s) => s.trim()), body: css.slice(start, i) });
      }
      start = i + 1;
    }
  }
  return found;
};
const declaration = (css, selector, property) => {
  const rule = rules(css).find((r) => !r.media && r.selectors.includes(selector) && r.body.includes(`${property}:`));
  return rule && rule.body.match(new RegExp(`${property}:\\s*([^;]+);`))[1].trim();
};

test('project cards fill their grid cells, so a row ends together (#93)', () => {
  expect(declaration(app, '.project-grid > li', 'display')).toBe('flex');
  expect(declaration(app, '.project-card', 'flex')).toBe('1');
});

test('the first project spans two columns only where the grid has two (#101)', () => {
  expect(declaration(app, '.project-grid', 'container')).toBe('projects / inline-size');
  const query = app.match(/@container projects \(min-width: ([\d.]+)rem\) \{\s*\.project-grid > li:first-child \{\s*grid-column: span 2;/);
  expect(query).not.toBeNull();
  // The query must start exactly where a second column fits (two column minimums plus the gap), or
  // the span would add a column the grid doesn't have.
  const column = parseFloat(declaration(app, '.project-grid', 'grid-template-columns').match(/min\(100%, ([\d.]+)rem\)/)[1]);
  const gap = parseFloat(base.match(/--space-5:\s*([\d.]+)rem;/)[1]);
  expect(declaration(app, '.project-grid', 'gap')).toBe('var(--space-5)');
  expect(parseFloat(query[1])).toBe(2 * column + gap);
});

test('headings and text avoid single words on a last line (#94)', () => {
  for (const selector of ['h1', 'h2', 'h3']) expect(declaration(base, selector, 'text-wrap')).toBe('balance');
  for (const selector of ['p', 'dd']) expect(declaration(base, selector, 'text-wrap')).toBe('pretty');
  for (const selector of ['.eyebrow', '.hero__lead', '.section-lead', '.project-card__desc']) {
    expect(declaration(app, selector, 'text-wrap')).toBe('balance');
  }
});

test('every gold tint is a token in the accent color (#95)', () => {
  const accent = base.match(/--color-accent:\s*#([0-9a-f]{6});/i)[1];
  const rgb = [0, 2, 4].map((i) => parseInt(accent.slice(i, i + 2), 16)).join(', ');
  const tints = [...base.matchAll(/--color-accent-[\w-]+:\s*rgba\((\d+, \d+, \d+), [\d.]+\);/g)];
  expect(tints.length).toBeGreaterThanOrEqual(3);
  for (const [, channels] of tints) expect(channels).toBe(rgb);
  expect(app).not.toMatch(new RegExp(`rgba\\(${rgb}`));
});

test('the Copy button keeps one width when it says Copied (#97)', () => {
  expect(declaration(app, '.contact-actions button', 'min-width')).toBe('8rem');
});

test('the old-address redirect page stays dark (#98)', () => {
  const page = read('public', 'ata-turhan.github.io', 'index.html');
  const background = base.match(/--color-bg:\s*(#[0-9a-f]{6});/i)[1];
  expect(page).toContain('<meta name="color-scheme" content="dark" />');
  expect(page).toMatch(new RegExp(`body \\{[^}]*background: ${background};`));
});

test('hover styles apply only where a pointer can hover (#99)', () => {
  const hovers = rules(app).filter((r) => r.selectors.some((s) => s.includes(':hover')));
  expect(hovers.length).toBeGreaterThan(0);
  for (const rule of hovers) expect(rule.media).toBe('@media (hover: hover)');
});
