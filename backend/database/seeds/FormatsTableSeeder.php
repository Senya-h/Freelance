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
            'fileType' => 'image/png',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'jpg',
            'fileType' => 'image/jpeg',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'jpeg',
            'fileType' => 'image/jpeg',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'gif',
            'fileType' => 'image/gif',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'mpg',
            'fileType' => 'video/mpeg',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'mpeg',
            'fileType' => 'video/mpeg',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'doc',
            'fileType' => 'application/msword',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
        DB::table('file_formats')->insert([
            'format' => 'docx',
            'fileType' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
    }
}
