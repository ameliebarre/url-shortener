import { Navigate, Route, Routes } from 'react-router-dom';

import { CreateLinkForm } from './components/CreateLinkForm';
import { EditLinkForm } from './components/EditLinkForm';
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={<Navigate to="/dashboard/links/create" replace />}
          />
          <Route path="links/create" element={<CreateLinkForm />} />
          <Route path="links" element={<LinksView />} />
          <Route path=":idLink/edit" element={<EditLinkForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
