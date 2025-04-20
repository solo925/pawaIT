import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Units } from '../types/Weather';

const UnitToggle: React.FC = () => {
  const { units, setUnits } = useWeather();

  const handleUnitChange = (newUnit: Units) => {
    setUnits(newUnit);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Units:</span>
      <div className="btn-group">
        <button
          className={`btn btn-sm ${units === 'metric' ? 'btn-active' : ''}`}
          onClick={() => handleUnitChange('metric')}
          aria-label="Celsius"
        >
          °C
        </button>
        <button
          className={`btn btn-sm ${units === 'imperial' ? 'btn-active' : ''}`}
          onClick={() => handleUnitChange('imperial')}
          aria-label="Fahrenheit"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;