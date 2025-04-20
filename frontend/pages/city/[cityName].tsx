import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

import { WeatherProvider, useWeather } from '../../context/WeatherContext';
import CurrentWeather from '../../components/CurrentWeather';
import UnitToggle from '../../components/UnitToggle';
import ErrorAlert from '../../components/ErrorAlert';

const CityDetail = () => {
  const router = useRouter();
  const { cityName } = router.query;
  const { setCity, fetchWeather, currentWeather, loading } = useWeather();

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
            {currentWeather?.name || cityName || 'Loading...'}
          </h1>
          <p className="text-base-content/70">Detailed weather information</p>
        </div>
        <Link href={`/forecast/${cityName}`} className="btn btn-primary">
          View Forecast
        </Link>
      </div>

      <ErrorAlert />
      <CurrentWeather />

      {!loading && currentWeather && (
        <div className="card bg-base-200 p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-base-100 p-4">
              <h3 className="font-semibold mb-2">Sunrise & Sunset</h3>
              <p>Sunrise: {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p>Sunset: {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
            <div className="card bg-base-100 p-4">
              <h3 className="font-semibold mb-2">Wind Information</h3>
              <p>Speed: {currentWeather.wind.speed} m/s</p>
              <p>Direction: {currentWeather.wind.deg}°</p>
            </div>
            <div className="card bg-base-100 p-4">
              <h3 className="font-semibold mb-2">Atmospheric Conditions</h3>
              <p>Pressure: {currentWeather.main.pressure} hPa</p>
              <p>Humidity: {currentWeather.main.humidity}%</p>
              <p>Visibility: {(currentWeather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CityDetailPage: NextPage = () => {
  const router = useRouter();
  const { cityName } = router.query;

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Head>
          <title>{cityName ? `${cityName} Weather` : 'City Weather'}</title>
          <meta name="description" content={`Detailed weather information for ${cityName}`} />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/" className="btn btn-outline">
              ← Back to Home
            </Link>
            <UnitToggle />
          </div>

          <CityDetail />

          <footer className="mt-12 text-center text-sm text-base-content/70">
            <p>Powered by OpenWeatherMap API</p>
          </footer>
        </main>
      </div>
    </WeatherProvider>
  );
};

export default CityDetailPage;