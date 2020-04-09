<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Admin extends Controller
{
    public function create(Request $request)
    {
        if($request->input('baned') == 1){
            return BanDeleteUser::create([
                'user_id' => $request->input('user_id'),
                'baned' => $request->input('baned'),
                'deleted' => $request->input('deleted'),
            ]);
        }else('deleted' => $request->input('deleted' == 1)){
                
        }
}
