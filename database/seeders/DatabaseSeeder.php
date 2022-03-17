<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CitySeeder::class);
        $this->call(CountrySeeder::class);
        $this->call(FeatureSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(LanguageSeeder::class);
    }
}
