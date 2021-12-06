import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

// History
import { createBrowserHistory } from 'history';

// Middlewares
import { routerMiddleware } from 'connected-react-router';

// Types
import { UsersState } from './ducks/users/types';

import createRootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export const history = createBrowserHistory();

export interface ApplicationState {
  users: UsersState;
}

const sagaMiddleware = createSagaMiddleware();
const store: Store<ApplicationState> = createStore(
  createRootReducer(history),
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);

sagaMiddleware.run(rootSaga);

export default store;
