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
}
