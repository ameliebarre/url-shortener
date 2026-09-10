import 'express';
import { DecodedUserToken } from '@/types';

declare global {
  namespace Express {
    interface Request {
      user: DecodedUserToken | null;
    }
  }
}

export {};
