@extends('layouts.app')

@section('title', 'Home')

@section('content')
    @include('components.hero', [
        'title' => 'International Marble Blowing Competition',
        'subtitle' => 'Experience the pinnacle of precision and skill! The most prestigious and exciting marble-blowing event in the world, uniting the globe\'s finest blowers.',
        'primaryButton' => [
            'label' => 'Register Now',
            'href' => '#register',
            'variant' => 'primary'
        ],
        'secondaryButton' => [
            'label' => 'View Rulebook',
            'href' => '#rules',
            'variant' => 'outline-light'
        ]
    ])

    @include('components.highlights')
    @include('components.adbanner', ['position' => 'right', 'closeable' => true])
@endsection