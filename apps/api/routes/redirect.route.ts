import express, { Request, Response } from 'express';

import { redirectRateLimiter } from '@/middlewares';
import { selectTargetUrl } from '@/services';
import { asyncHandler, errorBody } from '@/utils';

const router = express.Router();

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
