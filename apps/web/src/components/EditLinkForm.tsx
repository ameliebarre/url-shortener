import { useNavigate, useParams } from 'react-router-dom';

import { useEditLinkForm } from '../hooks/use-edit-link-form';

import { ArrowRightIcon } from './icons';

export function EditLinkForm() {
  const { idLink } = useParams<{ idLink: string }>();
  const navigate = useNavigate();

  const {
    url,
    setUrl,
    code,
    setCode,
    expiresAt,
    setExpiresAt,
    link,
    isLoading,
    isError,
    notFound,
    isPending,
    error,
    handleSubmit,
  } = useEditLinkForm(idLink);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  if (notFound) {
    return (
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">This link could not be found.</p>
      </div>
    );
  }

  if (isError || !link) {
    return (
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-red-500">
          Unable to load this link. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">Edit link</h2>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="edit-url" className="text-sm font-medium text-ink">
            Target link
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
            Short code
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
            Expiration date
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
                Remove
              </button>
            )}
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error.message}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Saving…' : 'Save'}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/links')}
            className="cursor-pointer rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-ink hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
