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
        $role_id = User::select('role')
        ->where('users.id',$id)
        ->get()[0]->role;

        //pagrindine vartotojo informacija
        $usr = User::select('id','name', 'email', 'foto', 'location')
        ->where('users.id',$id)
        ->get();

        //role
        $role = DB::table('role_users')
        ->select('role')
        ->join('roles','roles.id','=','role_users.role_id')
        ->where('user_id',$id)
        ->get();

        //services
        $services = Service::select('services.id','service', 'description', 'price_per_hour')
        ->join('users','users.id','=','services.user_id')
        ->where('user_id',$id)
        ->get();

        //darbai
        $works = PortfolioWorks::select('portfolio_works.id','title', 'description', 'filePath')
        ->join('users','users.id','=','portfolio_works.user_id')
        ->where('user_id',$id)
        ->get();

        //skills
        $skills = DB::table('skill_users')
        ->select('skill.id','skill.skillName as skill', 'skill_users.approved')
        ->join('skill','skill.id','=','skill_users.skill_id')
        ->where('user_id',$id)
        ->get();
        
        $darbai = [];
        foreach ($works as $work) {
            $workApprv = DB::table('admin_work_approves')->select('*')->where('work_id',$work->id)->get();
            if(count($workApprv) > 0) {
                $darbai[] = [
                    'id' => $work->id,
                    'title' => $work->title,
                    'description' => $work->description,
                    'filePath' => $work->filePath,
                    'approved' => 1
                ];
            } else {
                $darbai[] = [
                    'id' => $work->id,
                    'title' => $work->title,
                    'description' => $work->description,
                    'filePath' => $work->filePath,
                    'approved' => 0
                ];
            }
        }

        $paslaugos = [];
        foreach ($services as $service) {
            $workApprv = DB::table('admin_service_approves')->select('*')->where('service_id',$service->id)->get();
            if(count($workApprv) > 0) {
                $paslaugos[] = [
                    'id' => $service->id,
                    'title' => $service->service,
                    'description' => $service->description,
                    'price_per_hour' => $service->price_per_hour,
                    'approved' => 1
                ];
            } else {
                $paslaugos[] = [
                    'id' => $service->id,
                    'title' => $service->service,
                    'description' => $service->description,
                    'price_per_hour' => $service->price_per_hour,
                    'approved' => 0
                ];
            }
        }
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
                    'services' => $paslaugos, //Paslaugos
                    'works' => $darbai, //Atlikti darbai
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
