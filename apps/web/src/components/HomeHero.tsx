import { ArrowRightIcon } from './icons';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-brand">
      <div className="pointer-events-none absolute -top-40 -right-15 h-100 w-100 rounded-full border-48 border-black/4" />
      <div className="pointer-events-none absolute -bottom-55 -left-35 h-110 w-110 rounded-full border-48 border-black/4" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-36 sm:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="max-w-180 text-[clamp(3.4rem,7.4vw,7.1rem)] font-semibold leading-[.91] tracking-[-0.075em]">
            <span className="text-ink">Short links.</span>
            <br />
            <span className="text-ink/40">Big impact.</span>
          </h1>

          <p className="mt-8 max-w-122 text-[17px] leading-7 text-black/65 lg:text-[19px]">
            Make every character count. short.ly turns long URLs into short,
            memorable links — with custom codes and optional expiration built
            in.
          </p>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl bg-ink p-6 sm:p-7 shadow-[12px_13px_0px_3px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span className="text-xs font-semibold tracking-wider text-gray-400">
                SHORTEN A NEW LINK
              </span>
            </div>

            <label
              htmlFor="hero-url"
              className="mt-5 block text-sm text-gray-300"
            >
              Paste your long URL
            </label>
            <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
              <input
                id="hero-url"
                type="url"
                placeholder="https://your-long-link.com/…"
                className="w-full rounded-lg border-2 border-transparent bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-brand"
              />
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink transition-all duration-300 hover:bg-brand/90"
              >
                Shorten it
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-6 text-right text-xs text-ink/70">
            🔒 Safe, fast, and free to start
          </p>
        </div>
      </div>
    </section>
  );
}
