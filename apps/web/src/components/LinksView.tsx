import { useQuery } from '@tanstack/react-query';

import { fetchUrls } from '../lib/api/urls';
import { LinkCard } from './LinkCard';

const PAGE_SIZE = 20;

export function LinksView() {
  const linksQuery = useQuery({
    queryKey: ['urls'],
    queryFn: () => fetchUrls(1, PAGE_SIZE),
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-ink">Mes liens</h2>

      {linksQuery.isPending && (
        <p className="text-sm text-gray-500">Chargement…</p>
      )}

      {linksQuery.data?.codes.length === 0 && (
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Vous n&apos;avez pas encore de liens à afficher ici.
          </p>
        </div>
      )}

      {linksQuery.data?.codes.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
