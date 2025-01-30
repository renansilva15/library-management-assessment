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
