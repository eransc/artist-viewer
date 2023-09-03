import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Required for <Link />
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ArtWorkItem from './ArtWorkItem';

// Create a mock store
const mockStore = configureStore();
const store = mockStore({
  // Initialize with the default state that your real Redux store uses
  favorites: [],
});

const mockArtwork: any = {
  id: '1',
  title: 'Test Artwork',
  image_id: 'image123',
};

const mockIiifUrl = 'http://example.com/iiif';

test('ArtWorkItem renders correctly', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ArtWorkItem artwork={mockArtwork} iiif_url={mockIiifUrl} />
      </MemoryRouter>
    </Provider>
  );

  const image = screen.getByAltText('Test Artwork');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'http://example.com/iiif/image123/full/843,/0/default.jpg');

  // Check that title is present and navigable
  expect(screen.getByRole('link', { name: 'Test Artwork' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Test Artwork' })).toHaveAttribute('href', '/artwork-detail/1');

});
