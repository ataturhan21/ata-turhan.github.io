// Fills build/index.html with the pre-rendered page, then deletes the server bundle that made it.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const marker = '<div id="root"></div>';

export const fillRoot = (page, app) => {
  if (!page.includes(marker)) throw new Error(`The page has no empty ${marker} to fill`);
  if (!app.includes('<main')) throw new Error('The pre-rendered app has no <main>');
  // The server build writes asset URLs from the site root; match the client build's relative ones.
  const relative = app.replace(/(["\s,])\/assets\//g, '$1./assets/');
  return page.replace(marker, `<div id="root">${relative}</div>`);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { render } = await import(pathToFileURL('build-ssr/entry-server.js').href);
  const page = 'build/index.html';
  fs.writeFileSync(page, fillRoot(fs.readFileSync(page, 'utf8'), render()));
  fs.rmSync('build-ssr', { recursive: true, force: true });
}
