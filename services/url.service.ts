import { eq, and } from 'drizzle-orm';

import { db } from '@/db';
import { urlsTable } from '@/models/url.model';

export async function insertUrl(
  shortcode: string,
  url: string,
  userId: string,
) {
  const [result] = await db
    .insert(urlsTable)
    .values({ shortcode, targetUrl: url, userId })
    .returning({
      id: urlsTable.id,
      shortcode: urlsTable.shortcode,
      targetUrl: urlsTable.targetUrl,
    });

  return result;
}

export async function selectTargetUrl(code: string) {
  const [result] = await db
    .select({
      targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortcode, code));

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
