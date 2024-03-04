import React from 'react';
import { UserContext } from '../../UserContext';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const { data } = useSelector((state) => state.user);

  if (data) return children;
  else if (data === false) <Navigate to="/login" />;
  else return <></>;
  return data ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
