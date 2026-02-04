<section class="d-flex justify-content-center align-items-center py-5">
    <div class="container">
        <div class="hero-blur text-center">
            <img src="{{ asset($logoSrc) }}" alt="Team Logo" class="mb-4" style="max-height: 150px;">
            <h1 class="mb-3 display-3">{{ $name }}</h1>
            <p class="lead mb-4" style="max-width: 800px; margin: 0 auto;">
                {{ $description }}
            </p>
        </div>
    </div>
</section>