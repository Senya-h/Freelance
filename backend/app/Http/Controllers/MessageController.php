<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use \App\Notifications\privateMessage;

class MessageController extends Controller
{
    public function fromMsg($senders_id,$receivers_id)
    {
        $user = User::findOrFail($senders_id);     
        $user->notifications->where('notifiable_id', $senders_id)->markAsRead();
        return response()->json(Message::select('*')->where('senders_id',$senders_id)->where('receivers_id',$receivers_id)->get(),200);
    }


    public function notifi($senders_id)
    {
        $user = User::findOrFail($senders_id);     
        $user->notifications->where('notifiable_id', $senders_id)->markAsRead();
        return response()->json(["message" => "Notification atnaujintas"], 201);
    }

    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
        $receiver = User::findOrFail($user->id);
        $receiver->notify(new privateMessage(User::findOrFail($request->input('receivers_id'))));
        return Message::create([
            'senders_id' => auth()->user()->id,
            'receivers_id' => $request->input('receivers_id'),
            'message' => $request->input('message'),
        ]);
    }

    public function destroy(Request $request, Message $message)
    {
        if (Gate::allows('authorization', $message)) {
            $message->delete();
        } else if (Gate::denies('authorization', $message)){
            return response()->json(["error" => "Jūs neturite teisės", 403]);
        }
        return response()->json(["message" => "Žinutė atnaujinta"], 201);
    }
}
