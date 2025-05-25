import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '', className = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  
  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-xl ${className}`}>
      <div className="relative flex w-full items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full rounded-l-full border border-gray-300 py-2 pl-5 pr-10 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="flex items-center justify-center rounded-r-full bg-gray-100 px-6 hover:bg-gray-200"
      >
        <Search size={20} className="text-gray-600" />
      </button>
    </form>
  );
};

export default SearchBar;