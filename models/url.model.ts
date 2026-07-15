import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './user.model';

export const urlsTable = pgTable('url', {
  id: uuid().primaryKey().defaultRandom(),
  shortcode: varchar('code', { length: 155 }).notNull(),
  targetUrl: varchar('target_url').notNull(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});
