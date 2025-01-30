import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  // TODO: Add strong password rules, like requiring a number, special character, etc.
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
