'use client';

import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/lib/store';
import { SessionProvider } from 'next-auth/react';



const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </ReduxProvider>
    </QueryClientProvider>
    </SessionProvider>
  );
}