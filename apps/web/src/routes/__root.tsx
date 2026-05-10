import type { QueryClient } from '@tanstack/react-query';
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import Header from '@/components/header';
import Providers from '@/components/providers';
import PostHogProvider from '@/integrations/posthog/provider';
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools';
import appCss from '@/index.css?url';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Henrik Kvamme' },
      { name: 'description', content: 'Henrik Kvamme - Portfolio' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [{ src: '/theme-init.js' }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-hidden antialiased">
        <PostHogProvider>
          <Providers>
            <div className="relative h-svh bg-black">
              <div className="absolute top-0 right-0 left-0 z-50 mx-auto w-full max-w-7xl">
                <Header />
              </div>
              <main className="h-full overflow-auto">{children}</main>
            </div>
          </Providers>
        </PostHogProvider>
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'TanStack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}
