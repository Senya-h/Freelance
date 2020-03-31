<?php

namespace App\Http\Controllers;

use App\Role;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function aboutRole()
    {
        return response()->json(Role::select('*')->get(),200);
    }

    public function aboutRoleUser()
    {
        return response()->json(Role::select('*')->where('usre_id',$id)->get(),200);
    }

    public function create(Request $request)
    {
        return Rating::create([
            'user_id' => $request->input('user_id'),
            'role_id' => $request->input('role_id'),
        ]);
    }
}
