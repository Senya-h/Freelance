<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectApproval extends Model
{
    protected $table = 'project_approval';
    protected $fillable = [
        'user_id','work_id','approved'
    ];
}
