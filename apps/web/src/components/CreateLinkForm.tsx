import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL, ApiError } from '../lib/api-client';
import { createUrl } from '../lib/api/urls';
import { FieldErrors } from './FieldErrors';
import { ArrowRightIcon, CheckIcon, CopyIcon } from './icons';
import { Modal } from './Modal';

export function CreateLinkForm() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [shortLink, setShortLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUrl,
    onSuccess: (result) => {
      setShortLink(`${API_BASE_URL}/${result.shortcode}`);
      setUrl('');
      setCode('');
      setExpiresAt('');
      queryClient.invalidateQueries({ queryKey: ['urls'] });
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
    <>
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">
          Création de votre lien court
        </h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <label
            htmlFor="new-link-url"
            className="text-sm font-medium text-ink"
          >
            Lien à raccourcir
          </label>
          <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
            <input
              id="new-link-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://votre-lien-long.com/…"
              className="w-full rounded-lg border-2 border-transparent bg-gray-50 px-4 py-2.5 text-sm text-ink placeholder:text-gray-400 outline-none transition-colors focus:border-ink"
            />
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending
                ? 'Génération…'
                : 'Générer votre lien Shortly'}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
          {error && !error.fieldErrors && (
            <p className="mt-2 text-xs text-red-500">{error.message}</p>
          )}

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label
                htmlFor="new-link-code"
                className="block text-xs font-medium text-gray-500"
              >
                Code personnalisé (optionnel)
              </label>
              <input
                id="new-link-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="mon-lien"
                className="mt-1 w-full rounded-lg border-2 border-transparent bg-gray-50 px-3 py-2 text-sm text-ink placeholder:text-gray-400 outline-none transition-colors focus:border-ink"
              />
              <FieldErrors errors={error?.fieldErrors?.code} />
            </div>
            <div>
              <label
                htmlFor="new-link-expires"
                className="block text-xs font-medium text-gray-500"
              >
                Expiration (optionnel)
              </label>
              <input
                id="new-link-expires"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="mt-1 w-full rounded-lg border-2 border-transparent bg-gray-50 px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink"
              />
              <FieldErrors errors={error?.fieldErrors?.expiresAt} />
            </div>
          </div>
        </form>
      </div>

      {shortLink && (
        <Modal onClose={() => setShortLink(null)}>
          <h2 className="text-xl font-semibold text-ink">
            Votre lien est prêt !
          </h2>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-100 p-4">
            <span className="flex-1 truncate text-sm font-medium text-ink">
              {shortLink}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60"
            >
              {copied ? 'Copié !' : 'Copier le lien'}
              {copied ? (
                <CheckIcon
                  key="check"
                  className="h-4 w-4 animate-[pop_0.35s_ease-out]"
                />
              ) : (
                <CopyIcon key="copy" className="h-4 w-4" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setShortLink(null);
              navigate('/dashboard/links');
            }}
            className="mt-4 block w-full text-left cursor-pointer text-sm font-semibold text-ink underline underline-offset-2"
          >
            Voir mon lien fraîchement créé
          </button>
        </Modal>
      )}
    </>
  );
}
