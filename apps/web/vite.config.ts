import { defineConfig, lazyPlugins } from 'vite-plus';

const POSTHOG_ASSETS = 'https://eu-assets.i.posthog.com';
const POSTHOG_INGEST = 'https://eu.i.posthog.com';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  // The Vite dev server doesn't apply the Nitro routeRules below, so the
  // PostHog `/ingest` reverse proxy has to be mirrored here for dev parity —
  // otherwise `/ingest/*` 404s locally and PostHog can't load config/surveys
  // or send events during development. (Prod is handled by the Nitro routeRules.)
  server: {
    proxy: {
      '/ingest/static': {
        target: POSTHOG_ASSETS,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ingest\/static/, '/static'),
      },
      '/ingest': {
        target: POSTHOG_INGEST,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ingest/, ''),
      },
    },
  },
  // Heavy framework plugins are loaded only for commands that need them
  // (dev, build, test, preview) and skipped for lint/fmt/check/run.
  plugins: lazyPlugins(async () => {
    const { devtools } = await import('@tanstack/devtools-vite');
    const { tanstackStart } = await import('@tanstack/react-start/plugin/vite');
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    const { default: viteReact } = await import('@vitejs/plugin-react');
    const { nitro } = await import('nitro/vite');

    return [
      devtools(),
      nitro({
        routeRules: {
          '/ingest/static/**': { proxy: `${POSTHOG_ASSETS}/static/**` },
          '/ingest/flags': { proxy: `${POSTHOG_INGEST}/flags` },
          '/ingest/**': { proxy: `${POSTHOG_INGEST}/**` },
        },
      }),
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          crawlLinks: true,
          autoSubfolderIndex: true,
          failOnError: true,
        },
      }),
      viteReact(),
    ];
  }),
});
