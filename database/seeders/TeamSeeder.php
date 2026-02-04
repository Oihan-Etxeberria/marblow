<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\Blower;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $team = Team::create([
            'name' => 'Puzgailur',
            'slug' => 'puzgailur',
            'logo' => '/Teams/puzgailur.png',
            'description' => 'Puzgailur, euskal herriko kanika putzari txapeldunak 2018. urtean. Talde bikaina izan zen eta maila mantentzen da!'
        ]);

        // Asociar blowers al equipo
        $blowers = Blower::all();
        $team->blowers()->attach($blowers->pluck('id'));
    }
}