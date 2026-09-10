import { randomUUID } from 'node:crypto';

import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { isTokenRevoked } from '@/services';
import { DecodedUserToken, UserTokenPayload } from '@/types';
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

function isDecodedUserToken(payload: unknown): payload is DecodedUserToken {
  return (
    isUserTokenPayload(payload) &&
    typeof (payload as DecodedUserToken).jti === 'string' &&
    typeof (payload as DecodedUserToken).exp === 'number'
  );
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
    jwtid: randomUUID(),
  });
}

export async function validateUserToken(
  token: string,
): Promise<DecodedUserToken | null> {
  try {
    const payload = jwt.verify(token, JWT_SECRET!);

    if (!isDecodedUserToken(payload)) {
      return null;
    }

    if (await isTokenRevoked(payload.jti)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
