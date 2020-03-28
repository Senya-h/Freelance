<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Portfolio;

class PortfolioController extends Controller
{

    public function index()
    {
        return Portfolio::all();
    }

    public function show(Portfolio $portfolio)
    {
        return $portfolio;
    }

    public function store(Request $request)
    {
        $portfolio = Portfolio::create($request->all());
        return response()->json($portfolio, 201);
    }

    public function update(Request $request, Portfolio $portfolio)
    {
        $portfolio->update($request->all());
        return response()->json($portfolio, 200);
    }

    public function delete(Request $request, Portfolio $portfolio)
    {
        $portfolio->delete();
        return response()->json(null, 204);
    }
}
