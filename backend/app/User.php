<?php

namespace App;

use App\Role;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'foto', 'location', 'role', 'username',
    ];
    protected $hidden = [
        'password', 'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function getJWTIdentifier(){
        return $this->getKey();
    }
    public function getJWTCustomClaims(){
        return [];
    }
    public function roles()
    {
        return $this->belongsToMany('App\Role','role_user','user_id','role_id');
    }

    /* Role Authorization */

    public function authorizeRoles($roles)
    {
    if (is_array($roles)) {
        return $this->hasAnyRole($roles) ||
                abort(401, 'This action is unauthorized.');
    }
        return $this->hasRole($roles) ||
                abort(401, 'This action is unauthorized.');
    }

    public function hasAnyRole($roles)
    {
    return null !== $this->roles()->whereIn('role', $roles)->first();
    }

    public function hasRole($role)
    {
    return null !== $this->roles()->where('role', $role)->first();
    }
}
