import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { act, screen } from '@testing-library/react';
import { fillRoot } from '../scripts/prerender';
import { render } from './entry-server';
import App from './App';

const contacts = [
  'https://github.com/ataturhan21',
  'https://www.linkedin.com/in/ataturhan21/',
  'mailto:ataturhan21@gmail.com',
  'https://medium.com/@ataturhan21',
];

// The built page is this HTML, so all of it shows before the script runs, and without it.
test('shows who this is, the projects and how to get in touch without JavaScript', () => {
  const html = render();
  expect(html).toContain('<h1 id="hero-title"');
  for (const project of ['Aware Care', 'Image Captioner', 'Optimized CNN-TA']) expect(html).toContain(project);
  for (const href of contacts) expect(html).toContain(`href="${href}"`);
});

test('hydrates the pre-rendered page without a mismatch', async () => {
  const container = document.createElement('div');
  container.innerHTML = render();
  document.body.append(container);
  // A mismatch makes React log an error, which fails the test (setupTests.js).
  await act(async () => hydrateRoot(container, <StrictMode><App /></StrictMode>));
  expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${new Date().getFullYear()} Ata Turhan`);
  container.remove();
});

test('fills the empty root with relative asset links, like the client build', () => {
  const page = '<body><div id="root"></div></body>';
  const app = '<main><img src="/assets/a.webp" srcSet="/assets/a.webp 360w, /assets/b.webp 720w"></main>';
  expect(fillRoot(page, app)).toBe(
    '<body><div id="root"><main><img src="./assets/a.webp" srcSet="./assets/a.webp 360w, ./assets/b.webp 720w"></main></div></body>',
  );
  expect(() => fillRoot('<div id="root">x</div>', app)).toThrow('no empty');
  expect(() => fillRoot(page, '<div></div>')).toThrow('no <main>');
});
