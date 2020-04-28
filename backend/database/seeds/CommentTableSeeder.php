<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\User;
use App\Comments;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('App\Comments');
        for($i = 0; $i < 20; $i++) {
           $fakeComment = New Comments([
                'user_id' => $faker->numberBetween($min = 1, $max = 20),
                'receiver_id' => $faker->numberBetween($min = 1, $max = 20),
                'rating' => $faker->numberBetween($min = 1, $max = 5),
                'comment' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ]);
            $fakeComment->save();
        }       
    }
}
