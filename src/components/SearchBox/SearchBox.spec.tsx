import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBox from './SearchBox';

const onSearchMock = jest.fn();

test('SearchBox renders correctly', () => {
  render(<SearchBox onSearch={onSearchMock} />);
  const input = screen.getByPlaceholderText('Search...');
  expect(input).toBeInTheDocument();
});

test('Clear button works correctly', () => {
  render(<SearchBox onSearch={onSearchMock} />);
  const input = screen.getByPlaceholderText('Search...');
  fireEvent.change(input, { target: { value: 'test query' } });
  
  const clearButton = screen.getByText('X');
  fireEvent.click(clearButton);
  
  // Check if the search query was cleared
  expect(onSearchMock).toHaveBeenCalledWith('');
});
