<?php

namespace App\Http\Controllers;

use App\JobOffer;
use App\Skill;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Gate;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class JobOfferController extends Controller
{

    public function list() {
        $allOffers = JobOffer::select('*')->get();
        $offers = [];
        foreach($allOffers as $offer) {
            $skills = DB::table('job_offer_skill')
                    ->select('skill_id', 'skillName')
                    ->join('skill','skill.id','job_offer_skill.skill_id')
                    ->where('offer_id', $offer->id)
                    ->get();
            $user = User::select('name','foto')
                    ->where('id', $offer->user_id)
                    ->first();
            $offers[] = [
                'id' => $offer->id,
                'title' => $offer->title,
                'description' => $offer->description,
                'salary' => $offer->salary,
                'created_at' => $offer->created_at,
                'updated_at' => $offer->updated_at,
                'skills' => $skills,
                'userInfo' => [
                    'id' => $offer->user_id,
                    'name' => $user->name,
                    'foto' => $user->foto,
                ],
            ];
        }
        $data = $this->paginate($offers);
        return response()->json($data, 200);
    }
    public function myOffers() {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        $allOffers = JobOffer::select('*')
                    ->where('user_id', auth()->user()->id)
                    ->get();
        $offers = [];
        foreach($allOffers as $offer) {
            $skills = DB::table('job_offer_skill')
                    ->select('skill_id', 'skillName')
                    ->join('skill','skill.id','job_offer_skill.skill_id')
                    ->where('offer_id', $offer->id)
                    ->get();
            if(count($skills) === 0) {
                $skills = [];
            }
            $offers[] = [
                'id' => $offer->id,
                'title' => $offer->title,
                'description' => $offer->description,
                'salary' => $offer->salary,
                'created_at' => $offer->created_at,
                'updated_at' => $offer->updated_at,
                'skills' => $skills,
            ];
        }
        $data = $this->paginate($offers);
        return response()->json($data, 200);
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
                $offer = JobOffer::create([
                    'title' => request('title'),
                    'description' => request('description'),
                    'salary' => request('salary'),
                    'user_id' => auth()->user()->id
                ]);
                $skillsArr = $request->input('skills');
                for($i = 0; $i < count($skillsArr); $i++) {
                    $offer->skills()->attach($skillsArr[$i]);
                }
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

    public function singleOffer($id) {
        $offer = JobOffer::select('*')
                ->where('id', $id)
                ->first();
        $user = User::select('*')
                ->where('id', $offer->user_id)
                ->first();
        $skills = DB::table('job_offer_skill')
                ->select('job_offer_skill.skill_id as id', 'skill.skillName as skill')
                ->join('skill','skill.id','job_offer_skill.skill_id')
                ->where('offer_id', $offer->id)
                ->get();
            $finalArr = [
                'id' => $offer->id,
                'title' => $offer->title,
                'description' => $offer->description,
                'salary' => $offer->salary,
                'created_at' => $offer->created_at,
                'updated_at' => $offer->updated_at,
                'skills' => $skills,
                'userInfo' => [
                    'id' => $offer->user_id,
                    'name' => $user->name,
                    'foto' => $user->foto,
                ]
            ];
        return response()->json($finalArr, 200);
    }

    public function paginate($items, $perPage = 20, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
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
