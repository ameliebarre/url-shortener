import jwt from 'jsonwebtoken';
import {
  userTokenSchema,
  UserTokenPayload,
} from '../validation/token.validation';

const JWT_SECRET = process.env.JWT_SECRET;

export async function createUserToken(
  payload: UserTokenPayload,
): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const payloadValidated = await userTokenSchema.parseAsync(payload);

  return jwt.sign(payloadValidated, JWT_SECRET);
}
