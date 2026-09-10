import { NextFunction, Request, Response } from 'express';

import { isUniqueConstraintError } from '@/utils';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON body.' });
    return;
  }

  if (isUniqueConstraintError(err)) {
    res.status(409).json({ error: 'Resource already exists.' });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
}
