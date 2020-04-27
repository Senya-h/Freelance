<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $table = "skill";
    protected $fillable = [
        'name'
    ];

    public function users()
    {
        return $this->belongsToMany('App\User','user_skill', 'skill_id','user_id');
    }

    public function skillusers()
    {
        return $this->belongsToMany('App\User','skill_users','skill_id','user_id');
    }
}
