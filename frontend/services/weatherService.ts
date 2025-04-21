import { WeatherData, Units, CitySearchData } from '../types/Weather';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Get current weather for a city
 * @param city 
 * @param units 
 */
export const getCurrentWeather = async (
  city: string, 
  units: Units = 'metric'
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather/current?city=${encodeURIComponent(city)}&units=${units}`,
      { method: 'GET' }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return {
      success: false,
      data: {} as any,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

/**
 * Get weather forecast for a city
 * @param city City name
 * @param units Units (metric or imperial)
 * @param days Number of days for forecast
 */
export const getWeatherForecast = async (
  city: string,
  units: Units = 'metric',
  days: number = 5
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather/forecast?city=${encodeURIComponent(city)}&units=${units}&days=${days}`,
      { method: 'GET' }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return {
      success: false,
      data: {} as any,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

/**
 * Get weather by geolocation
 * @param lat Latitude
 * @param lon Longitude
 * @param units Units (metric or imperial)
 */
export const getWeatherByCoordinates = async (
  lat: number,
  lon: number,
  units: Units = 'metric'
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather/coordinates?lat=${lat}&lon=${lon}&units=${units}`,
      { method: 'GET' }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    return {
      success: false,
      data: {} as any,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

/**
 * Search for cities by name
 * @param query City name to search for
 * @param limit Maximum number of results to return
 */
export const searchCities = async (
  query: string,
  limit: number = 5
): Promise<CitySearchData> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather/search?query=${encodeURIComponent(query)}&limit=${limit}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => null); 
      throw new Error(error?.message || 'City not found');
    }

    const result = await response.json();
    if (!result || !result.data || result.data.length === 0) {
      throw new Error('No cities found matching your search.');
    }

    return result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error searching cities:', error);
    }

    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : 'An unknown error occurred while searching cities.'
    };
  }
};

