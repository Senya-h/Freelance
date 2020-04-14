<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SkillUser extends Model
{
    protected $fillable = [
        'user_id','skill_id','approved'
    ];
}
