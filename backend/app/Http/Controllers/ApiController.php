<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Message;
use App\Role;
use File;

class ApiController extends Controller
{
    protected function register(Request $request){

		if($request->input('role') != 2 && $request->input('role') != 3) {
			//jei grupė nėra nei 2(Client), nei 3(Freelancer) registracija nera patvirtinama
			return response()->json(['error'=>[
				'group' => ['Grupė neteisinga']
			]]);
		} else {
			$validation = Validator::make($request->all(),[
				'name' => ['required', 'string', 'max:255'],
				'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
				'password' => ['required', 'string', 'min:8'],
			]);
			$secret = env('GOOGLE_RECAPTCHA_SECRET');
            $captchaId = $request->input('recaptcha');
            $responseCaptcha = json_decode(file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$captchaId));


            if($responseCaptcha->success == true) {
                if ($validation->fails()) {
                    return response()->json(["error" => $validation->errors()]);
                } else {
                    $user = New User([
                        'name' => $request->name,
                        'email' => $request->email,
                        'location' => $request->location,
                        'role' => $request->role,
                        'foto' => '',
                        'password' => Hash::make($request->password),
                    ]);
                    $user->save();
                    $user->roles()->sync($request->role, false);
                    return response()->json($user, 201);
                }
            } else {
                return response()->json(['error'=>[
                    'recaptcha' => ['Recaptcha error']
                ]]);
            }
		}
	}
	public function login(Request $request)
	{
		$creds = $request->only(['email', 'password']); //gauna teisingus prisijungimo duomenis
		$token = auth()->attempt($creds);
		if(!$token = auth()->attempt($creds)) { //jei duomenys neteisingi, login tokeno neduoda
			return response()->json(['error' => 'Duomenys neteisingi']);
		}

        $userId = auth()->user()->id; //Autentikuoto vartotojo id
		//jei duomenys teisingi, login tokena duoda
		return response()->json(['token' => $token, 'userID' => $userId]);
	}
	public function tokenRefresh()
	{
		try { //jeigu tokenas aktyvus, refreshina tokena a.k.a atjungia vartotoja
			$token = auth()->refresh();
			return response()->json(['new token' => $token]);
		} catch(\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
			return response()->json(['error' => $e->getMessage()], 401);
		}
	}
	public function checkEmail($email) {
		$email = User::select('email')->where('email','=',$email)->get();
		if (count($email) > 0) {
			return response()->json(200);
		}
		else {
			return response()->json(['message' => 'Tinkamas email']);
		}
	}
	public function verifyFirstLogin($id){
        User::where('id', $id)->update(['didLogin' => 1]);
    }
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
    public function usersList() {
        $users = User::select('id', 'name', 'email', 'location', 'created_at')->get();
        return response()->json($users, 200);
    }

}
