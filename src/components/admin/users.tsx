'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, type JSX } from 'react';
import { USERS_CACHE_KEY } from '@/constants/cache';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
import { fetchUsers } from '@/app/actions';
import { useAuth } from '@/contexts/auth-context';
import { Role } from '@/types/role';
import { AdminManagePopup } from './admin-manage-popup';
import type { User as IUser } from '@/types/user';

export function Users(): JSX.Element {
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: [USERS_CACHE_KEY],
    queryFn: fetchUsers,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });

  if (isLoadingUsers) {
    return <div>Loading...</div>;
  }

  if (errorUsers) {
    return <div>Error fetching users</div>;
  }

  function isAdmin(role: string): boolean {
    return role === Role.Admin;
  }

  function isCurrentUser(user: IUser): boolean {
    return currentUser?.id === user.id;
  }

  return (
    <>
      <div className="grid w-full max-w-screen-md grid-cols-2 gap-4 px-4 lg:grid-cols-3">
        {dataUsers?.map((user) => (
          <Card key={user.id} className="flex h-56 flex-col justify-between">
            <CardHeader>
              <User className="h-10 w-10" />
              <CardTitle className="line-clamp-2 text-xl font-bold">
                <span>{user.name}</span>

                {currentUser?.id === user.id ? (
                  <span className="text-xs text-primary"> (You)</span>
                ) : null}
              </CardTitle>
              <CardDescription>
                <h2 className="text-primary">{user.role}</h2>
                <span>{user.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button
                disabled={isCurrentUser(user)}
                variant={isAdmin(user.role) ? 'destructive' : 'default'}
                onClick={() => setSelectedUser(user)}
              >
                {isAdmin(user.role) ? 'Demote' : 'Promote'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedUser && (
        <AdminManagePopup
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}
