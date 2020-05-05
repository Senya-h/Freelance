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
        $receiver = Message::select('*')
                                ->where('senders_id',$senders_id)
                                ->where('receivers_id',$receivers_id)
                                ->get();

        //$sender = Message::select('*')
        //                        ->where('senders_id',$receivers_id)
        //                        ->where('receivers_id',$senders_id)
        //                        ->get();
//
        //$newMessages = [
        //    $receiver,
        //    $sender
        //];

        return response()->json($receiver,200);
    }

   
    public function received($receiver_id)
    {
       
        return response()->json(count(Message::select('*')->where('receivers_id',$receiver_id)->where('notification_read',0)->get()),200);
    }

    
    public function receivedMessages($receiver_id)
    {   
      
        $names = [];
        $names = Message::select('name')
                                ->where('receivers_id',$receiver_id)
                                ->distinct()
                                ->join('users', 'users.id','messages.senders_id')
                                ->get();

        $notifications = [];
        $image = [];
        $id = [];
        foreach($names as $name) {
        $notifications = count(Message::select('notification_read')
                            ->where('name',$name->name)
                            ->where('receivers_id',$receiver_id)
                            ->where('notification_read',0)
                            ->join('users', 'users.id','messages.senders_id')
                            ->get());

        $image = Message::select('foto')
                                ->where('name',$name->name)
                                ->distinct()
                                ->join('users', 'users.id','messages.senders_id')
                                ->get();

        $id = Message::select('senders_id as ident')
                                ->where('name',$name->name)
                                ->distinct()
                                ->join('users', 'users.id','messages.senders_id')
                                ->get();

        $msgNotification[] = [
                'id'=>$id[0]->ident,
                'name'=>$name->name,
                'notification'=>$notifications,
                'foto' => $image[0]->foto
                ];   
         
        }
        return response()->json($msgNotification,200);
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
