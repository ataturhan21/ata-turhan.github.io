// Adds jest-dom's DOM matchers, such as toHaveAttribute and toBeInTheDocument, to Vitest's expect.
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';

// React reports some bugs only as console warnings (missing keys, invalid nesting, hydration
// mismatches), so any unexpected console error or warning fails the test. A test that expects
// one mocks console itself.
let logged = [];
let spies = [];

beforeEach(() => {
  logged = [];
  spies = ['error', 'warn'].map((level) =>
    vi.spyOn(console, level).mockImplementation((...args) => logged.push(`console.${level}: ${args.join(' ')}`)),
  );
});

afterEach(() => {
  for (const spy of spies) spy.mockRestore();
  if (logged.length) throw new Error(`Unexpected console output:\n${logged.join('\n')}`);
});
