<?php

use App\Http\Controllers\Api\WeatherController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Weather routes

// Route::get('/weather/current', [WeatherController::class, 'current']);
Route::prefix('weather')->group(function () {
    Route::get('/current', [WeatherController::class, 'current']);
    Route::get('/forecast', [WeatherController::class, 'forecast']);
    Route::get('/coordinates', [WeatherController::class, 'byCoordinates']);
});

Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});
