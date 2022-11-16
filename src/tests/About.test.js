import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  test('Testa se a pagina contem informações da pokedex', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutHome = screen.getByRole('heading', { name: /Pokédex/i, level: 1 });
    expect(aboutHome).toBeDefined();
  });
  test('Testa se a pagina contem um h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    expect(
      screen.getByRole('heading', { name: /About Pokédex/i, level: 2 }),
    );
  });
  test('Testa se a pagina contem dois paragrafos com textos sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    expect(
      screen.getByText(
        /This application simulates a Pokédex/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /One can filter Pokémons by type, and see more/i,
      ),
    ).toBeInTheDocument();
  });
  test('Testa se aparece uma imagem de Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    expect(
      screen.getByRole('img', { name: /Pokédex/i }).src,
    ).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
