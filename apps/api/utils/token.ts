import { randomUUID } from 'node:crypto';

import jwt from 'jsonwebtoken';

import { env } from '@/env';
import { isTokenRevoked } from '@/services';
import { DecodedUserToken, UserTokenPayload } from '@/types';
import { userTokenSchema } from '@/validation';

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
  const payloadValidated = await userTokenSchema.parseAsync(payload);

  return jwt.sign(payloadValidated, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN_SECONDS,
    jwtid: randomUUID(),
  });
}

export async function validateUserToken(
  token: string,
): Promise<DecodedUserToken | null> {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

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
