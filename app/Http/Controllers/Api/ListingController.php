<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Listing;

class ListingController extends Controller
{

    //get listings based on a storage type
    public function indexType($type_id)
    {
        $listings = Listing::query()->where("storage_type_id", $type_id)->get();

        foreach ($listings as $listing) {
            $listing->storage_type;
            $listing->pictures;
        }

        return $listings;
    }

    //get all listings from the listings table
    public function index($city = null, $cityCoordinates0 = null, $cityCoordinates1 = null, $type)
    {
        if ($type == 0) {
            $listings = Listing::query()->get();
        } else {
            $listings = Listing::query()->where("storage_type_id", $type)->get();
        }



        $distances = [];

        //latitude in both radians and degrees
        $location_lat = $cityCoordinates0;
        $location_lat_phi = $location_lat * pi() / 180;

        $location_lon = $cityCoordinates1;

        $earthRadius = 6371000;

        //calculating the distance between every listing and the specific location and inserting it to the array
        foreach ($listings as $listing) {

            $coordinates = explode(", ", $listing->coordinates);
            $listing_lat = $coordinates[0];
            $listing_lon = $coordinates[1];

            $listing_lat_phi = $listing_lat * pi() / 180;

            $difference_of_lats = ($listing_lat - $location_lat) * pi() / 180;
            $difference_of_lons = ($listing_lon - $location_lon) * pi() / 180;

            $a = sin($difference_of_lats / 2) ** 2 + cos($location_lat_phi) * cos($listing_lat_phi) * sin($difference_of_lons / 2) ** 2;

            $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

            $distance = $earthRadius * $c;

            $listing->distance = $distance;

            array_push($distances, $listing);
        }

        // dd($distances);

        //sorting the array based on the distance
        usort($distances, function ($listing1, $listing2) {
            if ($listing1->distance < $listing2->distance) {
                return -1;
            } elseif ($listing1->distance == $listing2->distance) {
                return 0;
            } elseif ($listing1->distance > $listing2->distance) {
                return 1;
            }
        });

        //returning only the first three listings
        $listings = array_slice($distances, 0, 15);

        return $listings;
    }

    /**
     * Accessing one specific listing by id
     *
     * @param $id
     * @return array
     */
    public function indexSingle($id)
    {
        $listing = Listing::findOrFail($id);

        $listing->country;
        $listing->city;
        $listing->pictures;
        $listing->storage_type;
        $listing->availabilities;
        $listing->bookings;
        $listing->user;
        $listing->user->person;
        $listing->reviews;

        foreach ($listing->reviews as $review) {
            $review->user;
        }


        return response($listing);
    }

    /**
     * add new listing to listing table
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {

        $listing = new Listing;

        $listing->user_id = $request->user_id;
        $listing->country_id = $request->country_id;
        $listing->city_id = $request->city_id;
        $listing->storage_type_id = $request->storage_type_id;
        $listing->address = $request->address;
        $listing->coordinates = $request->coordinates;
        $listing->description = $request->input("description");
        $listing->size = $request->input("size");
        $listing->daily_rate = $request->input("daily_rate");
        $listing->rating = $request->rating;
        $listing->review_count = 0;

        $listing->save();
        return response($listing);
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
        $listing->address = $request->address;
        $listing->description = $request->input("description");
        $listing->size = $request->input("size");
        $listing->daily_rate = $request->input("daily_rate");

        $listing->save();
        return response($listing);
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
        return response('Record Deleted');
    }

    /**
     * updating a rating for a specific listing from the listings table
     *
     * @param $listing_id
     * @param $operation (plus or minus)
     */

    public function updateRating($listing_id, $operation)
    {
        $listing = Listing::findOrFail($listing_id);

        //updating the count of reviews
        $count = intval($listing->review_count);

        if ($operation == "plus") {
            $count++;
        } elseif ($operation == "minus") {
            $count--;
        }

        $listing->review_count = $count;

        //updating the rating
        $reviews = $listing->reviews;

        $total = 0;

        foreach ($reviews as $review) {
            $total += intval($review->score);
        };

        if ($count == 0) {
            $listing->rating = 0;
        } else {
            $listing->rating = round($total / $count);
        }


        $listing->save();

        return $listing;
    }
}
