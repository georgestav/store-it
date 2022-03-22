<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ListingController extends Controller
{
    public function showResults($search = null)
    {
        /**
         * if there is no location provided, the app will look at the current location of the user
         * and display the nearest results
         */
        
        $location = $search;

        return view("results.results", compact("location"));
    }
}
