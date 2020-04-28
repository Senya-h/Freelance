<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
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
        $faker = Faker::create('App\User');

        $user = New User([
            'name' => 'admin',
            'email' => 'info@freelance.lt',
            'location' => 'Kaunas',
            'role' => 1,
            'foto' => '',
            'password' => Hash::make('admin123'),
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
            $user->save();
            $user->roles()->sync(1,false);
        for($i = 0; $i < 150; $i++) {
           $fakeUser = New User([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'location' => $faker->city,
                'role' => 3,
                'foto' => '',
                'password' => Hash::make('fake123'),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ]);
                $fakeUser->save();
                $fakeUser->roles()->sync(3,false); 
        }       
    }
}
