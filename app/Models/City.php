<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//relationships
use App\Models\Person;
use App\Models\Country;
use App\Models\Listing;

class City extends Model
{
    use HasFactory;

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }
}
