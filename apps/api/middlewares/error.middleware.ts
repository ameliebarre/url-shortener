import { NextFunction, Request, Response } from 'express';

interface PostgresError extends Error {
  code: string;
}

function isPostgresError(err: unknown): err is PostgresError {
  return err instanceof Error && 'code' in err && typeof err.code === 'string';
}

// drizzle wraps the driver's pg error in a DrizzleQueryError, with the
// original postgres error (and its `code`) available as `.cause`.
function findPostgresError(err: unknown): PostgresError | undefined {
  if (isPostgresError(err)) return err;
  if (err instanceof Error && err.cause) return findPostgresError(err.cause);
  return undefined;
}

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON body.' });
    return;
  }

  const postgresError = findPostgresError(err);

  if (postgresError?.code === '23505') {
    res.status(409).json({ error: 'Resource already exists.' });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
}
