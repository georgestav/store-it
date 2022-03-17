<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();

        $roles = [
            [
                'id' => 1,
                'name' => 'admin'
            ],
            [
                'id' => 2,
                'name' => 'editor'
            ],
            [
                'id' => 3,
                'name' => 'host'
            ],
            [
                'id' => 4,
                'name' => 'user'
            ],
        ];

        foreach ($roles as $role) {
            Role::create([
                'name' => $role['name'],
            ]);
        }
    }
}
