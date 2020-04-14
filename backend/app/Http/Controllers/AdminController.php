<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\BanDeleteUser;
use App\AdminWorkApprove;
use App\User;
use App\RoleUser;
use App\AdminServiceApprove;

class AdminController extends Controller
{
    //Blokuoti trinti user
    public function create(Request $request,$id)
    {
        if($request->user()->authorizeRoles('Admin')){
            if($request->input('baned') == 1){
            return BanDeleteUser::create([
                'user_id' => $id,
                'baned' => $request->input('baned'),
                'deleted' => $request->input('deleted'),
            ]);
            }else if($request->input('deleted') == 1){
                BanDeleteUser::create([
                    'user_id' => $id,
                    'baned' => $request->input('baned'),
                    'deleted' => $request->input('deleted'),
                ]);
                $role_user = RoleUser::where('user_id', $id);
                $role_user->delete();
                $user = User::find($id);
                $user->delete();
            }
        }
    }

    //Šalinti blokuotu user saraša
    public function destroy(Request $request, $id)
    {
        if($request->user()->authorizeRoles('Admin')){
            $BanDeleteUser = BanDeleteUser::where('user_id', $id);
            $BanDeleteUser->delete();
            return response()->json(["message" => "Vartotojas atnaujintas"], 200);
        }
    }

    // Darbu patvirtinimai
    public function aboutWorkApproval(Request $request, $id){
        return response()->json(AdminWorkApprove::select('*')->where('work_id',$id)->get(),200);
    }

    public function workApproval(Request $request,$id)
    {
        if($request->user()->authorizeRoles('Admin')){
            return AdminWorkApprove::create([
                'work_id' => $id,
                'approved' => $request->input('approved'),
            ]);
        }
    }

    // Paslaugu patvirtinimai
    public function aboutServiceApproval(Request $request, $id){
        return response()->json(AdminServiceApprove::select('*')->where('service_id',$id)->get(),200);
    }

    public function ServiceApproval(Request $request,$id)
    {
        if($request->user()->authorizeRoles('Admin')){
            return AdminServiceApprove::create([
                'service_id' => $id,
                'approved' => $request->input('approved'),
            ]);
        }
    }
}
