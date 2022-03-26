<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//relationships
use App\Models\City;
use App\Models\Country;
use App\Models\User;

class Person extends Model
{
    use HasFactory;


    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'phone',
        'address',
        'city_id',
        'city',
        'country_id',
        'user_id',
    ];
}
