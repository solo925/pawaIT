import React from 'react';
import { useWeather } from '../context/WeatherContext';

const WeatherForecast: React.FC = () => {
  const { forecast, units, loading } = useWeather();

  if (loading) {
    return (
      <div className="card bg-base-200 p-4 h-64 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!forecast || !forecast.daily || forecast.daily.length === 0) {
    return (
      <div className="card bg-base-200 p-4">
        <p>No forecast data available.</p>
      </div>
    );
  }

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="card bg-base-200 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.daily.map((day, index) => (
            <div key={index} className="card bg-base-100 shadow-sm">
              <div className="card-body p-4">
                <h3 className="font-bold text-center">{day.day}</h3>
                <div className="text-center">
                  <img 
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`} 
                    alt={day.weather.description}
                    className="w-16 h-16 mx-auto"
                  />
                  <p className="capitalize text-sm">{day.weather.description}</p>
                </div>
                
                <div className="flex justify-between text-sm mt-2">
                  <span>{Math.round(day.temp_min)}{tempUnit}</span>
                  <span className="font-semibold">{Math.round(day.temp_max)}{tempUnit}</span>
                </div>
                
                <div className="text-xs mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Humidity:</span>
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wind:</span>
                    <span>{day.wind.speed} {windUnit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;