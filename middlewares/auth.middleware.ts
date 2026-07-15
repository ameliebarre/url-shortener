import { Request, Response, NextFunction } from 'express';
import { validateUserToken } from '../utils/token';

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.log('req.headers.authorization : ', req.headers.authorization);
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

  console.log('TEST req.user : ', validateUserToken(token));

  req.user = validateUserToken(token);
  next();
}
