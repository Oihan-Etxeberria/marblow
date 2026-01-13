<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'logo',
        'description'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($team) {
            if (empty($team->slug)) {
                $team->slug = Str::slug($team->name);
            }
        });
    }

    // Relación muchos a muchos con Blowers
    public function blowers()
    {
        return $this->belongsToMany(Blower::class)->withTimestamps();
    }

    // Accesor para URL
    public function getUrlAttribute()
    {
        return route('teams.show', $this->slug);
    }
}