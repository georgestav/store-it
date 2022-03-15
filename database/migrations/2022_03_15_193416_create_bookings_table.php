<?php

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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('listing_id');
            $table->dateTimeTz('booked_from'); //The dateTimeTz method creates a DATETIME (with timezone)
            $table->dateTimeTz('booked_until'); //The dateTimeTz method creates a DATETIME (with timezone)
            $table->string('status', 100); // booking status, accepted, review, seen, applied etc, string so that it can be indexed
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
        Schema::dropIfExists('bookings');
    }
};
