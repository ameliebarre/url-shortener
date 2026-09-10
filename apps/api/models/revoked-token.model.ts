import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const revokedTokensTable = pgTable('revoked_token', {
  jti: uuid().primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
});
