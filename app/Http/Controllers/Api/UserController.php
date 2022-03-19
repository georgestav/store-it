<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Retrieve all Users
     *
     * @return array
     */
    public function indexAll()
    {
        $user = User::all();
        return $user;
    }

    /**
     * Retrieve single user by id
     *
     * @param  mixed $id
     * @return object
     */
    public function indexSingle($id)
    {
        $user = User::findOrFail($id);
        return $user;
    }

    /**
     * Store new user
     *
     * @param  mixed $request
     * @return object
     */
    public function store(Request $request)
    {
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->language_id = $request->language_id;
        $user->role_id = $request->role_id;

        $user->save();

        return $user;
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->language_id = $request->language_id;
        $user->role_id = $request->role_id;

        $user->save();

        return $user;
    }

    /**
     * Delete user by id
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}
