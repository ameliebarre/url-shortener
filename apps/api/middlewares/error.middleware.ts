import { NextFunction, Request, Response } from 'express';

import { errorBody, isUniqueConstraintError } from '@/utils';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json(errorBody('Invalid JSON body.'));
    return;
  }

  if (isUniqueConstraintError(err)) {
    res.status(409).json(errorBody('Resource already exists.'));
    return;
  }

  console.error(err);
  res.status(500).json(errorBody('Internal server error.'));
}
