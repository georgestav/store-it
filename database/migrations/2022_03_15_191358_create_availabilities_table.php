<?php

/**
 * Availabilities table is keeping the availability of a certain storage location
 * if storage is offered from 01/01/2023 to 31/12/2024 and is booked for a month in February
 * it will create two rows 01/01/2023 to 31/01/2023 and 01/03/2023 to 31/12/2024.
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('availabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id'); //foreignId pointing to listings table
            $table->dateTimeTz('available_from'); //The dateTimeTz method creates a DATETIME (with timezone)
            $table->dateTimeTz('available_until'); //The dateTimeTz method creates a DATETIME (with timezone)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('availabilities');
    }
};
