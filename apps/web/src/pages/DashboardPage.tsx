import { Header } from '../components/Header';
import { ArrowRightIcon, ChainIcon } from '../components/icons';

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <aside className="w-[30%] border-r border-gray-100 p-6">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:gap-2.5 hover:bg-brand/60"
          >
            Créer mon lien
            <ArrowRightIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-ink hover:underline"
          >
            <ChainIcon className="h-4 w-4" />
            Mes liens
          </button>
        </aside>

        <main className="flex-1 p-6" />
      </div>
    </div>
  );
}
