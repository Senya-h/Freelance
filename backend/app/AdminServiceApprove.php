<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminServiceApprove extends Model
{
    protected $fillable = [
        'service_id','approved'
    ];

    public function services()
    {
        return $this->belongsTo('App\Service');
    }
}
