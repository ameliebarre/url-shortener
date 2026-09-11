import { useQuery } from '@tanstack/react-query';

import { getMe } from './api/auth';

export function useAuthStatus() {
  const token = localStorage.getItem('token');

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: Boolean(token),
    retry: false,
  });

  return {
    isPending: Boolean(token) && meQuery.isPending,
    isAuthenticated: Boolean(token) && meQuery.isSuccess,
    me: meQuery.data,
  };
}
