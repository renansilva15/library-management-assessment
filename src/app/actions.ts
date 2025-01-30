'use server';

import { api } from '@/lib/api';
import type { IBook } from '@/types/book';

export async function fetchBooks(): Promise<IBook[]> {
  const response = await api.get('/books');
  return response.data;
}
