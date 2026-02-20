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

    // Relación con BettingWindow
    public function bettingWindow()
    {
        return $this->hasOne(BettingWindow::class);
    }

    // Auto-create betting window when event is created
    protected static function boot()
    {
        parent::boot();

        static::created(function ($event) {
            BettingWindow::create([
                'event_id' => $event->id,
                'status' => 'pending',
                'opens_at' => $event->date->copy()->subDays(10),
                'closes_at' => $event->date->copy()->endOfDay(),
            ]);
        });
    }
}