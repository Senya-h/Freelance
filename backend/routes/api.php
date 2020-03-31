<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Registration/Login
Route::post('register','ApiController@register');
Route::post('login','ApiController@login');
Route::get('new_token', 'ApiController@tokenRefresh');

//User
Route::post('portfolio', 'PortfolioController@create');
Route::post('update/portfolio/{id}', 'PortfolioController@update');
Route::get('user/{id}', 'PortfolioController@aboutUser');

//Roles
Route::get('role', 'RoleController@aboutRole'); //Roliu sarašas
Route::get('role/user&id={id}', 'RoleController@aboutRoleUser'); //Roliu user sarašas pagal user id
Route::post('add/role', 'RoleController@create');

//Message
Route::get('message/from/{id}', 'MessageController@fromMsg'); //Išsiųstos
Route::get('message/to/{id}', 'MessageController@toMsg'); //Gautos
Route::post('message', 'MessageController@create');
Route::delete('message/delete/{message}', 'MessageController@destroy');

//Rating
Route::get('all/rating', 'RatingController@aboutRating');
Route::post('rating', 'RatingController@create');
Route::delete('rating/delete/{rating}', 'RatingController@destroy');

Route::get('/ro', 'RoleUserController@index');
