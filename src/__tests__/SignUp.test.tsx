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
import { SignUp } from 'pages/SignUp';

const renderComponent = (): RenderResult => {
  return render(<SignUp />);
};

describe('SignUp', () => {
  it('should allow register user', async () => {
    renderComponent();

    const firstNameField = screen.getByTestId('firstName') as HTMLInputElement;
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField).toBeEnabled();
    expect(firstNameField.value).toBe('');
    await waitFor(() => {
      fireEvent.change(firstNameField, {
        target: { value: defaultUser.firstName },
      });
    });
    expect(firstNameField.value).toEqual(defaultUser.firstName);

    const lastNameField = screen.getByTestId('lastName') as HTMLInputElement;
    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField).toBeEnabled();
    expect(lastNameField.value).toBe('');
    await waitFor(() => {
      fireEvent.change(lastNameField, {
        target: { value: defaultUser.lastName },
      });
    });
    expect(lastNameField.value).toEqual(defaultUser.lastName);

    const documentField = screen.getByTestId('document') as HTMLInputElement;
    expect(documentField).toBeInTheDocument();
    expect(documentField).toBeEnabled();
    expect(documentField.value).toBe('');
    await waitFor(() => {
      fireEvent.change(documentField, {
        target: { value: defaultUser.document },
      });
    });
    expect(documentField.value).toEqual(defaultUser.document);

    const birthDateField = screen.getByTestId('birthDate') as HTMLInputElement;
    expect(birthDateField).toBeInTheDocument();
    expect(birthDateField).toBeEnabled();
    expect(birthDateField.value).toBe('');
    await waitFor(() => {
      fireEvent.change(birthDateField, {
        target: { value: defaultUser.birthDate },
      });
    });
    expect(birthDateField.value).toEqual(defaultUser.birthDate);

    const emailField = screen.getByTestId('email') as HTMLInputElement;
    expect(emailField).toBeInTheDocument();
    expect(emailField).toBeEnabled();
    expect(emailField.value).toBe('');
    await waitFor(() => {
      fireEvent.change(emailField, { target: { value: defaultUser.email } });
    });
    expect(emailField.value).toEqual(defaultUser.email);

    const passwordField = screen.getByTestId('password') as HTMLInputElement;
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toBeEnabled();
    expect(passwordField.value).toBe('');
    await waitFor(() => {
      fireEvent.change(passwordField, {
        target: { value: defaultUser.password },
      });
    });
    expect(passwordField.value).toEqual(defaultUser.password);

    const roleField = screen.getByTestId('role') as HTMLSelectElement;
    expect(roleField).toBeInTheDocument();
    expect(roleField).toBeEnabled();
    expect(roleField.value).toBe('');
    await waitFor(() => {
      fireEvent.change(roleField, { target: { value: defaultUser.role } });
    });
    expect(roleField.value).toEqual(defaultUser.role);

    const registerButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(registerButton);
    });
  });
});
