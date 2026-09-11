import { z } from 'zod';

const normalizedEmail = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email().max(255, 'Email must be at most 255 characters long.'));

const shortcode = z
  .string()
  .max(155, 'code must be at most 155 characters long.');

export const signupPostRequestBodySchema = z.object({
  firstname: z
    .string()
    .max(55, 'firstname must be at most 55 characters long.'),
  lastname: z
    .string()
    .max(55, 'lastname must be at most 55 characters long.'),
  email: normalizedEmail,
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    // bcrypt silently truncates beyond 72 bytes; cap here so the
    // stored hash reflects the whole password the user chose.
    .max(72, 'Password must be at most 72 characters long.')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
});

export const loginPostRequestBodySchema = z.object({
  email: normalizedEmail,
  password: z.string().min(3),
});

export const refreshRequestBodySchema = z.object({
  refreshToken: z.uuid(),
});

export const urlIdParamsSchema = z.object({
  id: z.uuid(),
});

export const codesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

const futureExpiresAt = z.coerce.date().refine((date) => date > new Date(), {
  message: 'expiresAt must be in the future.',
});

export const shortenPostRequestBodySchema = z.object({
  url: z.url(),
  code: shortcode.optional(),
  expiresAt: futureExpiresAt.optional(),
});

export const updateUrlBodySchema = z
  .object({
    url: z.url().optional(),
    code: shortcode.optional(),
    expiresAt: z.union([futureExpiresAt, z.null()]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided.',
  });
