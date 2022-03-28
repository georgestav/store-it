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
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->foreignId("country_id");
            $table->foreignId("city_id");
            $table->foreignId("storage_type_id");
            $table->string("coordinates");
            $table->text('address');
            $table->text("description");
            $table->integer("size");
            $table->float("daily_rate", 8, 2);
            $table->integer("rating");
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
        Schema::dropIfExists('listings');
    }
};
