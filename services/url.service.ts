import { eq } from 'drizzle-orm';

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
