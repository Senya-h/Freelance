<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    protected $fillable = [
        'user_id','role_id'
    ];
}
