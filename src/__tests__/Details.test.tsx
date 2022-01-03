// Redux
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';

// Router DOM
import { Router } from 'react-router-dom';

// History
import { createMemoryHistory } from 'history';

// Types
import rootSaga from 'store/ducks/rootSaga';
import { UserInterface } from 'store/ducks/users/types';

// Constants
import { defaultUser } from 'constants/defaultUser';

// Utils
import {
  render,
  screen,
  RenderResult,
  waitFor,
  fireEvent,
} from 'utils/testUtils';

// Pages
import { Details } from 'pages/Details';

const renderComponent = ({
  usersList = [] as UserInterface[],
  loggedUser = {},
}): RenderResult => {
  const history = createMemoryHistory();
  const sagaMiddleware = createSagaMiddleware();

  const mockStore = configureStore([sagaMiddleware]);
  const store = mockStore({ users: { usersList, loggedUser } });

  history.push('/user/123', { state: defaultUser });
  sagaMiddleware.run(rootSaga);

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Details />
      </Router>
    </Provider>,
  );
};

describe('Profile', () => {
  it('should render fields disabled with values', async () => {
    renderComponent({});

    const firstNameField = screen.getByTestId('firstName') as HTMLInputElement;
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField).toBeDisabled();
    expect(firstNameField.value).not.toBe('');
    expect(firstNameField.value).toEqual(defaultUser.firstName);

    const lastNameField = screen.getByTestId('lastName') as HTMLInputElement;
    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField).toBeDisabled();
    expect(lastNameField.value).not.toBe('');
    expect(lastNameField.value).toEqual(defaultUser.lastName);

    const documentField = screen.getByTestId('document') as HTMLInputElement;
    expect(documentField).toBeInTheDocument();
    expect(documentField).toBeDisabled();
    expect(documentField.value).not.toBe('');
    expect(documentField.value).toEqual(defaultUser.document);

    const birthDateField = screen.getByTestId('birthDate') as HTMLInputElement;
    expect(birthDateField).toBeInTheDocument();
    expect(birthDateField).toBeDisabled();
    expect(birthDateField.value).not.toBe('');
    expect(birthDateField.value).toEqual(defaultUser.birthDate);

    const emailField = screen.getByTestId('email') as HTMLInputElement;
    expect(emailField).toBeInTheDocument();
    expect(emailField).toBeDisabled();
    expect(emailField.value).not.toBe('');
    expect(emailField.value).toEqual(defaultUser.email);

    const roleField = screen.getByTestId('role') as HTMLInputElement;
    expect(roleField).toBeInTheDocument();
    expect(roleField).toBeDisabled();
    expect(roleField.value).not.toBe('');
    expect(roleField.value).toEqual(defaultUser.role);
  });

  it('should allow delete user when logged in like ADMIN', async () => {
    renderComponent({
      loggedUser: defaultUser,
    });

    const deleteButton = screen.getByRole('button', {
      name: /deletar/i,
    }) as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(deleteButton);
    });
  });

  it('should hide delete button when logged in like USER', () => {
    renderComponent({});

    expect(
      screen.queryByRole('button', {
        name: /deletar/i,
      }) as HTMLButtonElement,
    ).not.toBeInTheDocument();
  });
});
