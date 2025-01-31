'use server';

import { api } from '@/lib/api';
import type { IBook } from '@/types/book';
import { Role } from '@/types/role';
import type { User } from '@/types/user';

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

export async function fetchUsers(): Promise<User[]> {
  const response = await api.get('/users');
  return response.data;
}

export async function promoteToAdmin(userId: string): Promise<void> {
  // TODO: We may have more roles in the future
  await api.patch(`/users/${userId}`, { role: Role.Admin });
}

export async function demoteToUser(
  userId: string,
  currentUserId: string,
): Promise<void> {
  if (userId === currentUserId) {
    throw new Error('Cannot demote yourself');
  }

  await api.patch(`/users/${userId}`, { role: Role.User });
}
