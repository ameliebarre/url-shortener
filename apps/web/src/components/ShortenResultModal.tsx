import { Link } from 'react-router-dom';

import { CheckIcon, CopyIcon } from './icons';
import { Modal } from './Modal';

type ShortenResultModalProps = {
  shortLink: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
};

export function ShortenResultModal({
  shortLink,
  copied,
  onCopy,
  onClose,
}: ShortenResultModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-semibold text-ink">
        Votre lien est prêt !
      </h2>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-100 p-4">
        <span className="flex-1 truncate text-sm font-medium text-ink">
          {shortLink}
        </span>
        <button
          type="button"
          onClick={onCopy}
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

      <p className="mt-4 text-sm text-gray-500">
        <Link
          to="/login"
          className="font-semibold text-left text-ink underline underline-offset-2"
        >
          Connectez-vous
        </Link>{' '}
        pour retrouver tous vos liens générés.
      </p>
    </Modal>
  );
}
