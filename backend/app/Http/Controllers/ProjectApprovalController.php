<?php

namespace App\Http\Controllers;

use App\PortfolioWorks;
use App\ProjectApproval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProjectApprovalController extends Controller
{
    public function index()
    {
        return DB::table("project_approval");


    }

    public function create(Request $request)
    {

        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }

        $validation = Validator::make($request->all(), [
            'file' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        } elseif ($request->file('file')) {
            $path = $request->file('file')->store('public/ProjectImages');
            $filename = str_replace('public/', "", $path);
            $project = new ProjectApproval;
            $project->user_id = auth()->user()->id;
            $project->work_id = $request->work_id;
            $project->file = $filename;
            $project->comment = $request->comment;
            $project->approved = 0;
            $project->save();
        } else {
            $project = new ProjectApproval;
            $project->user_id = auth()->user()->id;
            $project->work_id = $request->work_id;
            $project->comment = $request->comment;
            $project->approved = 0;
            $project->save();
        }

        return response()->json($project);
    }

    public function update(Request $request, ProjectApproval $project)
    {
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $validation = Validator::make($request->all(), [
            'file' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);



        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        } if ($request->has('file')) {

            $deletefile = $project->file;
            Storage::disk('public')->delete($deletefile);
            $path = $request->file('file')->store('public/ProjectImages');
            $filename = str_replace('public/', "", $path);
            $project = new ProjectApproval;
            $project->file = $filename;
            $project->comment = $request->comment;
            $project->approved = $request->approved;
            $project->work_id = $request->work_id;
            $project->save();
        } else {
            $project->comment = $request->comment;
            $project->approved = $request->approved;
            $project->work_id = $request->work_id;
            $project->save();
        }

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
