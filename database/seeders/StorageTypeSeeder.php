<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\StorageType;
use Illuminate\Support\Facades\DB;

class StorageTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('storage_types')->truncate();

        $storage_types = [
            [
                'name' => 'attic'
            ],
            [
                'name' => 'basement'
            ],
            [
                'name' => 'room'
            ],
            [
                'name' => 'garage'
            ],
            [
                'name' => 'locker'
            ],
        ];

        foreach ($storage_types as $storage_type) {
            StorageType::create([
                'name' => $storage_type['name'],
            ]);
        }
    }
}
