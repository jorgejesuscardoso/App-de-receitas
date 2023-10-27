import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

type Options = {
  initialEntries?: string[];
  initialState?: any;
};

function withRouter(component: React.ReactElement, initialEntries: string[]) {
  return (
    <MemoryRouter initialEntries={ initialEntries }>
      { component }
    </MemoryRouter>
  );
}

export function renderWithRouter(
  component: React.ReactElement,
  {
    initialEntries = ['/'],
  }: Options = {},
) {
  return render(withRouter(component, initialEntries));
}
