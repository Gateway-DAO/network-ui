'use client';

import { SessionProvider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren, useState } from 'react';

import Notistack from '@/components/notistack/notistack';
import ReactQueryProvider from '@/services/react-query/provider';
import { ThemeProvider } from '@/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// TODO: pass session from Layout

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <SessionProvider refetchOnWindowFocus refetchInterval={5000}>
        <ThemeProvider>
          <Notistack>
            <ReactQueryDevtools initialIsOpen={false} />
            <ProgressBar
              height="4px"
              color="#771AC9"
              options={{ showSpinner: false }}
              shallowRouting
            />
            {children}
          </Notistack>
        </ThemeProvider>
      </SessionProvider>
    </ReactQueryProvider>
  );
}
