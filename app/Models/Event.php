<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Event extends Model
{
    use HasFactory, Uuid;

    protected $fillable = ['title', 'type', 'date', 'time', 'note'];

    public function user(){
        return $this->belongsTo(Person::class);
    }
}
