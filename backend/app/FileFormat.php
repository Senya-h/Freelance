<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FileFormat extends Model
{
    protected $fillable = [
        'format', 'fileType',
    ];
}
