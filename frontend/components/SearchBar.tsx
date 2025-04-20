import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useWeather } from '../context/WeatherContext';

const SearchBar: React.FC = () => {
  const { city, setCity, fetchWeather, loading } = useWeather();
  const [searchInput, setSearchInput] = useState(city);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;
    
    // For single word searches, fetch directly
    if (!searchInput.includes(' ') && !searchInput.includes(',')) {
      setCity(searchInput);
      fetchWeather(searchInput);
      
      // If we're on the home page, we just update the weather
      // Otherwise, navigate to the city page
      if (router.pathname !== '/') {
        router.push(`/city/${searchInput}`);
      }
    } else {
      // For more complex searches, go to search results page
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
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