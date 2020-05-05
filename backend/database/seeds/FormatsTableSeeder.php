<?php

use Illuminate\Database\Seeder;

class FormatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('file_formats')->insert([
            'format' => 'png',
            'fileType' => 'foto',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'jpg',
            'fileType' => 'foto',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'jpeg',
            'fileType' => 'foto',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'gif',
            'fileType' => 'foto',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'mpg',
            'fileType' => 'video',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'mpeg',
            'fileType' => 'video',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'doc',
            'fileType' => 'text',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'docx',
            'fileType' => 'text',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
    }
}
