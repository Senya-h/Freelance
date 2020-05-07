<?php

namespace App\Http\Controllers;

use App\SkillApprove;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Gate;

class SkillApproveController extends Controller
{

    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        $all = SkillApprove::where('author_id', auth()->user()->id)
                            ->where('skill_id', $request->input('skill_id'))
                            ->where('user_id', $request->input('user_id'))
                            ->get();
        $allCount = count($all);
        $limit = 1;
        if ($allCount >= $limit) {
            return response()->json(['error'=>['limit'=>1]], 400);
        } else {
            $validation = Validator::make($request->all(),[
                'rating' => 'required|integer|max:5',
                'comment' => 'required',
                'user_id' => 'required',
                'skill_id' => 'required',
            ]);
            if ($validation->fails()) {
                return response()->json(["error" => $validation->errors()]);
            } else {
                $newSkillRate = SkillApprove::create([
                    'rating' => $request->input('rating'),
                    'comment' => $request->input('comment'),
                    'user_id' => $request->input('user_id'),
                    'skill_id' => $request->input('skill_id'),
                    'author_id' => auth()->user()->id
                ]);
            }
            return response()->json($newSkillRate, 201);
        }
    }
    public function list($skill_id, $user_id) {
        $list = SkillApprove::select('skill_approves.*', 'users.name as authorName','users.foto as authorFoto')
                            ->join('users','users.id','skill_approves.author_id')
                            ->where('skill_id', $skill_id)
                            ->where('user_id', $user_id)
                            ->get();
        return response()->json($list, 200);
    }
    public function delete($skill_id,$user_id) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skill = SkillApprove::select('*')
                            ->where('author_id', auth()->user()->id)
                            ->where('user_id',$user_id)
                            ->where('skill_id',$skill_id)
                            ->first();
        if (Gate::allows('skill-approve', $skill)) {
            $skill->delete();
        } else if (Gate::denies('skill-approve', $skill)) {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Atsiliepimas pašalintas"], 200);
    }
    public function update(Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skill = SkillApprove::select('*')
                            ->where('author_id', auth()->user()->id)
                            ->where('user_id',$request->input('user_id'))
                            ->where('skill_id',$request->input('skill_id'))
                            ->first();
        if (Gate::allows('skill-approve', $skill)) {
            $updated = SkillApprove::where('author_id', auth()->user()->id)
                                    ->where('user_id',$request->input('user_id'))
                                    ->where('skill_id',$request->input('skill_id'))
                                    ->update($request->except(['_token']));
        } else if (Gate::denies('skill-approve', $skill)) {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
            return response()->json($updated, 200);
    }

}
