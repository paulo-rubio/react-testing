import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon', () => {
  test('Se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(screen.getByAltText(/pikachu sprite/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu sprite/i).src)
      .toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
