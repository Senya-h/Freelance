<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SkillApproval extends Model
{
    protected $table = 'user_skill';
    protected $fillable = [
        'user_id','skill_id','approved'
    ];

    public function users()
    {
        return $this->belongsToMany(Skill::class, 'user_skill', 'skill_id', 'user_id');
    }
    /*public function users()
    {
        return $this->belongsToMany('App\User','role_users','role_id','user_id');
    }*/
}
