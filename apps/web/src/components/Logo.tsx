import { ChainIcon } from './icons';

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink">
        <ChainIcon className="h-5 w-5 text-white" />
      </span>
      <span className="text-xl font-semibold text-ink">short.ly</span>
    </div>
  );
}
