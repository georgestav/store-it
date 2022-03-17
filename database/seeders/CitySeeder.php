<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\City;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cities')->truncate();

        $cities = [
            [
                'id' => 1,
                'name' => 'Prague',
                'country_id' => 2
            ],
            [
                'id' => 2,
                'name' => 'Paris',
                'country_id' => 3
            ],
            [
                'id' => 3,
                'name' => 'London',
                'country_id' => 1
            ],
            [
                'id' => 4,
                'name' => 'Brno',
                'country_id' => 2
            ],
        ];

        foreach ($cities as $city) {
            City::create([
                'name' => $city['name'],
                'country_id' => $city['country_id'],
            ]);
        }
    }
}
