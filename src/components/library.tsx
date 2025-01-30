'use client';

import { useQuery } from '@tanstack/react-query';
import type { JSX } from 'react';
import { BOOKS_CACHE_KEY } from '@/constants/cache';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Book } from 'lucide-react';
import { Button } from './ui/button';
import { fetchBooks } from '@/app/actions';
import { BOOKS_PAGE } from '@/constants/routes';
import Link from 'next/link';

export function Library(): JSX.Element {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: [BOOKS_CACHE_KEY],
    queryFn: fetchBooks,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    // The components are first loaded at the server side, so it is not likely to need the loading state until we add pagination
    return <div>Loading...</div>;
  }

  if (error) {
    // TODO: Add generic error component
    return <div>Error fetching books</div>;
  }

  return (
    <div className="flex w-full max-w-screen-md gap-4">
      {books?.map((book) => (
        <Card key={book.id} className="h-fit">
          <CardHeader>
            <Book className="h-10 w-10" />
            <CardTitle className="text-xl font-bold">{book.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild variant="outline" className="text-primary">
              <Link href={`${BOOKS_PAGE}/${book.id}`}>More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
