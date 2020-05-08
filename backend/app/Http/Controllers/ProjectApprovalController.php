<?php

namespace App\Http\Controllers;

use App\ProjectApproval;
use App\PortfolioWorks;
use App\Message;
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
        $validation = Validator::make($request->all(),[
            'work_id' => 'required|unique:project_approval'

        ]);
        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        }
        else{
                $project = new ProjectApproval;
                $project->user_id = auth()->user()->id;
                $project->work_id = $request->work_id;
                $project->approved = 1;
                $project->save();
            

                $receiver = PortfolioWorks::where('portfolio_works.id',intval($project->work_id))
                                        ->join('users','portfolio_works.user_id','users.id')
                                        ->first(); 
                $client = User::where('id',auth()->user()->id)
                            ->first();
                Message::create([
                    'senders_id' => 1,
                    'receivers_id' => $receiver->id,
                    'message' => 'Jūsų darbo('.$receiver->title.') nuosavybę patvirtino('.$client->name.').',
                ]);

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
