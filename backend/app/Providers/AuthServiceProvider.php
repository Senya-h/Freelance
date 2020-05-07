<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('authorization', function ($user, $work) {
            return $user->id == $work->user_id;
        });
        Gate::define('commentDelete', function ($user, $comments){
            return $user->id === $comments->user_id || $user->id === $comments->receiver_id;
        });
        Gate::define('skill-approve', function ($user, $skill) {
            //dd($skill);
            return $user->id == $skill->author_id;
        });
    }
}
