import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useWeather,WeatherProvider } from '../context/WeatherContext';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import WeatherForecast from '../components/WeatherForecast';
import UnitToggle from '../components/UnitToggle';
import ErrorAlert from '../components/ErrorAlert';

const Home: NextPage = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Head>
          <title>Weather App</title>
          <meta name="description" content="Weather application built with NextJS and Laravel" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Weather App</h1>
            <p className="text-base-content/70">Check current weather and forecasts</p>
          </header>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <SearchBar />
            <div className="flex space-x-4 items-center">
              <UnitToggle />
              <Link href="/settings" className="btn btn-outline btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Settings
              </Link>
            </div>
          </div>

          <ErrorAlert />

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Current Weather</h2>
              <WeatherCityLink />
            </div>
            <CurrentWeather />
            
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Weather Forecast</h2>
              <WeatherForecastLink />
            </div>
            <WeatherForecast />
          </div>

          <footer className="mt-12 text-center text-sm text-base-content/70">
            <p>Powered by OpenWeatherMap API</p>
            <p>Built with NextJS and Laravel</p>
          </footer>
        </main>
      </div>
    </WeatherProvider>
  );
};

// Component that extracts city name from current weather and links to city detail page
const WeatherCityLink = () => {
  const { currentWeather } = useWeather();
  
  if (!currentWeather?.name) return null;
  
  return (
    <Link href={`/city/${currentWeather.name}`} className="btn btn-outline btn-sm">
      View Details
    </Link>
  );
};

// Component that extracts city name from forecast and links to forecast page
const WeatherForecastLink = () => {
  const { forecast } = useWeather();
  
  if (!forecast?.city?.name) return null;
  
  return (
    <Link href={`/forecast/${forecast.city.name}`} className="btn btn-outline btn-sm">
      View Full Forecast
    </Link>
  );
};

export default Home;