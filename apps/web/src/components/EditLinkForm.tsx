import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ApiError } from '../lib/api-client';
import { fetchUrls, updateUrl } from '../lib/api/urls';
import { ArrowRightIcon } from './icons';

const PAGE_SIZE = 20;

export function EditLinkForm() {
  const { idLink } = useParams<{ idLink: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const linksQuery = useQuery({
    queryKey: ['urls'],
    queryFn: () => fetchUrls(1, PAGE_SIZE),
  });

  const link = linksQuery.data?.codes.find((code) => code.id === idLink);

  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [initialized, setInitialized] = useState(false);

  if (link && !initialized) {
    setUrl(link.targetUrl);
    setCode(link.shortcode);
    setExpiresAt(link.expiresAt ? link.expiresAt.slice(0, 16) : '');
    setInitialized(true);
  }

  const mutation = useMutation({
    mutationFn: () =>
      updateUrl(idLink!, {
        url,
        code,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
      navigate('/dashboard/links');
    },
  });

  const error =
    mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate();
  }

  if (linksQuery.isPending) {
    return <p className="text-sm text-gray-500">Chargement…</p>;
  }

  if (!link) {
    return (
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Ce lien est introuvable.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">Modifier le lien</h2>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="edit-url" className="text-sm font-medium text-ink">
            Lien cible
          </label>
          <input
            id="edit-url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1.5 w-full rounded-lg border-2 border-transparent bg-gray-50 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink"
          />
        </div>

        <div>
          <label htmlFor="edit-code" className="text-sm font-medium text-ink">
            Code court
          </label>
          <input
            id="edit-code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1.5 w-full rounded-lg border-2 border-transparent bg-gray-50 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink"
          />
        </div>

        <div>
          <label
            htmlFor="edit-expires"
            className="text-sm font-medium text-ink"
          >
            Date d&apos;expiration
          </label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              id="edit-expires"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full rounded-lg border-2 border-transparent bg-gray-50 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
            {expiresAt && (
              <button
                type="button"
                onClick={() => setExpiresAt('')}
                className="cursor-pointer text-xs font-medium whitespace-nowrap text-gray-500 hover:text-ink"
              >
                Retirer
              </button>
            )}
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error.message}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? 'Enregistrement…' : 'Enregistrer'}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/links')}
            className="cursor-pointer rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-ink hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
