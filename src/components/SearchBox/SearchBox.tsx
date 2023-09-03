import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // Define debounced function inside useEffect
    const debouncedSearch = debounce((q) => {
      onSearch(q);
    }, 500);

    // Now use that debounced function
    debouncedSearch(query);

    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };

    // We can safely ignore exhaustive-deps for debounced function
    // because it doesn't rely on any variable that could change.
  }, [query, onSearch]); // Dependency on 'query'

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
