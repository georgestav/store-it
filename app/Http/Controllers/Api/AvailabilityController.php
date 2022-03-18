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
}
