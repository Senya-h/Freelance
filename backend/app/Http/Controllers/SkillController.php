<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Skill;
use App\SkillApproval;
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


        $skill = new SkillApproval;
        $skill->user_id = $request->user_id;
        $skill->skill_id = $request->skill_id;
        $skill->approved = 0;
        $skill->comment = '';
        $skill->save();
        return DB::table("users")
            ->join('user_skill','user_skill.user_id','users.id')
            ->join('skill','skill.id','user_skill.skill_id')
            ->get();
    }

    public function update(Request $request,SkillApproval $skill)
    {

        $skill->approved = $request->approved;
        $skill->comment = $request->comment;
        $skill->save();
        return $skill;
    }

    public function delete(SkillApproval $id)
    {
        $id->delete();
        return $id;
    }
    public function addSkill(Request $request)
    {
        $skill = new Skill;
        $skill->skill_Pavadinimai = $request->skill_Pavadinimai;
        $skill->save();
        return $skill;
    }
}
