'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook } from '@/app/actions';
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
import { Loader2, Plus } from 'lucide-react';
import { useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { bookSchema } from '@/validations/book';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';

export interface BookCreatePopupProps {
  onCancel: () => void;
}

export function BookCreatePopup({
  onCancel,
}: BookCreatePopupProps): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IBook>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      id: '',
      title: '',
      author: '',
      year: '',
    },
  });

  const createMutation = useMutation<IBook, Error, Partial<IBook>>({
    mutationFn: (newBook) => createBook(newBook),
    onSuccess: (createdBook) => {
      queryClient.invalidateQueries({ queryKey: [BOOKS_CACHE_KEY] });
      toast({ title: `Book "${createdBook.title}" added successfully` });
      onCancel();
    },
    onError: () => {
      toast({ title: 'Failed to add book', variant: 'destructive' });
    },
  });

  const onSubmit = async (data: IBook): Promise<void> => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>

          <DialogDescription>
            Fill in the details to add a new book to the library
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>

            <Input
              {...register('title')}
              type="text"
              placeholder="Enter book title"
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Author</label>

            <Input
              {...register('author')}
              type="text"
              placeholder="Enter author name"
            />

            {errors.author && (
              <p className="text-sm text-red-500">{errors.author.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Published Year</label>

            <Input {...register('year')} type="text" placeholder="Enter year" />

            {errors.year && (
              <p className="text-sm text-red-500">{errors.year.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-primary text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Add'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NewBookButton(): JSX.Element {
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreate = (): void => {
    setIsCreating((prev) => !prev);
  };

  return (
    <>
      {/* Floating Button - Confined to max-w-md */}
      <div className="fixed top-32 flex w-full">
        <div className="mx-auto flex w-full max-w-screen-md justify-end px-4 lg:px-0">
          <Button
            onClick={toggleCreate}
            className="h-16 w-16 rounded-full bg-primary text-white shadow-lg hover:bg-primary/80"
          >
            <Plus />
          </Button>
        </div>
      </div>

      {isCreating ? <BookCreatePopup onCancel={toggleCreate} /> : null}
    </>
  );
}
