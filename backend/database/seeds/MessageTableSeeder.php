<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\User;
use App\Message;

class MessageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('App\Messages');
        for($i = 0; $i < 20; $i++) {
           $fakeMessage = New Message([
                'senders_id' => $faker->numberBetween($min = 1, $max = 20),
                'receivers_id' => $faker->numberBetween($min = 1, $max = 20),
                'message' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ]);
            $fakeMessage->save();
        }
    }
}
