<?php

namespace App\Http\Controllers;

use App\Comments;
use App\PortfolioWorks;
use Illuminate\Http\Request;
use App\Skill;
use App\SkillApproval;
use App\SkillUser;
use Illuminate\Support\Facades\Gate;
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
    public function create(Request $request, SkillApproval $skillas)
    {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skillArr = $request->all();
        $loopLenght = count($skillArr);
        SkillApproval::where('user_id',auth()->user()->id)->delete();
        for ($i = 0; $i < $loopLenght; $i++){
                $skill = new SkillApproval;
                $skill->user_id = auth()->user()->id;
                $skill->skill_id = $skillArr[$i];
                $skill->approved = 0;
                $skill->comment = '';
                $skill->save();

        }


        return response()->json(["message" => "Skill pridėtas"]);
    }
    
    public function skillsList() {
        $skills = Skill::all();
        return response()->json($skills,200);
    }
    public function skillDelete(Skill $skill) {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skill->delete();
        return response()->json(["message"=>"Ištrinta"],200);
    }
    public function aboutSkillUser($id)
        {
            return response()->json(SkillUser::select('*')->where('user_id',$id)->get(),200);
        }

    public function SkillApproval(Request $request, $skill_id, $user_id)
    {
        $skill = Skill::where('id', $skill_id)->first();
        $user = User::where('id', $user_id)->first();
        $skill->users()->attach($user);
        $validatedData = $request->validate([
            'approved' => 'required'
        ]);
        SkillUser::where('user_id', $user_id)->where('skill_id', $skill_id)->update(['approved' => $request->input('approved')]);
        return response()->json(["message" => "Skilas sekmingai patvirtintas",200]);
    }
    
}
