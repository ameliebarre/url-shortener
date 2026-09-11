import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStatus } from '../lib/use-auth-status';

export function GuestRoute() {
  const { isPending, isAuthenticated } = useAuthStatus();

  if (isPending) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
