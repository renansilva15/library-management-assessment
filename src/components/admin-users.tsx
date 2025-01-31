'use client';

import { useQuery } from '@tanstack/react-query';
import type { JSX } from 'react';
import { USERS_CACHE_KEY } from '@/constants/cache';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Book } from 'lucide-react';
import { Button } from './ui/button';
import { fetchAdminUsers } from '@/app/actions';
import { useAuth } from '@/contexts/auth-context';

export function AdminUsers(): JSX.Element {
  const { user: currentUser } = useAuth();

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: [USERS_CACHE_KEY],
    queryFn: fetchAdminUsers,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoadingUsers) {
    return <div>Loading...</div>;
  }

  if (errorUsers) {
    return <div>Error fetching users</div>;
  }

  return (
    <>
      <div className="grid w-full max-w-screen-md grid-cols-2 gap-4 px-4 lg:grid-cols-3">
        {dataUsers?.map((user) => (
          <Card key={user.id} className="flex h-56 flex-col justify-between">
            <CardHeader>
              <Book className="h-10 w-10" />
              <CardTitle className="line-clamp-2 text-xl font-bold">
                <span>{user.name}</span>

                {currentUser?.id === user.id ? (
                  <span className="text-xs text-primary"> (You)</span>
                ) : null}
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button asChild variant="outline" className="text-primary">
                {/* Here we can use to delete and add a float button to add new people */}
                <p>Example</p>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
