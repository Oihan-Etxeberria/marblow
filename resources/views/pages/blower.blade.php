@extends('layouts.app')

@section('title', $blower->full_name)

@section('content')
@include('components.heroblower', ['blower' => $blower])
@include('components.eventshistory', ['events' => $blower->events])

@if(auth()->check())
<div class="container mt-4">
    <div class="d-flex justify-content-center gap-3">
        <a href="{{ route('blowers.edit', $blower) }}" class="btn btn-warning">
            <i class="bi bi-pencil me-2"></i> Editar Blower
        </a>
        <form action="{{ route('blowers.destroy', $blower) }}" 
              method="POST"
              onsubmit="return confirm('¿Estás seguro de eliminar este blower?');">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger">
                <i class="bi bi-trash me-2"></i> Eliminar
            </button>
        </form>
    </div>
</div>
@endif
@endsection