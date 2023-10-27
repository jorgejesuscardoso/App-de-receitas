import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(<App />);

  const inputEmail = screen.getByTestId('email-input');
  expect(inputEmail).toBeInTheDocument();
  const inputPassword = screen.getByTestId('password-input');
  expect(inputPassword).toBeInTheDocument();
  const buttonSubmit = screen.getByTestId('login-submit-btn');
  expect(buttonSubmit).toBeInTheDocument();
});
