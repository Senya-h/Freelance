<?php

use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
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

Route::get('emailCheck&email={email}', 'ApiController@checkEmail');
//Registration/Login
Route::post('register','ApiController@register');
Route::post('login','ApiController@login');
Route::get('new_token', 'ApiController@tokenRefresh');

Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

//User
Route::get('user/{id}', 'PortfolioController@aboutUser'); //Userio info pagal ID
//Services
Route::post('service&id={id}', 'ServiceController@create'); // id=userIdD   Paslaugų pridėjimas(Vartotojas gali pridėt daugiau nei vieną paslaugą)
Route::post('update/service&id={id}', 'ServiceController@update'); // id=serviceID Paslauga gali būt redaguojama
Route::delete('delete/service&id={service}', 'ServiceController@destroy'); // id=serviceID Paslaugos ištrynimas
//Portfolio Works
Route::post('work&id={id}', 'PortfolioWorksController@create'); // id=userIdD   Portfolio darbų pridėjimas(Vartotojas gali pridėti daugiau nei vieną darbą)
Route::post('update/work&id={id}', 'PortfolioWorksController@update'); // id=workID Darbas gali būt redaguojama
Route::delete('delete/work&id={work}', 'PortfolioWorksController@destroy'); // id=workID Darbo ištrynimas

//Roles
Route::get('role', 'RoleController@aboutRole'); //Roliu sarašas
Route::get('role/user&id={id}', 'RoleUserController@aboutRoleUser'); //Roliu user sarašas pagal user id
Route::post('add/role&id={role_id}/user&id={user_id}', 'RoleUserController@store'); //Prideti role useriui

//Admin
Route::post('user&id={id}/ban/delete', 'AdminController@create'); //Admin delete arba ban pagal user id (input = bool True=1, Flase=0)
Route::delete('user&id={id}/remove', 'AdminController@destroy');  //Pasalinti ban/delete pagal user id

//Message
Route::get('message/from/{id}', 'MessageController@fromMsg'); //Išsiųstos
Route::get('message/to/{id}', 'MessageController@toMsg'); //Gautos
Route::post('message', 'MessageController@create');
Route::delete('message/delete/{message}', 'MessageController@destroy');

//Rating
Route::get('all/rating', 'RatingController@aboutRating');
Route::post('rating', 'RatingController@create');
Route::delete('rating/delete/{rating}', 'RatingController@destroy');


//per postmana api/skill ir api/skill/1
//Skill approvalphp
//index parodo pagal id userius isveda user visus duomenys
Route::get('skill/{id}', 'SkillController@index');


//create sukuria i table user_skill pagal "user_id" ir "skill_id"
Route::post('skill', 'SkillController@create');


//update atnaujina pagal id cia atnaujinti riekia "approved" ir "comment"
//approved 1 = patvirtinta 0 = nepatvirtinas skillas
//comment yra patvirtinimuo comentaras
Route::put('skill/{skill}', 'SkillController@update');



//delete cia pagal id istrina is table user_skill irasa
Route::post('skill/{id}', 'SkillController@delete');

//addSkill i skill lentele ideda skilus
Route::post('skill_add','SkillController@addSkill');
