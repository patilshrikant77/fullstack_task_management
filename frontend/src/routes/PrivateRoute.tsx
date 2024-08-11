import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Access the user state from Redux store
  const user = useSelector((state: RootState) => state.auth.token);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};
