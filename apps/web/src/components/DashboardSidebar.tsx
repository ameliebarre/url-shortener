import { ArrowRightIcon, ChainIcon } from './icons';

export type View = 'create' | 'links';

interface DashboardSidebarProps {
  view: View;
  onViewChange: (view: View) => void;
}

export function DashboardSidebar({ view, onViewChange }: DashboardSidebarProps) {
  return (
    <aside className="w-[30%] border-r border-gray-100 p-6">
      <button
        type="button"
        onClick={() => onViewChange('create')}
        className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60"
      >
        Créer mon lien
        <ArrowRightIcon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => onViewChange('links')}
        className={`mt-6 flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors ${
          view === 'links' ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}
      >
        <ChainIcon className="h-4 w-4" />
        Mes liens
      </button>
    </aside>
  );
}
