'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBook } from '@/app/actions';
import { BOOKS_CACHE_KEY } from '@/constants/cache';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { IBook } from '@/types/book';
import type { JSX } from 'react';
import { bookSchema } from '@/validations/book';

interface BookEditFormProps {
  book: IBook;
  onCancel: () => void;
}

export function BookEditForm({
  book,
  onCancel,
}: BookEditFormProps): JSX.Element {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IBook>({
    resolver: zodResolver(bookSchema),
    defaultValues: book,
  });

  const editMutation = useMutation({
    mutationFn: (updatedData: Partial<IBook>) =>
      updateBook({ ...updatedData, id: book.id }),
    onSuccess: (updatedBook) => {
      queryClient.setQueryData([BOOKS_CACHE_KEY, book.id], updatedBook);
      toast({ title: 'Book updated successfully' });
      onCancel();
    },
    onError: () => {
      toast({ title: 'Failed to update book', variant: 'destructive' });
    },
  });

  const onSubmit = async (data: IBook): Promise<void> => {
    console.log(data);

    editMutation.mutate(data);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="flex h-fit w-full max-w-sm flex-col justify-between">
        <CardHeader>
          <Book className="h-10 w-10" />
          <label className="hidden">Title</label>
          <Input {...register('title')} type="text" placeholder={book.title} />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <label className="hidden">Author</label>

          <span>by </span>
          <Input
            className="text-lg text-muted-foreground"
            {...register('author')}
            type="text"
            placeholder={book.author}
          />

          {errors.author && (
            <p className="text-sm text-red-500">{errors.author.message}</p>
          )}

          <label className="hidden">Year</label>
          <span>Published in </span>
          <Input
            className="text-md text-muted-foreground"
            {...register('year')}
            type="text"
            placeholder={book.year.toString()}
          />

          {errors.year && (
            <p className="text-sm text-red-500">{errors.year.message}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-32"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          // TODO: Use color variable
          className="w-32 bg-primary text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save'}
        </Button>
      </div>
    </form>
  );
}
