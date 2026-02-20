<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BettingWindow extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'status',
        'opens_at',
        'closes_at',
    ];

    protected $casts = [
        'opens_at' => 'datetime',
        'closes_at' => 'datetime',
    ];

    // Relación con Event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
