import { Link } from 'react-router-dom';

import { FormField } from './FormField';
import { Logo } from './Logo';
import { PasswordField } from './PasswordField';
import { ArrowRightIcon, MailIcon } from './icons';

export function LoginForm() {
  return (
    <div className="flex flex-col justify-center px-8 py-12 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm">
        <Logo />

        <h1 className="mt-8 text-3xl font-bold text-ink">Welcome back</h1>
        <p className="mt-2 text-gray-500">
          Log in to manage your short links.
        </p>

        <form className="mt-8 flex flex-col gap-5">
          <FormField
            id="email"
            label="Email address"
            icon={<MailIcon className="h-4 w-4" />}
            type="email"
            placeholder="jane@example.com"
          />

          <PasswordField placeholder="Enter your password" />

          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-ink transition-all duration-300 hover:gap-4 hover:bg-brand/60"
          >
            Log in
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-ink underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
