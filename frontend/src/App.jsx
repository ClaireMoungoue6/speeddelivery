import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardClient from './pages/DashboardClient';
import DashboardLivreur from './pages/DashboardLivreur';
import DashboardAdmin from './pages/DashboardAdmin';
import NouvelleCommande from './pages/NouvelleCommande';

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
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Client */}
        <Route
          path="/dashboard/client"
          element={
            <PrivateRoute allowedRoles={['CLIENT']}>
              <DashboardClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/commandes/new"
          element={
            <PrivateRoute allowedRoles={['CLIENT']}>
              <NouvelleCommande />
            </PrivateRoute>
          }
        />

        {/* Livreur */}
        <Route
          path="/dashboard/livreur"
          element={
            <PrivateRoute allowedRoles={['LIVREUR']}>
              <DashboardLivreur />
            </PrivateRoute>
          }
        />

        {/* Admin */}
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