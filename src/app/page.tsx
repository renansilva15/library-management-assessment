import { Library } from '@/components/library';
import { BOOKS_CACHE_KEY } from '@/constants/cache';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import type { JSX } from 'react';
import { fetchBooks } from './actions';

export default async function Home(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [BOOKS_CACHE_KEY],
    queryFn: fetchBooks,
  });

  return (
    <main className="flex min-h-screen w-full justify-center pt-32">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Library />
      </HydrationBoundary>
    </main>
  );
}
