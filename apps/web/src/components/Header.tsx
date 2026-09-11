import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStatus } from '../lib/use-auth-status';
import { logout } from '../lib/api/auth';
import { LogoutIcon } from './icons';
import { Logo } from './Logo';

export function Header() {
  const { isAuthenticated, me } = useAuthStatus();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      localStorage.removeItem('token');
      queryClient.removeQueries({ queryKey: ['me'] });
      navigate('/');
    },
  });

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 sm:px-10">
      <Logo />

      <div className="flex items-center gap-3">
        {isAuthenticated && me ? (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              {me.firstname.charAt(0).toUpperCase()}
            </div>
            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              aria-label="Se déconnecter"
              className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogoutIcon className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="cursor-pointer rounded-full border border-ink px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="cursor-pointer rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
