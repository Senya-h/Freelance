<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SkillApprove extends Model
{
    protected $fillable = [
      'rating', 'comment', 'user_id', 'skill_id', 'author_id' 
    ];
}
