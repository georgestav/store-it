<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Feature;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //todo #1 see why it fails to write to db
        // DB::table('features')->truncate();

        // $features = [
        //     [
        //         'name' => 'dehumidifier'
        //     ],
        //     [
        //         'name' => 'basement'
        //     ],
        //     [
        //         'name' => 'light'
        //     ],
        //     [
        //         'name' => 'cooled'
        //     ],
        //     [
        //         'name' => 'high ceiling'
        //     ],
        // ];

        // foreach ($features as $feature) {
        //     Feature::create([
        //         'name' => $feature['name'],
        //     ]);
        // }
    }
}
