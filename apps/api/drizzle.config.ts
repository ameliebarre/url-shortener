import { defineConfig } from 'drizzle-kit';

import { env } from './env';

export default defineConfig({
  out: './drizzle',
  schema: './models/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
