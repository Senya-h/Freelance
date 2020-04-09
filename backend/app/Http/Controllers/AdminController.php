<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\BanDeleteUser;
use App\User;

class AdminController extends Controller
{
    public function create(Request $request,$id)
    {
        if($request->input('baned') == 1){
            return BanDeleteUser::create([
                'user_id' => $id,
                'baned' => $request->input('baned'),
                'deleted' => $request->input('deleted'),
            ]);
        }else if($request->input('deleted') == 1){
            $user = User::find($id);
            $user->delete();
            return response()->json(null, 204);
        }
        
    }
}