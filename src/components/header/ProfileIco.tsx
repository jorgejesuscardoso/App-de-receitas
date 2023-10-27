import { useNavigate } from 'react-router-dom';

export function ProfileIco() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/profile');
  };
  return (
    <div>
      <button onClick={ handleNavigate }>
        <img
          src="src/images/profileIcon.svg"
          data-testid="profile-top-btn"
          alt="perfil"
        />
      </button>
    </div>
  );
}
