import fs from 'fs';
import path from 'path';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';

const root = path.join(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');

// Declarations for a selector in App.css, either at the top level or inside one @media query.
const cssRule = (selector, media = null) => {
  const css = read('src', 'App.css').replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = [];
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
        blocks.push([prelude, css.slice(start, i)]);
        start = i + 1;
      }
    }
  }
  const scope = media === null
    ? blocks.filter(([head]) => !head.startsWith('@'))
    : blocks
      .filter(([head]) => head === `@media ${media}`)
      .flatMap(([, body]) => [...body.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => [m[1].trim(), m[2]]));
  const declarations = {};
  for (const [head, body] of scope) {
    if (!head.split(',').map((s) => s.trim()).includes(selector)) continue;
    for (const declaration of body.split(';')) {
      const [property, ...value] = declaration.split(':');
      if (value.length) declarations[property.trim()] = value.join(':').trim();
    }
  }
  return declarations;
};

const rgb = (color) => {
  const short = color.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (short) return short.slice(1).map((digit) => parseInt(digit + digit, 16));
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16));
  return color.match(/[\d.]+/g).slice(0, 3).map(Number);
};
const alpha = (color) => {
  const parts = color.match(/rgba\(([^)]+)\)/);
  return parts ? Number(parts[1].split(',')[3]) : 1;
};
const luminance = (color) => {
  const [r, g, b] = rgb(color).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const blend = (color, opacity, background) => {
  const [fg, bg] = [rgb(color), rgb(background)];
  return `rgb(${fg.map((v, i) => Math.round(v * opacity + bg[i] * (1 - opacity))).join(',')})`;
};

describe('layout and contrast', () => {
  test('the footer includes its padding in its width at every screen size', () => {
    expect(cssRule('.footer')['box-sizing']).toBe('border-box');
  });

  test('project cards fit inside their slides', () => {
    // react-slick gives every card width: 100% of its slide, so borders must sit inside that
    // width and the gap between cards must come from padding on the slide wrapper, not margins.
    expect(cssRule('.projects-container .project')['box-sizing']).toBe('border-box');
    const medias = [...read('src', 'App.css').matchAll(/@media ([^{]+)\{/g)].map((m) => m[1].trim());
    for (const media of [null, ...medias]) {
      const margin = cssRule('.projects-container .project', media).margin;
      if (margin !== undefined) expect(margin).toBe('0');
    }
    const wrapper = cssRule('.projects .slick-slide > div');
    expect(wrapper['box-sizing']).toBe('border-box');
    expect(parseFloat(wrapper.padding.split(/\s+/)[1])).toBeGreaterThan(0);
  });

  test('header links stay readable over every section', () => {
    const background = cssRule('.header').background;
    expect(alpha(background)).toBe(1);
    expect(contrast('#ffffff', background)).toBeGreaterThanOrEqual(4.5);
  });

  test('carousel arrows and dots stand out from the projects background', () => {
    const section = cssRule('.projects')['background-color'];
    const arrow = cssRule('.projects .slick-next:before');
    expect(Number(arrow.opacity)).toBe(1);
    expect(contrast(arrow.color, section)).toBeGreaterThanOrEqual(3);
    const dot = cssRule('.projects .slick-dots li button:before');
    expect(contrast(blend(dot.color, Number(dot.opacity), section), section)).toBeGreaterThanOrEqual(3);
  });

  test('carousel arrows fit inside the phone layout', () => {
    // The arrows sit 25px outside the slider, so the container needs at least that much side padding.
    const padding = cssRule('.projects-container', '(max-width: 600px)').padding.split(/\s+/);
    const side = parseFloat(padding[1] ?? padding[0]) * 16;
    expect(side).toBeGreaterThanOrEqual(25);
  });
});

describe('projects carousel', () => {
  test('keeps links in hidden slides out of the tab order', () => {
    const { container } = render(<Projects />);
    const slides = [...container.querySelectorAll('.slick-slide')];
    expect(slides.some((slide) => slide.getAttribute('aria-hidden') === 'true')).toBe(true);
    for (const slide of slides) {
      const hidden = slide.getAttribute('aria-hidden') === 'true';
      for (const link of slide.querySelectorAll('a')) {
        expect(link.getAttribute('tabindex')).toBe(hidden ? '-1' : null);
      }
    }
  });

  test('names every pagination dot', () => {
    render(<Projects />);
    const dots = screen.getAllByRole('button', { name: /^Projects page \d+$/ });
    expect(dots.length).toBeGreaterThan(0);
  });

  test('titles the section like the navigation link', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
  });
});

describe('content and semantics', () => {
  test('lists the documented AI engineering stack', () => {
    render(<Skills />);
    const list = screen.getByRole('list', { name: 'Skills' });
    expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'FastAPI', 'TypeScript',
      'React', 'PostgreSQL', 'Docker', 'Linux', 'Git', 'GitHub Actions',
    ]);
  });

  test('keeps the decorative About illustration out of the accessibility tree', () => {
    const { container } = render(<About />);
    expect(container.querySelector('.about-img img')).toHaveAttribute('alt', '');
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
