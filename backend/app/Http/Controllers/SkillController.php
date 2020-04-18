<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Skill;
use App\SkillApproval;
use Illuminate\Support\Facades\Validator;
use App\User;
use Illuminate\Support\Facades\DB;

class SkillController extends Controller
{
    public function index()
    {
        return DB::table("users")
            ->join('user_skill','user_skill.user_id','users.id')
            ->join('skill','skill.id','user_skill.skill_id')
            ->get();

    }
    public function create(Request $request)
    {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skill = new SkillApproval;
        $skill->user_id = auth()->user()->id;
        $skill->skill_id = $request->skill_id;
        $skill->approved = 0;
        $skill->comment = '';
        $skill->save();
        DB::table("users")
            ->join('user_skill','user_skill.user_id','users.id')
            ->join('skill','skill.id','user_skill.skill_id')
            ->get();

        return response()->json(["message" => "Skill pridėtas"]);
    }

    public function update(Request $request,SkillApproval $skill)
    {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skill->approved = $request->approved;
        $skill->comment = $request->comment;
        $skill->save();

    }

    public function delete(SkillApproval $id)
    {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if (Gate::allows('authorization', $id)) {
            $id->delete();
        } else if (Gate::denies('authorization', $id)) {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }

    }
    public function addSkill(Request $request)
    {
        /*try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }*/
        $validation = Validator::make($request->all(),[
            'skillName' => ['required', 'string', 'max:255', 'unique:skill'],
        ]);
        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        } else {
            $skill = new Skill;
            $skill->skillName = $request->skillName;
            $skill->save();
            return response()->json(["SkillName"=>$skill->skillName]);
        }
    }
    public function skillsList() {
        $skills = Skill::all();
        return response()->json($skills,200);
    }
    public function skillDelete(Skill $skill) {
        $skill->delete();
        return response()->json(["message"=>"Ištrinta"],200);
    }
}
