<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BanDeleteUser extends Model
{
    protected $fillable = [
        'user_id','baned','deleted'
    ];

    public function users()
    {
        return $this->hasMany('App\User');
    }
}
