<?php

namespace App\Http\Controllers;

use App\RoleUser;
use App\Role;
use App\User;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    public function aboutRoleUser($id)
    {
        if($request->user()->authorizeRoles('Admin')){
            return response()->json(RoleUser::select('*')->where('user_id',$id)->get(),200);
        }
    }

    public function store(Request $request, $role_id, $user_id)
    {
        if($request->user()->authorizeRoles('Admin')){
            $role = Role::where('id', $role_id)->first();
            $user = User::where('id', $user_id)->first();
            $role->users()->attach($user);
            return response()->json(["message" => "Role sekmingai prideta",200]);
        }
    }
}
