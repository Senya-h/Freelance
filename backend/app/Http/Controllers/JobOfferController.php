<?php

namespace App\Http\Controllers;

use App\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Gate;

class JobOfferController extends Controller
{

    public function list() {
        $offers = JobOffer::select('*')->get();
        return response()->json($offers, 200);
    }
    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        $validation = Validator::make($request->all(),[
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'salary'  => 'required|max:9'
        ]);
            if ($validation->fails()) {
                return response()->json(["error" => $validation->errors()]);
            } else {
                JobOffer::create([
                    'title' => request('title'),
                    'description' => request('description'),
                    'salary' => request('salary'),
                    'user_id' => auth()->user()->id
                ]);
                $skillsArr = $request->input('skills');
                $job = [
                    'title' => $request->input('title'),
                    'description' => $request->input('description'),
                    'salary' => $request->input('salary'),
                    'user_id' => auth()->user()->id,
                    'skills_id' => $skillsArr,
                ];
                return response()->json($job, 201);
            }
    }

    public function update($id, Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $offer = JobOffer::select('*')->where('id', $id)->get()[0];
        if (Gate::allows('authorization', $offer)) {
            $validatedData = $request->validate([
                'title' => 'required|max:255',
                'description' => 'required|max:255',
                'salary'  => 'required|max:9'
            ]);
            JobOffer::where('id', $id)->update($request->except(['_token']));
        } else if (Gate::denies('authorization', $offer)){
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }

        return response()->json(["message" => "Pasiūlymas sekmingai atnaujintas"], 200);
    }

    public function destroy($id, Request $request) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $offer = JobOffer::select('*')->where('id', $id)->get()[0];
        if (Gate::allows('authorization', $offer)) {
            $offer->delete();
        } else if (Gate::denies('authorization', $offer)){
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Pasiūlymas sekmingai ištrintas"], 200);
    }

 
}
