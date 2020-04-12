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
            if (Gate::allows('authorization', $work)) {
                $rating->delete();
            } else if (Gate::denies('authorization', $work)){
                return response()->json(["error" => "Jūs neturite teisės"]);
            }
            return response()->json(["message" => "Reitingas pašalintas"]);
        }
}
