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
Route::get('user/{id}', 'PortfolioController@aboutUser'); //Userio info pagal ID
//Services
Route::post('service&id={id}', 'ServiceController@create'); // id=userIdD   Paslaugų pridėjimas(Vartotojas gali pridėt daugiau nei vieną paslaugą)
Route::post('update/service&id={id}', 'ServiceController@update'); // id=serviceID Paslauga gali būt redaguojama
Route::delete('delete/service&id={service}', 'ServiceController@destroy'); // id=serviceID Paslauga gali būt redaguojama


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
