import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {

  });

  const handleEmailChange = (e: { target: { value: string; }; }) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm(newEmail, password);
  };

  const handlePasswordChange = (e: { target: { value: string; }; }) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm(email, newPassword);
  };

  const validateForm = (newEmail: string, newPassword: string) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    const isPasswordValid = newPassword.length > 6;

    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (isFormValid) {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/meals');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={ handleSubmit } className="login-form">
        <h3>Login</h3>
        <div className="email-pass">
          <label htmlFor="email-input" data-testid="email-label">E-mail</label>
          <input
            type="email"
            id="email"
            data-testid="email-input"
            placeholder="Digite seu email:"
            value={ email }
            onChange={ handleEmailChange }
          />
          <label htmlFor="password-input" data-testid="password-label">Password</label>
          <input
            type="password"
            id="password"
            data-testid="password-input"
            placeholder="Digite sua senha:"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isFormValid }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
