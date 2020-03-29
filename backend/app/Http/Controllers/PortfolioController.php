<?php

namespace App\Http\Controllers;

use App\Portfolio;
use App\User;
use App\Message;
use App\Role;
use App\Rating;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function create(Request $request) {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        return Portfolio::create([
            'description' => $request->input('description'),
            'skills' => $request->input('skills'),
            'services' => $request->input('services'),
            'price_per_hour' => $request->input('price_per_hour'),
            'status' => 0,
            'user_id' => $request->input('user_id'),
        ]);
    }
    /*User INFO (PO ROLIU UPDATE NEBEVEIKIA.ATNAUJINSIU)  */
    public function aboutUser(User $user, $id) {
        $role_id = User::select('role')->where('users.id',$id)->get()[0]->role;
        $usr = User::select('name', 'email', 'foto', 'location', 'role as group')->join('roles','roles.id','=','group_id')->where('users.id',$id)->get();
        $portf = Portfolio::select('*')->where('user_id',$id)->get();
        if ($role_id != 1) {
            if(!count($portf)) {
                $portf = ['error' => 'Empty Portfolio'];
            }
            $info = [
                'info' => $usr,
                'portfolio' => $portf,
            ];
        } else {
            $info = [
                'info' => $usr,
            ];
        }
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        return response()->json($info, 200);
    }
    public function update($id, Request $request) {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        return Portfolio::where('id',$id)->update($request->except(['_token']));
    }
}
