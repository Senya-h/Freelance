<?php

namespace App\Http\Controllers;

use App\PortfolioWorks;
use Illuminate\Http\Request;

class PortfolioWorksController extends Controller
{
    public function create($id, Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'file' => 'mimes:jpeg,jpg,png,gif,mpg,doc,docx|required|max:51200',
        ]);
        $path=$request->file('file')->store('public/portfolioWorks');
        $filename = str_replace('public/',"", $path);
        $work = PortfolioWorks::create([
            'title' => request('title'),
            'description' => request('description'),
            'filePath' => $filename,
            'user_id' => $id
        ]);

        return response()->json($work);
    }
}
