<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = New User([
            'name' => 'admin',
            'email' => 'info@freelance.lt',
            'location' => 'Kaunas',
            'role' => 1,
            'foto' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png',
            'password' => Hash::make('admin123'),
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
            $user->save();
            $user->roles()->sync(1,false);
    }
}
