import { apiFetch } from '../api-client';

export interface ShortUrl {
  id: string;
  shortcode: string;
  targetUrl: string;
  expiresAt: string | null;
}

export interface CreateUrlInput {
  url: string;
  code?: string;
  expiresAt?: string;
}

export function createUrl(input: CreateUrlInput) {
  return apiFetch<ShortUrl>('/shorten', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
