import { combineReducers } from 'redux';

// Connected Router
import { connectRouter } from 'connected-react-router';

import users from './users';

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    users,
  });

export default createRootReducer;
