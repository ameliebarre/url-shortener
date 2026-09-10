import { eq, and, or, isNull, gt } from 'drizzle-orm';

import { db } from '@/db';
import { urlsTable } from '@/models/url.model';

export async function insertUrl(
  shortcode: string,
  url: string,
  userId: string,
  expiresAt?: Date,
) {
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
  return await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, urlID), eq(urlsTable.userId, userId)));
}
