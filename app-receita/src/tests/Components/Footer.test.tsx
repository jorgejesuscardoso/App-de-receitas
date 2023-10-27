import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

test('Footer renders with correct icons and navigates to correct routes', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>,
  );

  const drinksBtn = getByTestId('drinks-bottom-btn');
  const mealsBtn = getByTestId('meals-bottom-btn');

  expect(drinksBtn).toBeInTheDocument();
  expect(mealsBtn).toBeInTheDocument();

  fireEvent.click(drinksBtn);
  expect(window.location.pathname).toBe('/drinks');

  fireEvent.click(mealsBtn);
  expect(window.location.pathname).toBe('/meals');
});
