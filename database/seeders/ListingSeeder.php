<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Listing;
use Illuminate\Support\Facades\DB;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('listings')->truncate();

        $listings = [
            [
                'user_id' => 3,
                "country_id" => 58,
                "city_id" => 1,
                "storage_type_id" => 1,
                "coordinates" => "50.086020, 14.418291",
                "address" => "Perlová 5, 110 00 Staré Město",
                "description" => "We have one spot open in our private garage. It’s a safe and great neighborhood. It can fit approx 20-30 boxes or 1 car. It's a private space, clean and quiet.",
                "size" => 20,
                "daily_rate" => 1.3,
                "rating" => 0,
                "reviews" => 0,
            ],
            [
                'user_id' => 5,
                "country_id" => 58,
                "city_id" => 1,
                "storage_type_id" => 1,
                "coordinates" => "50.0968068969622, 14.406639109764388",
                "address" => "Perlová 5, 110 00 Staré Město",
                "description" => "We have a few spaces at our apartment, we have security and someone is offen here to watch.",
                "size" => 43,
                "daily_rate" => 2.7,
                "rating" => 0,
                "reviews" => 0,
            ],
            [
                'user_id' => 2,
                "country_id" => 58,
                "city_id" => 1,
                "storage_type_id" => 2,
                "coordinates" => "50.10956873113696, 14.509126316135127",
                "address" => "Perlová 5, 110 00 Staré Město",
                "description" => "This garage is perfect for all sizes. Located in the heart of Deep Ellum, walking distance from a variety of restaurants and local shops/attractions. I know it must b a hassle finding parking meters and wondering if your car will be there when you get back. This space will give you security and lots of free time to do what you want, when you want.",
                "size" => 21,
                "daily_rate" => 2,
                "rating" => 0,
                "reviews" => 0,
            ],
            [
                'user_id' => 1,
                "country_id" => 58,
                "city_id" => 4,
                "storage_type_id" => 1,
                "coordinates" => "49.20541550901333, 16.591863413562354",
                "address" => "Perlová 5, 110 00 Staré Město",
                "description" => "Mi casa es tu casa.",
                "size" => 15,
                "daily_rate" => 7.8,
                "rating" => 0,
                "reviews" => 0,
            ],
            [
                'user_id' => 5,
                "country_id" => 58,
                "city_id" => 4,
                "storage_type_id" => 2,
                "coordinates" => "49.19157528098001, 16.564066323361132",
                "address" => "Perlová 5, 110 00 Staré Město",
                "description" => "This space can accommodate a large car or truck, and is in the front of my house. I'm usually home and can keep watch of your property. Access 24/7. Just let me know what you're looking to store and we can make it happen. Contact me for details.",
                "size" => 23,
                "daily_rate" => 0.9,
                "rating" => 0,
                "reviews" => 0,
            ],
        ];

        foreach ($listings as $listing) {
            Listing::create([
                'user_id' => $listing['user_id'],
                'country_id' => $listing['country_id'],
                'city_id' => $listing['city_id'],
                'storage_type_id' => $listing['storage_type_id'],
                'coordinates' => $listing['coordinates'],
                'address' => $listing['address'],
                'description' => $listing['description'],
                'size' => $listing['size'],
                'daily_rate' => $listing['daily_rate'],
                'rating' => $listing['rating'],
                "review_count" => $listing["reviews"],
                
            ]);
        }
    }
}
