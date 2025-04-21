import React, { useEffect, useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';
import { formatDate } from '../utils/dateUtils';
import { Droplets, Wind, Gauge, Eye } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getWeatherBackground } from '../utils/backgroundChecker';

/**
 * WeatherCard component to display individual weather details.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.label - Label for the weather detail.
 * @param {string | number} props.value - Value of the weather detail.
 * @param {React.ReactNode} props.icon - Icon representing the weather detail.
 * @returns {JSX.Element} The rendered WeatherCard component.
 */
const WeatherCard: React.FC<{ label: string, value: string | number, icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-base-100 rounded-xl p-4 shadow-sm flex flex-col items-center gap-2" data-aos="fade-up">
    {icon}
    <div className="text-xs text-base-content/60">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

/**
 * CurrentWeather component to display the current weather information.
 * 
 * @returns {JSX.Element} The rendered CurrentWeather component.
 */
const CurrentWeather: React.FC = () => {
  const { currentWeather, units, loading } = useWeather();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const weatherData = useMemo(() => {
    if (!currentWeather) return null;

    const { name, main, weather, wind, sys, dt } = currentWeather;
    const weatherIcon = weather[0]?.icon;
    const condition = weather[0]?.main || '';
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windUnit = units === 'metric' ? 'm/s' : 'mph';
    const dateTime = formatDate(dt * 1000);
    const weatherBg = getWeatherBackground(condition);

    return {
      name,
      country: sys.country,
      temp: main.temp,
      feelsLike: main.feels_like,
      tempMin: main.temp_min,
      tempMax: main.temp_max,
      humidity: main.humidity,
      pressure: main.pressure,
      visibility: (currentWeather.visibility / 1000).toFixed(1),
      windSpeed: wind.speed,
      iconUrl,
      condition,
      dateTime,
      weatherBg
    };
  }, [currentWeather, units]);

  if (loading) {
    return (
      <div className="card bg-base-200 p-6 h-64 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="card bg-base-200 p-6 text-center">
        <p className="text-base-content/80">No weather data available. Please search for a city.</p>
      </div>
    );
  }

  const { name, country, temp, feelsLike, tempMin, tempMax, humidity, pressure, visibility, windSpeed, iconUrl, condition, dateTime, weatherBg } = weatherData;

  return (
    <div className={`card p-6 shadow-xl rounded-2xl space-y-6 text-base-content ${weatherBg}`} data-aos="fade-up">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <img 
            src={iconUrl} 
            alt={condition} 
            className="w-24 h-24" 
            loading="lazy"
          />
          <div>
            <h2 className="text-3xl font-bold">{name}, {country}</h2>
            <p className="text-sm text-base-content/70">{dateTime}</p>
            <p className="capitalize text-lg text-base-content">{condition}</p>
          </div>
        </div>

        <div className="text-center md:text-right">
          <div className="text-5xl font-extrabold text-primary mb-2">
            {Math.round(temp)}°{units === 'metric' ? 'C' : 'F'}
          </div>
          <div className="text-sm text-base-content/70 space-y-1">
            <div>Feels like: {Math.round(feelsLike)}°{units === 'metric' ? 'C' : 'F'}</div>
            <div>Min: {Math.round(tempMin)}°{units === 'metric' ? 'C' : 'F'} / Max: {Math.round(tempMax)}°{units === 'metric' ? 'C' : 'F'}</div>
          </div>
        </div>
      </div>

      <div className="divider m-0" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <WeatherCard 
          label="Humidity" 
          value={`${humidity}%`} 
          icon={<Droplets className="w-5 h-5 text-primary" />} 
        />
        <WeatherCard 
          label="Wind" 
          value={`${windSpeed} ${units === 'metric' ? 'm/s' : 'mph'}`} 
          icon={<Wind className="w-5 h-5 text-primary" />} 
        />
        <WeatherCard 
          label="Pressure" 
          value={`${pressure} hPa`} 
          icon={<Gauge className="w-5 h-5 text-primary" />} 
        />
        <WeatherCard 
          label="Visibility" 
          value={`${visibility} km`} 
          icon={<Eye className="w-5 h-5 text-primary" />} 
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
