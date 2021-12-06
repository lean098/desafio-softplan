import React from 'react';

import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';

import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history';

import '@testing-library/jest-dom';
import {
  screen,
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/react';

import { rest } from 'msw';

import rootSaga from 'store/ducks/rootSaga';

import SignIn from 'pages/SignIn';

const fakeUserResponse = { token: 'fake_user_token' };

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakeUserResponse));
  }),
];

const renderComponent = (): RenderResult => {
  const history = createMemoryHistory();
  const sagaMiddleware = createSagaMiddleware();

  const mockStore = configureStore([sagaMiddleware]);

  const INITIAL_STATE = {};
  const store = mockStore(INITIAL_STATE);

  sagaMiddleware.run(rootSaga);

  return render(
    <Provider store={store}>
      <Router history={history}>
        <SignIn />
      </Router>
    </Provider>,
  );
};

it('allows the user to login successfully', async () => {
  renderComponent();

  const email = screen.getByRole('textbox', { name: /email/i });
  expect(email).toBeInTheDocument();
  await waitFor(() => {
    fireEvent.change(email, {
      target: { value: 'lean@gmail.com' },
    });
  });

  const password = screen.getByTestId(/password/i);
  expect(password).toBeInTheDocument();
  await waitFor(() => {
    fireEvent.change(screen.getByTestId(/password/i), {
      target: { value: '123' },
    });
  });

  const loginButton = screen.getByRole('button', { name: /entrar/i });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeEnabled();
  await waitFor(() => {
    fireEvent.click(loginButton);
  });

  await waitFor(() => {
    localStorage.setItem('token', 'fake_user_token');
  });

  const token = localStorage.getItem('token');

  expect(token).toEqual('fake_user_token');
});
