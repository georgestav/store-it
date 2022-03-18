<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    /**
     * Get all reviews from reviews table
     *
     * @param  mixed $listing_id
     * @return void
     */
    public function index($listing_id)
    {
        $reviews = Review::all();
        return $reviews;
    }

    /**
     * Add new review to reviews table
     *
     * @param  mixed $request
     * @param  mixed $listing_id
     * @return void
     */
    public function store(Request $request, $listing_id)
    {
        $review = new Review();
        $review->listing_id = $listing_id;
        $review->user_id = $request->user_id;
        $review->text = $request->text;
        $review->score = $request->score;
        $review->save();
    }


    /**
     * Update existing review in reviews table
     *
     * @param  mixed $request
     * @param  mixed $listing_id
     * @param  mixed $id
     * @return void
     */
    public function update(Request $request, $listing_id, $id)
    {
        $review = Review::findOrFail($id);
        $review->listing_id = $listing_id;
        $review->user_id = $request->user_id;
        $review->text = $request->text;
        $review->score = $request->score;
        $review->save();
    }

    /**
     * Delete review from reviews table
     *
     * @param id
     */
    public function destroy($id)
    {
        // dd($id);
        $review = Review::findOrFail($id);
        $review->delete();
    }
}
