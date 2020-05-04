<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use \App\Notifications\privateMessage;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function fromMsg($senders_id,$receivers_id)
    {
        Message::where('senders_id',$senders_id)->where('receivers_id',$receivers_id)->update(['notification_read' => 1]);
        return response()->json(Message::select('*')->where('senders_id',$senders_id)->where('receivers_id',$receivers_id)->get(),200);
    }

    public function received($receiver_id)
    {
        return response()->json(count(Message::select('*')->where('receivers_id',$receiver_id)->where('notification_read',0)->get()),200);
    }

    public function receivedMessages($receiver_id)
    {   
        return response()->json(Message::select('messages.id as id','notification_read','name','messages.created_at as created_at')
                                ->distinct()
                                ->where('receivers_id',$receiver_id)
                                ->orderBy('name')
                                ->join('users', 'users.id','messages.senders_id')
                                ->get(),200);
    }

    public function create(Request $request)
    {
        try { //tikrina ar vartotojas yra prisijungęs, jeigu ne išveda klaidą
            $user = auth()->userOrFail();
        } catch(\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Prašome prisijungti'], 401);
        }
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
