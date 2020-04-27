<?php

namespace App\Http\Controllers;

use App\Comments;
use App\SkillApproval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class CommentsController extends Controller
{
    public function index()
    {
        return DB::table("Comments");

    }
    public function create(Request $request, Comments $comment)
    {
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $comment = new Comments;
        $comment->comment = $request->comment;
        $comment->user_id = auth()->user()->id;
        $comment->save();
        return response()->json(["message" => "Pakomentuota"], 200);
    }

    public function update(Request $request, Comments $comment)
    {
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }

        $comment->comment = $request->comment;
        $comment->save();
        return response()->json(['error' => 'Comenteras atnaujintas'], 200);
    }

    public function delete(Comments $id)
    {
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if (Gate::allows('authorization', $id)) {
            $id->delete();
        } else if (Gate::denies('authorization', $id)) {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(['error' => 'Comment Deleted'], 200);
    }
}
