import express, { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { ensureAuthenticated } from '@/middlewares';
import { insertUrl, selectCodesFromUser, selectTargetUrl } from '@/services';
import { shortenPostRequestBodySchema } from '@/validation';

const router = express.Router();

router.post(
  '/shorten',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
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

    const {
      id,
      shortcode: insertedShortcode,
      targetUrl,
    } = await insertUrl(shortcode, url, req.user.id);

    return res.status(201).json({
      id: id,
      shortcode: insertedShortcode,
      targetUrl: targetUrl,
    });
  },
);

router.get(
  '/codes',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    const codes = await selectCodesFromUser(req.user.id);
    return res.json({ codes });
  },
);

router.get('/:shortcode', async (req: Request, res: Response) => {
  const code = req.params.shortcode;

  const result = await selectTargetUrl(code);

  if (!result) {
    return res.status(404).json({ error: 'Invalid URL' });
  }

  return res.redirect(result.targetUrl);
});

export default router;
