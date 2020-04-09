<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        return Service::create([
            'service' => $request->input('service'),
            'description' => $request->input('description'),
            'price_per_hour' => $request->input('price_per_hour'),
            'user_id' => auth()->user()->id,
        ]);
    }
    public function update($id, Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        Service::where('id',$id)->update($request->except(['_token']));
        return response()->json(["message" => "Paslauga sekmingai atnaujinta"]);
    }
    public function destroy(Request $request, Service $service) {
        $service->delete();
        return response()->json(["message" => "Paslauga sekmingai ištrinta"]);
    }
}
