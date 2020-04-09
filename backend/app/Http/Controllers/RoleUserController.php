<?php

namespace App\Http\Controllers;

use App\RoleUser;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    public function aboutRoleUser($id)
    {
        return response()->json(RoleUser::select('*')->where('user_id',$id)->get(),200);
    }

    public function create(Request $request)
    {
        return Rating::create([
            'user_id' => $request->input('user_id'),
            'role_id' => $request->input('role_id'),
        ]);
    }

    public function store($title, $id)
    {
        $role = App\Role::where('role', $title)->first();
        $user = App\User::where('id', $id)->first();
        $role->users()->attach($user);
    }
}
