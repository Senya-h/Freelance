<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Message;
use App\Role;
use App\Service;
use App\PortfolioWorks;
use App\JobOffer;
use File;
use Carbon\Carbon;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class SearchController extends Controller
{
    public function freelancersSearch(Request $request) {
        $searchQuery = $request->input("service");
        $skillQuery = $request->input("skill");
        $city = $request->input("city");

        $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto')
        ->distinct()
        ->where('role',3)
        ->get();
        if($request->has('service') && !$request->has('skill') && !$request->has('city')){
            $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto')
            ->distinct()
            ->join('services', 'services.user_id','users.id')
            ->where('role',3)
            ->where('services.service','LIKE','%'.$searchQuery.'%')
            ->get();
        } if(!$request->has('service') && $request->has('skill') && !$request->has('city')) {
            $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto')
            ->distinct()
            ->join('skill_users', 'skill_users.user_id','users.id')
            ->join('skill', 'skill.id','skill_users.skill_id')
            ->where('role',3)
            ->where('skill.skillName','LIKE','%'.$skillQuery.'%')
            ->get();
        } if (!$request->has('service') && !$request->has('skill') && $request->has('city')){
            $users = User::select('*')
            ->where('role',3)
            ->where('location','LIKE','%'.$city.'%')
            ->get();
        } if ($request->has('service') && $request->has('skill') && !$request->has('city')){
            $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto')
            ->distinct()
            ->join('skill_users', 'skill_users.user_id','users.id')
            ->join('skill', 'skill.id','skill_users.skill_id')
            ->join('services', 'services.user_id','users.id')
            ->where('role',3)
            ->where('skill.skillName','LIKE','%'.$skillQuery.'%')
            ->where('services.service','LIKE','%'.$searchQuery.'%')
            ->get();
        } if ($request->has('service') && !$request->has('skill') && $request->has('city')){
            $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto')
            ->distinct()
            ->join('skill_users', 'skill_users.user_id','users.id')
            ->join('services', 'services.user_id','users.id')
            ->where('role',3)
            ->where('users.location','LIKE','%'.$city.'%')
            ->where('services.service','LIKE','%'.$searchQuery.'%')
            ->get();
        } if (!$request->has('service') && $request->has('skill') && $request->has('city')){
            $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto')
            ->distinct()
            ->join('skill_users', 'skill_users.user_id','users.id')
            ->join('skill', 'skill.id','skill_users.skill_id')
            ->where('role',3)
            ->where('users.location','LIKE','%'.$city.'%')
            ->where('skill.skillName','LIKE','%'.$skillQuery.'%')
            ->get();
        } if ($request->has("skill") && $request->has("city") && $request->has("service") ){
            $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto')
            ->distinct()
            ->join('skill_users', 'skill_users.user_id','users.id')
            ->join('skill', 'skill.id','skill_users.skill_id')
            ->join('services', 'services.user_id','users.id')
            ->where('role',3)
            ->where('users.location','LIKE','%'.$city.'%')
            ->where('skill.skillName','LIKE','%'.$skillQuery.'%')
            ->where('services.service','LIKE','%'.$searchQuery.'%')
            ->get();
        }

        $freelancers = [];
        foreach($users as $user) {
            $services = Service::select('services.id','service', 'description', 'price_per_hour')
            ->join('users','users.id','=','services.user_id')
            ->where('user_id',$user->id)
            ->get();
            $skills = DB::table('skill_users')
            ->select('skill.id','skill.skillName as skill', 'skill_users.approved')
            ->join('skill','skill.id','=','skill_users.skill_id')
            ->where('user_id',$user->id)
            ->get();
            $ban = DB::table('ban_delete_users')->select('user_id')->where('user_id',$user->id)->where('baned',1)->get();
            if(count($ban) == 0) {
                $freelancers[] = [
                    'info' => $user,
                    'portfolio' => [
                        'skills' => $skills,
                        'services' => $services
                    ]
                ];
            }
        }
        $data = $this->paginate($freelancers);
        return response()->json($data, 200);
    }
    public function clientsSearch(Request $request) {
        $title = $request->input("title");
        $skill = $request->input("skill");
        $city = $request->input("city");

        $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                             'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
                ->join('job_offers', 'job_offers.user_id', 'users.id')
                ->where('role',2)
                ->get();
        if($request->has("title") && !$request->has("skill") && !$request->has("city")) {
            $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                             'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
                ->join('job_offers', 'job_offers.user_id', 'users.id')
                ->where('role',2)
                ->where('title','LIKE', '%'.$title.'%')
                ->get();
        }
        if(!$request->has("title") && $request->has("skill") && !$request->has("city")) {
            $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                             'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
                ->join('job_offers', 'job_offers.user_id', 'users.id')
                ->join('job_offer_skill', 'job_offer_skill.offer_id','job_offers.id')
                ->join('skill','skill.id','job_offer_skill.skill_id')
                ->where('role',2)
                ->where('skillName','LIKE', '%'.$skill.'%')
                ->get();
        }
        if(!$request->has("title") && !$request->has("skill") && $request->has("city")) {
            $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                             'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
                ->join('job_offers', 'job_offers.user_id', 'users.id')
                ->where('role',2)
                ->where('users.location','LIKE', '%'.$city.'%')
                ->get();
        }
        if($request->has("title") && $request->has("skill") && !$request->has("city")) {
            $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                             'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
                ->join('job_offers', 'job_offers.user_id', 'users.id')
                ->join('job_offer_skill', 'job_offer_skill.offer_id','job_offers.id')
                ->join('skill','skill.id','job_offer_skill.skill_id')
                ->where('role',2)
                ->where('job_offers.title','LIKE', '%'.$title.'%')
                ->where('skillName','LIKE', '%'.$skill.'%')
                ->get();
        }
        if($request->has("title") && !$request->has("skill") && $request->has("city")) {
            $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                             'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
                ->join('job_offers', 'job_offers.user_id', 'users.id')
                ->where('role',2)
                ->where('job_offers.title','LIKE', '%'.$title.'%')
                ->where('users.location','LIKE', '%'.$city.'%')
                ->get();
        }
        if(!$request->has("title") && $request->has("skill") && $request->has("city")) {
            $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                        'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
            ->join('job_offers', 'job_offers.user_id', 'users.id')
            ->join('job_offer_skill', 'job_offer_skill.offer_id','job_offers.id')
            ->join('skill','skill.id','job_offer_skill.skill_id')
            ->where('role',2)
            ->where('users.location','LIKE', '%'.$city.'%')
            ->where('skillName','LIKE', '%'.$skill.'%')
            ->get();
        }
        if($request->has("title") && $request->has("skill") && $request->has("city")) {
            $offers = User::select('users.id as id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'users.foto',
                        'job_offers.id as job_id', 'job_offers.title', 'job_offers.description', 'job_offers.salary')
            ->join('job_offers', 'job_offers.user_id', 'users.id')
            ->join('job_offer_skill', 'job_offer_skill.offer_id','job_offers.id')
            ->join('skill','skill.id','job_offer_skill.skill_id')
            ->where('role',2)
            ->where('users.location','LIKE', '%'.$city.'%')
            ->where('skillName','LIKE', '%'.$skill.'%')
            ->where('job_offers.title','LIKE', '%'.$title.'%')
            ->get();
        }
        

        $clients = [];
        foreach($offers as $offer) {
            $ban = DB::table('ban_delete_users')->select('user_id')->where('user_id',$offer->id)->where('baned',1)->get();
            if(count($ban) == 0) {
                $skills = DB::table('job_offer_skill')
                    ->select('skillName')
                    ->join('skill', 'skill.id','job_offer_skill.skill_id')
                    ->where('job_offer_skill.offer_id',$offer->job_id)
                    ->get();
                if(count($skills) === 0) {
                    $skills = [];
                }
                $clients[] = [
                    'userInfo' => [
                        'id' => $offer->id,
                        'name' => $offer->name,
                        'email' => $offer->email,
                        'location' => $offer->location,
                        'foto' => $offer->foto
                    ],
                    'offers' => [
                        'id' => $offer->job_id,
                        'title' => $offer->title,
                        'description' => $offer->salary,
                        'skills' => $skills
                    ]
                ];
            }
        }
        $data = $this->paginate($clients);
        return response()->json($data, 200);
    }
    public function paginate($items, $perPage = 20, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
}
