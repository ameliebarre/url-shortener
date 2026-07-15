import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  userTokenSchema,
  UserTokenPayload,
} from '../validation/token.validation';
import { UserPayload } from '../types/user.type';

const JWT_SECRET = process.env.JWT_SECRET;

export function isUserPayload(payload: unknown): payload is UserPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'firstname' in payload &&
    'lastname' in payload &&
    'email' in payload
  );
}

export async function createUserToken(
  payload: UserTokenPayload,
): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const payloadValidated = await userTokenSchema.parseAsync(payload);

  return jwt.sign(payloadValidated, JWT_SECRET);
}

export function validateUserToken(token: string): UserPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET!);

    if (!isUserPayload(payload)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
