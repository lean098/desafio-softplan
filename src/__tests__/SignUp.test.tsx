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

import rootSaga from 'store/ducks/rootSaga';

import Users from 'pages/Users';

const renderComponent = (): RenderResult => {
  const history = createMemoryHistory();
  const sagaMiddleware = createSagaMiddleware();

  const mockStore = configureStore([sagaMiddleware]);

  const INITIAL_STATE = {
    users: {
      usersList: [],
      loggedUser: {
        id: '267fd5f2-3f5f-4a8e-9964-73dfb50b0738',
        firstName: 'Teste',
        lastName: 'teste',
        birthDate: '15/04/1997',
        email: 'teste@gmail.com',
        document: '123.456.789-00',
        role: 'ADMIN',
      },
    },
  };

  const store = mockStore(INITIAL_STATE);

  sagaMiddleware.run(rootSaga);

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Users />
      </Router>
    </Provider>,
  );
};

// Lista vazia
it('render empty users list', async () => {
  renderComponent(); // Modifcar pra poder passar o default user -> com o usersList: [] e etc...

  const emptyLabel = screen.getByRole('heading', {
    name: /os usuários cadastrados aparecerão aqui\./i,
  });
  expect(emptyLabel).toBeInTheDocument();

  const signUpButton = screen.getByRole('button', { name: /cadastrar/i });
  expect(signUpButton).toBeInTheDocument();
  expect(signUpButton).toBeEnabled();
});
