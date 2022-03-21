<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        
        $users = [
            [
                'id' => 1,
                'name' => 'matej',
                "email" => "matej.basta@email.cz",
                "password" => "matejbasta",
                "language_id" => 1,
                "role_id" => 1

            ],
            [
                'id' => 2,
                'name' => 'george',
                "email" => "g.stavroulakis@gmail.com",
                "password" => "12345678",
                "language_id" => 1,
                "role_id" => 1
            ],
            [
                'id' => 3,
                'name' => 'sean',
                "email" => "beeredbeard@gmail.com",
                "password" => "matlocks",
                "language_id" => 1,
                "role_id" => 1
            ],
            [
                'id' => 4,
                'name' => 'editor',
                "email" => "editor@storeit.com",
                "password" => "12345678",
                "language_id" => 1,
                "role_id" => 2
            ],
            [
                'id' => 5,
                'name' => 'host',
                "email" => "host@storeit.com",
                "password" => "12345678",
                "language_id" => 1,
                "role_id" => 3
            ],
            [
                'id' => 6,
                'name' => 'user',
                "email" => "user@storeit.com",
                "password" => "12345678",
                "language_id" => 1,
                "role_id" => 4
            ],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                "email" => $user["email"],
                "password" => $user["password"],
                "language_id" => $user["language_id"],
                "role_id" => $user["role_id"]
            ]);
        }
    }
}
