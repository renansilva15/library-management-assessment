import { USERS_CACHE_KEY } from '@/constants/cache';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { JSX } from 'react';
import { fetchAdminUsers } from '../actions';
import { AdminUsers } from '@/components/admin-users';

export default async function AdminPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [USERS_CACHE_KEY],
    queryFn: fetchAdminUsers,
  });

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-4 pb-16 pt-32">
      <h1 className="text-3xl font-semibold">Admin</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminUsers />
      </HydrationBoundary>
    </main>
  );
}
