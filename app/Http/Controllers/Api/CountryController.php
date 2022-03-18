<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;
use DB;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::query()->orderBy("name", "asc")->get();

        return $countries;
    }
}
