import { useMutation } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';

import { Header } from '../components/Header';
import {
  ArrowRightIcon,
  CheckIcon,
  ChainIcon,
  CopyIcon,
} from '../components/icons';
import { Modal } from '../components/Modal';
import { API_BASE_URL, ApiError } from '../lib/api-client';
import { createUrl } from '../lib/api/urls';

type View = 'create' | 'links';

export function DashboardPage() {
  const [view, setView] = useState<View>('create');
  const [url, setUrl] = useState('');
  const [shortLink, setShortLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: createUrl,
    onSuccess: (result) => {
      setShortLink(`${API_BASE_URL}/${result.shortcode}`);
      setUrl('');
    },
  });

  const error = mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({ url });
  }

  async function handleCopy() {
    if (!shortLink) return;
    await navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex flex-1">
        <aside className="w-[30%] border-r border-gray-100 p-6">
          <button
            type="button"
            onClick={() => setView('create')}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60"
          >
            Créer mon lien
            <ArrowRightIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setView('links')}
            className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-ink hover:underline"
          >
            <ChainIcon className="h-4 w-4" />
            Mes liens
          </button>
        </aside>

        <main className="flex-1 bg-gray-50 p-6">
          {view === 'create' ? (
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
                {error && (
                  <p className="mt-2 text-xs text-red-500">{error.message}</p>
                )}
              </form>
            </div>
          ) : (
            <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-ink">Mes liens</h2>
              <p className="mt-4 text-sm text-gray-500">
                Vous n&apos;avez pas encore de liens à afficher ici.
              </p>
            </div>
          )}
        </main>
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
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setView('links');
              setShortLink(null);
            }}
            className="mt-4 block w-full cursor-pointer text-sm font-semibold text-ink underline underline-offset-2"
          >
            Voir mon lien fraîchement créé
          </button>
        </Modal>
      )}
    </div>
  );
}
