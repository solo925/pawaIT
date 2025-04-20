// components/SearchBar.tsx
import React, { useState, FormEvent } from 'react';
import { useWeather } from '../context/WeatherContext';

const SearchBar: React.FC = () => {
  const { city, setCity, fetchWeather, loading } = useWeather();
  const [searchInput, setSearchInput] = useState(city);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;
    
    setCity(searchInput);
    fetchWeather(searchInput);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter city name..."
        className="input input-primary flex-grow"
        disabled={loading}
      />
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
