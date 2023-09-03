import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const h2Element = await screen.findByText('Artworks', { selector: 'h2' });
  expect(h2Element).toBeInTheDocument();
});
