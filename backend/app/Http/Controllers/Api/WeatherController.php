<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WeatherService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    protected WeatherService $weatherService;
    
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }
    
    /**
     * Get current weather by city
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function current(Request $request): JsonResponse
    {
        $request->validate([
            'city' => 'required|string|max:100',
            'units' => 'sometimes|string|in:metric,imperial,standard',
        ]);
        
        $city = $request->query('city');
        $units = $request->query('units', 'metric');
        
        $result = $this->weatherService->getCurrentWeatherByCity($city, $units);
        
        if (!$result['success']) {
            return response()->json($result, 422);
        }
        
        return response()->json($result);
    }
    
    /**
     * Get forecast by city
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function forecast(Request $request): JsonResponse
    {
        $request->validate([
            'city' => 'required|string|max:100',
            'units' => 'sometimes|string|in:metric,imperial,standard',
            'days' => 'sometimes|integer|min:1|max:5',
        ]);
        
        $city = $request->query('city');
        $units = $request->query('units', 'metric');
        $days = $request->query('days', 5);
        
        $result = $this->weatherService->getForecastByCity($city, $units, $days);
        
        if (!$result['success']) {
            return response()->json($result, 422);
        }
        
        return response()->json($result);
    }
    
    /**
     * Get current weather by coordinates
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function byCoordinates(Request $request): JsonResponse
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
            'units' => 'sometimes|string|in:metric,imperial,standard',
        ]);
        
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $units = $request->query('units', 'metric');
        
        $result = $this->weatherService->getCurrentWeatherByCoordinates($lat, $lon, $units);
        
        if (!$result['success']) {
            return response()->json($result, 422);
        }
        
        return response()->json($result);
    }
}
