import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { revokedTokensTable } from '@/models';

export async function revokeToken(jti: string, expiresAt: Date) {
  await db
    .insert(revokedTokensTable)
    .values({ jti, expiresAt })
    .onConflictDoNothing();
}

export async function isTokenRevoked(jti: string): Promise<boolean> {
  const [result] = await db
    .select({ jti: revokedTokensTable.jti })
    .from(revokedTokensTable)
    .where(eq(revokedTokensTable.jti, jti));

  return Boolean(result);
}
