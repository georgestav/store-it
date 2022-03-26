<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StorageType;

class StorageTypeController extends Controller
{
    /**
     * Get all storage types from reviews table
     *
     * @return array
     */
    public function index()
    {
        $storage_type = StorageType::all();
        return $storage_type;
    }
}
