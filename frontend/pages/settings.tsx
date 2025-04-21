import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { WeatherProvider, useWeather } from '../context/WeatherContext';
import { Units } from '../types/Weather';

const SettingsContent = () => {
  const { units, setUnits, city, setCity, fetchWeather } = useWeather();
  const [defaultCity, setDefaultCity] = useState(city);
  const [defaultUnits, setDefaultUnits] = useState<Units>(units);
  const [theme, setTheme] = useState('light');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const savedCity = localStorage.getItem('defaultCity');
    const savedUnits = localStorage.getItem('defaultUnits') as Units;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedCity) setDefaultCity(savedCity);
    if (savedUnits) setDefaultUnits(savedUnits);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const saveSettings = () => {
    // Save to localStorage
    localStorage.setItem('defaultCity', defaultCity);
    localStorage.setItem('defaultUnits', defaultUnits);
    localStorage.setItem('theme', theme);
    
    // Update context
    setCity(defaultCity);
    setUnits(defaultUnits);
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
    
    // Show success message
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
    
    // Fetch weather with new settings
    fetchWeather(defaultCity);
  };

  return (
    <div className="card bg-base-200 p-8 shadow-xl rounded-3xl max-w-lg mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center text-base-content">Settings</h1>
      
      {saveMessage && (
        <div className="alert alert-success shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{saveMessage}</span>
        </div>
      )}
      
      <div className="space-y-6">
        <div className="form-control">
          <label className="label font-medium">Default City</label>
          <input 
            type="text" 
            className="input input-bordered rounded-lg shadow-md"
            value={defaultCity}
            onChange={(e) => setDefaultCity(e.target.value)}
            placeholder="Enter default city"
          />
          <label className="label-text-alt text-sm">This city will be loaded by default when you open the app</label>
        </div>
        
        <div className="form-control">
          <label className="label font-medium">Temperature Units</label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={defaultUnits === 'metric'}
                onChange={() => setDefaultUnits('metric')}
              />
              <span className="ml-3">Celsius (°C)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={defaultUnits === 'imperial'}
                onChange={() => setDefaultUnits('imperial')}
              />
              <span className="ml-3">Fahrenheit (°F)</span>
            </label>
          </div>
        </div>
        
        <div className="form-control">
          <label className="label font-medium">Theme</label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
              />
              <span className="ml-3">Light</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
              />
              <span className="ml-3">Dark</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Link href="/" className="btn btn-outline bg-gray-200 text-base-content hover:bg-gray-300 rounded-lg">
            Cancel
          </Link>
          <button 
            className="btn btn-primary bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition-all hover:bg-blue-600"
            onClick={saveSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsPage: NextPage = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
        <Head>
          <title>Settings - Weather App</title>
          <meta name="description" content="Configure your weather app preferences" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <SettingsContent />
        </main>
      </div>
    </WeatherProvider>
  );
};

export default SettingsPage;
