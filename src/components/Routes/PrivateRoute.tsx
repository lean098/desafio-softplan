import React, { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// React Router DOM
import { Redirect, Route, RouteProps } from 'react-router-dom';

// Constants
import PATH from 'constants/basePath';

// Helpers
import { getToken, removeToken } from 'helpers/auth';

// Types
import { ApplicationState } from 'store';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const token = getToken();

  const loggedUser = useSelector(
    (state: ApplicationState) => state.users.loggedUser,
  );

  useEffect(() => {
    if (!loggedUser?.id) {
      removeToken();
    }
  }, [loggedUser]);

  if (token && loggedUser?.id) {
    return <Route {...props} />;
  }

  return <Redirect to={PATH.HOME} />;
};

export default PrivateRoute;
