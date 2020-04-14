<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'service', 'description', 'price_per_hour', 'user_id'
    ];
    
    protected $hidden = [
        'id',
    ];

    public function adminserviceapprovals()
    {
        return $this->hasMany('App\AdminServiceApprove');
    }
}
