<?php

namespace App\Http\Controllers;

use App\RoleUser;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    public function index()
    {
        return RoleUser::all();
    }

    public function store($title, $id)
    {
        $role = App\Role::where('role', $title)->first();
        $user = App\User::where('id', $id)->first();
        $role->users()->attach($user);
    }
}
