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
}
