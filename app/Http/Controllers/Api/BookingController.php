<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    /**
     * get all bookings from the bookings table
     * 
     * @param $listing_id
     */
    public function index($listing_id)
    {
        $bookings = Booking::query()->orderBy("booked_from", "asc")->where("listing_id", $listing_id)->get();

        return $bookings;
    }

    /**
     * add new booking to the bookings table
     *
     * @param  \Illuminate\Http\Request  $request
     * @param $listing_id
     */
    public function store(Request $request, $listing_id)
    {
        $booking = new Booking;

        $booking->user_id = 1;
        $booking->listing_id = $listing_id;
        $booking->booked_from = $request->input("booked_from");
        $booking->booked_until = $request->input("booked_until");
        $booking->status = "not-confirmed";

        $booking->save();
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
        $booking = Booking::findOrFail($id);

        $booking->listing_id = $listing_id;
        $booking->booked_from = $request->input("booked_from");
        $booking->booked_until = $request->input("booked_until");
        $booking->status = "confirmed";

        $booking->save();
    }

    /**
     * deleting a specific availability from the availabilities table
     *
     * @param $id
     */
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->delete();
    }
}
