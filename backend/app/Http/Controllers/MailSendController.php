<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Mail\SendMail;

class MailSendController extends Controller
{
    public function mailsend(Request $request)
    {
        $details = [
            'from'  => $request->input('from'),
            'body' => $request->input('body')
        ];

        \Mail::to('info@freelance.lt')->send(new SendMail($details));
        return response()->json(['message'=>'Išsiųsta']);
    }
}
