import React from 'react';
import {Route, Routes as Switch} from 'react-router';
import {PrivateRoute} from './containers/PrivateRoute';
import {AuthPage} from './containers/Auth';
import {TaskPageContainer} from './containers/TaskPage';
import {route} from './constants/routes';

const PublicRoutes = [<Route key="login" path={route.login} element={<AuthPage />} />];

const Routes: React.FC = () => {
  return (
    <Switch>
      {PublicRoutes}
      <Route key={'/'} path={route.main} element={<PrivateRoute />}>
        <Route key={'/'} path={route.main} element={<TaskPageContainer />} />
      </Route>
    </Switch>
  );
};

export default Routes;
