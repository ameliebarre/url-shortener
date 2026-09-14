import { and, eq, gt } from 'drizzle-orm';

import { db } from '@/db';
import { env } from '@/env';
import { refreshTokensTable } from '@/models';

export async function createRefreshToken(userId: string) {
  const expiresAt = new Date(
    Date.now() + env.REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000,
  );

  const [result] = await db
    .insert(refreshTokensTable)
    .values({ userId, expiresAt })
    .returning({ id: refreshTokensTable.id });

  return result;
}

export async function consumeRefreshToken(id: string) {
  const [result] = await db
    .delete(refreshTokensTable)
    .where(
      and(
        eq(refreshTokensTable.id, id),
        gt(refreshTokensTable.expiresAt, new Date()),
      ),
    )
    .returning({ userId: refreshTokensTable.userId });

  return result;
}

export async function revokeAllRefreshTokensForUser(userId: string) {
  await db
    .delete(refreshTokensTable)
    .where(eq(refreshTokensTable.userId, userId));
}
