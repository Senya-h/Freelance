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
            'foto' => 'userimg/default.png',
            'password' => Hash::make('admin123'),
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
            $user->save();
            $user->roles()->sync(1,false);
        for($i = 0; $i < 150; $i++) {
           $fakeUser = New User([
                'name' => $faker->name,
                'email' => 'freelancer.'.$faker->unique()->email,
                'location' => $faker->city,
                'role' => 3,
                'foto' => 'userimg/default.png',
                'password' => Hash::make('fake123'),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ]);
                $fakeUser->save();
                $fakeUser->roles()->sync(3,false); 
        }      
        for($i = 0; $i < 150; $i++) {
            $fakeUser = New User([
                 'name' => $faker->name,
                 'email' => 'client.'.$faker->unique()->email,
                 'location' => $faker->city,
                 'role' => 2,
                 'foto' => 'userimg/default.png',
                 'password' => Hash::make('fake123'),
                 'created_at' => \Carbon\Carbon::now(),
                 'updated_at' => \Carbon\Carbon::now()
             ]);
                 $fakeUser->save();
                 $fakeUser->roles()->sync(2,false); 
         }    
    }
}
