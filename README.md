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

This project uses React 18.2 and `react-scripts` 5.0.1. Use a Node.js/npm environment compatible with the existing lockfile. Dependency modernization should be validated separately.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm test -- --watchAll=false` | Run the test suite once |
| `npm run build` | Generate production assets in `build/` |

## Update content

| File | Content |
| --- | --- |
| [Body.js](src/components/Body.js) | Hero: role line, name, summary, the two main actions and profile links |
| [About.js](src/components/About.js) | Biography and the Now, Based in and Education facts |
| [projects.json](src/data/projects.json) | Project names, descriptions, topic tags and repository links |
| [Skills.js](src/components/Skills.js) | Skill groups (match the GitHub profile's Technical focus) |
| [Contact.js](src/components/Contact.js) | Email and LinkedIn actions, GitHub and Medium links |
| [Footer.js](src/components/Footer.js) | Links to ataturhan.com and Solarity AI |
| [index.html](public/index.html) | Page title, description, link-preview tags and the no-JavaScript fallback |
| [404.html](public/404.html) | Page shown for unknown addresses |
| `public/og-image.jpg`, `favicon.ico`, `logo192.png`, `logo512.png` | Link-preview image and browser and app icons, made from the hero portrait |
| [index.css](src/index.css) | Design tokens (color, type, spacing, radius) and base styles |
| [App.css](src/App.css) | Layout and components, built only from the tokens |

Before merging to `main`, run tests and a production build and inspect the page at desktop and mobile sizes: every push to `main` publishes the site.

## Deployment

[deploy-pages.yml](.github/workflows/deploy-pages.yml) builds the app on every push to `main` and publishes `build/` to GitHub Pages. It can also be run manually from the Actions tab. The repository's Pages source must be **GitHub Actions** (Settings → Pages). The `homepage` field in [package.json](package.json) is `.`, so the build uses relative asset paths and works at any URL. [public/ata-turhan.github.io/index.html](public/ata-turhan.github.io/index.html) redirects the old address to the root.

## License

[MIT](LICENSE).
