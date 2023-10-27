import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { foodApi } from '../services/FoodApi';
import contextoGeral from '../context/geralContext';

type InputValue = 'Ingrediente' | 'Name' | 'FirstLetter';

export function SearchBar() {
  const [inputValue, setInputValue] = useState<InputValue>('Ingrediente');
  const [search, setSearch] = useState('hidden');
  const [searchInput, setSearchInput] = useState<any>('');
  const { setApiGeral } = useContext(contextoGeral);

  const location = useLocation();
  const slaPath = location.pathname === '/meals' ? 'themealdb' : 'thecocktaildb';

  const toggleSearch = () => {
    if (search === 'show') {
      setSearch('hidden');
    } else {
      setSearch('show');
    }
  };

  const apiEndpoints = {
    Ingrediente: `https://www.${slaPath}.com/api/json/v1/1/filter.php?i=`,
    Name: `https://www.${slaPath}.com/api/json/v1/1/search.php?s=`,
    FirstLetter: `https://www.${slaPath}.com/api/json/v1/1/search.php?f=`,
  };
  const handleSearch = async () => {
    if (inputValue === 'FirstLetter' && searchInput.length > 1) {
      return window.alert('Your search must have only 1 (one) character');
    }
    const apiUrl = apiEndpoints[inputValue];
    if (apiUrl) {
      setApiGeral(await foodApi(`${apiUrl}${searchInput}`));
    }
  };

  const handleEnterKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <button onClick={ toggleSearch }>
        <img
          src="src/images/searchIcon.svg"
          data-testid="search-top-btn"
          alt="pesquisa"
        />
      </button>
      {search === 'hidden' ? (
        ''
      ) : (
        <div className="search-i-container">
          <input
            type="text"
            placeholder="Pesquisar"
            data-testid="search-input"
            className="search-input"
            value={ searchInput }
            onChange={ (e) => setSearchInput(e.target.value) }
            onKeyDown={ handleEnterKeyPress }
          />

          <div className="radios-container">
            <div className="radio">
              <label htmlFor="ingredient">Ingredient</label>
              <input
                type="radio"
                id="ingredient"
                data-testid="ingredient-search-radio"
                value="Ingrediente"
                checked={ inputValue === 'Ingrediente' }
                onChange={ () => {
                  setInputValue('Ingrediente');
                } }
              />
            </div>
            <div className="radio">
              <label htmlFor="name">Name</label>
              <input
                type="radio"
                id="name"
                data-testid="name-search-radio"
                value="Name"
                checked={ inputValue === 'Name' }
                onChange={ () => {
                  setInputValue('Name');
                } }
              />
            </div>
            <div className="radio">
              <label htmlFor="first-letter">First letter</label>
              <input
                type="radio"
                id="first-letter"
                data-testid="first-letter-search-radio"
                value="FirstLetter"
                checked={ inputValue === 'FirstLetter' }
                onChange={ () => {
                  setInputValue('FirstLetter');
                } }
              />
            </div>
            <button type="button" data-testid="exec-search-btn" onClick={ handleSearch }>
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
