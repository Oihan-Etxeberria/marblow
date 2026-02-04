<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Blower extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'surname',
        'description',
        'age',
        'pulmon_capacity',
        'smoking_years',
        'image_path',
        'lung_capacity'
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($blower) {
            if (empty($blower->slug)) {
                $blower->slug = Str::slug($blower->name . '-' . Str::random(5));
            }
        });
    }

    // Relación muchos a muchos con Eventos
    public function events()
    {
        return $this->belongsToMany(Event::class)
            ->withPivot('rank', 'time', 'top_blow')
            ->withTimestamps();
    }

    // Relación muchos a muchos con Equipos
    public function teams()
    {
        return $this->belongsToMany(Team::class)->withTimestamps();
    }

    // Accesor para nombre completo
    public function getFullNameAttribute()
    {
        return $this->name . ' ' . $this->surname;
    }

    // Accesor para URL
    public function getUrlAttribute()
    {
        return route('blowers.show', $this->slug);
    }
}