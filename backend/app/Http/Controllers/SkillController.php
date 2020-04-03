<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Skill;
use App\SkillApproval;
use App\User;

class SkillController extends Controller
{
    public function index($id)
    {
        $skill = User::find($id);

        return $skill;
    }
    public function create(Request $request)
    {
        $skill = new SkillApproval;
        $skill->user_id = $request->user_id;
        $skill->skill_id = $request->skill_id;
        $skill->approved = 0;
        $skill->comment = '';
        $skill->save();
        return $skill;
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
}
