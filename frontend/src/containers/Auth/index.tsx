import React from 'react';
import {AuthComponent} from '../../componets/Auth';
import {useAuth, useIsAuthenticated} from '../../hooks/auth';
import {Navigate} from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const isAuth = useIsAuthenticated();
  const params = useAuth();
  return !isAuth ? <AuthComponent {...params} /> : <Navigate to={'/'} />;
};
