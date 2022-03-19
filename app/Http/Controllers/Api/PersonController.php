<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Person;

class PersonController extends Controller
{
    /**
     * Retrieve all People
     *
     * @return array
     */
    public function indexAll()
    {
        $people = Person::all();
        return $people;
    }

    /**
     * Retrieve single person by id
     *
     * @param  int $id
     * @return object
     */
    public function indexSingle($id)
    {
        $person = Person::findOrFail($id);
        return $person;
    }

    /**
     * Save new person to database
     *
     * @param  mixed Illuminate\Http\Request $request
     * @return object
     */
    public function store(Request $request)
    {
        $person = new Person();
        $person->name = $request->name;
        $person->surname = $request->surname;
        $person->phone = $request->phone;
        $person->address = $request->address;
        $person->city_id = $request->city_id;
        $person->country_id = $request->country_id;
        $person->user_id = $request->user_id;

        $person->save();

        return $person;
    }

    /**
     * Update person by id
     *
     * @param  mixed Illuminate\Http\Request $request
     * @param  int $id
     * @return object
     */
    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $person->name = $request->name;
        $person->surname = $request->surname;
        $person->phone = $request->phone;
        $person->address = $request->address;
        $person->city_id = $request->city_id;
        $person->country_id = $request->country_id;
        $person->user_id = $request->user_id;

        $person->save();

        return $person;
    }

    /**
     * Delete person by id
     *
     * @param  int $id
     * @return void
     */
    public function destroy($id)
    {
        $user = Person::findOrFail($id);
        $user->delete();
    }
}
