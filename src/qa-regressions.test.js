import fs from 'fs';
import path from 'path';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import Projects from './components/Projects';
import Skills from './components/Skills';
import projects from './data/projects.json';

const root = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');
const stylesheet = () => (read('src', 'index.css') + read('src', 'App.css')).replace(/\/\*[\s\S]*?\*\//g, '');

// Declarations for a selector at the top level of `css` (outside @media and @supports).
const rulesIn = (css, selector) => {
  const declarations = {};
  let depth = 0;
  let start = 0;
  let prelude = '';
  for (let i = 0; i < css.length; i += 1) {
    if (css[i] === '{') {
      if (depth === 0) {
        prelude = css.slice(start, i).trim();
        start = i + 1;
      }
      depth += 1;
    } else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        const selectors = prelude.split(',').map((s) => s.trim());
        if (!prelude.startsWith('@') && selectors.includes(selector)) {
          for (const declaration of css.slice(start, i).split(';')) {
            const [property, ...value] = declaration.split(':');
            if (value.length) declarations[property.trim()] = value.join(':').trim();
          }
        }
        start = i + 1;
      }
    }
  }
  return declarations;
};
const cssRule = (selector) => rulesIn(stylesheet(), selector);

// Declarations for a selector inside the stylesheets' `@media <query>` blocks.
const mediaRule = (query, selector) => {
  const css = stylesheet();
  const declarations = {};
  for (let at = css.indexOf(`@media ${query}`); at !== -1; at = css.indexOf(`@media ${query}`, at + 1)) {
    const open = css.indexOf('{', at);
    let close = open + 1;
    for (let depth = 1; depth > 0; close += 1) {
      if (css[close] === '{') depth += 1;
      if (css[close] === '}') depth -= 1;
    }
    Object.assign(declarations, rulesIn(css.slice(open + 1, close - 1), selector));
  }
  return declarations;
};

const tokens = cssRule(':root');
const resolve = (value) => value.replace(/var\((--[\w-]+)\)/g, (_, name) => resolve(tokens[name]));

const rgba = (color) => {
  const short = color.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (short) return [...short.slice(1).map((digit) => parseInt(digit + digit, 16)), 1];
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [...[0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)), 1];
  const [r, g, b, a = 1] = color.match(/[\d.]+/g).map(Number);
  return [r, g, b, a];
};
const over = (color, background) => {
  const [r, g, b, a] = rgba(color);
  const bg = rgba(background);
  return `rgb(${[r, g, b].map((v, i) => Math.round(v * a + bg[i] * (1 - a))).join(',')})`;
};
const luminance = (color) => {
  const [r, g, b] = rgba(color).slice(0, 3).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('layout and contrast', () => {
  test('every element includes its padding and border in its width', () => {
    expect(cssRule('*')['box-sizing']).toBe('border-box');
  });

  test('project cards never force the grid wider than a phone screen', () => {
    expect(cssRule('.project-grid')['grid-template-columns']).toContain('minmax(min(100%,');
  });

  test('keeps the header one row tall, so the scroll offset matches it at every width', () => {
    const css = stylesheet();
    expect(css.match(/--header-height:/g)).toHaveLength(1);
    expect(css).not.toMatch(/\.site-header__inner\s*\{[^}]*flex-wrap:\s*wrap/);
  });

  test('gives standalone links 44 px touch targets on touch screens', () => {
    for (const selector of ['.wordmark', '.nav-list a', '.footer-links a', '.projects-more .text-link']) {
      expect(mediaRule('(pointer: coarse)', selector)['min-height']).toBe('2.75rem');
    }
  });

  test('header links stay readable over any content scrolling underneath', () => {
    const header = resolve(cssRule('.site-header').background);
    const link = resolve(cssRule('.nav-list a').color);
    for (const underneath of ['#ffffff', resolve('var(--color-bg)')]) {
      expect(contrast(link, over(header, underneath))).toBeGreaterThanOrEqual(4.5);
    }
  });

  test('text, accent and focus colors meet WCAG AA on every surface', () => {
    const surfaces = ['--color-bg', '--color-bg-raised', '--color-surface'];
    for (const surface of surfaces) {
      for (const text of ['--color-text', '--color-text-muted', '--color-accent']) {
        expect(contrast(tokens[text], tokens[surface])).toBeGreaterThanOrEqual(4.5);
      }
      expect(contrast(tokens['--color-focus'], tokens[surface])).toBeGreaterThanOrEqual(3);
    }
    expect(contrast(tokens['--color-on-accent'], tokens['--color-accent'])).toBeGreaterThanOrEqual(4.5);
    expect(contrast(tokens['--color-on-accent'], tokens['--color-accent-strong'])).toBeGreaterThanOrEqual(4.5);
  });
});

describe('projects', () => {
  test('shows every project with its topics and a reachable GitHub link', () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole('heading', { level: 3, name: project.name })).toBeInTheDocument();
      // The visible "View on GitHub" comes first in the accessible name (WCAG 2.5.3 label in name).
      const link = screen.getByRole('link', { name: `View on GitHub for ${project.name} (opens in a new tab)` });
      expect(link).toHaveAttribute('href', project.link);
      expect(link).toHaveAttribute('rel', 'noreferrer');
      expect(link).not.toHaveAttribute('tabindex', '-1');
      expect(link.closest('[aria-hidden="true"]')).toBeNull();
      const topics = screen.getByRole('list', { name: `${project.name} topics` });
      expect(within(topics).getAllByRole('listitem').map((item) => item.textContent)).toEqual(project.tags);
    }
  });

  test('titles the section like the navigation link', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
  });
});

describe('content and semantics', () => {
  test('lists the documented AI engineering stack in its profile groups', () => {
    render(<Skills />);
    const section = screen.getByRole('region', { name: 'Skills' });
    expect(within(section).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'FastAPI', 'TypeScript',
      'React', 'PostgreSQL', 'Docker', 'Linux', 'Git', 'GitHub Actions',
    ]);
    for (const group of ['AI & ML', 'Applications & data', 'Delivery']) {
      expect(within(section).getByRole('list', { name: group })).toBeInTheDocument();
    }
  });

  test('gives every image a text alternative and hides decorative icons', () => {
    const { container } = render(<App />);
    for (const image of container.querySelectorAll('img')) expect(image).toHaveAttribute('alt');
    for (const icon of container.querySelectorAll('svg')) expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  test('starts the heading outline with the page h1', () => {
    render(<App />);
    const [first] = screen.getAllByRole('heading');
    expect(first.tagName).toBe('H1');
  });
});

describe('performance and sharing', () => {
  test('ships images sized for the page, with dimensions reserved', () => {
    for (const file of fs.readdirSync(path.join(root, 'src', 'assets'))) {
      expect(fs.statSync(path.join(root, 'src', 'assets', file)).size).toBeLessThan(100 * 1024);
    }
    const { container } = render(<App />);
    for (const image of container.querySelectorAll('img')) {
      expect(image).toHaveAttribute('width');
      expect(image).toHaveAttribute('height');
    }
  });

  test('gives shared links a preview and one canonical address', () => {
    const html = read('public', 'index.html');
    expect(html).toContain('<link rel="canonical" href="https://ataturhan21.github.io/" />');
    for (const tag of ['og:type', 'og:url', 'og:title', 'og:description', 'og:image']) {
      expect(html).toContain(`property="${tag}"`);
    }
    expect(html).toContain('name="twitter:card"');
    const image = html.match(/property="og:image" content="https:\/\/ataturhan21\.github\.io\/([^"]+)"/)[1];
    expect(fs.existsSync(path.join(root, 'public', image))).toBe(true);
  });
});
