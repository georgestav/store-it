<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Availability;

class BookingController extends Controller
{
    
    /**
     * Get all bookings from booking table by a specific user
     *
     * @param  mixed $user_id
     * @return void
     */
    public function indexUserBookings($user_id, $listing_id)
    {
        $bookings = Booking::where('user_id', $user_id)->where("listing_id", $listing_id)->get();
        return $bookings;
    }
    
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
     */
    public function store(Request $request)
    {
        //accessing all bookings for the specific listing
        $all_bookings = Booking::query()->where("listing_id", $request->input("listing_id"))->where("status", "accepted")->get();
        //accessing availability for the specific listing
        $availability = Availability::query()->where("listing_id", $request->input("listing_id"))->first();

        $available_start = strtotime($availability->available_from);
        $available_end = strtotime($availability->available_until);
        $booking_start = strtotime($request->input("booked_from"));
        $booking_end = strtotime($request->input("booked_until"));

        //check, whether the start date is before the end date
        if ($booking_start > $booking_end) {
            return "false order";
        }

        //check, whether the listing is available in the period
        if (!($booking_start >= $available_start && $booking_start <= $available_end) || !($booking_end >= $available_start) && ($booking_end <= $available_end)) {
            return "false";
        }

        //check, whether the there are no other bookings in the period
        $overlap = false;
        foreach ($all_bookings as $old) {
            $old_start = strtotime($old->booked_from);
            $old_end = strtotime($old->booked_until);

            if (($booking_start <= $old_end) && ($booking_end >= $old_start)) {
                $overlap = true;
                break;
            }
        }

        if ($overlap) {
            return "false";
        }


        $booking = new Booking;

        $booking->user_id = $request->input("user_id");
        $booking->listing_id = $request->input("listing_id");
        $booking->booked_from = $request->input("booked_from");
        $booking->booked_until = $request->input("booked_until");
        $booking->status = $request->input("status");

        $booking->save();

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
        $booking = Booking::findOrFail($id);

        $booking->listing_id = $listing_id;
        $booking->booked_from = $request->input("booked_from");
        $booking->booked_until = $request->input("booked_until");
        $booking->status = "confirmed";

        $booking->save();
    }

    public function updateById(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $booking->listing_id = $request->input("listing_id");
        $booking->booked_from = $request->input("booked_from");
        $booking->booked_until = $request->input("booked_until");
        $booking->status = $request->status;

        $booking->save();
        return response($booking);
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
        return response('Booking Deleted');
    }
}
