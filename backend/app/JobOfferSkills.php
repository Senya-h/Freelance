<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JobOfferSkills extends Model
{
    protected $fillable = [
        'offer_id','skill_id'
    ];
}
