<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Country;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('countries')->truncate();

        $countries = [
            [
                'id' => 1,
                'name' => 'United Kingdom'
            ],
            [
                'id' => 2,
                'name' => 'Czech Republic'
            ],
            [
                'id' => 3,
                'name' => 'France'
            ],
        ];

        foreach ($countries as $country) {
            Country::create([
                'name' => $country['name'],
            ]);
        }
    }
}
