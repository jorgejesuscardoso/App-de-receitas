import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { SearchBar } from '../../components/header/SearchBar';
import { renderWithRouter } from '../helpers/renderWith';
import ProviderApi from '../../components/context/provider';

const searChButton = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const BUTTON_SEARCH = 'exec-search-btn';

test('Footer renders with correct icons and navigates to correct routes', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>,
  );

  const searchTopBtn = getByTestId(searChButton);
  fireEvent.click(searchTopBtn);
  expect(searchTopBtn).toBeInTheDocument();
  const ingredientRadio = getByTestId(INGREDIENT_SEARCH_RADIO);
  fireEvent.click(ingredientRadio);
  expect(ingredientRadio).toHaveAttribute('checked');
  const searchInput = getByTestId(SEARCH_INPUT);
  fireEvent.change(searchInput, { target: { value: 'chicken' } });
  expect(searchInput).toHaveValue('chicken');
  const execSearchBtn = getByTestId(BUTTON_SEARCH);
  fireEvent.click(execSearchBtn);
  expect(execSearchBtn).toBeInTheDocument();
});

test('Check if the alert for any recipes found works correctly', async () => {
  renderWithRouter(<ProviderApi><SearchBar /></ProviderApi>);

  const iconButton = screen.getByTestId(searChButton);
  fireEvent.click(iconButton);

  const searchInput = screen.getByTestId(SEARCH_INPUT);
  const letterRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
  const searchButton = screen.getByTestId(BUTTON_SEARCH);

  fireEvent.change(searchInput, { target: { value: '' } });
  fireEvent.click(letterRadio);
  fireEvent.click(searchButton);

  screen.debug();
});

describe('SearchBar Component', () => {
  test('Check render elements SearchBar', () => {
    render(
      <ProviderApi>
        <BrowserRouter><SearchBar /></BrowserRouter>
      </ProviderApi>,
    );
    const iconButton = screen.getByTestId(searChButton);
    fireEvent.click(iconButton);
    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    const radioIngredients = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const radioName = screen.getByTestId(NAME_SEARCH_RADIO);
    const radioLetter = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const buttonSearch = screen.getByTestId(BUTTON_SEARCH);
    expect(inputSearch).toBeInTheDocument();
    expect(radioIngredients).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  test('Check updates state on search input change', () => {
    render(
      <ProviderApi>
        <BrowserRouter><SearchBar /></BrowserRouter>
      </ProviderApi>,
    );
    const iconButton = screen.getByTestId(searChButton);
    fireEvent.click(iconButton);
    const inputSearch = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(inputSearch, { target: { value: 'Potato' } });
    expect(inputSearch.value).toBe('Potato');
  });

  test('Check button search', async () => {
    render(
      <ProviderApi>
        <BrowserRouter><SearchBar /></BrowserRouter>
      </ProviderApi>,
    );
    const iconButton = screen.getByTestId(searChButton);
    fireEvent.click(iconButton);
    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    fireEvent.change(inputSearch, { target: { value: 'Potato' } });

    const filter = screen.getByTestId('ingredient-search-radio');
    fireEvent.change(filter, { target: { value: 'ingredient' } });

    const filterButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(filterButton);
  });

  describe('Tests API, Routes and Alert', () => {
    test('Check if the first letter confirmation alert works correctly', async () => {
      renderWithRouter(<ProviderApi><SearchBar /></ProviderApi>);

      const iconButton = screen.getByTestId(searChButton);
      fireEvent.click(iconButton);

      const searchInput = screen.getByTestId(SEARCH_INPUT);
      const letterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
      const searchButton = screen.getByTestId(BUTTON_SEARCH);

      const message = vi.spyOn(window, 'alert');

      fireEvent.change(searchInput, { target: { value: 'potato' } });
      fireEvent.click(letterRadio);
      fireEvent.click(searchButton);

      expect(message).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });

    test('Check if you call the correct API for the meals page', async () => {
      renderWithRouter(<ProviderApi><SearchBar /></ProviderApi>);
      const fetch = vi.spyOn(global, 'fetch');

      const searchHeaderBtn = screen.getByTestId(searChButton);
      fireEvent.click(searchHeaderBtn);

      const searchInput = screen.getByTestId(SEARCH_INPUT);
      const searchButton = screen.getByTestId(BUTTON_SEARCH);
      const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);

      fireEvent.click(ingredientRadio);
      fireEvent.change(searchInput, { target: { value: 'potato' } });
      fireEvent.click(searchButton);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=potato');
    });
  });
});

test('oculta o search input', () => {
  renderWithRouter(<ProviderApi><SearchBar /></ProviderApi>);

  const searchButton = screen.getByTestId(searChButton);
  fireEvent.click(searchButton);

  const searchInput = screen.getByTestId(SEARCH_INPUT);
  expect(searchInput).toBeInTheDocument();
  fireEvent.click(searchButton);
  expect(searchInput).not.toBeInTheDocument();
});

test('pesquisa por nome e letra e enter e ingrediente', async () => {
  renderWithRouter(<ProviderApi><SearchBar /></ProviderApi>);

  const searchButton = screen.getByTestId(searChButton);
  fireEvent.click(searchButton);

  const searchInput = screen.getByTestId(SEARCH_INPUT);
  const nameRadio = screen.getByTestId(NAME_SEARCH_RADIO);
  const searchButton2 = screen.getByTestId(BUTTON_SEARCH);
  const letterRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
  const ingredientRadio = screen.getByTestId(INGREDIENT_SEARCH_RADIO);

  fireEvent.change(searchInput, { target: { value: 'potato' } });
  fireEvent.click(nameRadio);
  fireEvent.click(searchButton2);
  expect(screen.getByText('Search')).toBeInTheDocument();
  fireEvent.change(searchInput, { target: { value: 'p' } });
  fireEvent.click(letterRadio);
  fireEvent.click(searchButton2);
  expect(screen.getByText('Search')).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'p' } });
  fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
  fireEvent.click(searchButton2);
  expect(screen.getByText('Search')).toBeInTheDocument();
  fireEvent.change(searchInput, { target: { value: 'p' } });
  fireEvent.click(ingredientRadio);
  fireEvent.click(searchButton2);
  expect(screen.getByText('Search')).toBeInTheDocument();
});
