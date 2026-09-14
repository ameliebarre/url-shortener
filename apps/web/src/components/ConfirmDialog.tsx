import { Modal } from './Modal';

interface ConfirmDialogProps {
  title: string;
  confirmLabel: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const TITLE_ID = 'confirm-dialog-title';

export function ConfirmDialog({
  title,
  confirmLabel,
  isConfirming,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal onClose={onClose} labelledBy={TITLE_ID}>
      <h2 id={TITLE_ID} className="text-lg font-semibold text-ink">
        {title}
      </h2>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-ink hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isConfirming}
          className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
