import { Link } from 'react-router-dom';

import { useSignupForm } from '../hooks/use-signup-form';
import { FieldErrors } from './FieldErrors';
import { FormField } from './FormField';
import { Logo } from './Logo';
import { PasswordField } from './PasswordField';
import { ArrowRightIcon, MailIcon, UserIcon } from './icons';

export function SignupForm() {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    agreedToTerms,
    setAgreedToTerms,
    isPending,
    error,
    handleSubmit,
  } = useSignupForm();

  return (
    <div className="flex flex-col justify-center px-8 py-12 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm">
        <Logo />

        <h1 className="mt-8 text-3xl font-bold text-ink">
          Create your account
        </h1>
        <p className="mt-2 text-gray-500">
          Start shortening links in seconds. No credit card required.
        </p>

        {error && !error.fieldErrors && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error.message}
          </p>
        )}

        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FormField
                id="firstname"
                name="firstname"
                label="First name"
                icon={<UserIcon className="h-4 w-4" />}
                placeholder="Jane"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <FieldErrors errors={error?.fieldErrors?.firstname} />
            </div>
            <div>
              <FormField
                id="lastname"
                name="lastname"
                label="Last name"
                icon={<UserIcon className="h-4 w-4" />}
                placeholder="Doe"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <FieldErrors errors={error?.fieldErrors?.lastname} />
            </div>
          </div>

          <div>
            <FormField
              id="email"
              name="email"
              label="Email address"
              icon={<MailIcon className="h-4 w-4" />}
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FieldErrors errors={error?.fieldErrors?.email} />
          </div>

          <PasswordField
            value={password}
            onChange={setPassword}
            fieldErrors={error?.fieldErrors?.password}
          />

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              required
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-ink"
            />
            <span>
              I agree to the{' '}
              <span className="font-semibold text-ink">
                Terms of Service
              </span>{' '}
              and <span className="font-semibold text-ink">Privacy Policy</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-ink transition-all duration-300 hover:gap-4 hover:bg-brand/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Creating account…' : 'Create account'}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-ink underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
