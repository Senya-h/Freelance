<?php

use Illuminate\Database\Seeder;
use App\PortfolioWorks;
use Faker\Factory as Faker;
class PortfolioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('App\PortfolioWorks');
        for($i = 0; $i < 20; $i++) {
           $fakePortfolio = New PortfolioWorks([
                'title' => $faker->word,
                'filePath' => $faker->word,
                'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'user_id' => $faker->numberBetween($min = 1, $max = 20),
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now()
            ]);
            $fakePortfolio->save();
        }
    }
}
