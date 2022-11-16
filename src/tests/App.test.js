import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa os componentes do app.js', () => {
  test('Testa se o link home existe e deve te redirecionar a Home', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homePage = screen.getByRole('heading', { name: /Pokédex/i });
    expect(homePage).toBeDefined();

    const getLinkHome = screen.getByRole('link', { name: /home/i });
    expect(getLinkHome).toBeDefined();

    userEvent.click(getLinkHome);

    const headingHome = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(headingHome).toHaveTextContent(/Encountered pokémons/i);
  });
  test('Testa se o link home existe e deve te redirecionar a About', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutPage = screen.getByRole('heading', { name: /Pokédex/i });
    expect(aboutPage).toBeDefined();

    const getLinkAbout = screen.getByRole('link', { name: /about/i });
    expect(getLinkAbout).toBeDefined();

    userEvent.click(getLinkAbout);

    const headingHome = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(headingHome).toHaveTextContent(/About Pokédex/i);
  });
  test('Testa se o link home existe e deve te redirecionar a Favorite Pokédex', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokedexPage = screen.getByRole('heading', { name: /Pokédex/i });
    expect(pokedexPage).toBeDefined();

    const getLinkPokedex = screen.getByRole('link', { name: /Favorite pokémons/i });
    expect(getLinkPokedex).toBeDefined();

    userEvent.click(getLinkPokedex);

    const headingHome = screen.getByRole('heading', { name: /Favorite pokémons/i });
    expect(headingHome).toHaveTextContent(/Favorite pokémons/i);
  });
});
