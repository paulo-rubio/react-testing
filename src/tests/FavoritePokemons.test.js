import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  test('se é exibida na tela a mensagem No favorite pokemon found;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./favorites');

    expect(
      screen.getByText(/No favorite pokemon found/i),
    ).toBeInTheDocument();
  });
  test('se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const checkboxFavorite = screen.getByText(/Pokémon favoritado/i);
    userEvent.click(checkboxFavorite);
    userEvent.click(linkFavorite);
    expect(history.push('./favorites'));

    expect(
      screen.getByText(/pikachu/i),
    ).toBeInTheDocument();
  });
});
