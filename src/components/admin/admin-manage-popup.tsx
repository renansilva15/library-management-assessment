'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { USERS_CACHE_KEY } from '@/constants/cache';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { User as IUser } from '@/types/user';
import { Loader2 } from 'lucide-react';
import type { JSX } from 'react';
import { demoteToUser, promoteToAdmin } from '@/app/actions';
import { useAuth } from '@/contexts/auth-context';

export interface AdminManagePopupProps {
  user: IUser;
  onCancel: () => void;
}

export function AdminManagePopup({
  user,
  onCancel,
}: AdminManagePopupProps): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { user: currentUser } = useAuth();

  const promoteMutation = useMutation({
    mutationFn: () => promoteToAdmin(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_CACHE_KEY] });
      toast({ title: `${user.name} is now an admin` });
      onCancel();
    },
    onError: () => {
      toast({ title: 'Failed to promote user', variant: 'destructive' });
    },
  });

  const demoteMutation = useMutation({
    mutationFn: () => demoteToUser(user.id, currentUser?.id ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_CACHE_KEY] });
      toast({ title: `${user.name} is no longer an admin` });
      onCancel();
    },
    onError: () => {
      toast({ title: 'Failed to remove admin rights', variant: 'destructive' });
    },
  });

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Admin</DialogTitle>
          <p>Do you want to update {user.name}’s admin status?</p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={promoteMutation.isPending || demoteMutation.isPending}
          >
            Cancel
          </Button>
          {user.role === 'admin' ? (
            <Button
              variant="destructive"
              onClick={() => demoteMutation.mutate()}
              disabled={demoteMutation.isPending}
            >
              {demoteMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Remove Admin'
              )}
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => promoteMutation.mutate()}
              disabled={promoteMutation.isPending}
            >
              {promoteMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Make Admin'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
