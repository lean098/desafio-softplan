import React, { Suspense, lazy } from 'react';

// React Router DOM
import { Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';

// Connected React Router
import { ConnectedRouter } from 'connected-react-router';

// Material UI
import LinearProgress from '@mui/material/LinearProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Store
import store, { history } from './store';

// Constants
import PATH from './constants/basePath';

// Components
import Header from 'components/Header';

// Routes
const PublicRoute = lazy(() => import('components/Routes/PublicRoute'));
const PrivateRoute = lazy(() => import('components/Routes/PrivateRoute'));

// Pages
const SignUp = lazy(() => import('pages/SignUp'));
const SignIn = lazy(() => import('pages/SignIn'));
const Users = lazy(() => import('pages/Users'));
const Profile = lazy(() => import('pages/Profile'));
const Details = lazy(() => import('pages/Details'));

const theme = createTheme({});

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Header />
            <Suspense fallback={<LinearProgress />}>
              <Switch>
                <PublicRoute component={SignIn} exact path={PATH.HOME} />
                <PublicRoute component={SignUp} exact path={PATH.REGISTER} />
                <PrivateRoute component={Users} exact path={PATH.USERS} />
                <PrivateRoute
                  component={SignUp}
                  exact
                  path={PATH.USER_REGISTER}
                />
                <PrivateRoute
                  component={Profile}
                  exact
                  path={PATH.USER_PROFILE}
                />
                <PrivateRoute
                  component={Details}
                  exact
                  path={PATH.USER_DETAILS}
                />
              </Switch>
            </Suspense>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
