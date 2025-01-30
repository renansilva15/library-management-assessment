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
    data: dataBooks,
    isLoading: isLoadingBooks,
    error: errorBooks,
  } = useQuery({
    queryKey: [BOOKS_CACHE_KEY],
    queryFn: fetchBooks,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoadingBooks) {
    // The components are first loaded at the server side, so it is not likely to need the loading state until we add pagination
    return <div>Loading...</div>;
  }

  if (errorBooks) {
    // TODO: Add generic error component
    return <div>Error fetching books</div>;
  }

  return (
    <div className="grid w-full max-w-screen-md grid-cols-2 gap-4 px-4 lg:grid-cols-3">
      {dataBooks?.map((book) => (
        <Card key={book.id} className="flex h-56 flex-col justify-between">
          <CardHeader>
            <Book className="h-10 w-10" />
            <CardTitle className="line-clamp-2 text-xl font-bold">
              {book.title}
            </CardTitle>
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
