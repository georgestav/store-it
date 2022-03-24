<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Listing;

class ListingController extends Controller
{

    //get all listings from the listings table
    public function index($city = null, $cityCoordinates0 = null, $cityCoordinates1 = null)
    {
        $listings = Listing::query()->get();

        $distances = [];

        $location_lat = $cityCoordinates0;
        $location_lat_phi = $location_lat * pi() / 180;

        $location_lon = $cityCoordinates1;

        $earthRadius = 6371000;

        foreach($listings as $listing) {

            $coordinates = explode(", ", $listing->coordinates);
            $listing_lat = $coordinates[0];
            $listing_lon = $coordinates[1];

            $listing_lat_phi = $listing_lat * pi() / 180;

            $difference_of_lats = ($listing_lat - $location_lat) * pi() / 180;
            $difference_of_lons = ($listing_lon - $location_lon) * pi() / 180;

            $a = sin($difference_of_lats / 2)**2 + cos($location_lat_phi) * cos($listing_lat_phi) * sin($difference_of_lons / 2)**2;

            $c = 2 * atan2(sqrt($a), sqrt(1-$a));

            $distance = $earthRadius * $c;

            $listing->distance = $distance;

            $distances[$distance] = $listing;
        }

        ksort($distances);

        $listings = array_slice($distances, 0, 3);

        return $listings;
    }

    /**
     * add new listing to listing table
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {

        $listing = new Listing;

        $listing->user_id = 2;
        $listing->country_id = 7;
        $listing->city_id = 12;
        $listing->storage_type_id = 3;
        $listing->coordinates = "E°15.345 W°44.890";
        $listing->description = $request->input("description");
        $listing->size = $request->input("size");
        $listing->daily_rate = $request->input("daily_rate");
        $listing->rating = "4";

        $listing->save();
    }

    /**
     * updating a specific listing from the listings table
     *
     * @param \Illuminate\Http\Request $request
     * @param $id
     */
    public function update(Request $request, $id)
    {

        $listing = Listing::findOrFail($id);

        $listing->storage_type_id = 2;
        $listing->description = $request->input("description");
        $listing->size = $request->input("size");
        $listing->daily_rate = $request->input("daily_rate");

        $listing->save();
    }

    /**
     * deleting a specific listing from the listings table
     *
     * @param $id
     */
    public function destroy($id)
    {

        $listing = Listing::findOrFail($id);

        $listing->delete();
    }
}
