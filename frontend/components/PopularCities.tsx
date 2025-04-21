import React, { useCallback } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Clock, Star } from 'lucide-react';

// A static list of popular cities for fast access
const POPULAR_CITIES = ['New York', 'Tokyo', 'London', 'Nairobi', 'Sydney'];

/**
 * A component that displays a list of popular cities and recent search history.
 * Users can click on a city to fetch its weather data, and they can clear their search history.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const PopularCities: React.FC = () => {
  // Destructuring functions and state from the WeatherContext
  const { fetchWeather, setCity, addToHistory, searchHistory, clearHistory } = useWeather();

  /**
   * Handles the click event when a city is clicked from the popular cities or recent searches.
   * It sets the selected city, fetches its weather, and adds it to the search history.
   * 
   * @param {string} city - The name of the city that was clicked.
   */
  const handleCityClick = useCallback((city: string) => {
    setCity(city);
    fetchWeather(city);
    addToHistory(city);
  }, [setCity, fetchWeather, addToHistory]);

  return (
    <div className="card bg-base-200 p-6 mt-6 rounded-2xl shadow-md" data-aos="fade-up">
      {/* Title Section */}
      <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-warning" />
        Popular Cities
      </h3>

      {/* Popular Cities Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className="btn btn-sm rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            {city}
          </button>
        ))}
      </div>

      {/* Recent Searches Section */}
      {searchHistory.length > 0 && (
        <>
          <h4 className="text-base font-semibold text-base-content/80 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            Recent Searches
          </h4>
          <div className="flex flex-wrap gap-3 mb-3">
            {searchHistory.map((city, idx) => (
              <button
                key={idx}
                onClick={() => handleCityClick(city)}
                className="btn btn-sm rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-white transition-all shadow-sm"
              >
                {city}
              </button>
            ))}
          </div>
          {/* Clear History Button */}
          <button 
            onClick={clearHistory} 
            className="btn btn-xs btn-error hover:btn-outline transition-all"
          >
            Clear History
          </button>
        </>
      )}
    </div>
  );
};

export default PopularCities;
