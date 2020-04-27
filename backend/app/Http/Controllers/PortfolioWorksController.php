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
    public function list() {
        $works = PortfolioWorks::select('portfolio_works.id as id', 'portfolio_works.title', 'portfolio_works.description', 'portfolio_works.filePath', 'users.name', 'portfolio_works.user_id')
                ->join('users', 'users.id', 'portfolio_works.user_id')
                ->orderBy('portfolio_works.created_at', 'desc')
                ->get();
        $newWork = [];
        foreach ($works as $work) {
            $approved = DB::table('admin_work_approves')->select('work_id')->where('work_id',$work->id)->where('approved',1)->get();
            if(count($approved) > 0) {
                $newWork[] = [
                'id' => $work->id,
                'title' => $work->title,
                'description' => $work->description,
                'filePath' => $work->filePath,
                'name' => $work->name,
                'user_id' => $work->user_id,
                'approved' => 1
            ];
            } else {
                $newWork[] = [
                    'id' => $work->id,
                    'title' => $work->title,
                    'description' => $work->description,
                    'filePath' => $work->filePath,
                    'name' => $work->name,
                    'user_id' => $work->user_id,
                    'approved' => 0
                ];
            }
        }
        return response()->json($newWork, 200);
    }
    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti']);
        }
        $formats = DB::table('file_formats')->select('format')->get();
        $string = "";
        foreach ($formats as $str){
            $string .=  $str->format.',';
        }
        $validation = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'file' => 'mimes:'.$string.'|required',
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
        $formats = DB::table('file_formats')->select('format')->get();
        $string = "";
        foreach ($formats as $str){
            $string .=  $str->format.',';
        }
        if (Gate::allows('authorization', $work)) {
            $validatedData = $request->validate([
                'title' => 'required',
                'description' => 'required',
                'filePath' => 'mimes:'.$string.'|required',
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
