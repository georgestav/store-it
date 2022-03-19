<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feature;

class FeatureController extends Controller
{
    /**
     * Retrieve all features from database
     *
     * @return array|void
     */
    public function index()
    {
        $features = Feature::all();
        return $features;
    }

    /**
     * Store feature to database
     *
     * @param  mixed $request
     * @return object
     */
    public function store(Request $request)
    {
        $feature = new Feature();
        $feature->name = $request->name;
        $feature->save();
        return $feature;
    }

    /**
     * Update existing feature by id
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return object
     */
    public function update(Request $request, $id)
    {
        $feature = Feature::findOrFail($id);
        $feature->name = $request->name;
        $feature->save();
        return $feature;
    }

    /**
     * Delete a feature with id, returns the deleted feature
     *
     * @param  mixed $id
     * @return object
     */
    public function destroy($id)
    {
        $feature = Feature::findOrFail($id);
        $feature->delete();
        return $feature;
    }
}
