<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Availability;

class AvailabilityController extends Controller
{
    /**
     * get all availabilities from the availabilities table
     * 
     * @param $listing_id
     */
    public function index($listing_id)
    {
        $availabilities = Availability::query()->orderBy("available_from", "asc")->where("listing_id", $listing_id)->get();

        return $availabilities;
    }

    /**
     * add new availability to the availabilities table
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $lisitng_id
     */
    public function store(Request $request, $listing_id)
    {
        $availability = new Availability;

        $availability->listing_id = $listing_id;
        $availability->available_from = $request->input("available_from");
        $availability->available_until = $request->input("available_until");

        $availability->save();
        return $availability;
    }

    /**
     * updating a specific availability in the availabilities table
     *
     * @param  \Illuminate\Http\Request  $request
     * @param $id
     * @param $listing_id
     */
    public function update(Request $request, $id, $listing_id)
    {
        $availability = Availability::findOrFail($id);
        $availability->lisitng_id = $listing_id;
        $availability->available_from = $request->input("available_from");
        $availability->available_until = $request->input("available_until");

        $availability->save();
    }

    /**
     * deleting a specific availability from the availabilities table
     *
     * @param $id
     */
    public function destroy($id)
    {
        $availability = Availability::findOrFail($id);

        $availability->delete();
    }
}
