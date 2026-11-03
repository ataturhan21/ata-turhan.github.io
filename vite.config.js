import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  // Relative asset paths, so the build works at any GitHub Pages address.
  base: './',
  plugins: [react()],
  define: {
    // The year the pre-rendered footer shows until the visitor's clock takes over.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: isSsrBuild
    ? // Renders the page to HTML for scripts/prerender.js, which then deletes it; never published.
      { outDir: 'build-ssr', copyPublicDir: false }
    : // The Pages workflow publishes build/.
      { outDir: 'build', sourcemap: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
}));
