import { useMutation } from '@tanstack/react-query';
import { type SubmitEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ApiError } from '../lib/api-client';
import { login } from '../lib/api/auth';
import { FieldErrors } from './FieldErrors';
import { FormField } from './FormField';
import { Logo } from './Logo';
import { PasswordField } from './PasswordField';
import { ArrowRightIcon, MailIcon } from './icons';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const justSignedUp = Boolean(
    (location.state as { justSignedUp?: boolean } | null)?.justSignedUp,
  );

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token);
      navigate('/');
    },
  });

  const error =
    mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutation.mutate({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  }

  return (
    <div className="flex flex-col justify-center px-8 py-12 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm">
        <Logo />

        <h1 className="mt-8 text-3xl font-bold text-ink">Welcome back</h1>
        <p className="mt-2 text-gray-500">
          Log in to manage your short links.
        </p>

        {justSignedUp && (
          <p className="mt-4 rounded-lg bg-brand/30 p-3 text-sm text-ink">
            Account created, you can now log in.
          </p>
        )}

        {error && !error.fieldErrors && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error.message}
          </p>
        )}

        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <FormField
              id="email"
              name="email"
              label="Email address"
              icon={<MailIcon className="h-4 w-4" />}
              type="email"
              placeholder="jane@example.com"
            />
            <FieldErrors errors={error?.fieldErrors?.email} />
          </div>

          <PasswordField
            placeholder="Enter your password"
            fieldErrors={error?.fieldErrors?.password}
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-ink transition-all duration-300 hover:gap-4 hover:bg-brand/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? 'Logging in…' : 'Log in'}
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
