import React from 'react';
import { useAuth } from '../services/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function UserRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/sign-in" replace />;
}

export default UserRoute;

