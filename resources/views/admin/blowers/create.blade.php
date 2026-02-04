@extends('layouts.app')

@section('title', 'Crear Nuevo Blower')

@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">
                    <h4 class="mb-0"><i class="bi bi-person-plus me-2"></i>Crear Nuevo Blower</h4>
                </div>
                
                <div class="card-body">
                    <form action="{{ route('blowers.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="name" class="form-label">Nombre *</label>
                                <input type="text" class="form-control" id="name" name="name" 
                                       value="{{ old('name') }}" required>
                                @error('name')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-md-6 mb-3">
                                <label for="surname" class="form-label">Apellido/Apodo *</label>
                                <input type="text" class="form-control" id="surname" name="surname" 
                                       value="{{ old('surname') }}" required>
                                @error('surname')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="description" class="form-label">Descripción *</label>
                            <textarea class="form-control" id="description" name="description" 
                                      rows="3" required>{{ old('description') }}</textarea>
                            @error('description')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label for="age" class="form-label">Edad *</label>
                                <input type="number" class="form-control" id="age" name="age" 
                                       value="{{ old('age') }}" min="1" max="120" required>
                                @error('age')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-md-4 mb-3">
                                <label for="pulmon_capacity" class="form-label">Cap. Pulmonar (dl) *</label>
                                <input type="number" class="form-control" id="pulmon_capacity" name="pulmon_capacity" 
                                       value="{{ old('pulmon_capacity') }}" min="1" max="200" required>
                                @error('pulmon_capacity')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                            
                            <div class="col-md-4 mb-3">
                                <label for="smoking_years" class="form-label">Años Fumando *</label>
                                <input type="number" class="form-control" id="smoking_years" name="smoking_years" 
                                       value="{{ old('smoking_years') }}" min="0" required>
                                @error('smoking_years')
                                    <div class="text-danger">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="lung_capacity" class="form-label">Capacidad Pulmonar (L) - Para catálogo</label>
                            <input type="number" step="0.1" class="form-control" id="lung_capacity" 
                                   name="lung_capacity" value="{{ old('lung_capacity') }}">
                            @error('lung_capacity')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <div class="mb-3">
                            <label for="image" class="form-label">Foto del Blower</label>
                            <input type="file" class="form-control" id="image" name="image" accept="image/*">
                            <small class="text-muted">Tamaño máximo: 2MB</small>
                            @error('image')
                                <div class="text-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        
                        <!-- Sección para eventos (opcional) -->
                        <div class="mb-4">
                            <label class="form-label">Eventos Participados (Opcional)</label>
                            <div id="events-container">
                                <!-- Los eventos se agregarán aquí dinámicamente -->
                            </div>
                            <button type="button" class="btn btn-sm btn-outline-secondary mt-2" 
                                    onclick="addEventField()">
                                <i class="bi bi-plus"></i> Agregar Evento
                            </button>
                        </div>
                        
                        <div class="d-flex justify-content-between">
                            <a href="{{ route('blowers.index') }}" class="btn btn-secondary">
                                <i class="bi bi-arrow-left me-2"></i> Cancelar
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="bi bi-save me-2"></i> Crear Blower
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    let eventCounter = 0;
    
    function addEventField() {
        eventCounter++;
        const container = document.getElementById('events-container');
        
        const eventHtml = `
            <div class="card mb-2" id="event-${eventCounter}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-2">
                            <label class="form-label">Evento</label>
                            <select class="form-select" name="events[${eventCounter}][event_id]">
                                <option value="">Seleccionar...</option>
                                @foreach(\App\Models\Event::all() as $event)
                                <option value="{{ $event->id }}">{{ $event->name }} ({{ $event->date->format('d/m/Y') }})</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-2 mb-2">
                            <label class="form-label">Rank</label>
                            <input type="number" class="form-control" name="events[${eventCounter}][rank]" min="1">
                        </div>
                        <div class="col-md-3 mb-2">
                            <label class="form-label">Tiempo</label>
                            <input type="text" class="form-control" name="events[${eventCounter}][time]" placeholder="00:00 min">
                        </div>
                        <div class="col-md-2 mb-2">
                            <label class="form-label">Top Blow</label>
                            <input type="number" class="form-control" name="events[${eventCounter}][top_blow]" min="1">
                        </div>
                        <div class="col-md-1 mb-2 d-flex align-items-end">
                            <button type="button" class="btn btn-danger btn-sm" 
                                    onclick="removeEventField(${eventCounter})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', eventHtml);
    }
    
    function removeEventField(id) {
        const element = document.getElementById(`event-${id}`);
        if (element) {
            element.remove();
        }
    }
</script>
@endpush
@endsection