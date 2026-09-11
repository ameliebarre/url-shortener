import { type ReactNode } from 'react';

import { CloseIcon } from './icons';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 cursor-pointer text-gray-400 transition-colors hover:text-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
