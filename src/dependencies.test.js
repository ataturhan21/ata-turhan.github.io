import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

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
  expect(pkg.scripts).toMatchObject({ start: 'vite', build: 'vite build', test: 'vitest run' });
});
