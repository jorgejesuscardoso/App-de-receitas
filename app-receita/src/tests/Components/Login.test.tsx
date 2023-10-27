import { screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import { renderWithRouter } from '../helpers/renderWith';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const buttonTestId = 'login-submit-btn';

describe('Login Page', () => {
  test('Se renderizou os componentes', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const buttonSubmit = screen.getByTestId(buttonTestId);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  test('Se os inputs estão funcionando', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);

    fireEvent.change(emailInput, { target: { value: 'a@a.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(emailInput).toHaveValue('a@a.com');
    expect(passwordInput).toHaveValue('1234567');
  });

  test('Se o botão está desabilitado por padrão', () => {
    renderWithRouter(<App />);
    const submitButton = screen.getByTestId(buttonTestId);
    expect(submitButton).toBeDisabled();
  });

  test('Se o botão está habilitado após digitar valores válidos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByTestId(buttonTestId);

    fireEvent.change(emailInput, { target: { value: 'test@site.com' } });
    fireEvent.change(passwordInput, { target: { value: '987654321' } });

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
  });

  test('Se o botão volta a ficar desabilitado após digitar valores válidos e apagá-los ', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByTestId(buttonTestId);

    fireEvent.change(emailInput, { target: { value: 'test@site.com' } });
    fireEvent.change(passwordInput, { target: { value: '987654321' } });

    fireEvent.change(emailInput, { target: { value: 'test@.com' } });
    fireEvent.change(passwordInput, { target: { value: '123abc' } });

    expect(submitButton).toBeDisabled();
  });
});
