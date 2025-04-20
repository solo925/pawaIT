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

  // Load settings from localStorage on component mount
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
    <div className="card bg-base-200 p-6 shadow-lg max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      {saveMessage && (
        <div className="alert alert-success mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{saveMessage}</span>
        </div>
      )}
      
      <div className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Default City</span>
          </label>
          <input 
            type="text" 
            className="input input-bordered" 
            value={defaultCity}
            onChange={(e) => setDefaultCity(e.target.value)}
            placeholder="Enter default city"
          />
          <label className="label">
            <span className="label-text-alt">This city will be loaded by default when you open the app</span>
          </label>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Temperature Units</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={defaultUnits === 'metric'}
                onChange={() => setDefaultUnits('metric')}
              />
              <span className="ml-2">Celsius (°C)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={defaultUnits === 'imperial'}
                onChange={() => setDefaultUnits('imperial')}
              />
              <span className="ml-2">Fahrenheit (°F)</span>
            </label>
          </div>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Theme</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
              />
              <span className="ml-2">Light</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                className="radio radio-primary" 
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
              />
              <span className="ml-2">Dark</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Link href="/" className="btn btn-outline">
            Cancel
          </Link>
          <button className="btn btn-primary" onClick={saveSettings}>
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