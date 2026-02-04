@extends('layouts.app')

@section('title', 'Teams')

@section('content')
<div class="container py-5">
    <h1 class="text-center mb-4 display-4">Teams</h1>
    
    @if(auth()->check())
    <div class="text-end mb-4">
        <a href="{{ route('teams.create') }}" class="btn btn-success">
            <i class="bi bi-plus-circle"></i> New Team
        </a>
    </div>
    @endif
    
    @if($teams->isEmpty())
        <div class="alert alert-info text-center">
            No teams found. Create the first one!
        </div>
    @else
        <div class="row">
            @foreach($teams as $team)
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-lg">
                    @if($team->logo)
                    <img src="{{ asset($team->logo) }}" 
                         class="card-img-top" 
                         alt="{{ $team->name }}"
                         style="height: 200px; object-fit: cover;">
                    @else
                    <div class="card-img-top bg-secondary d-flex align-items-center justify-content-center" 
                         style="height: 200px;">
                        <span class="text-white">No Logo</span>
                    </div>
                    @endif
                    
                    <div class="card-body">
                        <h5 class="card-title">{{ $team->name }}</h5>
                        
                        @if($team->description)
                        <p class="card-text text-muted">
                            {{ Str::limit($team->description, 150) }}
                        </p>
                        @endif
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="badge bg-primary">
                                    <i class="bi bi-people"></i> 
                                    {{ $team->blowers_count }} blowers
                                </span>
                            </div>
                            
                            <a href="{{ route('teams.show', $team->slug) }}" 
                               class="btn btn-primary btn-sm">
                                View Team
                            </a>
                        </div>
                    </div>
                    
                    @if(auth()->check())
                    <div class="card-footer bg-transparent">
                        <div class="d-flex justify-content-end gap-2">
                            <a href="{{ route('teams.edit', $team) }}" 
                               class="btn btn-warning btn-sm">
                                <i class="bi bi-pencil"></i> Edit
                            </a>
                            <form action="{{ route('teams.destroy', $team) }}" 
                                  method="POST" 
                                  class="d-inline"
                                  onsubmit="return confirm('Delete this team?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                            </form>
                        </div>
                    </div>
                    @endif
                </div>
            </div>
            @endforeach
        </div>
    @endif
</div>
@endsection