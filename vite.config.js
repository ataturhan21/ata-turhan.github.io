import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths, so the build works at any GitHub Pages address.
  base: './',
  plugins: [react()],
  build: {
    // The Pages workflow publishes build/.
    outDir: 'build',
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
