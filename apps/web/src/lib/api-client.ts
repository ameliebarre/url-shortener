export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function clearTokens() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    clearTokens();
    return false;
  }

  const body = await res.json();
  localStorage.setItem('token', body.token);
  localStorage.setItem('refreshToken', body.refreshToken);
  return true;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<T> {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401 && path !== '/auth/refresh' && !isRetry) {
    refreshPromise ??= refreshAccessToken().finally(() => {
      refreshPromise = null;
    });

    if (await refreshPromise) {
      return apiFetch<T>(path, options, true);
    }
  }

  if (!res.ok) {
    if (res.status === 401) {
      clearTokens();
    }

    const body = await res.json().catch(() => null);
    throw new ApiError(
      res.status,
      body?.error?.message ?? 'Something went wrong.',
      body?.error?.fieldErrors,
    );
  }

  return res.json();
}
