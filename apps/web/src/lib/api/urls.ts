import { apiFetch } from '../api-client';

export interface ShortUrl {
  id: string;
  shortcode: string;
  targetUrl: string;
  expiresAt: string | null;
  createdAt: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedUrls {
  codes: ShortUrl[];
  pagination: Pagination;
}

export interface CreateUrlInput {
  url: string;
  code?: string;
  expiresAt?: string;
}

export interface UpdateUrlInput {
  url?: string;
  code?: string;
  expiresAt?: string | null;
}

export function createUrl(input: CreateUrlInput) {
  return apiFetch<ShortUrl>('/urls/shorten', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function fetchUrlById(id: string) {
  return apiFetch<ShortUrl>(`/urls/codes/${id}`);
}

export function updateUrl(id: string, input: UpdateUrlInput) {
  return apiFetch<ShortUrl>(`/urls/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function fetchUrls(page: number, pageSize: number) {
  return apiFetch<PaginatedUrls>(
    `/urls/codes?page=${page}&pageSize=${pageSize}`,
  );
}

export function deleteUrl(id: string) {
  return apiFetch<{ deleted: true }>(`/urls/${id}`, { method: 'DELETE' });
}
