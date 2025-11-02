import React from 'react';
import { useAuth } from '../services/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (user.role === 'ADMIN') {
    return <Outlet />;
  }

  return <Navigate to="/user/homepage" replace />;
}

export default AdminRoute;

