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
        return $this->belongsToMany(Skill::class, 'user_skill','skill_id','user_id');
    }


}