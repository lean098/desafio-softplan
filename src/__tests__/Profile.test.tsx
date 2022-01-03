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
import {
  render,
  screen,
  waitFor,
  RenderResult,
  fireEvent,
} from 'utils/testUtils';

// Pages
import { Profile } from 'pages/Profile';

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
        <Profile />
      </Router>
    </Provider>,
  );
};

describe('Profile', () => {
  const mockUsers = {
    loggedUser: defaultUser,
  };

  it('should render fields disabled with values', () => {
    renderComponent({
      loggedUser: mockUsers.loggedUser,
    });

    const fullNameField = screen.getByTestId('fullName') as HTMLInputElement;
    expect(fullNameField).toBeInTheDocument();
    expect(fullNameField).toBeDisabled();
    expect(fullNameField.value).not.toBe('');
    expect(fullNameField.value).toEqual(
      `${mockUsers.loggedUser.firstName} ${mockUsers.loggedUser.lastName}`,
    );

    const emailField = screen.getByTestId('email') as HTMLInputElement;
    expect(emailField).toBeInTheDocument();
    expect(emailField).toBeDisabled();
    expect(emailField.value).not.toBe('');
    expect(emailField.value).toEqual(mockUsers.loggedUser.email);

    const birthDateField = screen.getByTestId('birthDate') as HTMLInputElement;
    expect(birthDateField).toBeInTheDocument();
    expect(birthDateField).toBeDisabled();
    expect(birthDateField.value).not.toBe('');
    expect(birthDateField.value).toEqual(mockUsers.loggedUser.birthDate);
  });

  it('should allow updated user password', async () => {
    renderComponent({
      loggedUser: mockUsers.loggedUser,
    });

    const newPasswordField = screen.getByTestId(
      'new-password',
    ) as HTMLInputElement;
    expect(newPasswordField).toBeInTheDocument();
    expect(newPasswordField).toBeEnabled();
    expect(newPasswordField.value).toBe('');

    await waitFor(() => {
      fireEvent.change(newPasswordField, { target: { value: '123' } });
      const updatePasswordBtn = screen.getByRole('button', {
        name: /atualizar/i,
      });
      expect(updatePasswordBtn).toBeInTheDocument();
      expect(updatePasswordBtn).toBeEnabled();
      fireEvent.click(updatePasswordBtn);
    });
  });
});
