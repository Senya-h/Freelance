<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function create($id, Request $request)
    {
        /* Užkomentuota kol FRONTEND neturi login
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }*/
        return Service::create([
            'service' => $request->input('service'),
            'description' => $request->input('description'),
            'price_per_hour' => $request->input('price_per_hour'),
            'user_id' => $id,
        ]);
    }
    public function update($id, Request $request) {
        /* Užkomentuota kol FRONTEND neturi login
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }*/
        $update = Service::where('id',$id)->update($request->except(['_token']));
        return response()->json(["message" => "Paslauga sekmingai atnaujinta"]);
    }
    public function destroy(Request $request, Service $service) {
        $service->delete();
        return response()->json(["message" => "Paslauga sekmingai ištrinta"]);
    }
}
