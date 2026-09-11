import { Link } from 'react-router-dom';

import { Logo } from './Logo';

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 sm:px-10">
      <Logo />

      <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
}
