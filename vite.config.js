import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The published page loads only its own files, so it allows nothing else. GitHub Pages can't send
// headers, so the policy goes in a meta tag, and only in the build: the dev server's React refresh
// runtime is an inline script.
export const contentSecurityPolicy = "default-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'";

const securityPolicy = () => ({
  name: 'content-security-policy',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: contentSecurityPolicy }, injectTo: 'head-prepend' },
  ],
});

export default defineConfig(({ isSsrBuild }) => ({
  // Relative asset paths, so the build works at any GitHub Pages address.
  base: './',
  plugins: [react(), securityPolicy()],
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
