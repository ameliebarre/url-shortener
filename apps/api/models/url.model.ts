import { index, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { usersTable } from '@/models';

export const urlsTable = pgTable(
  'url',
  {
    id: uuid().primaryKey().defaultRandom(),
    shortcode: varchar('code', { length: 155 }).notNull().unique(),
    targetUrl: varchar('target_url').notNull(),
    userId: uuid('user_id').references(() => usersTable.id, {
      onDelete: 'cascade',
    }),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    expiresAt: timestamp('expires_at'),
  },
  (table) => [index('url_user_id_idx').on(table.userId)],
);
