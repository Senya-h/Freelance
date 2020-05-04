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
use File;
use Carbon\Carbon;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ApiController extends Controller
{
    
	
    public function userPhotoUpload(Request $request) {
            try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
                $user = auth()->userOrFail();
            } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
                return response()->json(['error' => 'Prašome prisijungti']);
            }
            $validation = Validator::make($request->all(),[
                'file' => 'mimes:png,jpg,jpeg|required',
            ]);
            if ($validation->fails()) {
                return response()->json(["error" => $validation->errors()]);
            } else {
                $file = User::select('foto')->where('id', '=', auth()->user()->id)->get(); //Randa sena filePath
                File::delete('../storage/app/public/' . $file[0]['foto']); //Keliant naują foto seną ištrina
                $path = $request->file('file')->store('public/userimg');
                $filename = str_replace('public/', "", $path);
                User::where('id', auth()->user()->id)->update(['foto' => $filename]);
                return response()->json(["file" => $filename],200);
            }
    }
    public function freelancersList() {
        $users = User::select('*')
        ->where('role',3)
        ->get();

        $freelancers = [];
        foreach($users as $user) {
            $services = Service::select('services.id','service', 'description', 'price_per_hour')
            ->join('users','users.id','=','services.user_id')
            ->where('user_id',$user->id)
            ->get();
            $skills = DB::table('skill_users')->select('skill.id','skill.skillName as skill', 'skill_users.approved')
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
            $data = $this->paginate($freelancers);
        }
        return response()->json($data, 200);
    }
    
    public function paginate($items, $perPage = 20, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
    public function usersList() {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $allUsers = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at')
        ->get();
        $users = [];
        foreach($allUsers as $user) {
            $ban = DB::table('ban_delete_users')->select('user_id')->where('user_id',$user->id)->where('baned',1)->get();
            if(count($ban) == 0) {
                $users[] = [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'location' => $user->location,
                    'created_at' => $user->created_at,
                ];
            }
                
        }
        return response()->json($users, 200);
    }
    public function bannedUsersList() {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $users = User::select('users.id', 'users.name', 'users.email', 'users.location', 'users.created_at', 'baned', 'deleted')
        ->join('ban_delete_users', 'users.id', 'ban_delete_users.user_id')
        ->get();
        return response()->json($users, 200);
    }
    public function statistics() {
        $allUsers = count(User::all());
        $allServices = count(Service::all());
        $allWorks = count(PortfolioWorks::all());
        $allBanned = count(DB::table('ban_delete_users')->select('*')->where('baned',1)->get());
        $allThisDayUsers = count(User::select('*')->where('created_at','LIKE',Carbon::now()->format('Y-m-d').'%')->get());
        $statistic = [
            'users' => $allUsers,
            'services' => $allServices,
            'works' => $allWorks,
            'banned' => $allBanned,
            'thisDayUsers' => $allThisDayUsers
        ];
        return response()->json($statistic, 200);
    }

}
