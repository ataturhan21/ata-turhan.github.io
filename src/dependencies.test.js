import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

// Only packages the site ships belong in dependencies, so `npm audit --omit=dev` reports
// what visitors actually load instead of Create React App's build and test tooling.
test('keeps build and test tooling out of the production dependencies', () => {
  expect(Object.keys(pkg.dependencies).sort()).toEqual([
    'react', 'react-dom', 'react-icons', 'react-slick', 'slick-carousel',
  ]);
  for (const tool of [
    'react-scripts', '@testing-library/jest-dom', '@testing-library/react', '@testing-library/user-event',
  ]) {
    expect(pkg.devDependencies).toHaveProperty(tool);
  }
});
