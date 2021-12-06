import { takeLatest, call, put } from 'redux-saga/effects';

// Connected Router
import { push } from 'connected-react-router';

// Services
import { user } from 'services/users/user';

// Actions
import * as UsersActions from './actions';

// Types
import { UsersTypes, UserInterface } from './types';

// Helpers
import { setToken, removeToken } from 'helpers/auth';

// paths
import PATH from 'constants/basePath';

// List Users
function* list({
  payload,
}: ReturnType<typeof UsersActions.listUsersRequest>): any {
  try {
    const response = yield call(user.list, {
      params: { ...payload },
    });

    if (response.status === 200) {
      yield put(
        UsersActions.listUsersSuccess({
          usersList: response.data,
        }),
      );
    }
  } catch (error) {
    console.error('users - list Users - error', error);

    yield put(UsersActions.listUsersFailure());
  }
}

// Login
function* login({
  payload,
}: ReturnType<typeof UsersActions.loginRequest>): any {
  try {
    const response = yield call(user.list, {
      params: {},
    });

    if (response.status === 200) {
      const { email, password } = payload;

      const user = response.data.find(
        (user: UserInterface) =>
          user.email === email && atob(user.password) === password,
      );

      if (user) {
        const [loggedUser] = [user].map(({ password, ...rest }) => rest);

        yield put(
          UsersActions.loginSuccess({
            loggedUser: loggedUser,
          }),
        );

        const token = btoa(`${email}::${loggedUser.name}::${Date.now()}`);

        yield setToken(token);

        yield put(push(PATH.USERS));
      }
    }
  } catch (error) {
    console.error('Login user - error', error);

    yield put(UsersActions.loginFailure());
  }
}

function* create({
  payload,
}: ReturnType<typeof UsersActions.createUserRequest>): any {
  try {
    const { body, redirectTo } = payload;

    const response = yield call(user.create, {
      data: { ...body },
    });

    if (response.status === 201) {
      if (redirectTo === PATH.USERS) {
        yield put(
          UsersActions.createUserSuccess({
            user: response.data,
          }),
        );
      }

      yield put(push(redirectTo));
    }
  } catch (error) {
    console.error('users - Create User - error', error);

    yield put(UsersActions.createUserFailure());
  }
}

// Update Users
function* update({
  payload,
}: ReturnType<typeof UsersActions.updateUserRequest>): any {
  try {
    const response = yield call(user.update, {
      data: { ...payload.user },
      userId: payload.userId,
    });

    if (response.status === 200) {
      yield put(
        UsersActions.updateUserSuccess({
          user: response.data,
        }),
      );

      yield put(UsersActions.logout());

      yield removeToken();

      yield put(push(PATH.HOME));
    }
  } catch (error) {
    console.error('users - Update Users - error', error);

    yield put(UsersActions.updateUserFailure());

    // yield put(push('/users'));
  }
}

// Update Users
function* remove({
  payload,
}: ReturnType<typeof UsersActions.deleteUserRequest>): any {
  try {
    const { userId } = payload;

    const response = yield call(user.delete, {
      params: {},
      userId,
    });

    if (response.status === 200) {
      yield put(UsersActions.deleteUserSuccess());

      yield put(push(PATH.USERS));
    }
  } catch (error) {
    console.error('users - Delete User - error', error);

    yield put(UsersActions.deleteUserFailure());

    // yield put(push('/users'));
  }
}

// eslint-disable-next-line import/prefer-default-export
export const usersSagas = [
  takeLatest(UsersTypes.LIST_USERS_REQUEST, list),
  takeLatest(UsersTypes.LOGIN_REQUEST, login),
  takeLatest(UsersTypes.CREATE_USER_REQUEST, create),
  takeLatest(UsersTypes.UPDATE_USER_REQUEST, update),
  takeLatest(UsersTypes.DELETE_USER_REQUEST, remove),
];
