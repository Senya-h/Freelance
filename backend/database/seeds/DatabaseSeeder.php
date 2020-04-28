<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(SkillTableSeeder::class);
        $this->call(FormatsTableSeeder::class);
        $this->call(CommentTableSeeder::class);
        $this->call(MessageTableSeeder::class);
        $this->call(PortfolioTableSeeder::class);
        $this->call(ServiceTableSeeder::class);
    }
}
