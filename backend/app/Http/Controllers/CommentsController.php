<?php

namespace App\Http\Controllers;

use App\Comments;
use App\Skill;
use App\SkillApproval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class CommentsController extends Controller
{
    public function index()
    {
            $comment = Comments::all();
            return response()->json($comment,200);
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
        $comment->receiver_id = $request->receiver_id;
        $comment->rating = $request->rating;
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
        return response()->json(['message' => 'Comenteras atnaujintas'], 200);
    }

    public function delete(Comments $id)
    {
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if (Gate::allows('commentDelete', $id)) {
            $id->delete();
        } else if (Gate::denies('commentDelete', $id)) {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(['message' => 'Comment Deleted'], 200);
    }
}