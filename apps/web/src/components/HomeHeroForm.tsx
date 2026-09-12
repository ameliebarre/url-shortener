import { useMutation } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';

import { API_BASE_URL, ApiError } from '../lib/api-client';
import { createUrl } from '../lib/api/urls';
import { ArrowRightIcon } from './icons';
import { ShortenOptionalFields } from './ShortenOptionalFields';
import { ShortenResultModal } from './ShortenResultModal';

export function HomeHeroForm() {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [shortLink, setShortLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: createUrl,
    onSuccess: (result) => {
      setShortLink(`${API_BASE_URL}/${result.shortcode}`);
      setUrl('');
      setCode('');
      setExpiresAt('');
    },
  });

  const error = mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({
      url,
      code: code.trim() || undefined,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
    });
  }

  async function handleCopy() {
    if (!shortLink) return;
    await navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative">
      <div className="relative rounded-2xl bg-ink p-6 shadow-[12px_13px_0px_3px_rgba(0,0,0,0.2)] sm:p-7">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="text-xs font-semibold tracking-wider text-gray-400">
            SHORTEN A NEW LINK
          </span>
        </div>

        <form onSubmit={handleSubmit}>
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
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-long-link.com/…"
              className="w-full rounded-lg border-2 border-transparent bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-brand"
            />
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink transition-all duration-300 hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? 'Shortening…' : 'Shorten it'}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
          {error && !error.fieldErrors && (
            <p className="mt-2 text-xs text-red-400">{error.message}</p>
          )}

          <ShortenOptionalFields
            code={code}
            onCodeChange={setCode}
            expiresAt={expiresAt}
            onExpiresAtChange={setExpiresAt}
            error={error}
          />
        </form>
      </div>

      <p className="mt-6 text-right text-xs text-ink/70">
        🔒 Safe, fast, and free to start
      </p>

      {shortLink && (
        <ShortenResultModal
          shortLink={shortLink}
          copied={copied}
          onCopy={handleCopy}
          onClose={() => setShortLink(null)}
        />
      )}
    </div>
  );
}
