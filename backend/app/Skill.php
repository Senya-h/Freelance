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
        return $this->belongsToMany('App\User','skill_users', 'skill_id','user_id');
    }
    public function offers()
    {
        return $this->belongsToMany('App\JobOffer','job_offer_skill','skill_id','offer_id');
    }
}
