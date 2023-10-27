import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();

  const drinkNavigate = () => {
    navigate('/drinks');
  };

  const mealsNavigate = () => {
    navigate('/meals');
  };

  return (
    <div className="footer" data-testid="footer">
      <footer>
        <button onClick={ drinkNavigate }>
          <img
            src="src/images/drinkIcon.svg"
            data-testid="drinks-bottom-btn"
            alt="Drinks"
          />
        </button>
        <button onClick={ mealsNavigate }>
          <img
            data-testid="meals-bottom-btn"
            src="src/images/mealIcon.svg"
            alt="Meals"
          />
        </button>
      </footer>
    </div>
  );
}
export default Footer;
