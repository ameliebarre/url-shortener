import { z } from 'zod';

export const signupPostRequestBodySchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
});

export const loginPostRequestBodySchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});

export const shortenPostRequestBodySchema = z.object({
  url: z.url(),
  code: z.string().optional(),
  expiresAt: z.coerce
    .date()
    .refine((date) => date > new Date(), {
      message: 'expiresAt must be in the future.',
    })
    .optional(),
});
