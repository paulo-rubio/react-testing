import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const idPokemon = 'pokemon-name';

describe('Testa o componente Pokedex', () => {
  test('se a pagina contem um h2 que contem o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    expect(
      screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 }),
    ).toBeInTheDocument();
  });
  test('se o próximo pokemon é exibido ao clicar no botão', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(buttonNext);
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
  test('se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemonsLength = screen.getAllByTestId(idPokemon);
    expect(pokemonsLength).toHaveLength(1);
  });
  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const numeroDeBotoes = 7;

    const allButonsId = screen.getAllByTestId('pokemon-type-button');

    expect(allButonsId).toHaveLength(numeroDeBotoes);

    expect(screen.getAllByRole('button', { name: /normal/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /Electric/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /Fire/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /Bug/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /Poison/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /Psychic/i }))
      .toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /Dragon/i })).toHaveLength(1);

    userEvent.click(screen.getByRole('button', { name: /Psychic/i }));
    expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();
  });
  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByTestId(idPokemon)).toHaveTextContent(/Pikachu/i);
    userEvent.click(buttonNext);
    expect(screen.getByTestId(idPokemon)).toHaveTextContent(/Charmander/i);
  });
});
