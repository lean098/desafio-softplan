import { action } from 'typesafe-actions';

// Types
import { UsersTypes, UserInterface } from './types';

// Actions
export const loginRequest = (payload: { email: string; password: string }) =>
  action(UsersTypes.LOGIN_REQUEST, payload);
export const loginSuccess = (payload: { loggedUser: UserInterface | null }) =>
  action(UsersTypes.LOGIN_SUCCESS, payload);
export const loginFailure = () => action(UsersTypes.LOGIN_FAILURE);

export const logout = () => action(UsersTypes.LOGOUT);

export const listUsersRequest = (payload: object) =>
  action(UsersTypes.LIST_USERS_REQUEST, payload);
export const listUsersSuccess = (payload: { usersList: UserInterface[] }) =>
  action(UsersTypes.LIST_USERS_SUCCESS, payload);
export const listUsersFailure = () => action(UsersTypes.LIST_USERS_FAILURE);

export const createUserRequest = (payload: {
  body: object;
  redirectTo: string;
}) => action(UsersTypes.CREATE_USER_REQUEST, payload);
export const createUserSuccess = (payload: { user: UserInterface }) =>
  action(UsersTypes.CREATE_USER_SUCCESS, payload);
export const createUserFailure = () => action(UsersTypes.CREATE_USER_FAILURE);

export const updateUserRequest = (payload: { user: object; userId: string }) =>
  action(UsersTypes.UPDATE_USER_REQUEST, payload);
export const updateUserSuccess = (payload: { user: UserInterface }) =>
  action(UsersTypes.UPDATE_USER_SUCCESS, payload);
export const updateUserFailure = () => action(UsersTypes.UPDATE_USER_FAILURE);

export const deleteUserRequest = (payload: { userId: string }) =>
  action(UsersTypes.DELETE_USER_REQUEST, payload);
export const deleteUserSuccess = () => action(UsersTypes.DELETE_USER_SUCCESS);
export const deleteUserFailure = () => action(UsersTypes.DELETE_USER_FAILURE);
