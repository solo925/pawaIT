export function getWeatherBackground(condition: string) {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-br from-blue-200 via-blue-400 to-indigo-700';
      case 'snow':
        return 'bg-gradient-to-br from-gray-100 via-white to-blue-100';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-purple-500 via-indigo-600 to-gray-800';
      default:
        return 'bg-base-200';
    }
  }
  