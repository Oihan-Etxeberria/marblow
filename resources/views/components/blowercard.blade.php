@php
    $link = '/blowers/' . strtolower($member['name']);
@endphp

<a href="{{ $link }}">
    <div class="participant-card">
        <div class="participant-card-img-container">
            <img src="{{ asset($member['image']) }}" 
                 alt="{{ $member['surname'] }} portrait" 
                 class="participant-card-img">
        </div>

        <div class="participant-card-overlay text-center text-white">
            <div class="mb-1">
                <span class="participant-badge">{{ $member['name'] }}</span>
            </div>
            <h3 class="participant-nickname mb-2">{{ $member['surname'] }}</h3>
            <div class="participant-details">
                <span>{{ $member['age'] }} AÑOS</span>
                <span class="mx-2">•</span>
                <span>{{ $member['lungCapacity'] }}</span>
            </div>
        </div>
    </div>
</a>