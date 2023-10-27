import { screen } from '@testing-library/dom';
import { renderWithRouter } from '../helpers/renderWith';
import { Header } from '../../components/header/Header';

test('testes do header', () => {
  renderWithRouter(<Header />);
  const test = screen.getByTestId('search-top-btn');
  expect(test).toBeInTheDocument();
});
