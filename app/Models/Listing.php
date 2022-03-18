<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//relationships
use App\Models\User;
use App\Models\Country;
use App\Models\City;
use App\Models\ListedDate;
use App\Models\Availability;
use App\Models\Picture;
use App\Models\Review;
use App\Models\Feature;
use App\Models\Booking;
use App\Models\StorageType;

class Listing extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function listedDate()
    {
        return $this->hasOne(ListedDate::class);
    }

    public function availabilities()
    {
        return $this->hasMany(Availability::class);
    }

    public function pictures()
    {
        return $this->hasMany(Picture::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function storage_type()
    {
        return $this->belongsTo(StorageType::class);
    }
}
