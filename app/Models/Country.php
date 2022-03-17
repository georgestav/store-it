<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//relationships
use App\Models\Person;
use App\Models\City;
use App\Models\Listing;

class Country extends Model
{
    use HasFactory;

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    public function cities()
    {
        return $this->hasMany(City::class);
    }

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }
}
