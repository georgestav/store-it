<?php

/**
 * Saving pictures to database by converting them to binary data, currently limit is set to 1024 kilobytes or 1mb
 * validating for image type, allowed types are jpeg, jpg, png
 *
 * redirecting to homepage if fail
 */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Picture;

class PictureController extends Controller
{
    /**
     * Retrieve all pictures of a listing
     *
     * @param  int $listing_id
     * @return array
     */
    public function indexListing($listing_id)
    {
        $pictures = Picture::query()->where('listing_id', $listing_id)->get();

        //$pictures is an array, loop over the array
        //<img src='data:image/jpeg;base64,{$picture->photo}' /> to call an image in the front end
        return $pictures;
    }

    /**
     * Store an image to the database
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        /*
        keep them for testing
        $picture_size = $request->file('photo')->getSize();
        $picture_extension = $request->file('photo')->getClientOriginalExtension();
        $picture_filename = $request->file('photo')->getClientOriginalName();
        */

        $request->validate([
            'photo' => 'bail|required|mimes:jpeg,png,jpg|max:1024' //validation for image type and size
        ]);

        $picture = new Picture();
        $picture->listing_id = $request->listing_id; //passing the listing_id number

        $path = $request->file('photo')->getRealPath(); //get the the path to tmp location of image on users system
        $image = file_get_contents($path); //get the contents of the file
        $base64 = base64_encode($image); //convert the image to binary data

        $picture->photo = $base64; // pass the binary data to picture model
        $picture->name = $request->file('photo')->getClientOriginalName(); // pass the filename to the picture model
        $picture->save();
        return response('success image saved');
    }

    /**
     * Delete image with id
     *
     * @param  mixed $id
     * @return string
     */
    public function destroy($id)
    {
        $picture = Picture::findOrFail($id);
        $picture->delete();
        return response('image deleted');
    }
}
