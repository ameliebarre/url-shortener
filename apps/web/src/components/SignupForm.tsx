import { FormField } from './FormField';
import { Logo } from './Logo';
import { PasswordField } from './PasswordField';
import { ArrowRightIcon, MailIcon, UserIcon } from './icons';

export function SignupForm() {
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

        <form className="mt-8 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              id="firstname"
              label="First name"
              icon={<UserIcon className="h-4 w-4" />}
              placeholder="Jane"
            />
            <FormField
              id="lastname"
              label="Last name"
              icon={<UserIcon className="h-4 w-4" />}
              placeholder="Doe"
            />
          </div>

          <FormField
            id="email"
            label="Email address"
            icon={<MailIcon className="h-4 w-4" />}
            type="email"
            placeholder="jane@example.com"
          />

          <PasswordField />

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
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
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand py-3 font-semibold text-ink transition-all duration-300 hover:gap-4 hover:bg-brand/60"
          >
            Create account
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span className="cursor-pointer font-semibold text-ink underline underline-offset-2">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
