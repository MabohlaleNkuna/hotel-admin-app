import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ isAuthenticated, isAdmin, adminRequired, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminRequired && !isAdmin) {
    return <Navigate to="/user-homepage" />;
  }

  if (!adminRequired && isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
export default ProtectedRoute 