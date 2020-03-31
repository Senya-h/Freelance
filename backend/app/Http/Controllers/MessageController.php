<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function fromMsg($id)
    {
        return response()->json(Message::select('*')->where('senders_id',$id)->get(),200);
    }
    public function toMsg($id)
    {
        return response()->json(Message::select('*')->where('receivers_id',$id)->get(),200);
    }

    public function create(Request $request)
    {
        return Message::create([
            'senders_id' => $request->input('senders_id'),
            'receivers_id' => $request->input('senders_id'),
            'message' => $request->input('message'),
        ]);
    }

    public function destroy(Request $request, Message $message)
    {
        $message->delete();
        return response()->json(null, 204);
    }
}
