<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;
use DB;

class CountryController extends Controller
{

    //get all countries from the countries table
    public function index()
    {
        $countries = Country::query()->orderBy("name", "asc")->get();

        return $countries;
    }

    public function findbyid($id)
    {
        /**
         * If passed $id is not a number return
         * 406 Not Acceptable
         */
        if (!ctype_digit($id)) {
            return response('Input is not a valid country id', 406);
        }
        $builder = Country::findOrFail($id);

        return $builder;
    }
}
