<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

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
    public function update($id, Request $request, Service $service) {
        if (Gate::allows('authorization', $service)) {
            try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
                $user = auth()->userOrFail();
            } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
                return response()->json(['error' => 'Prašome prisijungti']);
            }
            Service::where('id', $id)->update($request->except(['_token']));
        } else if (Gate::denies('authorization', $service)){
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }

        return response()->json(["message" => "Paslauga sekmingai atnaujinta"]);
    }
    public function destroy(Request $request, Service $service) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if (Gate::allows('authorization', $service)) {
            $service->delete();
        } else if (Gate::denies('authorization', $service)){
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Paslauga sekmingai ištrinta"], 200);
    }
}
