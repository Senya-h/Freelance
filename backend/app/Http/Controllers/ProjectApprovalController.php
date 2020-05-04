<?php

namespace App\Http\Controllers;

use App\ProjectApproval;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProjectApprovalController extends Controller
{
    public function index()
    {
        $project = ProjectApproval::all();
        return response()->json($project, 200);

    }

    public function create(Request $request)
    {

        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $project = new ProjectApproval;
        $project->user_id = auth()->user()->id;
        $project->work_id = $request->work_id;
        $project->approved = 0;
        $project->save();
        return response()->json($project);
    }

    public function update(Request $request, ProjectApproval $project)
    {
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
            $project->approved = $request->approved;
            $project->save();

        return response()->json($project);
    }

    public function delete(ProjectApproval $id)
    {
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $id->delete();
        return response()->json(["message" => "Projectas istrintas"]);
    }
}
