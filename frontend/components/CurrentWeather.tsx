// components/CurrentWeather.tsx
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { formatDate } from '../utils/dateUtils';

const CurrentWeather: React.FC = () => {
  const { currentWeather, units, loading } = useWeather();

  if (loading) {
    return (
      <div className="card bg-base-200 p-4 h-64 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="card bg-base-200 p-4">
        <p>No weather data available. Please search for a city.</p>
      </div>
    );
  }

  const { name, main, weather, wind, sys, dt } = currentWeather;
  const weatherIcon = weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';
  const dateTime = formatDate(dt * 1000);

  return (
    <div className="card bg-base-200 p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src={iconUrl} 
            alt={weather[0]?.description} 
            className="w-20 h-20"
          />
          <div className="ml-4">
            <h2 className="text-3xl font-bold">{name}, {sys.country}</h2>
            <p className="text-lg">{dateTime}</p>
            <p className="capitalize text-lg">{weather[0]?.description}</p>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <div className="text-5xl font-bold mb-2">{Math.round(main.temp)}{tempUnit}</div>
          <div className="flex flex-col text-sm">
            <span>Feels like: {Math.round(main.feels_like)}{tempUnit}</span>
            <span>Min: {Math.round(main.temp_min)}{tempUnit} / Max: {Math.round(main.temp_max)}{tempUnit}</span>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-base-100 rounded-lg p-3">
          <div className="text-sm text-base-content/70">Humidity</div>
          <div className="font-bold">{main.humidity}%</div>
        </div>
        <div className="bg-base-100 rounded-lg p-3">
          <div className="text-sm text-base-content/70">Wind</div>
          <div className="font-bold">{wind.speed} {windUnit}</div>
        </div>
        <div className="bg-base-100 rounded-lg p-3">
          <div className="text-sm text-base-content/70">Pressure</div>
          <div className="font-bold">{main.pressure} hPa</div>
        </div>
        <div className="bg-base-100 rounded-lg p-3">
          <div className="text-sm text-base-content/70">Visibility</div>
          <div className="font-bold">{(currentWeather.visibility / 1000).toFixed(1)} km</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
