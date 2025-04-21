import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { WeatherProvider, useWeather } from '../../context/WeatherContext';
import CurrentWeather from '../../components/CurrentWeather';
import WeatherForecast from '../../components/WeatherForecast';
import SearchBar from '../../components/SearchBar';
import { getWeatherByCoordinates } from '../../services/weatherService';

const CityWeatherContent = () => {
  const router = useRouter();
  const { name, lat, lon } = router.query;
  const { 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    setCity
  } = useWeather();

  useEffect(() => {
  //  usin coordinates for more accurate weather
    if (name && typeof name === 'string') {
      setCity(name);
      
      if (lat && lon && typeof lat === 'string' && typeof lon === 'string') {
        // Custom fetch using coordinates if available
        const fetchWeatherByCoords = async () => {
          try {
            const weatherData = await getWeatherByCoordinates(
              parseFloat(lat), 
              parseFloat(lon)
            );
            
            // Update the context with the weather data
           
          } catch (err) {
            console.error('Error fetching weather by coordinates:', err);
          }
        };
        
        fetchWeatherByCoords();
      }
    }
  }, [name, lat, lon]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Weather for {name}</h1>
        <SearchBar />
      </div>
      
      {error && (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <CurrentWeather />
      
      <WeatherForecast />
    </div>
  );
};

const CityPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Head>
          <title>{name ? `Weather for ${name}` : 'City Weather'} - Weather App</title>
          <meta name="description" content={`Current weather and forecast for ${name}`} />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/" className="btn btn-outline mr-2">
              ← Back to Home
            </Link>
            <Link href={`/search?q=${name}`} className="btn btn-outline">
              Back to Search
            </Link>
          </div>

          <CityWeatherContent />

          <footer className="mt-12 text-center text-sm text-base-content/70">
            <p>Powered by OpenWeatherMap API</p>
          </footer>
        </main>
      </div>
    </WeatherProvider>
  );
};

export default CityPage;