import { Outlet } from 'react-router-dom';

import { DashboardSidebar } from '../components/DashboardSidebar';
import { Header } from '../components/Header';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex flex-1 flex-col lg:flex-row">
        <DashboardSidebar />

        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
