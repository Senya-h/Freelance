<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PortfolioWorks extends Model
{
    protected $fillable = [
        'title', 'description', 'filePath', 'user_id'
    ];

    public function adminworkapprovals()
    {
        return $this->hasMany('App\AdminWorkApprove');
    }
    public function works()
    {
        return $this->hasOne('App\User','work_id', 'user_id');
    }
}
