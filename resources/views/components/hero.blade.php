<section class="d-flex justify-content-center align-items-center py-5">
    <div class="container">
        <div class="hero-blur text-center">
            @if(isset($title))
                <h1 class="mb-3 display-3">{{ $title }}</h1>
            @endif

            @if(isset($subtitle))
                <p class="lead mb-4" style="max-width: 800px; margin: 0 auto;">
                    {{ $subtitle }}
                </p>
            @endif

            @if(isset($cosas))
                <div class="hero-cosas">
                    {{ $cosas }}
                </div>
            @endif

            @if(isset($primaryButton) || isset($secondaryButton))
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    @if(isset($primaryButton))
                        <a href="{{ $primaryButton['href'] }}" 
                           class="btn btn-{{ $primaryButton['variant'] ?? 'primary' }} px-4 gap-3 fw-bold shadow-lg btn-lg">
                            {{ $primaryButton['label'] }}
                        </a>
                    @endif

                    @if(isset($secondaryButton))
                        <a href="{{ $secondaryButton['href'] }}" 
                           class="btn btn-outline-{{ $secondaryButton['variant'] ?? 'light' }} px-4 btn-lg">
                            {{ $secondaryButton['label'] }}
                        </a>
                    @endif
                </div>
            @endif
        </div>
    </div>
</section>