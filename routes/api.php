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
Route::get("/listings/{id}", "Api\ListingController@indexSingle"); //getting information of only one listing
Route::get("/listings/{city?}/{cityCoordinates0?}/{cityCoordinates1?}", "Api\ListingController@index");
Route::post("/listings", "Api\ListingController@store");
Route::post("/listings/{id}", "Api\ListingController@update"); //todo put/patch
Route::delete("/listings/{id}", "Api\ListingController@destroy");

//Cities controller group
Route::get('/cities/{name?}', 'Api\CityController@index');
Route::get('/cities/{id}/id', 'Api\CityController@findbyid');
Route::post('/cities', 'Api\CityController@store'); // create new city
Route::post('/cities/{id}', 'Api\CityController@update'); //todo put or patch
Route::delete('/cities/{id}', 'Api\CityController@destroy');

//Countries controller group
Route::get("/countries", "Api\CountryController@index");
Route::get("/countries/{id}/id", "Api\CountryController@findbyid");


//Reviews controller group
Route::get('/reviews/{listing_id}', 'Api\ReviewController@index'); // get the reviews of a specific listing
Route::post('/reviews/{listing_id}', 'Api\ReviewController@store'); // create new review for a specific listing
Route::post('/reviews/{listing_id}/{id}', 'Api\ReviewController@update'); //todo put or patch
Route::delete('/reviews/{id}', 'Api\ReviewController@destroy');

//Availabilities controller group
Route::get("/availabilities/{listing_id}", "Api\AvailabilityController@index");
Route::post("/availabilities/{listing_id}", "Api\AvailabilityController@store");
Route::post("/availabilities/{listing_id}/{id}", "Api\AvailabilityController@update"); //todo  put/patch
Route::delete("/availabilities/{id}", "Api\AvailabilityController@destroy");

//Bookings controller group
Route::get("/bookings/{listing_id}", "Api\BookingController@index");
Route::post("/bookings", "Api\BookingController@store");
Route::patch('/bookings/{id}', "Api\BookingController@updateById");
Route::post("/bookings/{listing_id}/{id}", "Api\BookingController@update"); //todo put/patch
Route::delete("/bookings/{id}", "Api\BookingController@destroy");

//Features controller group
Route::get('/features', 'Api\FeatureController@index');
Route::post('/features', 'Api\FeatureController@store');
Route::post('/features/{id}', 'Api\FeatureController@update'); //todo to put/patch
Route::delete('/features/{id}', 'Api\FeatureController@destroy');

//Users controller group
Route::get('/users', 'Api\UserController@indexAll'); //todo protect for admins only
Route::get('/user/{id}/getlistings', 'Api\UserController@getlistings'); //todo protect for same user
Route::get("/user/{id}/getbookings", "Api\UserController@getBookings");

Route::get('/user/logged-in', 'Api\UserController@logedIn'); //todo protect for same user

Route::get('/user/{id}', 'Api\UserController@indexSingle'); //todo protect for admins, or same user
Route::get('/user/{id}/name', 'Api\UserController@findusername'); //todo protect for users
Route::post('/user', 'Api\UserController@store'); //todo put or patch / protect only for same user
Route::patch('/user/{id}', 'Api\UserController@update'); //todo protect only for same user
Route::delete('/user/{id}', 'Api\UserController@destroy'); //todo protect for admins, or same user

//Person Controller group
Route::get('/people', 'Api\PersonController@indexAll'); //todo protect for admins only
Route::get('/person/{id}', 'Api\PersonController@indexSingle'); //todo protect for admins, or same user
Route::post('/person', 'Api\PersonController@store'); //todo put or patch / protect only for same user
Route::patch('/person/{id}', 'Api\PersonController@update'); //todo protect only for same user
Route::delete('/person/{id}', 'Api\PersonController@destroy'); //todo protect for admins, or same user

//ListedDates Controller group
Route::get("/listed-dates", "Api\ListedDateController@index");
Route::post("/listed-dates/{listing_id}", "Api\ListedDateController@store");
Route::post("/listed-dates/{listing_id}/{id}", "Api\ListedDateController@update"); //there will be no need for both listing and normal ID, once we have put/patch
Route::delete("/listed-dates/{id}", "Api\ListedDateController@destroy");

//Picture Controller group
Route::get('/picture/{listing_id}', 'Api\PictureController@indexListing'); //todo protect for logged in users
Route::post('/picture', 'Api\PictureController@store'); //todo protect for manager of listing
Route::delete('/picture/{id}', 'Api\PictureController@destroy'); //todo protect for manager of listing

//Storage types controller group
Route::get('/storagetypes', 'Api\StorageTypeController@index');
