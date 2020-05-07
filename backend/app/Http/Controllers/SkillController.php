<?php

namespace App\Http\Controllers;

use App\Comments;
use App\PortfolioWorks;
use Illuminate\Http\Request;
use App\Skill;
use App\SkillUser;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use App\User;
use Illuminate\Support\Facades\DB;

class SkillController extends Controller
{

    public function create(Request $request, SkillUser $skillas)
    {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skillArr = $request->all();
        $loopLenght = count($skillArr);
        SkillUser::where('user_id',auth()->user()->id)->delete();
        for ($i = 0; $i < $loopLenght; $i++){
                $skill = new SkillUser;
                $skill->user_id = auth()->user()->id;
                $skill->skill_id = $skillArr[$i];
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
    
}
