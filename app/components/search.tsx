'use client';

import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: value }),
      });

      const data = await res.json();
      if (data.result) {
        // You can customize how to split results here
        setResults(data.result.split('\n').filter(Boolean));
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  function sendredirect()
  {
    
  }
  return (
    <div className="relative w-full max-w-2xl mx-auto mt-5">
      <div className="relative p-5 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="absolute left-8 -mt-1 text-gray-400"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for crops, farmers, or products..."
          className="w-full pl-10 pr-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {loading && (
        <div className="text-center text-sm text-gray-500 mt-2">Searching...</div>
      )}

      {results.length > 0 && (
        <div className="bg-white border rounded-lg shadow-md mt-2 max-h-65 overflow-y-auto">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-3 hover:bg-green-100 cursor-pointer transition-all"
              onClick={() => window.location.href = `/product/${item}`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
