import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useWeather } from '../context/WeatherContext';
import { Search, Clock } from 'lucide-react';

const SearchBar: React.FC = () => {
  const { city, setCity, fetchWeather, loading, recentSearches, addToHistory, addToRecentSearches } = useWeather();
  const [searchInput, setSearchInput] = useState(city);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput === '') return;

    setCity(trimmedInput);
    fetchWeather(trimmedInput);
    addToHistory(trimmedInput);
    addToRecentSearches(trimmedInput);

    if (!trimmedInput.includes(' ') && !trimmedInput.includes(',')) {
      if (router.pathname !== '/') {
        router.push(`/city/${trimmedInput}`);
      }
    } else {
      router.push(`/search?q=${encodeURIComponent(trimmedInput)}`);
    }
  };

  return (
    <div 
      className="card bg-base-200 p-6 shadow-xl rounded-2xl w-full max-w-xl mx-auto"
      data-aos="fade-up"
    >
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center gap-3 mb-4"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search city name..."
            className="input input-primary w-full pl-10 transition-all focus:ring-2 focus:ring-primary/50"
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary px-6 transition-all"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {recentSearches.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-base-content/70 mb-2">Recent Searches:</h4>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchInput(item);
                  setCity(item);
                  fetchWeather(item);
                  if (router.pathname !== '/') {
                    router.push(`/city/${item}`);
                  }
                }}
                className={`btn btn-sm transition-all border-base-300 bg-base-100 text-base-content hover:bg-primary hover:text-white ${
                  item === city ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
