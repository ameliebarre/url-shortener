import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { GuestRoute } from './components/GuestRoute';
import { ProtectedRoute } from './components/ProtectedRoute';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const SignupPage = lazy(() =>
  import('./pages/SignupPage').then((m) => ({ default: m.SignupPage })),
);
const DashboardLayout = lazy(() =>
  import('./pages/DashboardLayout').then((m) => ({
    default: m.DashboardLayout,
  })),
);
const CreateLinkForm = lazy(() =>
  import('./components/CreateLinkForm').then((m) => ({
    default: m.CreateLinkForm,
  })),
);
const LinksView = lazy(() =>
  import('./components/LinksView').then((m) => ({ default: m.LinksView })),
);
const EditLinkForm = lazy(() =>
  import('./components/EditLinkForm').then((m) => ({
    default: m.EditLinkForm,
  })),
);

function RouteBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={<p className="p-6 text-sm text-gray-500">Loading…</p>}
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route
          path="/"
          element={
            <RouteBoundary>
              <HomePage />
            </RouteBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <RouteBoundary>
              <LoginPage />
            </RouteBoundary>
          }
        />
        <Route
          path="/signup"
          element={
            <RouteBoundary>
              <SignupPage />
            </RouteBoundary>
          }
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <RouteBoundary>
              <DashboardLayout />
            </RouteBoundary>
          }
        >
          <Route
            index
            element={<Navigate to="/dashboard/links/create" replace />}
          />
          <Route
            path="links/create"
            element={
              <RouteBoundary>
                <CreateLinkForm />
              </RouteBoundary>
            }
          />
          <Route
            path="links"
            element={
              <RouteBoundary>
                <LinksView />
              </RouteBoundary>
            }
          />
          <Route
            path=":idLink/edit"
            element={
              <RouteBoundary>
                <EditLinkForm />
              </RouteBoundary>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
