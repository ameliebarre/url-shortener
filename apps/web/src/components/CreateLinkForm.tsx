import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useShortenForm } from '../lib/use-shorten-form';

import { FieldErrors } from './FieldErrors';
import { ArrowRightIcon } from './icons';
import { ShortenResultModal } from './ShortenResultModal';

export function CreateLinkForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    url,
    setUrl,
    code,
    setCode,
    expiresAt,
    setExpiresAt,
    shortLink,
    closeResult,
    copied,
    handleCopy,
    isPending,
    error,
    handleSubmit,
  } = useShortenForm(() => {
    queryClient.invalidateQueries({ queryKey: ['urls'] });
  });

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
              disabled={isPending}
              className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? 'Génération…' : 'Générer votre lien Shortly'}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
          {error && !error.fieldErrors && (
            <p className="mt-2 text-xs text-red-500">{error.message}</p>
          )}
          <FieldErrors errors={error?.fieldErrors?.url} />

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
        <ShortenResultModal
          shortLink={shortLink}
          copied={copied}
          onCopy={handleCopy}
          onClose={closeResult}
          footer={
            <button
              type="button"
              onClick={() => {
                closeResult();
                navigate('/dashboard/links');
              }}
              className="mt-4 block w-full cursor-pointer text-left text-sm font-semibold text-ink underline underline-offset-2"
            >
              Voir mon lien fraîchement créé
            </button>
          }
        />
      )}
    </>
  );
}
