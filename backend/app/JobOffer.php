<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    protected $fillable = [
        'title', 'description', 'salary', 'user_id'
    ];
    public function skills()
    {
        return $this->belongsToMany('App\Skill','job_offer_skill','offer_id','skill_id');
    }
}
