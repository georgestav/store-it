<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//relationships
use App\Models\Listing;

class ListedDate extends Model
{
    use HasFactory;

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
}
