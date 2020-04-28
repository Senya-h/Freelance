<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminServiceApprove extends Model
{
    protected $fillable = [
        'service_id','approved','user_id'
    ];

    public function services()
    {
        return $this->belongsTo('App\Service');
    }
}
