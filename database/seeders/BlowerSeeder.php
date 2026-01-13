<?php

namespace Database\Seeders;

use App\Models\Blower;
use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlowerSeeder extends Seeder
{
    public function run(): void
    {
        $blowers = [
            [
                'name' => 'Oihan',
                'surname' => 'El fokin jefe',
                'slug' => 'oihan',
                'description' => 'Aupa, urnietako tipo oso jator bat naiz eta nire birikak altzairuzkoak dira. Inork ezin nau irabazi, tren ondoko tabernan aritzen den erretzaile zaharrez gain.',
                'age' => 21,
                'pulmon_capacity' => 69,
                'smoking_years' => 10,
                'lung_capacity' => 6.5,
                'image_path' => '/Blowers/Oihan.png',
            ],
            [
                'name' => 'Pepe',
                'surname' => 'El destructor de birikas',
                'slug' => 'pepe',
                'description' => 'Soy de Bilbao, fumo como un camionero y aun así soplo más fuerte que nadie. ¡Aupa los míos!',
                'age' => 35,
                'pulmon_capacity' => 85,
                'smoking_years' => 18,
                'lung_capacity' => 6.2,
                'image_path' => '/Blowers/ruso.webp',
            ],
            [
                'name' => 'Iñigo',
                'surname' => 'El huracán que fuma Pueblo',
                'slug' => 'iñigo',
                'description' => 'Yo era un simple fumador de liar hasta que Oihan vio el potencial en mis pulmones y Marbloro apoyó esa idea para llevar a cabo mi espectacular carrera como soplador.',
                'age' => 35,
                'pulmon_capacity' => 85,
                'smoking_years' => 18,
                'lung_capacity' => 7.1,
                'image_path' => '/Blowers/hans.webp',
            ],
            [
                'name' => 'Sebas',
                'surname' => 'Peruano',
                'slug' => 'sebas',
                'description' => 'Lleno de un potencial inmesurable gracias a la técnica de tornados aprendidos de sus apetitosos platos de palomas callejeras.🤪🤰',
                'age' => 35,
                'pulmon_capacity' => 85,
                'smoking_years' => 18,
                'lung_capacity' => 6.0,
                'image_path' => '/Blowers/sebas.jpg',
            ],
            [
                'name' => 'Xuhar',
                'surname' => 'Vago con correa',
                'slug' => 'xuhar',
                'description' => 'El vago más productivo que jamás hayas visto.',
                'age' => 24,
                'pulmon_capacity' => 58,
                'smoking_years' => 5,
                'lung_capacity' => 5.8,
                'image_path' => '/Blowers/donald.webp',
            ],
        ];

        foreach ($blowers as $blowerData) {
            $blower = Blower::create($blowerData);
            
            // Crear eventos asociados
            $events = $this->getBlowerEvents($blower->slug);
            
            foreach ($events as $eventData) {
                $event = Event::firstOrCreate(
                    ['name' => $eventData['name']],
                    [
                        'date' => now()->subDays(rand(1, 365)),
                        'location' => 'Bilbao, Spain',
                        'description' => 'Marble blowing competition'
                    ]
                );
                
                $blower->events()->attach($event->id, [
                    'rank' => $eventData['rank'],
                    'time' => $eventData['time'],
                    'top_blow' => $eventData['top_blow']
                ]);
            }
        }
    }

    private function getBlowerEvents(string $slug): array
    {
        $events = [
            'oihan' => [
                ['name' => 'Competition Oct 2024', 'rank' => 1, 'time' => '02:17 min', 'top_blow' => 88],
                ['name' => 'Competition Sep 2024', 'rank' => 3, 'time' => '02:40 min', 'top_blow' => 75],
                ['name' => 'Competition Ago 2024', 'rank' => 7, 'time' => '03:10 min', 'top_blow' => 62],
                ['name' => 'Competition Jul 2024', 'rank' => 2, 'time' => '02:22 min', 'top_blow' => 81],
            ],
            'pepe' => [
                ['name' => 'Competition Nov 2024', 'rank' => 1, 'time' => '02:05 min', 'top_blow' => 92],
                ['name' => 'Competition Oct 2024', 'rank' => 2, 'time' => '02:15 min', 'top_blow' => 89],
                ['name' => 'Competition Sep 2024', 'rank' => 1, 'time' => '02:08 min', 'top_blow' => 91],
            ],
            // ... más eventos para otros blowers
        ];

        return $events[$slug] ?? [];
    }
}