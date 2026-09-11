import express, { Request, Response } from 'express';

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
  updateUserURL,
} from '@/services';
import { asyncHandler, errorBody, validationErrorBody } from '@/utils';
import {
  codesQuerySchema,
  shortenPostRequestBodySchema,
  updateUrlBodySchema,
  urlIdParamsSchema,
} from '@/validation';

const router = express.Router();

router.post(
  '/shorten',
  shortenRateLimiter,
  asyncHandler(async (req: Request, res: Response) => {
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res
        .status(400)
        .json(validationErrorBody(validationResult.error));
    }

    const { url, code, expiresAt } = validationResult.data;

    const {
      id,
      shortcode: insertedShortcode,
      targetUrl,
      expiresAt: insertedExpiresAt,
    } = await insertUrl(code, url, req.user?.id ?? null, expiresAt);

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
    const validationResult = codesQuerySchema.safeParse(req.query);

    if (validationResult.error) {
      return res
        .status(400)
        .json(validationErrorBody(validationResult.error));
    }

    const { page, pageSize } = validationResult.data;

    const { codes, total } = await selectCodesFromUser(req.user!.id, {
      page,
      pageSize,
    });

    return res.json({
      codes,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  }),
);

router.patch(
  '/:id',
  ensureAuthenticated,
  asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = urlIdParamsSchema.safeParse(req.params);

    if (paramsResult.error) {
      return res.status(400).json(validationErrorBody(paramsResult.error));
    }

    const bodyResult = await updateUrlBodySchema.safeParseAsync(req.body);

    if (bodyResult.error) {
      return res.status(400).json(validationErrorBody(bodyResult.error));
    }

    const { id: urlId } = paramsResult.data;

    const updatedUrl = await updateUserURL(
      urlId,
      req.user!.id,
      bodyResult.data,
    );

    if (!updatedUrl) {
      return res.status(404).json(errorBody('URL not found'));
    }

    return res.json(updatedUrl);
  }),
);

router.delete(
  '/:id',
  ensureAuthenticated,
  asyncHandler(async (req: Request, res: Response) => {
    const validationResult = urlIdParamsSchema.safeParse(req.params);

    if (validationResult.error) {
      return res
        .status(400)
        .json(validationErrorBody(validationResult.error));
    }

    const { id: urlId } = validationResult.data;
    const userId = req.user!.id;

    const deletedUrl = await deleteUserURL(urlId, userId);

    if (!deletedUrl) {
      return res.status(404).json(errorBody('URL not found'));
    }

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
      return res.status(404).json(errorBody('Invalid URL'));
    }

    return res.redirect(result.targetUrl);
  }),
);

export default router;
