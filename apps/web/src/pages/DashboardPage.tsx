import { useState } from 'react';

import { CreateLinkForm } from '../components/CreateLinkForm';
import { DashboardSidebar, type View } from '../components/DashboardSidebar';
import { Header } from '../components/Header';
import { LinksView } from '../components/LinksView';

export function DashboardPage() {
  const [view, setView] = useState<View>('create');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex flex-1">
        <DashboardSidebar view={view} onViewChange={setView} />

        <main className="flex-1 bg-gray-50 p-6">
          {view === 'create' ? (
            <CreateLinkForm onViewLinks={() => setView('links')} />
          ) : (
            <LinksView />
          )}
        </main>
      </div>
    </div>
  );
}
