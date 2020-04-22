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
Route::post('verify_login/{id}', 'ApiController@verifyFirstLogin');

Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

//User
Route::get('user/{id}', 'PortfolioController@aboutUser'); //Userio info pagal ID
Route::post('photo-upload', 'ApiController@userPhotoUpload');
//Services
Route::post('service', 'ServiceController@create'); // id=userIdD   Paslaugų pridėjimas(Vartotojas gali pridėt daugiau nei vieną paslaugą)
Route::put('update/service&id={id}', 'ServiceController@update'); // id=serviceID Paslauga gali būt redaguojama
Route::delete('delete/service&id={service}', 'ServiceController@destroy'); // id=serviceID Paslaugos ištrynimas
//Portfolio Works
Route::post('work', 'PortfolioWorksController@create'); // Portfolio darbų pridėjimas(Vartotojas gali pridėti daugiau nei vieną darbą)
Route::put('update/work&id={id}', 'PortfolioWorksController@update'); // id=workID Darbas gali būt redaguojama
Route::delete('delete/work&id={work}', 'PortfolioWorksController@destroy'); // id=workID Darbo ištrynimas

//Formato pridėjimas į DB
Route::get('format-list', 'AdminController@formatList');
Route::post('format', 'AdminController@addFormat');

//Roles
Route::get('role', 'RoleController@aboutRole'); //Roliu sarašas
Route::get('role/user&id={id}', 'RoleUserController@aboutRoleUser'); //Roliu user sarašas pagal user id
Route::post('add/role&id={role_id}/user&id={user_id}', 'RoleUserController@store'); //Prideti role useriui

//Admin
Route::post('user&id={id}/ban/delete', 'AdminController@create'); //Admin delete arba ban pagal user id (input = bool True=1, Flase=0)
Route::delete('user&id={id}/remove', 'AdminController@destroy');  //Pasalinti ban/delete pagal user id
//Admin work approvals
Route::get('work&id={id}/list', 'AdminController@aboutWorkApproval');  //Patvirtintas darbas pagal darbo id
Route::post('work&id={id}/approve', 'AdminController@workApproval');  //Freelancer darbu patvirtinimas
//Admin service approvals
Route::get('service&id={id}/list', 'AdminController@aboutServiceApproval');  //Patvirtinta paslauga pagal paslaugos id
Route::post('service&id={id}/approve', 'AdminController@ServiceApproval');  //Paslaugos patvirtinimas
//Admin skill approvals
Route::get('skill&id={id}/admin/list', 'AdminController@aboutskillApproval');  //Patvirtinas skill pagal skill id
Route::post('skill&id={skill_id}/user&id={user_id}','AdminController@skillApproval');  //Skill patvirtinimas

//Message
Route::get('message/{senders_id}/{receivers_id}', 'MessageController@fromMsg'); //Išsiųstos
Route::put('message/notification/{senders_id}', 'MessageController@notifi'); //Pažymeti,kad visi notification peržiurėti pagal senders_id,tai notifiable_id
Route::post('message', 'MessageController@create'); //Išsiuntus žinute atsiranda info notifications table,notifible_id colum tai siuntejo_id, data colum tai gavejio_id ir vardas
Route::delete('message/delete/{message}', 'MessageController@destroy');

//Rating
Route::get('all/rating', 'RatingController@aboutRating');
Route::post('rating', 'RatingController@create');
Route::delete('rating/delete/{rating}', 'RatingController@destroy');


//per postmana api/skill ir api/skill/1
//Skill approvalphp
//index parodo pagal id userius isveda user visus duomenys
Route::get('skills/{id}', 'SkillController@index');
Route::get('skills', 'SkillController@skillsList'); // Skillu listas
Route::delete('skill/delete/{skill}', 'SkillController@skillDelete'); // Skill delete



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
