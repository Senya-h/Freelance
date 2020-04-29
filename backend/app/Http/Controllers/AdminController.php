<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\BanDeleteUser;
use App\AdminWorkApprove;
use App\User;
use App\Role;
use App\RoleUser;
use App\SkillUser;
use App\Comments;
use App\Message;
use App\Skill;
use App\Rating;
use App\Service;
use App\PortfolioWorks;
use App\AdminServiceApprove;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function adminLogin(Request $request)
	{
		$creds = $request->only(['email', 'password']); //gauna teisingus prisijungimo duomenis
		$token = auth()->attempt($creds);
		if(!$token = auth()->attempt($creds)) { //jei duomenys neteisingi, login tokeno neduoda
			return response()->json(['error' => 'Duomenys neteisingi']);
        } 
        $banned = DB::table('ban_delete_users')->select('*')->where('user_id', auth()->user()->id)->where('baned',1)->get();
        if (count($banned) > 0) {
            return response()->json(['error' => 'Šis vartotojas užblokuotas']);
        }
        $userRole = auth()->user()->role; //Autentikuoto vartotojo id
        if(auth()->user()->authorizeRoles('Admin')){
            //Autentikuoto vartotojo id
		    //jei duomenys teisingi, login tokena duoda
            $userId = auth()->user()->id;
            return response()->json(['token' => $token, 'userID' => $userId, 'userRole' => $userRole, 'role' => 'Admin']);
        } else {
            return response()->json(['error' => 'Neturite teisės', 'role' => auth()->user()]);
        }

	}
    //Blokuoti trinti user
    public function destroy(Request $request,$id)
    {
        if(auth()->user()->authorizeRoles('Admin')){
            if($request->input('baned') == 1){
            return BanDeleteUser::create([
                'user_id' => $id,
                'baned' => $request->input('baned'),
                'deleted' => $request->input('deleted'),
            ]);
            return response()->json(['message'=>"Klientas sėkmingai užbloguotas"],200);
            }else if($request->input('deleted') == 1){
                BanDeleteUser::create([
                    'user_id' => $id,
                    'baned' => $request->input('baned'),
                    'deleted' => $request->input('deleted'),
                ]);
                $role_user = RoleUser::where('user_id', $id);
                $role_user->delete();
                $skill_user = skillUser::where('user_id',$id);
                $skill_user->delete();
                $comment_user = Comments::where('user_id',$id)->orWhere('receiver_id',$id);
                $comment_user->delete();
                $message_user = Message::where('senders_id',$id)->orWhere('receivers_id',$id);
                $message_user->delete();
                $service_user = Service::where('user_id',$id);
                $service_user->delete();
                $portfolioWork_user = PortfolioWorks::where('user_id',$id);
                $portfolioWork_user->delete();
                $user = User::find($id);
                $user->delete();
                return response()->json(['message'=>"Klientas sėkmingai ištrintas"],200);
            }
        } else {
            return response()->json(['error'=>"Neturite teisės"],500);
        }
    }

    public function unban(Request $request, $id)
    {
        $BanDeleteUser = BanDeleteUser::where('user_id', $id);
        $BanDeleteUser->delete();
        return response()->json(null, 204);
        if($request->user()->authorizeRoles('Admin')){
            $BanDeleteUser = BanDeleteUser::where('user_id', $id);
            $BanDeleteUser->delete();
            return response()->json(["message" => "Vartotojas atnaujintas"], 200);
        }
    }

    // Darbu patvirtinimai
    public function aboutWorkApproval(Request $request, $id){
        return response()->json(AdminWorkApprove::select('*')->where('work_id',$id)->get(),200);
    }

    public function workApproval(Request $request,$id)
    {
        if($request->user()->authorizeRoles('Admin')){
            return AdminWorkApprove::create([
                'work_id' => $id,
                'approved' => $request->input('approved'),
                'user_id' => auth()->user()->id
            ]);
        }
    }

    // Paslaugu patvirtinimai
    public function aboutServiceApproval(Request $request, $id){
        return response()->json(AdminServiceApprove::select('*')->where('service_id',$id)->get(),200);
    }

    public function ServiceApproval(Request $request,$id)
    {
        if($request->user()->authorizeRoles('Admin')){
            return AdminServiceApprove::create([
                'service_id' => $id,
                'approved' => $request->input('approved'),
                'user_id' => auth()->user()->id
            ]);
        }
    }

    //Rolės pridejimas
    public function store(Request $request, $role_id)
    {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if($request->user()->authorizeRoles('Admin')){
                $user = User::select('id')->where('email',$request->input('email'))->get();
                $usrID = $user[0]->id;
                $role = Role::where('id', $role_id)->first();
                $role->users()->attach($usrID);
        } else {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Role sekmingai prideta",200]);
    }
    
    //Rolės nuemimas nuo user
    public function deleteRole(Request $request, $role_id, $user_id){
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if($request->user()->authorizeRoles('Admin')){
                $role = Role::where('id', $role_id)->first();
                $user = User::where('id', $user_id)->first();
                $role->users()->detach($user);
        } else {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Role sekmingai pašalinta",200]);
    }

    //Formato pridėjimas(Admin gali pridėt formatą portfolio darbam)

    public function formatList() {
        $formats = DB::table('file_formats')->select('*')->get();
        return response()->json($formats, 201);
    }

    public function addFormat(Request $request) {
        $validation = Validator::make($request->all(),[
            'format' => ['required', 'string', 'max:255', 'unique:file_formats'],
        ]);
        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        } else {
            DB::table('file_formats')->insert([
                'format' => strtolower(request('format')),
            ]);
            return response()->json(["message" => request('format')." formatas pridėtas"]);
        }
    }

    public function addSkill(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
            $validation = Validator::make($request->all(),[
                'skillName' => ['required', 'string', 'max:255', 'unique:skill'],
            ]);
            if ($validation->fails()) {
                return response()->json(["error" => $validation->errors()]);
            } else {
                $skill = new Skill;
                $skill->skillName = $request->skillName;
                $skill->save();
                return response()->json(["SkillName"=>$skill->skillName]);
            }
    }

    public function skillDelete(Skill $skill) {
        try {
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $skill->delete();
        return response()->json(["message"=>"Ištrinta"],200);
    }

    public function serviceDelete(Service $service, Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if($request->user()->authorizeRoles('Admin')){
            $service->delete();
        } else {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Paslauga sekmingai ištrinta"], 200);
    }
    public function workDelete(Request $request, PortfolioWorks $work) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if($request->user()->authorizeRoles('Admin')){
            $work->delete();
        } else {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Darbas sekmingai ištrintas"], 200);
    }
    public function findUserWithRoles(Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if(auth()->user()->authorizeRoles('Admin')){
            $info = [];
            if ($request->has('email')) {
                $user = User::select('id','name','email','foto')
                    ->where('email',$request->input('email'))
                    ->get();
                $roles = DB::table('role_users')
                    ->select('user_id', 'role_id', 'roles.role')
                    ->join('roles','roles.id','role_users.role_id')
                    ->where('user_id',$user[0]->id)
                    ->get();
                if(count($user) > 0) {
                    $info[] = [
                        'id' => $user[0]->id,
                        'name' => $user[0]->name,
                        'email' => $user[0]->email,
                        'foto' => $user[0]->foto,
                        'roles' => $roles
                    ];
                }
            }
            return response()->json($info, 200);
        }
    }
}