<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Rating;
use Faker\Generator as Faker;

$factory->define(Rating::class, function (Faker $faker) {
    return [
        'user_id' => $faker->biasedNumberBetween($min = 1, $max = 5, $function = 'sqrt'),
        'message' => $faker->sentence($nbWords = 6, $variableNbWords = true) ,
        'rating' => $faker->biasedNumberBetween($min = 1, $max = 5, $function = 'sqrt'),
        'profolio_id' => $faker->biasedNumberBetween($min = 1, $max = 1, $function = 'sqrt'),
    ];
});
