// @ts-ignore
import { LocalStorageMock } from '@react-mock/localstorage';

// Constants
import { defaultUser } from 'constants/defaultUser';

// Utils
import {
  screen,
  render,
  waitFor,
  RenderResult,
  fireEvent,
} from 'utils/testUtils';

// Pages
import SignIn from 'pages/SignIn';

const renderComponent = (): RenderResult => {
  return render(
    <LocalStorageMock items={{}}>
      <SignIn />
    </LocalStorageMock>,
  );
};

describe('Login', () => {
  it('should allows the user to log in', async () => {
    renderComponent();

    const email = screen.getByRole('textbox', {
      name: /email/i,
    }) as HTMLInputElement;
    expect(email).toBeInTheDocument();
    expect(email).toBeEnabled();
    expect(email.value).toBe('');
    fireEvent.change(email, { target: { value: defaultUser.email } });
    expect(email.value).toEqual(defaultUser.email);

    const password = screen.getByTestId(/password/i) as HTMLInputElement;
    expect(password).toBeInTheDocument();
    expect(password).toBeEnabled();
    expect(password.value).toBe('');
    fireEvent.change(password, { target: { value: defaultUser.password } });
    expect(password.value).toEqual(defaultUser.password);

    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    }) as HTMLButtonElement;
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(loginButton);
    });
  });
});
