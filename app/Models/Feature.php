<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//relationships
use App\Models\Listing;

class Feature extends Model
{
    use HasFactory;

    public function listings()
    {
        return $this->belongsToMany(Listing::class);
    }
}
