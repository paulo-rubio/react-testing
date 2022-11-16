import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa o componente Pokemons Details ', () => {
  test('informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(
      screen.getByRole('heading', { name: /pikachu details/i }),
    ).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Summary/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This intelligent Pokémon roasts hard berries/i),
    ).toBeInTheDocument();
  });
  test('Teste se existe na página os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(
      screen.getByRole('heading', { name: /Game Locations of Pikachu/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Kanto Viridian Forest/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Kanto Power Plant/i),
    ).toBeInTheDocument();
    expect(

      screen.getAllByRole('img', { name: /Pikachu location/i })[0].src,
    ).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[1].src,
    ).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[0].alt,
    ).toBe('Pikachu location');
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[1].alt,
    ).toBe('Pikachu location');
  });
  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkbox = screen.getByText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
