<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherService
{
    protected string $apiKey;
    protected string $baseUrl;
    
    public function __construct()
    {
        $this->apiKey = config('services.openweather.key');
        $this->baseUrl = config('services.openweather.url');
    }
    
    /**
     * Get current weather data by city name
     * 
     * @param string $city City name
     * @param string $units Units (metric, imperial, standard)
     * @return array Weather data
     */
    public function getCurrentWeatherByCity(string $city, string $units = 'metric'): array
    {
        $cacheKey = "weather_current_{$city}_{$units}";
        
        return Cache::remember($cacheKey, 1800, function () use ($city, $units) {
            $response = Http::get("{$this->baseUrl}/weather", [
                'q' => $city,
                'units' => $units,
                'appid' => $this->apiKey
            ]);
            
            if ($response->failed()) {
                return [
                    'success' => false,
                    'message' => 'Unable to fetch weather data',
                    'error' => $response->json()
                ];
            }
            
            return [
                'success' => true,
                'data' => $response->json()
            ];
        });
    }
    
    /**
     * Get weather forecast by city name
     * 
     * @param string $city City name
     * @param string $units Units (metric, imperial, standard)
     * @param int $count Number of days (max 5)
     * @return array Forecast data
     */
    public function getForecastByCity(string $city, string $units = 'metric', int $count = 5): array
    {
        $cacheKey = "weather_forecast_{$city}_{$units}_{$count}";
        
        return Cache::remember($cacheKey, 1800, function () use ($city, $units, $count) {
            $response = Http::get("{$this->baseUrl}/forecast", [
                'q' => $city,
                'units' => $units,
                'cnt' => min($count * 8, 40), // OpenWeatherMap provides data in 3-hour steps
                'appid' => $this->apiKey
            ]);
            
            if ($response->failed()) {
                return [
                    'success' => false,
                    'message' => 'Unable to fetch forecast data',
                    'error' => $response->json()
                ];
            }
            
            // Process forecast data to group by day
            $forecast = $response->json();
            $processedForecast = $this->processForecastData($forecast, $count);
            
            return [
                'success' => true,
                'data' => $processedForecast
            ];
        });
    }
    
    /**
     * Get weather data by geographic coordinates
     * 
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @param string $units Units (metric, imperial, standard)
     * @return array Weather data
     */
    public function getCurrentWeatherByCoordinates(float $lat, float $lon, string $units = 'metric'): array
    {
        $cacheKey = "weather_current_geo_{$lat}_{$lon}_{$units}";
        
        return Cache::remember($cacheKey, 1800, function () use ($lat, $lon, $units) {
            $response = Http::get("{$this->baseUrl}/weather", [
                'lat' => $lat,
                'lon' => $lon,
                'units' => $units,
                'appid' => $this->apiKey
            ]);
            
            if ($response->failed()) {
                return [
                    'success' => false,
                    'message' => 'Unable to fetch weather data',
                    'error' => $response->json()
                ];
            }
            
            return [
                'success' => true,
                'data' => $response->json()
            ];
        });
    }
    
    /**
     * Process forecast data to group by day
     * 
     * @param array $forecast Raw forecast data
     * @param int $days Number of days
     * @return array Processed forecast
     */
    private function processForecastData(array $forecast, int $days): array
    {
        $processed = [
            'city' => $forecast['city'],
            'daily' => []
        ];
        
        $dailyForecasts = [];
        
        // Group forecasts by day
        foreach ($forecast['list'] as $item) {
            // Extract date (without time)
            $date = substr($item['dt_txt'], 0, 10);
            
            if (!isset($dailyForecasts[$date])) {
                $dailyForecasts[$date] = [
                    'date' => $date,
                    'day' => date('l', strtotime($date)),
                    'temp_min' => $item['main']['temp_min'],
                    'temp_max' => $item['main']['temp_max'],
                    'humidity' => $item['main']['humidity'],
                    'weather' => $item['weather'][0],
                    'wind' => $item['wind'],
                    'periods' => []
                ];
            }
            
            // Update min/max temperature
            $dailyForecasts[$date]['temp_min'] = min($dailyForecasts[$date]['temp_min'], $item['main']['temp_min']);
            $dailyForecasts[$date]['temp_max'] = max($dailyForecasts[$date]['temp_max'], $item['main']['temp_max']);
            
            // Add the period data
            $dailyForecasts[$date]['periods'][] = [
                'time' => substr($item['dt_txt'], 11, 5),
                'temp' => $item['main']['temp'],
                'weather' => $item['weather'][0],
                'wind_speed' => $item['wind']['speed']
            ];
        }
        
        // Take only the requested number of days
        $processed['daily'] = array_slice(array_values($dailyForecasts), 0, $days);
        
        return $processed;
    }
}
