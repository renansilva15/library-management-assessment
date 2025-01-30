import { z } from 'zod';

export const bookIdSchema = z.string();

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  year: z.string(),
});

// TODO: Replace types folder with zod schemas
// export type IBook = z.infer<typeof bookSchema>;
