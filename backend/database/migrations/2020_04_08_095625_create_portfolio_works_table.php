<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePortfolioWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('portfolio_works', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('filePath');
            $table->integer('user_id');
            $table->boolean('verified')->nullable();
            $table->boolean('user_verified_id')->nullable();
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
        Schema::dropIfExists('portfolio_works');
    }
}
