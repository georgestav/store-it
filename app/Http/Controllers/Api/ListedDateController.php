<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ListedDate;

class ListedDateController extends Controller
{
    /**
     * get all listedDates from the listed_dates table
     * 
     * @param $listing_id
     */
    public function index($listing_id)
    {
        $listed_dates = ListedDate::query()->where("listing_id", $listing_id)->limit(1)->get();

        return $listed_dates;
    }

    /**
     * add new listedDates to the listed_dates table
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $lisitng_id
     */
    public function store(Request $request, $listing_id)
    {
        $listed_dates = new ListedDate;

        $listed_dates->listing_id =$listing_id;
        $listed_dates->listed_from = $request->input("listed_from");
        $listed_dates->listed_until = $request->input("listed_until");

        $listed_dates->save();
    }

     /**
     * updating a specific listedDates in the listed_dates table
     *
     * @param  \Illuminate\Http\Request  $request
     * @param $id
     * @param $listing_id
     */
    public function update(Request $request, $id, $listing_id)
    {
        $listed_dates = ListedDate::findOrFail($id);
        $listed_dates->lisitng_id = $listing_id;
        $listed_dates->listed_from = $request->input("listed_from");
        $listed_dates->listed_until = $request->input("listed_until");

        $listed_dates->save();
    }

    /**
     * deleting a specific listedDates from the listed_dates table
     *
     * @param $id
     */
    public function destroy($id)
    {
        $listed_dates = ListedDate::findOrFail($id);

        $listed_dates->delete();
    }
}
