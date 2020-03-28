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
/*Reg Not Working*/
Route::post('register','ApiController@register');
Route::post('login','ApiController@login');
Route::get('new_token', 'ApiController@tokenRefresh');

//User
Route::post('user', 'UserController@create');
Route::get('user/{id}', 'UserController@aboutUser');
Route::post('user/{id}', 'UserController@update');

//Portfolio
Route::get('portfolio','portfolioController@index');
Route::get('portfolio/{id}','portfolioController@show');
Route::post('portfolio','portfolioController@store');
Route::put('/portfolio/{portfolio}','portfolioController@update');
Route::delete('/portfolio/{id}','portfolioController@delete');

//Roles
Route::get('role', 'RoleController@aboutRole'); //Roliu sarašas
Route::post('add/role', 'RoleController@create');
Route::post('role/user/', 'RoleUserController@store');

//Message
Route::get('message/{id}', 'MessageController@aboutMessage'); //Išsiųstos
Route::post('message', 'MessageController@create');
Route::delete('message/delete/{message}', 'MessageController@destroy');

//Rating
Route::get('all/rating', 'RatingController@aboutRating');
Route::post('rating', 'RatingController@create');
Route::delete('rating/delete/{rating}', 'RatingController@destroy');

Route::get('/ro', 'RoleUserController@index');
