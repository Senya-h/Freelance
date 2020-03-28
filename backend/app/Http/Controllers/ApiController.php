<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;
use App\User;
use App\Message;
use App\Roel;

class ApiController extends Controller
{
    protected function register(Request $request){

		if($request->input('role') != 1 && $request->input('role') != 2) {
			return response()->json(['error'=>'Grupė neteisinga!']);
		} else {
		$request->validate([
			'email'=>'required|max:255',
			'name'=>'required|max:255',
            'password'=>'required|max:255',
            'location' => 'required|max:255',
            'role' => 'required|max:255'
		]);

		return User::create([
            $user = New User,
            $user->name = $request->name,
            $user->email = $request->email,
            $user->location = $request->location,
            $user->role = $request->role,
            $user->foto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png',
			$user->password = Hash::make($request->password),
			$user->save(),
			$user->roles()->sync($request->role,false),
		]);
		}

	}
	public function login(Request $request)
	{
		$creds = $request->only(['email', 'password']);
		$token = auth()->attempt($creds);
		if(!$token = auth()->attempt($creds)) {
			return response()->json(['error' => 'Duomenys neteisingi']);
		}

		return response()->json(['token' => $token]);
	}
	public function tokenRefresh()
	{
		try {
			$token = auth()->refresh();
			return response()->json(['new token' => $token]);
		} catch(\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
			return response()->json(['error' => $e->getMessage()], 401);
		}
	}

}
