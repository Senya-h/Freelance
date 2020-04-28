<?php

use Illuminate\Database\Seeder;
use App\Service;
use Faker\Factory as Faker;
class ServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('App\Service');
        for($i = 0; $i < 200; $i++) {
           $fakeService = New Service([
                'service' => ucfirst($faker->word),
                'price_per_hour' => $faker->numberBetween($min = 1, $max = 100),
                'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'user_id' => $faker->numberBetween($min = 2, $max = 150),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ]);
            $fakeService->save();
        }
    }
}
