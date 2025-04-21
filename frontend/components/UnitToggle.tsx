import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Units } from '../types/Weather';

/**
 * A component to toggle between Celsius and Fahrenheit units for weather data.
 * 
 * @returns {JSX.Element} - The rendered unit toggle component.
 */
const UnitToggle: React.FC = () => {
  const { units, setUnits } = useWeather();

  /**
   * Handles the change in units (Celsius or Fahrenheit).
   * 
   * @param {Units} newUnit - The selected unit (metric or imperial).
   */
  const handleUnitChange = (newUnit: Units) => {
    setUnits(newUnit);
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium">Units:</span>
      <div className="btn-group">
        <button
          className={`btn btn-sm ${units === 'metric' ? 'btn-active text-white bg-primary hover:bg-primary-focus' : 'text-base-content'}`}
          onClick={() => handleUnitChange('metric')}
          aria-pressed={units === 'metric'}
          aria-label="Celsius"
        >
          °C
        </button>
        <button
          className={`btn btn-sm ${units === 'imperial' ? 'btn-active text-white bg-primary hover:bg-primary-focus' : 'text-base-content'}`}
          onClick={() => handleUnitChange('imperial')}
          aria-pressed={units === 'imperial'}
          aria-label="Fahrenheit"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;
