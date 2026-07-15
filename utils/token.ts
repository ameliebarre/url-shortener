import jwt, { JwtPayload } from 'jsonwebtoken';
import { userTokenSchema } from '@/validation/token.validation';
import { UserTokenPayload } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET;

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

  return jwt.sign(payloadValidated, JWT_SECRET);
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
