import { Link } from 'react-router-dom';

import { useLinkCard } from '../hooks/use-link-card';

import { ConfirmDialog } from './ConfirmDialog';
import {
  ChainIcon,
  CheckIcon,
  ClockIcon,
  CopyIcon,
  PencilIcon,
  TrashIcon,
} from './icons';

import type { ShortUrl } from '../lib/api/urls';

interface LinkCardProps {
  link: ShortUrl;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function LinkCard({ link }: LinkCardProps) {
  const {
    shortUrl,
    copied,
    handleCopy,
    isConfirmingDelete,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
    isDeleting,
  } = useLinkCard(link);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <ChainIcon className="h-3 w-3 text-ink" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-ink hover:underline"
            >
              {shortUrl.replace(/^https?:\/\//, '')}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy link"
              className={`cursor-pointer transition-colors ${copied ? 'text-green-500' : 'text-gray-400 hover:text-ink'}`}
            >
              {copied ? (
                <CheckIcon
                  key="check"
                  className="h-3.5 w-3.5 animate-[pop_0.35s_ease-out]"
                />
              ) : (
                <CopyIcon key="copy" className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-gray-500">
            <span className="text-gray-400">↳</span>
            {link.targetUrl}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1">
              <ClockIcon className="h-3.5 w-3.5" />
              {link.expiresAt
                ? `Expires on ${formatDate(link.expiresAt)}`
                : 'No expiration'}
            </span>
            <span>Created on {formatDate(link.createdAt)}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            to={`/dashboard/${link.id}/edit`}
            aria-label="Edit"
            className="cursor-pointer text-gray-400 hover:text-ink"
          >
            <PencilIcon className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={openDeleteConfirm}
            disabled={isDeleting}
            aria-label="Delete"
            className="cursor-pointer text-gray-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isConfirmingDelete && (
        <ConfirmDialog
          title="Delete this link?"
          confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
          isConfirming={isDeleting}
          onConfirm={confirmDelete}
          onClose={closeDeleteConfirm}
        />
      )}
    </div>
  );
}
