import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { UserTokenPayload } from '@/types';
import { userTokenSchema } from '@/validation';

const JWT_SECRET = process.env.JWT_SECRET;
const TWO_HOURS_IN_SECONDS = 60 * 60 * 2;
const JWT_EXPIRES_IN_SECONDS =
  Number(process.env.JWT_EXPIRES_IN_SECONDS) || TWO_HOURS_IN_SECONDS;

export function isUserTokenPayload(
  payload: unknown,
): payload is UserTokenPayload {
  return typeof payload === 'object' && payload !== null && 'id' in payload;
}

export async function createUserToken(
  payload: UserTokenPayload,
): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const payloadValidated = await userTokenSchema.parseAsync(payload);

  return jwt.sign(payloadValidated, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN_SECONDS,
  });
}

export function validateUserToken(token: string): UserTokenPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET!);

    if (!isUserTokenPayload(payload)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
