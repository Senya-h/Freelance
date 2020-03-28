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
        User::create([
            'name' => 'admin',
            'email' => 'info@freelance.lt',
            'foto' => '',
            'location' => 'Kaunas',
            'password' => Hash::make('admin123'),
            'role_id' => 1,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        User::create([
            'name' => 'klientas',
            'email' => 'klientas@freelance.lt',
            'foto' => '',
            'location' => 'Kaunas',
            'password' => Hash::make('klientas123'),
            'role_id' => 2,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        User::create([
            'name' => 'freelanceris',
            'email' => 'freelanceris@freelance.lt',
            'foto' => '',
            'location' => 'Kaunas',
            'password' => Hash::make('klientas123'),
            'role_id' => 3,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        User::create([
            'name' => 'freelanceris2',
            'email' => 'freelanceris2@freelance.lt',
            'foto' => '',
            'location' => 'Kaunas',
            'password' => Hash::make('klientas123'),
            'role_id' => 3,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
    }
}
