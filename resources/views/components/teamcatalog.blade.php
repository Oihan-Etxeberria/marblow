<section class="py-3">
    <div class="container">
        <div class="hero-blur p-4 p-md-5">
            @if(isset($title))
                <h2 class="text-center text-white mb-3 display-5 fw-bold text-uppercase">
                    {{ $title }}
                </h2>
            @endif
            @if(isset($subtitle))
                <p class="lead mb-4 text-center" style="max-width: 800px; margin: 0 auto;">
                    {{ $subtitle }}
                </p>
            @endif

            <div class="team-catalog-slider-wrapper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        @foreach($participants as $member)
                            <div class="swiper-slide">
                                @include('components.blowercard', ['member' => $member])
                            </div>
                        @endforeach
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                    <!-- Add Navigation -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
    </div>
</section>

@section('scripts')
    <script>
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
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
    </script>
@endsection