
import { CheckIcon, CopyIcon } from './icons';
import { Modal } from './Modal';

import type { ReactNode } from 'react';

type ShortenResultModalProps = {
  shortLink: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
  footer: ReactNode;
};

export function ShortenResultModal({
  shortLink,
  copied,
  onCopy,
  onClose,
  footer,
}: ShortenResultModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-semibold text-ink">
        Your link is ready!
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
          {copied ? 'Copied!' : 'Copy link'}
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

      {footer}
    </Modal>
  );
}
