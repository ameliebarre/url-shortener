import { ArrowDownIcon, BoltIcon, ClockIcon, HashIcon } from './icons';

export function SignupHero() {
  return (
    <div className="relative hidden overflow-hidden bg-brand md:flex md:flex-col md:justify-center md:px-16 lg:px-20">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-white/20 blur-2xl" />

      <div className="relative flex flex-col items-center">
        <div className="w-full max-w-md rounded-xl bg-ink px-5 py-4 shadow-xl transition-transform duration-300 ease-out hover:rotate-2">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          </div>
          <p className="truncate font-mono text-sm text-gray-300">
            https://www.example.com/blog/2024/marketing-strategy?ut…
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="h-10 w-px bg-ink/30" />
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink">
            <ArrowDownIcon className="h-3.5 w-3.5 text-brand" />
          </span>
          <span className="h-10 w-px bg-ink/30" />
        </div>

        <div className="w-full max-w-md rounded-xl bg-ink px-5 py-4 shadow-xl transition-transform duration-300 ease-out hover:-rotate-2">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          </div>
          <p className="font-mono text-sm font-semibold text-brand">
            short.ly/jM8x2
          </p>
        </div>
      </div>

      <div className="relative mt-10 max-w-md">
        <h2 className="text-3xl leading-tight font-bold text-ink lg:text-4xl">
          Turn long links into powerful short URLs.
        </h2>
        <p className="mt-3 text-ink/70">
          Create short, memorable links in seconds, with custom codes and
          optional expiration dates.
        </p>

        <ul className="mt-8 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
              <BoltIcon className="h-4 w-4 text-brand" />
            </span>
            <span className="font-medium text-ink">
              Instant link shortening
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
              <HashIcon className="h-4 w-4 text-brand" />
            </span>
            <span className="font-medium text-ink">Custom short codes</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
              <ClockIcon className="h-4 w-4 text-brand" />
            </span>
            <span className="font-medium text-ink">
              Optional link expiration
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
