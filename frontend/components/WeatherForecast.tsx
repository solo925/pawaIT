import React, { useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { formatForecastDate } from '../utils/dateUtils';
import { colorVariants } from '../constants/constants';


const WeatherForecast: React.FC = () => {
  const { forecast, units, loading } = useWeather();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (loading) {
    return (
      <div className="card bg-base-200 p-4 h-64 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!forecast || !forecast.daily || forecast.daily.length === 0) {
    return (
      <div className="card bg-base-200 p-4 text-center">
        <p className="text-base-content/80">No forecast data available.</p>
      </div>
    );
  }

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="card bg-base-200 p-6 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-base-content">5-Day Forecast</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.daily.map((day, index) => (
          <div
            key={index}
            className={`${colorVariants[index % colorVariants.length]} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-3`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <h3 className="font-semibold text-base-content">
              {formatForecastDate(day.day)}
            </h3>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
              alt={day.weather.description}
              className="w-16 h-16"
            />
            <p className="capitalize text-sm text-base-content/70">{day.weather.description}</p>

            <div className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
              <Thermometer className="w-4 h-4" />
              <span>{Math.round(day.temp_max)}{tempUnit}</span>
              <span className="text-base-content/60">/</span>
              <span>{Math.round(day.temp_min)}{tempUnit}</span>
            </div>

            <div className="text-sm text-base-content/80 space-y-1 w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-primary" />
                  <span>Humidity:</span>
                </div>
                <span>{day.humidity}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4 text-primary" />
                  <span>Wind:</span>
                </div>
                <span>{day.wind.speed} {windUnit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
