import type { ApiError } from '../lib/api-client';
import { FieldErrors } from './FieldErrors';

type ShortenOptionalFieldsProps = {
  code: string;
  onCodeChange: (value: string) => void;
  expiresAt: string;
  onExpiresAtChange: (value: string) => void;
  error?: ApiError;
};

export function ShortenOptionalFields({
  code,
  onCodeChange,
  expiresAt,
  onExpiresAtChange,
  error,
}: ShortenOptionalFieldsProps) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div>
        <label htmlFor="hero-code" className="block text-xs text-gray-400">
          Custom code (optional)
        </label>
        <input
          id="hero-code"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="my-link"
          className="mt-1 w-full rounded-lg border-2 border-transparent bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-brand"
        />
        <FieldErrors errors={error?.fieldErrors?.code} />
      </div>
      <div>
        <label htmlFor="hero-expires" className="block text-xs text-gray-400">
          Expiration (optional)
        </label>
        <input
          id="hero-expires"
          type="datetime-local"
          value={expiresAt}
          onChange={(e) => onExpiresAtChange(e.target.value)}
          className="mt-1 w-full rounded-lg border-2 border-transparent bg-white/10 px-3 py-2 text-sm text-white outline-none transition-colors scheme-dark focus:border-brand"
        />
        <FieldErrors errors={error?.fieldErrors?.expiresAt} />
      </div>
    </div>
  );
}
