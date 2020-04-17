<?php

namespace App\Http\Controllers;

use App\PortfolioWorks;
use Illuminate\Http\Request;
use File;
use Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PortfolioWorksController extends Controller
{
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
    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        $formats = DB::table('file_formats')->select('format')->get();
        $validation = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'file' => 'mimes:jpg,png,gif,docx,mpeg,mpg|required',
        ]);
        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        } else {
            $path = $request->file('file')->store('public/portfolioWorks');
            $filename = str_replace('public/', "", $path);
            $work = PortfolioWorks::create([
                'title' => request('title'),
                'description' => request('description'),
                'filePath' => $filename,
                'user_id' => auth()->user()->id
            ]);
            return response()->json($work);
        }
    }
    public function update($id, Request $request, PortfolioWorks $portfolioworks) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if (Gate::allows('authorization', $work)) {
            $validatedData = $request->validate([
                'title' => 'required',
                'description' => 'required',
                'filePath' => 'mimes:jpeg,jpg,png,gif,mpg,doc,docx|required',
            ]);
            if ($request->hasFile('filePath')) {
                $file = PortfolioWorks::select('filePath')->where('id', '=', $id)->get();
                File::delete('../storage/app/public/' . $file[0]['filePath']);
                $path = $request->file('filePath')->store('public/portfolioWorks');
                $filename = str_replace('public/', "", $path);
                PortfolioWorks::where('id', $id)->update(['filePath' => $filename]);
            }
            PortfolioWorks::where('id', $id)->update($request->except(['_token', 'filePath']));
        } else if (Gate::denies('authorization', $work)){
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }

        return response()->json(["message" => "Darbas sekmingai atnaujintas"], 200);
    }
    public function destroy(Request $request, PortfolioWorks $work) {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        if (Gate::allows('authorization', $work)) {
            $work->delete();
        } else if (Gate::denies('authorization', $work)) {
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json(["message" => "Darbas sekmingai ištrintas"], 200);
    }
}
