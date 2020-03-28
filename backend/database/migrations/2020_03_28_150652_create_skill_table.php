<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSkillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skill', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        // Insert some stuff
        DB::table('skill')->insert(
            [
                [
                    'name' => 'JAVA',
                    'created_at' => Carbon::now(), # new \Datetime()
                    'updated_at' => Carbon::now(),  # new \Datetime()
                ],
                [
                    'name' => 'HTML',
                    'created_at' => Carbon::now(), # new \Datetime()
                    'updated_at' => Carbon::now(),  # new \Datetime()
                ],
                [
                    'name' => 'CSS',
                    'created_at' => Carbon::now(), # new \Datetime()
                    'updated_at' => Carbon::now(),  # new \Datetime()
                ],
                [
                    'name' => 'PHP',
                    'created_at' => Carbon::now(), # new \Datetime()
                    'updated_at' => Carbon::now(),  # new \Datetime()
                ],
                [
                    'name' => 'JS',
                    'created_at' => Carbon::now(), # new \Datetime()
                    'updated_at' => Carbon::now(),  # new \Datetime()
                ],
            ]
        );

        Schema::create('user_skill', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('skill_id');
            $table->boolean('patvirtintas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skill');
        Schema::dropIfExists('user_skill');
    }
}
