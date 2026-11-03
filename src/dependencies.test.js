import fs from 'fs';
import path from 'path';

const read = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'));
const pkg = read('package.json');
const lock = read('package-lock.json');

// Enough of semver for engines ranges: "||" alternatives of ^x.y.z, >=x.y.z or a bare major.
const version = (text) => text.replace(/^v/, '').split('.').map(Number).concat(0, 0).slice(0, 3);
const compare = (a, b) => a.reduce((diff, part, i) => diff || part - b[i], 0);
const allows = (range, node) => range.split('||').some((part) => {
  const match = part.trim().match(/^(\^|>=)?\s*(v?\d+(?:\.\d+){0,2})$/);
  if (!match) throw new Error(`Unsupported engines range: ${range}`);
  const [, operator, base] = match;
  const floor = version(base);
  if (operator === '>=') return compare(node, floor) >= 0;
  if (operator === '^') return node[0] === floor[0] && compare(node, floor) >= 0;
  return node[0] === floor[0];
});

// Each "||" part of the declared range starts at its lowest version; every locked package must run there.
test('declares only Node versions that every locked package supports', () => {
  expect(lock.packages[''].engines.node).toBe(pkg.engines.node);
  const floors = pkg.engines.node.split('||').map((part) => version(part.trim().replace(/^(\^|>=)/, '')));
  for (const [name, { engines, optional }] of Object.entries(lock.packages)) {
    if (!name || optional || !engines?.node) continue;
    for (const floor of floors) {
      expect(allows(engines.node, floor), `${name} needs ${engines.node}, not ${floor.join('.')}`).toBe(true);
    }
  }
});

// Only packages the site ships belong in dependencies, so `npm audit --omit=dev` reports
// what visitors actually load instead of the build, test and lint tooling.
test('keeps build and test tooling out of the production dependencies', () => {
  expect(Object.keys(pkg.dependencies).sort()).toEqual(['react', 'react-dom', 'react-icons']);
  for (const tool of ['vite', '@vitejs/plugin-react', 'vitest', 'jsdom', '@testing-library/jest-dom', '@testing-library/react', 'eslint']) {
    expect(pkg.devDependencies).toHaveProperty(tool);
  }
});

test('builds with Vite instead of the unmaintained Create React App', () => {
  expect(pkg.devDependencies).not.toHaveProperty('react-scripts');
  expect(pkg.scripts).toMatchObject({ start: 'vite', test: 'vitest run' });
  expect(pkg.scripts.build).toMatch(/^vite build && /);
});
