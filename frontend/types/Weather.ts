// types/Weather.ts

export interface WeatherData {
  success: boolean;
  data: CurrentWeather | ForecastWeather;
  message?: string;
  error?: any;
}

export interface CurrentWeather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  visibility: number;
}

export interface ForecastWeather {
  city: {
    name: string;
    country: string;
  };
  daily: Array<{
    date: string;
    day: string;
    temp_min: number;
    temp_max: number;
    humidity: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
    wind: {
      speed: number;
      deg: number;
    };
    periods: Array<{
      time: string;
      temp: number;
      weather: {
        id: number;
        main: string; 
        description: string;
        icon: string;
      };
      wind_speed: number;
    }>;
  }>;
}

export type Units = 'metric' | 'imperial';

export interface WeatherContextType {
  currentWeather: CurrentWeather | null;
  forecast: ForecastWeather | null;
  city: string;
  setCity: (city: string) => void;
  units: Units;
  setUnits: (units: Units) => void;
  loading: boolean;
  error: string | null;
  fetchWeather: (cityName?: string) => Promise<void>;
}
