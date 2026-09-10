import { eq, and, or, isNull, gt } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db } from '@/db';
import { urlsTable } from '@/models/url.model';
import { isUniqueConstraintError } from '@/utils';

const MAX_SHORTCODE_GENERATION_ATTEMPTS = 5;

export async function insertUrl(
  code: string | undefined,
  url: string,
  userId: string,
  expiresAt?: Date,
) {
  for (
    let attempt = 0;
    attempt < MAX_SHORTCODE_GENERATION_ATTEMPTS;
    attempt++
  ) {
    const shortcode = code ?? nanoid(6);

    try {
      const [result] = await db
        .insert(urlsTable)
        .values({ shortcode, targetUrl: url, userId, expiresAt })
        .returning({
          id: urlsTable.id,
          shortcode: urlsTable.shortcode,
          targetUrl: urlsTable.targetUrl,
          expiresAt: urlsTable.expiresAt,
        });

      return result;
    } catch (err) {
      // A custom code colliding is a real conflict, not something to retry.
      if (code || !isUniqueConstraintError(err)) throw err;
    }
  }

  throw new Error('Failed to generate a unique shortcode.');
}

export async function selectTargetUrl(code: string) {
  const [result] = await db
    .select({
      targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(
      and(
        eq(urlsTable.shortcode, code),
        or(isNull(urlsTable.expiresAt), gt(urlsTable.expiresAt, new Date())),
      ),
    );

  return result;
}

export async function selectCodesFromUser(userId: string) {
  return db.select().from(urlsTable).where(eq(urlsTable.userId, userId));
}

export async function deleteUserURL(urlID: string, userId: string) {
  const [result] = await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, urlID), eq(urlsTable.userId, userId)))
    .returning({ id: urlsTable.id });

  return result;
}
