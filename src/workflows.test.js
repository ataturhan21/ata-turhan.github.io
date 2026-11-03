import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');
const workflow = (name) => fs.readFileSync(path.join(root, '.github', 'workflows', name), 'utf8');

// The commands a workflow runs, in order.
const runs = (text) => [...text.matchAll(/^\s*run: (.+)$/gm)].map((match) => match[1].trim());

test('checks every Node major the engines name and deploys with .nvmrc', () => {
  const engines = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).engines.node;
  const majors = [...engines.matchAll(/\^(\d+)\./g)].map((match) => match[1]);
  const matrix = workflow('portfolio-checks.yml').match(/node: \[(.+)\]/)[1].match(/\d+/g);
  expect(matrix).toEqual(majors);
  expect(workflow('portfolio-checks.yml')).toContain('node-version: ${{ matrix.node }}');
  expect(workflow('deploy-pages.yml')).toContain('node-version-file: .nvmrc');
  expect(majors).toContain(fs.readFileSync(path.join(root, '.nvmrc'), 'utf8').trim());
});

test('deploys only after lint and tests pass in the same job', () => {
  const steps = runs(workflow('deploy-pages.yml'));
  const at = (command) => steps.indexOf(command);
  expect(at('npm run lint')).toBeGreaterThan(at('npm ci --ignore-scripts'));
  expect(at('npm test')).toBeGreaterThan(at('npm run lint'));
  expect(at('npm run build')).toBeGreaterThan(at('npm test'));
});
