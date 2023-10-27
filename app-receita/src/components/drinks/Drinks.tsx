import { useContext } from 'react';
import { ProfileIco } from '../header/ProfileIco';
import { SearchBar } from '../header/SearchBar';
import { Title } from '../header/Title';
import Footer from '../footer/Footer';
import contextoGeral from '../context/geralContext';

export function Drinks() {
  const { apiGeral } = useContext(contextoGeral);
  if (!apiGeral) window.alert("Sorry, we haven't found any recipes for these filters.");
  if (apiGeral && apiGeral.length === 1) {
    window.location.href = `/drinks/${apiGeral.map((s) => s.idDrink)}`;
  }

  return (
    <div className="meals-container">
      <div className="profile-search">
        <ProfileIco />
        <SearchBar />
      </div>
      <Title>Drinks</Title>
      <div className="container">
        {apiGeral && apiGeral.slice(0, 12).map((item: any, index: number) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="card-container"
          >
            <div className="card">
              {item.strDrinkThumb && item.strDrink && (
                <img
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              )}
              <div>
                <p className="card-id">
                  ID:
                  {' '}
                  {item.idDrink}
                </p>
                <p data-testid={ `${index}-card-name` } className="card-name">
                  {item.strDrink}
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
