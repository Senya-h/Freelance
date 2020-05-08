<?php

namespace App\Http\Controllers;

use App\PortfolioWorks;
use App\ProjectApproval;
use Illuminate\Http\Request;
use File;
use Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

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
        $data = $this->paginate($newWork);
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
        $formats = DB::table('file_formats')->select('format')->get();
        $string = "";
        foreach ($formats as $str){
            $string .=  $str->format.',';
        }
        $validation = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'filePath' => 'mimes:'.$string.'|required',
        ]);
        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        } else {
            $userWork = PortfolioWorks::where('user_id', auth()->user()->id)->get();
            $workCount = count($userWork);
            $limit = 6;
            if ($workCount >= $limit) {
                return response()->json(['error'=>['limit'=>1]], 400);
            } else {
                $path = $request->file('filePath')->store('public/portfolioWorks');
                $filename = str_replace('public/', "", $path);
                $work = PortfolioWorks::create([
                    'title' => request('title'),
                    'description' => request('description'),
                    'filePath' => $filename,
                    'user_id' => auth()->user()->id
                ]);
                $info = pathinfo(storage_path().$filename);
                $extension = $info['extension'];
                $fileType = DB::table('file_formats')->where('format',$extension)->first();
                $newWork = [
                    'title' => request('title'),
                    'description' => request('description'),
                    'filePath' => $filename,
                    'user_id' => auth()->user()->id,
                    'fileType' => $fileType->fileType
                ];
                return response()->json($newWork);
            }
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
        $work = PortfolioWorks::select('*')->where('id',$id)->get()[0];
        $validation = Validator::make($request->all(),[
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'filePath'  => 'mimes"'.$string.'|required'
        ]);
        if (Gate::allows('authorization', $work)) {
            DB::table('admin_work_approves')->where('work_id', $id)->delete();
            if ($request->hasFile('filePath')) {
                $file = PortfolioWorks::select('filePath')->where('id', '=', $id)->get();
                File::delete('../storage/app/public/' . $file[0]['filePath']);
                $path = $request->file('filePath')->store('public/portfolioWorks');
                $filename = str_replace('public/', "", $path);
                $updated = PortfolioWorks::where('id', $id)->update(['filePath' => $filename]);
            }
            $updated = PortfolioWorks::where('id', $id)->update($request->except(['_token', 'filePath']));
            $updated = PortfolioWorks::where('id', $id)->first();
            
            $info = pathinfo(storage_path().$updated->filePath);
            $extension = $info['extension'];
            $fileType = DB::table('file_formats')->where('format',$extension)->first();
            $newItem = [
                'title' => $updated->title,
                'description' => $updated->description,
                'filePath' => $updated->filePath,
                'user_id' => $updated->user_id,
                'fileType' => $fileType->fileType
            ];
            ProjectApproval::where('work_id',$updated->id)->delete();
        } else if (Gate::denies('authorization', $work)){
            return response()->json(["error" => "Jūs neturite teisės"], 403);
        }
        return response()->json($newItem, 201);

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
