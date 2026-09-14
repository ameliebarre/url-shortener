import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// A hash with no matching password. Comparing against it when a login
// email doesn't exist keeps the response time the same as a real
// password mismatch, so latency can't be used to enumerate accounts.
export const DUMMY_PASSWORD_HASH = bcrypt.hashSync(
  'no-account-has-this-password',
  SALT_ROUNDS,
);
