import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

import { WeatherProvider, useWeather } from '../../context/WeatherContext';
import WeatherForecast from '../../components/WeatherForecast';
import UnitToggle from '../../components/UnitToggle';
import ErrorAlert from '../../components/ErrorAlert';

const ForecastDetail = () => {
  const router = useRouter();
  const { cityName } = router.query;
  const { setCity, fetchWeather, forecast, loading } = useWeather();

  useEffect(() => {
    if (cityName && typeof cityName === 'string') {
      setCity(cityName);
      fetchWeather(cityName);
    }
  }, [cityName]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {forecast?.city?.name || cityName || 'Loading...'} Forecast
          </h1>
          <p className="text-base-content/70">5-day weather forecast</p>
        </div>
        <Link href={`/city/${cityName}`} className="btn btn-primary">
          Current Weather
        </Link>
      </div>

      <ErrorAlert />
      <WeatherForecast />

      {!loading && forecast && (
        <div className="card bg-base-200 p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Hourly Forecast</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Temperature</th>
                  <th>Weather</th>
                  <th>Wind</th>
                  <th>Humidity</th>
                </tr>
              </thead>
              <tbody>
                {forecast.daily.slice(0, 2).flatMap((day) => 
                  day.periods.map((period, idx) => (
                    <tr key={`${day.date}-${period.time}`}>
                      <td>{day.date} {period.time}</td>
                      <td>{Math.round(period.temp)}°</td>
                      <td className="flex items-center">
                        <img 
                          src={`https://openweathermap.org/img/wn/${period.weather.icon}.png`} 
                          alt={period.weather.description}
                          className="w-8 h-8 mr-2"
                        />
                        <span className="capitalize">{period.weather.description}</span>
                      </td>
                      <td>{period.wind_speed} m/s</td>
                      <td>{day.humidity}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const ForecastPage: NextPage = () => {
  const router = useRouter();
  const { cityName } = router.query;

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Head>
          <title>{cityName ? `${cityName} Forecast` : 'Weather Forecast'}</title>
          <meta name="description" content={`5-day weather forecast for ${cityName}`} />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/" className="btn btn-outline">
              ← Back to Home
            </Link>
            <UnitToggle />
          </div>

          <ForecastDetail />

          <footer className="mt-12 text-center text-sm text-base-content/70">
            <p>Powered by OpenWeatherMap API</p>
          </footer>
        </main>
      </div>
    </WeatherProvider>
  );
};

export default ForecastPage;