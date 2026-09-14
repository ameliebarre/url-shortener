import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required.'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required.'),
  PORT: z.coerce.number().int().positive().default(8000),
  FRONTEND_URL: z.url().default('http://localhost:5173'),
  JWT_EXPIRES_IN_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 2),
  REFRESH_TOKEN_EXPIRES_IN_SECONDS: z.coerce
    .number()
    .int()
    .positive()
    .default(60 * 60 * 24 * 30),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    z.flattenError(parsedEnv.error).fieldErrors,
  );
  process.exit(1);
}

export const env = parsedEnv.data;
