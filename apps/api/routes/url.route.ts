import express, { Request, Response } from 'express';
import { z } from 'zod';

import {
  ensureAuthenticated,
  redirectRateLimiter,
  shortenRateLimiter,
} from '@/middlewares';
import {
  deleteUserURL,
  insertUrl,
  selectCodesFromUser,
  selectTargetUrl,
} from '@/services';
import { asyncHandler } from '@/utils';
import { shortenPostRequestBodySchema } from '@/validation';

const router = express.Router();

router.post(
  '/shorten',
  ensureAuthenticated,
  shortenRateLimiter,
  asyncHandler(async (req: Request, res: Response) => {
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: z.flattenError(validationResult.error) });
    }

    const { url, code, expiresAt } = validationResult.data;

    const {
      id,
      shortcode: insertedShortcode,
      targetUrl,
      expiresAt: insertedExpiresAt,
    } = await insertUrl(code, url, req.user!.id, expiresAt);

    return res.status(201).json({
      id: id,
      shortcode: insertedShortcode,
      targetUrl: targetUrl,
      expiresAt: insertedExpiresAt,
    });
  }),
);

router.get(
  '/codes',
  ensureAuthenticated,
  asyncHandler(async (req: Request, res: Response) => {
    const codes = await selectCodesFromUser(req.user!.id);
    return res.json({ codes });
  }),
);

router.delete(
  '/:id',
  ensureAuthenticated,
  asyncHandler(async (req: Request, res: Response) => {
    const urlId = req.params.id;
    const userId = req.user!.id;

    await deleteUserURL(urlId, userId);

    return res.status(200).json({ deleted: true });
  }),
);

router.get(
  '/:shortcode',
  redirectRateLimiter,
  asyncHandler(async (req: Request, res: Response) => {
    const code = req.params.shortcode;

    const result = await selectTargetUrl(code);

    if (!result) {
      return res.status(404).json({ error: 'Invalid URL' });
    }

    return res.redirect(result.targetUrl);
  }),
);

export default router;
