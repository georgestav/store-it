<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Language;
use Illuminate\Support\Facades\DB;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->truncate();
        $languages = [
            [
                'id' => 1,
                'name' => 'English'
            ],
            [
                'id' => 2,
                'name' => 'Czech'
            ],
            [
                'id' => 3,
                'name' => 'French'
            ],
        ];

        foreach ($languages as $language) {
            Language::create([
                'name' => $language['name'],
            ]);
        }
    }
}
