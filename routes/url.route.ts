import express, { Request, Response } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";

import { shortenPostRequestBodySchema } from "@/validation";
import { insertUrl } from "@/services";
import { ensureAuthenticated } from "@/middlewares";

const router = express.Router();

router.post(
  "/shorten",
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

export default router;
