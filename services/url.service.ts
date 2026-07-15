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
