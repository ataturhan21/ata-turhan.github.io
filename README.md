# Ata Turhan's Portfolio

A React portfolio presenting Ata Turhan's background, selected AI engineering projects, skills, and contact links.

Live site: https://ataturhan21.github.io/

The repository is named `ataturhan21.github.io`, so GitHub Pages serves it at the domain root. The old address, https://ataturhan21.github.io/ata-turhan.github.io/, redirects there.

## Local development

```bash
git clone https://github.com/ataturhan21/ataturhan21.github.io.git
cd ataturhan21.github.io
npm ci
npm start
```

This project uses React 18.3, built with Vite 8 and tested with Vitest 5 (as locked in `package-lock.json`). It needs Node.js 22.22.2 or later on 22, or 24.15 or later, the range every locked package supports, declared in `package.json` `engines`. `.nvmrc` picks Node 24 for local work and deploys (`nvm use`), and CI checks both 22 and 24. `npm start` serves the site at http://localhost:5173 and reloads on save.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Vite dev server at http://localhost:5173 |
| `npm test` | Run the test suite once (`npx vitest` keeps watching) |
| `npm run lint` | Lint the code with ESLint |
| `npm run build` | Generate production assets in `build/`, with the page pre-rendered into `index.html` |
| `npm run preview` | Serve the production build locally |

## Update content

| File | Content |
| --- | --- |
| [Body.jsx](src/components/Body.jsx) | Hero: role line, name, summary, the two main actions and profile links |
| [About.jsx](src/components/About.jsx) | Biography and the Now, Based in and Education facts |
| [projects.json](src/data/projects.json) | Project names, descriptions, topic tags and repository links |
| [Skills.jsx](src/components/Skills.jsx) | Skill groups (match the GitHub profile's Technical focus) |
| [Header.jsx](src/components/Header.jsx) | Monogram, name and section links; marks the section in view |
| [Contact.jsx](src/components/Contact.jsx) | Email, Copy and LinkedIn actions, GitHub and Medium links |
| [Footer.jsx](src/components/Footer.jsx) | Links to ataturhan.com and Solarity AI, and Back to top |
| [index.html](index.html) | Page title, description, link-preview tags and structured data |
| [404.html](public/404.html) | Page shown for unknown addresses |
| `src/assets/pfp.webp`, `pfp-480.webp`, `pfp-360.webp` | Hero portrait (720, 480 and 360 px wide; the browser picks the smallest that stays sharp) |
| `public/og-image.jpg`, `favicon.ico`, `logo192.png`, `logo512.png` | Link-preview card and browser and app icons, made from the hero portrait |
| `public/fonts/` | Cormorant Garamond (headings) and Manrope (text), self-hosted under the OFL; see `LICENSE.txt` there |
| [index.css](src/index.css) | Design tokens (color, type, spacing, radius) and base styles |
| [App.css](src/App.css) | Layout and components, built only from the tokens |

Links that open a new tab use [ExternalLink.jsx](src/components/ExternalLink.jsx), which adds "(opens in a new tab)" for screen readers.

`npm run build` also renders the page to HTML with [entry-server.jsx](src/entry-server.jsx) and [prerender.js](scripts/prerender.js), so the whole page shows before the script runs, and without it; React then attaches to that HTML. Anything a component renders must therefore come out the same on the server and in the browser (read `window` or the clock only after the first render, as `Footer.jsx` does for the year), or the tests fail with a hydration warning.

Before merging to `main`, run tests and a production build and inspect the page at desktop and mobile sizes: every push to `main` publishes the site.

## Deployment

[deploy-pages.yml](.github/workflows/deploy-pages.yml) builds the app on every push to `main` and publishes `build/` to GitHub Pages. It can also be run manually from the Actions tab. The repository's Pages source must be **GitHub Actions** (Settings → Pages). [vite.config.js](vite.config.js) sets `base: './'`, so the build uses relative asset paths and works at any URL. It also adds a Content-Security-Policy meta tag to the built page that allows only the site's own files (GitHub Pages can't send security headers); a new third-party script, font or image must be added to that policy, or the browser blocks it. [public/ata-turhan.github.io/index.html](public/ata-turhan.github.io/index.html) redirects the old address to the root.

## License

[MIT](LICENSE).
