<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Availability;

class AvailabilityController extends Controller
{
    //get all availabilities from the availabilities table
    public function index()
    {
        $availabilities = Availability::query()->orderBy("available_from", "asc")->get();

        return $availabilities;
    }

    /**
     * add new availability to the listing table
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $availability = new Availability;

        $availability->listing_id = 3;
        $availability->available_from = $request->input("available_from");
        $availability->available_until = $request->input("available_until");

        $availability->save();
    }
}
