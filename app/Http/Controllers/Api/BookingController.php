<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    //get all bookings from the bookings table
    public function index()
    {
        $bookings = Booking::query()->orderBy("booked_from", "asc")->get();

        return $bookings;
    }

    /**
     * add new booking to the bookings table
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $booking = new Booking;

        $booking->user_id = 1;
        $booking->listing_id = 3;
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
     */
    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

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
