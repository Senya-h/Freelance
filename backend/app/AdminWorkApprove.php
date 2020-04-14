<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminWorkApprove extends Model
{
    protected $fillable = [
        'work_id','approved'
    ];

    public function portfolioworks()
    {
        return $this->belongsTo('App\PortfolioWorks');
    }
}
