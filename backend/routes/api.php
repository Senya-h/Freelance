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

//Admin login
Route::post('login/admin','AdminController@adminLogin');

Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');

//User
Route::get('user/{id}', 'PortfolioController@aboutUser'); //Userio info pagal ID
Route::post('photo-upload', 'ApiController@userPhotoUpload');
//Services
Route::get('services','ServiceController@list'); // Visos paslaugos
Route::post('service', 'ServiceController@create'); // id=userIdD   Paslaugų pridėjimas(Vartotojas gali pridėt daugiau nei vieną paslaugą)
Route::post('update/service&id={id}', 'ServiceController@update'); // id=serviceID Paslauga gali būt redaguojama
Route::delete('delete/service&id={service}', 'ServiceController@destroy'); // id=serviceID Paslaugos ištrynimas
//Portfolio Works
Route::get('works','PortfolioWorksController@list'); // Visi darbai
Route::post('work', 'PortfolioWorksController@create'); // Portfolio darbų pridėjimas(Vartotojas gali pridėti daugiau nei vieną darbą)
Route::post('update/work&id={id}', 'PortfolioWorksController@update'); // id=workID Darbas gali būt redaguojama
Route::delete('delete/work&id={work}', 'PortfolioWorksController@destroy'); // id=workID Darbo ištrynimas

//Formato pridėjimas į DB
Route::get('format-list', 'AdminController@formatList');
Route::post('format', 'AdminController@addFormat');
Route::delete('format/delete&id={id}', 'AdminController@deleteFormat');

//Roles
Route::get('role', 'RoleController@aboutRole'); //Roliu sarašas
Route::get('role/user&id={id}', 'RoleUserController@aboutRoleUser'); //Roliu user sarašas pagal user id

//Admin
Route::post('user&id={id}/ban/delete', 'AdminController@destroy'); //Admin delete arba ban pagal user id (input = bool True=1, Flase=0)
//Admin unban
Route::delete('user&id={id}/remove', 'AdminController@unban');
//Admin work approvals
Route::get('work&id={id}/list', 'AdminController@aboutWorkApproval');  //Patvirtintas darbas pagal darbo id
Route::post('work&id={id}/approve', 'AdminController@workApproval');  //Freelancer darbu patvirtinimas
//Admin service approvals
Route::get('service&id={id}/list', 'AdminController@aboutServiceApproval');  //Patvirtinta paslauga pagal paslaugos id
Route::post('service&id={id}/approve', 'AdminController@ServiceApproval');  //Paslaugos patvirtinimas
//Admin service delete
Route::delete('admin/delete/service&id={service}', 'AdminController@serviceDelete'); // id=serviceID Paslaugos ištrynimas
//Admin darbo delete
Route::delete('admin/delete/work&id={work}', 'AdminController@workDelete'); // id=serviceID Darbo ištrynimas
//Admin skill delete
Route::delete('skill/delete/{skill}', 'AdminController@skillDelete'); // Skill delete pagal skill=id
Route::post('skill_add','AdminController@addSkill'); // Prideti skill
//Admin roel pridejimas
Route::post('add/role&id={role_id}', 'AdminController@store'); //Prideti role useriui
Route::delete('delete/role&id={role_id}/user&id={user_id}', 'AdminController@deleteRole'); //Ištrinti userui role

//Message
Route::get('message/{senders_id}/{receivers_id}', 'MessageController@fromMsg'); //Paemus išsiųstas žinutes pasikeičia notivication_read i true(1) 
Route::post('message{id}', 'MessageController@create'); //Išsiusti žinute
Route::delete('message/delete/{message}', 'MessageController@destroy');

//index parodo pagal id userius isveda user visus duomenys
Route::get('skill&id={id}/list', 'SkillController@aboutskillApproval');  //Patvirtintas skill pagal skill id
Route::post('skill&id={skill_id}/user&id={user_id}','SkillController@skillApproval');  //Skill patvirtinimas
Route::get('skills', 'SkillController@skillsList'); // Skillu listas
Route::delete('skill/delete/{skill}', 'SkillController@skillDelete'); // Skill delete

//create sukuria i table user_skill pagal "user_id" ir "skill_id"
Route::post('skill', 'SkillController@create');
Route::post('skill_add','AdminController@addSkill');

//Vartotojų sąrašas
Route::get('users','ApiController@usersList');
//Užblokuotų vartotojų sąrašas
Route::get('banned','ApiController@bannedUsersList');
//Freelancerių sąrašas
Route::get('freelancers','ApiController@freelancersList');
//Freelancerių paieška
Route::get('search','ApiController@search');
//Tikrina ar useris nėra užblokuotas
Route::get('checkJWT','ApiController@refreshBannedToken');
//Tikrina ar useris nėra užblokuotas
Route::get('statistics','ApiController@statistics');

Route::get('comment/{id}', 'CommentsController@index');//nesutvarkytas
Route::post('comment','CommentsController@create');
Route::put('comment/{comment}','CommentsController@update');
Route::delete('comment/{id}','CommentsController@delete');

//Userio info su role
Route::post('user/roles','AdminController@findUserWithRoles');

//Klientų darbų pasiūlymai

Route::get('offers-list', 'JobOfferController@list'); // Pasiūlymų sąrašas
Route::get('myoffers','JobOfferController@myOffers'); //Mano skelbimai
Route::get('joboffer/{id}','JobOfferController@singleOffer'); //Vienas pasiūlymas
Route::post('joboffer','JobOfferController@create'); //Sukurti paslaugą
Route::put('joboffer/update/{id}','JobOfferController@update'); //Atnaujinti paslaugą
Route::delete('joboffer/delete/{id}','JobOfferController@destroy'); //Atnaujinti paslaugą


Route::get('project/{id}', 'ProjectApprovalController@index');//nesutvarkytas
Route::post('project','ProjectApprovalController@create');
Route::put('project/{project}','ProjectApprovalController@update');
Route::delete('project/{id}','ProjectApprovalController@delete');
