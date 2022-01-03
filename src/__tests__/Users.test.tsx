// Redux
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';

// Router DOM
import { Router } from 'react-router-dom';

// Constants
import { defaultUser } from 'constants/defaultUser';

// Types
import { history } from 'store';
import rootSaga from 'store/ducks/rootSaga';
import { UserInterface } from 'store/ducks/users/types';

// Utils
import { render, screen, RenderResult, fireEvent } from 'utils/testUtils';

// Pages
import Users from 'pages/Users';

const renderComponent = ({
  usersList = [] as UserInterface[],
  loggedUser = {},
}): RenderResult => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureStore([sagaMiddleware]);

  const store = mockStore({ users: { usersList, loggedUser } });
  sagaMiddleware.run(rootSaga);

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Users />
      </Router>
    </Provider>,
  );
};

describe('Users', () => {
  const mockUsers = {
    usersList: [defaultUser],
    loggedUser: defaultUser,
  };

  it('should render empty users list', async () => {
    renderComponent({});

    const emptyLabel = screen.getByRole('heading', {
      name: /os usuários cadastrados aparecerão aqui\./i,
    });
    expect(emptyLabel).toBeInTheDocument();
  });

  it('should show button for add new users when logged with ADMIN', () => {
    renderComponent({
      loggedUser: mockUsers.loggedUser,
    });

    const signUpButton = screen.getByRole('button', {
      name: /cadastrar/i,
    }) as HTMLButtonElement;
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toBeEnabled();
    fireEvent.click(signUpButton);
  });

  it('should render list with items', () => {
    renderComponent({
      usersList: mockUsers.usersList,
    });

    expect(
      screen.queryByRole('heading', {
        name: /os usuários cadastrados aparecerão aqui/i,
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('users').textContent).toContain(
      defaultUser.email,
    );
  });

  it('should filter by register user', () => {
    renderComponent({
      usersList: mockUsers.usersList,
    });

    const filterField = screen.getByRole('textbox', {
      name: /search/i,
    }) as HTMLInputElement;
    expect(filterField).toBeInTheDocument();
    expect(filterField).toBeEnabled();
    expect(filterField.value).toBe('');
    fireEvent.change(filterField, { target: { value: defaultUser.firstName } });
    expect(filterField.value).toEqual(defaultUser.firstName);
    expect(screen.getByTestId('users').textContent).toContain(
      defaultUser.email,
    );
  });
});
