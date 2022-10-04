<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait Uuid {
    public function getIncreamenting(){
        return false;
    }

    public function getKeyType(){
        return 'string';
    }


    public static function booted(){
        static::creating(function(Model $model){
            $model->setAttribute($model->getKeyName(), Str::uuid());
        });
    }
}