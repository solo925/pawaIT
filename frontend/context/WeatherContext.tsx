import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  WeatherContextType, 
  CurrentWeather, 
  ForecastWeather, 
  Units 
} from '../types/Weather';
import { getCurrentWeather, getWeatherForecast } from '../services/weatherService';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastWeather | null>(null);
  const [city, setCity] = useState<string>('London'); 
  const [units, setUnits] = useState<Units>('metric');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName?: string) => {
    const cityToFetch = cityName || city;
    if (!cityToFetch) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const currentWeatherResponse = await getCurrentWeather(cityToFetch, units);
      if (!currentWeatherResponse.success) {
        throw new Error(currentWeatherResponse.message || 'Failed to fetch current weather');
      }
      setCurrentWeather(currentWeatherResponse.data as CurrentWeather);

      // Fetch forecast
      const forecastResponse = await getWeatherForecast(cityToFetch, units);
      if (!forecastResponse.success) {
        throw new Error(forecastResponse.message || 'Failed to fetch forecast');
      }
      setForecast(forecastResponse.data as ForecastWeather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial weather fetch
  useEffect(() => {
    fetchWeather();
  }, [units]);

  const value = {
    currentWeather,
    forecast,
    city,
    setCity,
    units,
    setUnits,
    loading,
    error,
    fetchWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
