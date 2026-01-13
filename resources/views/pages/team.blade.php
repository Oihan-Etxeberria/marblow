{{-- resources/views/teams/show.blade.php --}}
@extends('layouts.app')

@section('title', $team->name)

@section('content')
<div class="team-page">
    <!-- Hero Section -->
    <section class="py-5">
        <div class="container">
            <div class="row mb-5">
                <div class="col-md-4 text-center">
                    @if($team->logo)
                    <img src="{{ asset($team->logo) }}" 
                         alt="{{ $team->name }}"
                         class="img-fluid rounded shadow"
                         style="max-height: 300px; object-fit: cover;">
                    @else
                    <div class="bg-secondary rounded d-flex align-items-center justify-content-center" 
                         style="height: 300px;">
                        <span class="text-white">No Logo</span>
                    </div>
                    @endif
                </div>
                
                <div class="col-md-8">
                    <div class="hero-blur p-4 p-md-5">
                        <h1 class="display-4 mb-3 text-white fw-bold text-uppercase">
                            {{ $team->name }}
                        </h1>
                        
                        @if($team->description)
                        <div class="mb-4">
                            <p class="lead">{{ $team->description }}</p>
                        </div>
                        @endif
                        
                        <div class="d-flex gap-3 mb-4">
                            <span class="badge bg-primary fs-6">
                                <i class="bi bi-people me-1"></i>
                                {{ $team->blowers->count() }} Blowers
                            </span>
                            <span class="badge bg-success fs-6">
                                <i class="bi bi-trophy me-1"></i>
                                Team
                            </span>
                        </div>
                        
                        @auth
                        <div class="d-flex gap-2">
                            <a href="{{ route('teams.edit', $team) }}" class="btn btn-warning">
                                <i class="bi bi-pencil me-2"></i> Edit Team
                            </a>
                            <form action="{{ route('teams.destroy', $team) }}" 
                                  method="POST"
                                  onsubmit="return confirm('Delete this team?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">
                                    <i class="bi bi-trash me-2"></i> Delete
                                </button>
                            </form>
                        </div>
                        @endauth
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Catalog (Swiper) -->
    <section class="py-3">
        <div class="container">
            <div class="hero-blur p-4 p-md-5">
                <h2 class="text-center text-white mb-3 display-5 fw-bold text-uppercase">
                    Blowers
                </h2>
                
                <div class="team-catalog-slider-wrapper">
                    @if($team->blowers->isEmpty())
                    <div class="alert alert-info">
                        This team has no blowers yet.
                        @auth
                        <a href="{{ route('teams.edit', $team) }}">Add blowers to this team</a>
                        @endauth
                    </div>
                    @else
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            @foreach($team->blowers as $blower)
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
        </div>
    </section>

    <!-- Join Form -->
    <section class="py-5">
        <div class="container">
            <div class="hero-blur p-4 p-md-5">
                <h2 class="text-center text-white mb-4 display-5 fw-bold text-uppercase">
                    Apuntarse
                </h2>
                
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6">
                        <form action="{{ route('teams.join', $team) }}" method="POST" class="p-4">
                            @csrf
                            <div class="mb-3">
                                <label for="name" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="name" name="name" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="message" class="form-label">Mensaje (Opcional)</label>
                                <textarea class="form-control" id="message" name="message" rows="3"></textarea>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="terms" name="terms" required>
                                <label class="form-check-label" for="terms">
                                    Acepto los términos y condiciones
                                </label>
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-100">
                                Enviar Solicitud
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Admin Form (only for admins) -->
    @auth
    @if($allBlowers->isNotEmpty())
    <section class="py-5">
        <div class="container">
            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0">
                        <i class="bi bi-person-plus me-2"></i>Add Blowers to Team (Admin)
                    </h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('teams.update', $team) }}" method="POST">
                        @csrf
                        @method('PUT')
                        
                        <div class="mb-3">
                            <label class="form-label">Select Blowers</label>
                            <select name="blowers[]" class="form-select" multiple size="5">
                                @foreach($allBlowers as $blower)
                                <option value="{{ $blower->id }}" 
                                    {{ $team->blowers->contains($blower->id) ? 'selected' : '' }}>
                                    {{ $blower->name }} {{ $blower->surname }}
                                </option>
                                @endforeach
                            </select>
                            <small class="text-muted">Hold Ctrl/Cmd to select multiple</small>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-save me-2"></i>Update Team Blowers
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    @endif
    @endauth
</div>

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
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
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