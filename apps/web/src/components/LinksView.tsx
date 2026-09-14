import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { fetchUrls } from '../lib/api/urls';
import { LinkCard } from './LinkCard';
import { PaginationControls } from './PaginationControls';

const PAGE_SIZE = 20;

export function LinksView() {
  const [page, setPage] = useState(1);

  const linksQuery = useQuery({
    queryKey: ['urls', page],
    queryFn: () => fetchUrls(page, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  const pagination = linksQuery.data?.pagination;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-ink">My links</h2>

      {linksQuery.isPending && (
        <p className="text-sm text-gray-500">Loading…</p>
      )}

      {linksQuery.isError && (
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-red-500">
            Unable to load your links. Please try again later.
          </p>
        </div>
      )}

      {linksQuery.data?.codes.length === 0 && (
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            You don&apos;t have any links to show here yet.
          </p>
        </div>
      )}

      {linksQuery.data?.codes.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}

      {pagination && (
        <PaginationControls
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
