# Ata Turhan's Portfolio

A React portfolio presenting Ata Turhan's background, selected AI engineering projects, skills, and contact links.

Live site: https://ataturhan21.github.io/ata-turhan.github.io/

The repository retains its historical name `ata-turhan.github.io`. Its current owner is [ataturhan21](https://github.com/ataturhan21), so GitHub Pages serves it under the `/ata-turhan.github.io/` path rather than at the domain root.

## Local development

```bash
git clone https://github.com/ataturhan21/ata-turhan.github.io.git
cd ata-turhan.github.io
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
| [Body.js](src/components/Body.js) | Name, professional headline, and primary social links |
| [About.js](src/components/About.js) | Biography |
| [projects.json](src/data/projects.json) | Project names, descriptions, and repository links |
| [Skills.js](src/components/Skills.js) | Skill cards |
| [Footer.js](src/components/Footer.js) | Email and writing link |
| [index.html](public/index.html) | Page title and search-description metadata |
| [App.css](src/App.css) | Layout and responsive styling |

Before merging to `main`, run tests and a production build and inspect the page at desktop and mobile sizes: every push to `main` publishes the site.

Project card artwork is decorative; project descriptions and GitHub links identify the actual work.

## Deployment

[deploy-pages.yml](.github/workflows/deploy-pages.yml) builds the app on every push to `main` and publishes `build/` to GitHub Pages. It can also be run manually from the Actions tab. The repository's Pages source must be **GitHub Actions** (Settings → Pages). The `homepage` field in [package.json](package.json) sets the asset base path, so update it if the Pages URL changes.

## License

[MIT](LICENSE).
