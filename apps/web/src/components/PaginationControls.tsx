import { ArrowLeftIcon, ArrowRightIcon } from './icons';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 font-medium text-ink hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 font-medium text-ink hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
