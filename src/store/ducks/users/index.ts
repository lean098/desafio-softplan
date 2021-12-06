import { Reducer } from 'redux';

// Types
import { UsersTypes, UsersState } from './types';

export const INITIAL_STATE: UsersState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    document: '',
    password: '',
    picture: '',
    role: 'USER',
  },
  loggedUser: null,
  usersList: [],
  loading: false,
  error: false,
};

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // CASES LOGIN
    case UsersTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        loggedUser: INITIAL_STATE.loggedUser,
      };
    case UsersTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loggedUser: action.payload.loggedUser,
      };
    case UsersTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        loggedUser: INITIAL_STATE.loggedUser,
      };

    // LOGOUT
    case UsersTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        error: false,
        loggedUser: INITIAL_STATE.loggedUser,
      };

    // CASES LIST USERS
    case UsersTypes.LIST_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        usersList: INITIAL_STATE.usersList,
      };
    case UsersTypes.LIST_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        usersList: action.payload.usersList,
      };
    case UsersTypes.LIST_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        usersList: INITIAL_STATE.usersList,
      };

    // CASES CREATE USER
    case UsersTypes.CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        user: INITIAL_STATE.user,
      };
    case UsersTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: action.payload.user,
      };
    case UsersTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        user: INITIAL_STATE.user,
      };

    // CASES UPDATE USER
    case UsersTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        user: INITIAL_STATE.user,
      };
    case UsersTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: action.payload.user,
      };
    case UsersTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        user: INITIAL_STATE.user,
      };

    // CASES DELETE USER
    case UsersTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UsersTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case UsersTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
