import { Link, NavLink } from 'react-router-dom';

import { ArrowRightIcon, ChainIcon } from './icons';

export function DashboardSidebar() {
  return (
    <aside className="w-full border-b border-gray-100 p-4 sm:p-6 lg:w-[30%] lg:border-r lg:border-b-0">
      <Link
        to="/dashboard/links/create"
        className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60"
      >
        Créer mon lien
        <ArrowRightIcon className="h-4 w-4" />
      </Link>

      <NavLink
        to="/dashboard/links"
        end
        className={({ isActive }) =>
          `mt-6 flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors ${
            isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`
        }
      >
        <ChainIcon className="h-4 w-4" />
        Mes liens
      </NavLink>
    </aside>
  );
}
