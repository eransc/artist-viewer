import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const debouncedSearch = useCallback(
    debounce((q) => onSearch(q), 500),
    [] // dependencies of useCallback, empty so the function is only created once
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearch(''); // Clearing the search results
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-64 px-4 py-1 border rounded-lg border-gary-300 focus:outline-none focus:ring focus:border-blue-300"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {query && (
        <span
          className="absolute cursor-pointer top-2 right-4"
          onClick={clearSearch}
        >
          X
        </span>
      )}
    </div>
  );
};

export default SearchBox;
