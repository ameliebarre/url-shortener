import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { usersTable } from '@/models';

export const refreshTokensTable = pgTable('refresh_token', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
