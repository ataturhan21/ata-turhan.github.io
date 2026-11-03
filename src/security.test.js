// @vitest-environment node
import viteConfig, { contentSecurityPolicy } from '../vite.config.js';

const plugin = viteConfig({ command: 'build', mode: 'production', isSsrBuild: false })
  .plugins.flat()
  .find((entry) => entry?.name === 'content-security-policy');

test('publishes a same-origin-only Content-Security-Policy in the built page only', () => {
  expect(plugin.apply).toBe('build');
  expect(plugin.transformIndexHtml()).toEqual([
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: contentSecurityPolicy }, injectTo: 'head-prepend' },
  ]);
  const directives = Object.fromEntries(contentSecurityPolicy.split('; ').map((directive) => directive.split(' ')));
  expect(directives).toEqual({ 'default-src': "'self'", 'object-src': "'none'", 'base-uri': "'none'", 'form-action': "'none'" });
});
