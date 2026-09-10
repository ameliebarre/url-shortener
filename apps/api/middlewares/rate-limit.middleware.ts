import rateLimit from 'express-rate-limit';

import { errorBody } from '@/utils';

const rateLimitMessage = errorBody(
  'Too many requests, please try again later.',
);

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage,
});

export const shortenRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage,
});

export const redirectRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: rateLimitMessage,
});
