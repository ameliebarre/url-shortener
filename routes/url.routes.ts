import express, { Request, Response } from 'express';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { shortenPostRequestBodySchema } from '../validation/request.validation';
import { db } from '../db';
import { urlsTable } from '../models';

const router = express.Router();

router.post('/shorten', async (req: Request, res: Response) => {
  console.log('req.user :', req.user);
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ error: 'You must be logged in to access this ressource' });
  }

  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: z.flattenError(validationResult.error) });
  }

  const { url, code } = validationResult.data;

  const shortcode = code ?? nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({ shortcode, targetUrl: url, userId })
    .returning({
      id: urlsTable.id,
      shortcode: urlsTable.shortcode,
      targetUrl: urlsTable.targetUrl,
    });

  return res.status(201).json({
    id: result.id,
    shortcode: result.shortcode,
    targetUrl: result.targetUrl,
  });
});

export default router;
