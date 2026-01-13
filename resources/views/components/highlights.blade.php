<?php
// Por ahora las añadimos a mano. Ya que son estaticos por ahora.
$highlights = [
    [
        'title' => 'Puzgailur',
        'description' => 'Meet the most successful marble blowing teams and learn what makes them exceptional. View standings and team profiles.',
        'image' => '/Teams/puzgailurOnPoint.png',
        'buttonText' => 'View Teams',
        'link' => '/teams',
    ],
    [
        'title' => 'Top Blowers',
        'description' => 'Profiles of the most skilled marble blowers participating in the competition, including stats and history.',
        'image' => '/Teams/perlada.png',
        'buttonText' => 'View Blowers',
        'link' => '/blowers',
    ],
    [
        'title' => 'Upcoming Events',
        'description' => 'Stay informed about all upcoming international tournaments, local qualifiers, and rule updates.',
        'image' => '/argazkiak/canicas.png',
        'buttonText' => 'Event Calendar',
        'link' => '/events',
    ],
];
?>

<section class="py-4">
    <div class="container">
        <h3 class="mb-4 text-center text-outline-white display-6">
            Featured Pages
        </h3>
        <div class="row g-4">
            @foreach($highlights as $highlight)
                <div class="col-md-4">
                    <div class="card h-100 shadow-lg border-0">
                        <img src="{{ asset($highlight['image']) }}" 
                             class="card-img-top" 
                             alt="{{ $highlight['title'] }}" 
                             style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title text-primary">{{ $highlight['title'] }}</h5>
                            <p class="card-text text-dark-emphasis">{{ $highlight['description'] }}</p>
                            <a href="{{ $highlight['link'] }}" class="btn btn-outline-primary btn-sm mt-3">
                                {{ $highlight['buttonText'] }}
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>