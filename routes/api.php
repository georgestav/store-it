<?php

use App\Http\Controllers\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//cities controller group
Route::get('/cities', 'Api\CityController@index');
Route::post('/cities', 'Api\CityController@store');
Route::post('/cities/{id}', 'Api\CityController@update'); //! withought the front-end no access to put or patch
Route::delete('/cities/{id}', 'Api\CityController@destroy');
