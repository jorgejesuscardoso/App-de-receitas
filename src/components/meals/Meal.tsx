import { useContext } from 'react';
import contextoGeral from '../context/geralContext';
import Footer from '../footer/Footer';
import { ProfileIco } from '../header/ProfileIco';
import { SearchBar } from '../header/SearchBar';
import { Title } from '../header/Title';

function Meal() {
  const { apiGeral } = useContext(contextoGeral);
  if (!apiGeral) window.alert("Sorry, we haven't found any recipes for these filters.");
  if (apiGeral && apiGeral.length === 1) {
    window.location.href = `/meals/${apiGeral.map((item) => item.idMeal)}`;
  }

  return (
    <div className="meals-container">
      <div className="profile-search">
        <ProfileIco />
        <SearchBar />
      </div>
      <Title>Meals</Title>
      <div className="container">
        {apiGeral && apiGeral.slice(0, 12).map((item: any, index: number) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="card-container"
          >
            <div className="card">
              {item.strMealThumb && item.strMeal && (
                <img
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              )}
              <div>
                <p className="card-id">
                  ID:
                  {' '}
                  {item.idMeal}
                </p>
                <p data-testid={ `${index}-card-name` } className="card-name">
                  {item.strMeal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Meal;
