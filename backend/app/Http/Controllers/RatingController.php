<?php

namespace App\Http\Controllers;

use App\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function aboutRating()
    {
        return response()->json(Rating::select('*')->get(),200);
    }

    public function create(Request $request)
    {
        return Rating::create([
            'user_id' => $request->input('user_id'),
            'rating' => $request->input('rating'),
            'message' => $request->input('message'),
            'profolio_id' => $request->input('profolio_id')
        ]);
    }
    
    public function destroy(Request $request, Rating $rating)
        {
            $rating->delete();
            return response()->json(null, 204);
        }
}
