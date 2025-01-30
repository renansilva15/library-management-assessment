import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Passwords must match',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
