import { Link } from 'react-router-dom';

import { useAuthStatus } from '../lib/use-auth-status';
import { Logo } from './Logo';

export function Header() {
  const { isAuthenticated, me } = useAuthStatus();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 sm:px-10">
      <Logo />

      <div className="flex items-center gap-3">
        {isAuthenticated && me ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
            {me.firstname.charAt(0).toUpperCase()}
          </div>
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
