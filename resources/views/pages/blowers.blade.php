@extends('layouts.app')

@section('title', 'Top Blowers')

@section('content')
<section class="py-5">
    <div class="container hero-blur">
        <h1 class="text-center mb-4 display-4">Top Blowers</h1>
        <p class="lead text-center mb-5">The most durezas of the planet🌍💎</p>
        
        @if(auth()->check())
        <div class="text-end mb-4">
            <a href="{{ route('blowers.create') }}" class="btn btn-success">
                <i class="bi bi-plus-circle"></i> Nuevo Blower
            </a>
        </div>
        @endif
        
        <div class="team-catalog-slider-wrapper">
            @if($blowers->isEmpty())
            <div class="alert alert-info">
                This team has no blowers yet.
                @auth
                <a href="{{ route('teams.edit', $team) }}">Add blowers to this team</a>
                @endauth
            </div>
            @else
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    @foreach($blowers as $blower)
                    <div class="swiper-slide">
                        <div class="card h-100">
                            <img src="{{ asset($blower->image_path) }}" 
                                    class="card-img-top" 
                                    alt="{{ $blower->name }}"
                                    style="height: 250px; object-fit: cover;">
                            <div class="card-body text-center">
                                <h5 class="card-title">{{ $blower->name }}</h5>
                                <p class="card-text text-muted">{{ $blower->surname }}</p>
                                <div class="blower-info mb-3">
                                    <p class="mb-1"><strong>Age:</strong> {{ $blower->age }} years</p>
                                    @if($blower->lung_capacity)
                                    <p class="mb-1"><strong>Lung Capacity:</strong> {{ $blower->lung_capacity }}L</p>
                                    @endif
                                </div>
                                <a href="{{ route('blowers.show', $blower->slug) }}" 
                                    class="btn btn-outline-primary btn-sm">
                                    View Profile
                                </a>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
                
                <!-- Navigation buttons -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                
                <!-- Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            @endif
        </div>
    </div>
</section>
@push('styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<style>
    .swiper {
        width: 100%;
        padding: 20px 0 50px !important;
    }
    
    .swiper-slide {
        height: auto !important;
    }
    
    .swiper-button-next,
    .swiper-button-prev {
        color: white;
        background: rgba(0,0,0,0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
    .swiper-button-next:after,
    .swiper-button-prev:after {
        font-size: 20px;
    }
    
    .swiper-pagination {
        width: auto !important;
        text-align: center;
    }

    .swiper-pagination-bullet {
        background: white;
        opacity: 0.5;
    }
    
    .swiper-pagination-bullet-active {
        background: #0d6efd !important;
        opacity: 1;
    }
    
    .team-catalog-slider-wrapper {
        position: relative;
        overflow-x: hidden;
    }
</style>
@endpush

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const swiper = new Swiper('.swiper-container', {
            spaceBetween: 20,
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4,
                },
            }
        });
    });
</script>
@endpush
@endsection