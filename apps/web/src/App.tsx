import { Navigate, Route, Routes } from 'react-router-dom';

import { CreateLinkForm } from './components/CreateLinkForm';
import { EditLinkForm } from './components/EditLinkForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GuestRoute } from './components/GuestRoute';
import { LinksView } from './components/LinksView';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './pages/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <LoginPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/signup"
          element={
            <ErrorBoundary>
              <SignupPage />
            </ErrorBoundary>
          }
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <DashboardLayout />
            </ErrorBoundary>
          }
        >
          <Route
            index
            element={<Navigate to="/dashboard/links/create" replace />}
          />
          <Route
            path="links/create"
            element={
              <ErrorBoundary>
                <CreateLinkForm />
              </ErrorBoundary>
            }
          />
          <Route
            path="links"
            element={
              <ErrorBoundary>
                <LinksView />
              </ErrorBoundary>
            }
          />
          <Route
            path=":idLink/edit"
            element={
              <ErrorBoundary>
                <EditLinkForm />
              </ErrorBoundary>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
