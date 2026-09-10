import { Request, Response, NextFunction } from 'express';

import { validateUserToken } from '@/utils';

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    next();
    return;
  }

  const [scheme, token] = authHeader.split(' '); // [Bearer, <TOKEN>]

  if (scheme !== 'Bearer' || !token) {
    res.status(400).json({
      error: 'Invalid Authorization header.',
    });
    return;
  }

  req.user = await validateUserToken(token);
  next();
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ error: 'You must be logged in to access this ressource' });
  }

  next();
}
