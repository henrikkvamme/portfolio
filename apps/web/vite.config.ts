import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite-plus';

const POSTHOG_ASSETS = 'https://eu-assets.i.posthog.com';
const POSTHOG_INGEST = 'https://eu.i.posthog.com';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
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
  ],
});
