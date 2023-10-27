import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouter } from '../helpers/renderWith';

describe('Meal Page', () => {
  test('Se renderizou os componentes', () => {
    renderWithRouter(<App />, {
      initialEntries: ['/meals'],
    });
    const linkElement = screen.getByText(/MEAL/i);
    expect(linkElement).toBeInTheDocument();
  });
});
