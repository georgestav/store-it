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


//Listings controller group
Route::get("/listings", "Api\ListingController@index");
Route::post("/listings", "Api\ListingController@store");
Route::post("/listings/{id}", "Api\ListingController@update"); //! need for correction to put/patch
Route::delete("/listings/{id}", "Api\ListingController@destroy");

//Cities controller group
Route::get('/cities', 'Api\CityController@index');
Route::post('/cities', 'Api\CityController@store'); // create new city
Route::post('/cities/{id}', 'Api\CityController@update'); //! withought the front-end no access to put or patch
Route::delete('/cities/{id}', 'Api\CityController@destroy');

//Countries controller group
Route::get("/countries", "Api\CountryController@index");


//Reviews controller group
Route::get('/reviews/{listing_id}', 'Api\ReviewController@index'); // get the reviews of a specific listing
Route::post('/reviews/{listing_id}/create', 'Api\ReviewController@store'); // create new review for a specific listing
Route::post('/reviews/{listing_id}/update/{id}', 'Api\ReviewController@update'); //! withought the front-end no access to put or patch
Route::delete('/reviews/{id}', 'Api\ReviewController@destroy');

//Availabilities controller group
Route::get("/availabilities", "Api\AvailabilityController@index");
Route::post("/availabilities", "Api\AvailabilityController@store");
Route::post("/availabilities/{id}", "Api\AvailabilityController@update"); //! need for corredtion to put/patch
Route::delete("/availabilities/{id}", "Api\AvailabilityController@destroy");

//Bookings controller group
Route::get("/bookings", "Api\BookingController@index");
Route::post("/bookings", "Api\BookingController@store");
Route::post("/bookings/{id}", "Api\BookingController@update"); //! need for corredtion to put/patch
Route::delete("/bookings/{id}", "Api\BookingController@destroy");
