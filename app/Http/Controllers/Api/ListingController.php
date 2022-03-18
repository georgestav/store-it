<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Listing;

class ListingController extends Controller
{
    public function index() {
        $listings = Listing::query()->get();

        return $listings;
    }

    public function store(Request $request) {
        
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
}
