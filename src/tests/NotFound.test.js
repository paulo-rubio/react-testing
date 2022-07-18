import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('se a pagina recebe um h2  de Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/....');

    expect(
      screen.getByRole('heading', { name: /Not Found/i, level: 2 }),
    ).toBeInTheDocument();
  });
  test('se a pagina recebe um gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/....');

    expect(
      screen.getByRole('img', { name: /not Found/i }).src,
    ).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
