'use client';

import { Toaster } from '@/components/ui/toaster';
import { AuthContextProvider } from '@/contexts/auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import { useState, type JSX } from 'react';

export function Providers({ children }: ThemeProviderProps): JSX.Element {
  // TODO: Configure queryClient
  // TODO: Should we separate providers configuration into different files?
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}

          {/* TODO: Better ui on toast (mainly colors, green for creating a book) */}
          <Toaster />
        </QueryClientProvider>
      </AuthContextProvider>
    </NextThemesProvider>
  );
}
