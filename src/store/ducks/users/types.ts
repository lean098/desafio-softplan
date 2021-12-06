/**
 * Action Types
 */
export enum UsersTypes {
  LOGIN_REQUEST = '@users/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@users/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@users/LOGIN_FAILURE',

  LOGOUT = '@users/LOGOUT',

  LIST_USERS_REQUEST = '@users/LIST_USERS_REQUEST',
  LIST_USERS_SUCCESS = '@users/LIST_USERS_SUCCESS',
  LIST_USERS_FAILURE = '@users/LIST_USERS_FAILURE',

  CREATE_USER_REQUEST = '@users/CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = '@users/CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = '@users/CREATE_USER_FAILURE',

  UPDATE_USER_REQUEST = '@users/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@users/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@users/UPDATE_USER_FAILURE',

  DELETE_USER_REQUEST = '@users/DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = '@users/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = '@users/DELETE_USER_FAILURE',
}

/**
 * Data Types
 */
export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  picture: string;
  role: 'ADMIN' | 'USER';
}

/**
 * State Type
 */
export interface UsersState {
  readonly usersList: UserInterface[];
  readonly user: UserInterface;
  readonly loggedUser: UserInterface | null;
  readonly loading: boolean;
  readonly error: boolean;
}
