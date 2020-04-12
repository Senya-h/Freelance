<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\BanDeleteUser;
use App\User;
use App\RoleUser;

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
            BanDeleteUser::create([
                'user_id' => $id,
                'baned' => $request->input('baned'),
                'deleted' => $request->input('deleted'),
            ]);
            $role_user = RoleUser::where('user_id', $id);
            $role_user->delete();
            $user = User::find($id);
            $user->delete();
            return response()->json(null, 204);
        }
    }

    public function destroy(Request $request, $id)
    {
        $BanDeleteUser = BanDeleteUser::where('user_id', $id);
        $BanDeleteUser->delete();
        return response()->json(null, 204);
    }
}