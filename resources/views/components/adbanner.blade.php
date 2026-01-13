@php
    // En React, el estado isVisible se maneja con useState. En Blade, podríamos usar cookies o sesiones para recordar si se cerró.
    // Por simplicidad, asumimos que siempre está visible a menos que se pase una variable.
    $isVisible = $isVisible ?? true;
@endphp

@if($isVisible)
    @php
        $positionClasses = [
            'right' => 'right-0 top-20',
            'left' => 'left-0 top-20',
            'top' => 'top-0 left-1/2 -translate-x-1/2',
            'bottom' => 'bottom-0 left-1/2 -translate-x-1/2'
        ];
        $isHorizontal = in_array($position, ['top', 'bottom']);
    @endphp

    <aside style="position: fixed; {{ $positionClasses[$position] }}; z-index: 40; {{ $isHorizontal ? 'width: 100%; max-width: 36rem;' : 'width: 18rem;' }} margin: 1rem;">
        <div class="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl overflow-hidden">
            @if($closeable ?? true)
                <button class="absolute top-2 right-2 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors z-10"
                        onclick="this.parentElement.parentElement.style.display='none'"
                        aria-label="Cerrar anuncio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            @endif

            <div class="p-6 {{ $isHorizontal ? 'flex items-center gap-6' : '' }}">
                <div class="{{ $isHorizontal ? 'flex-1' : '' }}">
                    <h3 class="text-white font-bold text-lg mb-2">
                        ¡Oferta Especial!
                    </h3>
                    <p class="text-white/90 text-sm mb-4">
                        Obtén un 50% de descuento en todos nuestros productos premium.
                    </p>
                    <button class="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm w-full">
                        Saber más
                    </button>
                </div>

                @if($isHorizontal)
                    <div class="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center">
                        <span class="text-4xl">🎁</span>
                    </div>
                @endif
            </div>
        </div>
    </aside>
@endif