<?php

/**
 * Create offers table is the table holding the offers created by hosts
 * specifing the overall available timeframe of a specific storage location 
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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id'); //foreignId pointing to listings table
            $table->dateTimeTz('offered_from'); //The dateTimeTz method creates a DATETIME (with timezone)
            $table->dateTimeTz('offered_until'); //The dateTimeTz method creates a DATETIME (with timezone)
            $table->timestamps(); //keeping the timestamps if we need to reference in the future the time an offer was made
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offers');
    }
};
