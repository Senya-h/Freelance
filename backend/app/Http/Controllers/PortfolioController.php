<?php

namespace App\Http\Controllers;

use App\Portfolio;
use App\User;
use App\Message;
use App\Role;
use App\Rating;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function create(Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
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
    /*User INFO */
    public function aboutUser(User $user, $id) {
        //role pagal kuria iesko kokiai grupei priklauso vartotojas
        $role_id = User::select('role')->where('users.id',$id)->get()[0]->role;
        //pagrindine vartotojo informacija
        $usr = User::select('name', 'email', 'foto', 'location')->where('users.id',$id)->get();
        //portfolio
        $portf = Portfolio::select('*')->where('user_id',$id)->get();
        //role
        $role = DB::table('role_user')->select('role')->join('roles','roles.id','=','role_user.role_id')->where('user_id',$id)->get();
        if ($role_id != 1 && $role_id = 2) { //jeigu useris yra freelanceris
            if(!count($portf)) { //jei nėra portfolio
                $portf = ['error' => 'Empty Portfolio'];
            }
            $info = [
                'info' => [
                    'name' => $usr[0]['name'], 
                    'email' => $usr[0]['email'],
                    'foto' => $usr[0]['foto'],
                    'location' => $usr[0]['location'],
                    'roles' => $role,
            ],
                'portfolio' => $portf[0],
            ];
        } else { //jeigu useris nera freelanceris
            $info = [
                'info' => $usr,
                'roles' => $role,
            ];
        }
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        return response()->json($info, 200);
    }
    public function update($id, Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        return Portfolio::where('id',$id)->update($request->except(['_token']));
    }
}
