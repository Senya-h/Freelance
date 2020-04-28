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
}
