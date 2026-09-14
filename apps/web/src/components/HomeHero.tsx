import { HomeHeroForm } from './HomeHeroForm';

export function HomeHero() {
  return (
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden bg-brand">
      <div className="pointer-events-none absolute -top-40 -right-15 h-100 w-100 rounded-full border-48 border-black/4" />
      <div className="pointer-events-none absolute -bottom-55 -left-35 h-110 w-110 rounded-full border-48 border-black/4" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">
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

        <HomeHeroForm />
      </div>
    </section>
  );
}
