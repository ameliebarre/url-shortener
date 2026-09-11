import { apiFetch } from '../api-client';

export interface SignupInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export function signup(input: SignupInput) {
  return apiFetch<{ data: { userId: string } }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function login(input: LoginInput) {
  return apiFetch<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
