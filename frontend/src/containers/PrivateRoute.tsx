import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useIsAuthenticated} from '../hooks/auth';
import {route} from '../constants/routes';
export const PrivateRoute: React.FC = () => {
  const isAuth = useIsAuthenticated();
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to={route.login} />;
};
