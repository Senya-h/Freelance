<?php

namespace App\Http\Controllers;

use App\User;
use App\Message;
use App\Role;
use App\Rating;
use App\Service;
use App\PortfolioWorks;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /*User INFO */
    public function aboutUser(User $user, $id) {
        //role pagal kuria iesko kokiai grupei priklauso vartotojas
        $role_id = User::select('role')->where('users.id',$id)->get()[0]->role;
        //pagrindine vartotojo informacija
        $usr = User::select('name', 'email', 'foto', 'location')->where('users.id',$id)->get();
        //role
        $role = DB::table('role_users')->select('role')->join('roles','roles.id','=','role_users.role_id')->where('user_id',$id)->get();
        //services
        $services = Service::select('service', 'description', 'price_per_hour')->join('users','users.id','=','services.user_id')->where('user_id',$id)->get();
        //darbai
        $works = PortfolioWorks::select('title', 'description', 'filePath')->join('users','users.id','=','portfolio_works.user_id')->where('user_id',$id)->get();
        //skills
        $skills = DB::table('user_skill')->select('skill.name', 'user_skill.approved', 'user_skill.comment')->join('skill','skill.id','=','user_skill.skill_id')->where('user_id',$id)->get();
        if ($role_id != 1 && $role_id = 2) { //jeigu useris yra freelanceris
            $info = [
                'info' => [
                    'name' => $usr[0]['name'],
                    'email' => $usr[0]['email'],
                    'foto' => $usr[0]['foto'],
                    'location' => $usr[0]['location'],
                    'roles' => $role,
            ],
                'portfolio' => [
                    'services' => $services, //Paslaugos
                    'works' => $works, //Atlikti darbai
                    'skills' => $skills //Atlikti darbai
                ]
            ];
        } else { //jeigu useris nera freelanceris
            $info = [
                'name' => $usr[0]['name'],
                'email' => $usr[0]['email'],
                'foto' => $usr[0]['foto'],
                'location' => $usr[0]['location'],
                'roles' => $role,
            ];
        }
        return response()->json($info, 200);
    }
}
