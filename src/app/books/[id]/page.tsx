'use client';

import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BOOKS_CACHE_KEY } from '@/constants/cache';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import type { IBook } from '@/types/book';
import { fetchBookById } from '@/app/actions';
import type { JSX } from 'react';
import { bookIdSchema } from '@/validations/book';
import { CardHeader, CardTitle, CardContent, Card } from '@/components/ui/card';
import { Book } from 'lucide-react';
import Link from 'next/link';

// TODO: Split this component into smaller components
export default function BookPage(): JSX.Element {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();

  const parsedId = bookIdSchema.safeParse(id);

  const bookId = parsedId.data;

  const books: IBook[] | undefined = queryClient.getQueryData([
    BOOKS_CACHE_KEY,
  ]);
  const cachedBook = books?.find((b) => b.id === bookId);

  const {
    data: bookData,
    isLoading: isLoadingBook,
    isError: isErrorBook,
  } = useQuery({
    queryKey: [BOOKS_CACHE_KEY, bookId],
    queryFn: () => fetchBookById(bookId ?? ''),
    initialData: cachedBook,
    enabled: Boolean(bookId),
  });

  // TODO: Move to others components

  if (!parsedId.success) {
    return <p>Invalid book ID.</p>;
  }

  if (isLoadingBook) {
    return <p>Loading book...</p>;
  }

  if (isErrorBook || !bookData) {
    return <p>Book not found.</p>;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-4 px-4 pb-16 pt-32 lg:px-0">
      <Card
        key={bookData.id}
        className="flex h-56 w-full max-w-sm flex-col justify-between"
      >
        <CardHeader>
          <Book className="h-10 w-10" />

          <CardTitle className="line-clamp-2 text-xl font-bold">
            {bookData.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p className="text-lg text-muted-foreground">by {bookData.author}</p>
          <p className="text-md text-muted-foreground">
            Published in {bookData.year}
          </p>
        </CardContent>
      </Card>

      {isAdmin && (
        <div className="flex justify-center gap-4 text-primary">
          <Button variant="outline" className="w-32 border-primary">
            Edit
          </Button>

          <Button variant="destructive" className="w-32 border">
            Delete
          </Button>
        </div>
      )}

      <Button asChild variant="outline" className="w-32">
        <Link href="/">Back</Link>
      </Button>
    </main>
  );
}
