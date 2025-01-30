'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook } from '@/app/actions';
import { BOOKS_CACHE_KEY } from '@/constants/cache';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { IBook } from '@/types/book';
import { Loader2 } from 'lucide-react';
import type { JSX } from 'react';

export interface BookDeletePopupProps {
  book: IBook;
  onCancel: () => void;
}

export function BookDeletePopup({
  book,
  onCancel,
}: BookDeletePopupProps): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // TODO: Change to destructuring pattern
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_CACHE_KEY] });
      toast({ title: 'Book deleted successfully' });
      // TODO: Lets add an onDeleted prop to handle this
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    },
    onError: () => {
      toast({ title: 'Failed to delete book', variant: 'destructive' });
    },
  });

  return (
    <Dialog open onOpenChange={onCancel}>
      {/* TODO: Update modal and add responsiveness */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p>
            Are you sure you want to delete <strong>{book.title}</strong>? This
            action cannot be undone.
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteMutation.mutate(book.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
