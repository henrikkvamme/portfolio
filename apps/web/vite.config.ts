import { defineConfig, lazyPlugins } from 'vite-plus';

const POSTHOG_ASSETS = 'https://eu-assets.i.posthog.com';
const POSTHOG_INGEST = 'https://eu.i.posthog.com';

export default defineConfig({
  resolve: { tsconfigPaths: true },
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
