<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function list() {
        $services = Service::select('services.id as id','services.service','services.description','services.price_per_hour','users.name','services.user_id')
                ->join('users', 'users.id', 'services.user_id')
                ->get();
        $data = $this->paginate($services);
        return response()->json($data, 200);
    }
    public function paginate($items, $perPage = 20, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        $userServ = Service::where('user_id', auth()->user()->id)->get();
        $servCount = count($userServ);
        $limit = 6;
        $validation = Validator::make($request->all(),[
            'service' => 'required',
            'description' => 'required',
            'price_per_hour' => 'required',
        ]);
        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        } else {
            if ($servCount >= $limit) {
                return response()->json(['error'=>['limit'=>1]], 400);
            } else {
                $newServ = Service::create([
                    'service' => $request->input('service'),
                    'description' => $request->input('description'),
                    'price_per_hour' => $request->input('price_per_hour'),
                    'user_id' => auth()->user()->id,
                ]);
                return response()->json($newServ, 201);
            }
        }
    }
    public function update($id, Request $request, Service $serv) {
            $service = Service::select('*')->where('id', $id)->firstOrFail();
        if (Gate::allows('authorization', $service)) {
            try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
                $user = auth()->userOrFail();
            } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
                return response()->json(['error' => 'Prašome prisijungti']);
            }
            $validation = Validator::make($request->all(),[
                'service' => 'required',
                'description' => 'required',
                'price_per_hour' => 'required',
            ]);
            if ($validation->fails()) {
                return response()->json(["error" => $validation->errors()]);
            } else {
                Service::where('id', $id)->update($request->except(['_token']));
            }
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
