interface PostgresError extends Error {
  code: string;
}

function isPostgresError(err: unknown): err is PostgresError {
  return err instanceof Error && 'code' in err && typeof err.code === 'string';
}

function findPostgresError(err: unknown): PostgresError | undefined {
  if (isPostgresError(err)) return err;
  if (err instanceof Error && err.cause) return findPostgresError(err.cause);
  return undefined;
}

export function isUniqueConstraintError(err: unknown): boolean {
  return findPostgresError(err)?.code === '23505';
}
