'use server';

import { api } from '@/lib/api';
import type { IBook } from '@/types/book';

export async function fetchBooks(): Promise<IBook[]> {
  const response = await api.get('/books');
  return response.data;
}

export async function fetchBookById(id: string): Promise<IBook | null> {
  const response = await api.get(`/books/${id}`);
  return response.data;
}

export async function updateBook(
  book: Partial<IBook> & { id: string },
): Promise<IBook> {
  const response = await api.put(`/books/${book.id}`, book);
  return response.data;
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`/books/${id}`);
}

export async function createBook(book: Partial<IBook>): Promise<IBook> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: Handle id before sending to the server
  const { id, ...bookWithoutId } = book;

  const response = await api.post('/books', bookWithoutId);
  return response.data;
}
