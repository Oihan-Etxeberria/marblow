<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'location',
        'description'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    // Relación muchos a muchos con Blowers
    public function blowers()
    {
        return $this->belongsToMany(Blower::class)
            ->withPivot('rank', 'time', 'top_blow')
            ->withTimestamps();
    }
}