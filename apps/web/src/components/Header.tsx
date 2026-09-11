function ChainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M9 15 15 9" />
      <path d="M10.5 6.5 12 5a3.54 3.54 0 1 1 5 5l-1.5 1.5" />
      <path d="M13.5 17.5 12 19a3.54 3.54 0 1 1-5-5l1.5-1.5" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 sm:px-10">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink">
          <ChainIcon />
        </span>
        <span className="text-xl font-semibold text-ink">short.ly</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-full cursor-pointer border border-ink px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
        >
          Log in
        </button>
        <button
          type="button"
          className="rounded-full cursor-pointer bg-ink px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/90"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}
