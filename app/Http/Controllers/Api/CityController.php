<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\City;

class CityController extends Controller
{
    /**
     * Get all cities from cities table
     */
    public function index($name = null)
    {
        $builder = City::query()->orderBy("name", "asc");

        if ($name) {
            $builder->where("name", $name)->limit(1);
        }

        $cities = $builder->get();

        return $cities;
    }

    public function findbyid($id)
    {
        /**
         * If passed $id is not a number return
         * 406 Not Acceptable
         */
        if (!ctype_digit($id)) {
            return response('Input is not a valid city id', 406);
        }
        $builder = City::findOrFail($id);

        return $builder;
    }

    /**
     * Add new city to cities table
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $city = new City();
        $city->name = $request->name;
        $city["country_id"] = '1';
        $city->save();
    }

    /**
     * Update existing city in cities table
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Request  $id
     */
    public function update(Request $request, $id)
    {
        $city = City::find($request->id);
        $city->name = $request->name;
        $city->save();
    }

    /**
     * Delete city from cities table
     *
     * @param id
     */
    public function destroy($id)
    {
        $city = City::find($id);
        $city->delete();
    }
}
