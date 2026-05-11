import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardClient from './pages/DashboardClient';
import DashboardLivreur from './pages/DashboardLivreur';
import DashboardAdmin from './pages/DashboardAdmin';

// Protection des routes
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes protégées */}
        <Route
          path="/dashboard/client"
          element={
            <PrivateRoute allowedRoles={['CLIENT']}>
              <DashboardClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/livreur"
          element={
            <PrivateRoute allowedRoles={['LIVREUR']}>
              <DashboardLivreur />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}