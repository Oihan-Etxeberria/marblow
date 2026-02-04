@extends('layouts.app')

@section('title', 'Panel de Administración')

@section('content')
<div class="container-fluid py-4">
    <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 col-lg-2 mb-4">
            <div class="card shadow">
                <div class="card-header bg-dark text-white">
                    <h6 class="mb-0"><i class="bi bi-gear me-2"></i>Administración</h6>
                </div>
                <div class="list-group list-group-flush">
                    <a href="{{ route('blowers.index') }}" 
                       class="list-group-item list-group-item-action">
                        <i class="bi bi-people me-2"></i> Blowers
                    </a>
                    <a href="{{ route('teams.index') }}" 
                       class="list-group-item list-group-item-action">
                        <i class="bi bi-flag me-2"></i> Equipos
                    </a>
                    <a href="{{ route('blowers.create') }}" 
                       class="list-group-item list-group-item-action">
                        <i class="bi bi-person-plus me-2"></i> Nuevo Blower
                    </a>
                    <a href="{{ route('teams.create') }}" 
                       class="list-group-item list-group-item-action">
                        <i class="bi bi-flag-fill me-2"></i> Nuevo Equipo
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="col-md-9 col-lg-10">
            <div class="row">
                <!-- Estadísticas -->
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="card bg-primary text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Total Blowers</h6>
                                    <h2 class="mb-0">{{ \App\Models\Blower::count() }}</h2>
                                </div>
                                <i class="bi bi-people" style="font-size: 2rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="card bg-success text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Total Equipos</h6>
                                    <h2 class="mb-0">{{ \App\Models\Team::count() }}</h2>
                                </div>
                                <i class="bi bi-flag" style="font-size: 2rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="card bg-warning text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Eventos</h6>
                                    <h2 class="mb-0">{{ \App\Models\Event::count() }}</h2>
                                </div>
                                <i class="bi bi-calendar-event" style="font-size: 2rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="card bg-info text-white">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="card-title">Participaciones</h6>
                                    <h2 class="mb-0">{{ \App\Models\BlowerEvent::count() }}</h2>
                                </div>
                                <i class="bi bi-trophy" style="font-size: 2rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Últimos Blowers -->
            <div class="card shadow mb-4">
                <div class="card-header">
                    <h6 class="mb-0"><i class="bi bi-clock-history me-2"></i>Últimos Blowers</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Cap. Pulmonar</th>
                                    <th>Eventos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach(\App\Models\Blower::latest()->take(5)->get() as $blower)
                                <tr>
                                    <td>{{ $blower->full_name }}</td>
                                    <td>{{ $blower->age }} años</td>
                                    <td>{{ $blower->pulmon_capacity }} dl</td>
                                    <td>{{ $blower->events_count ?? 0 }}</td>
                                    <td>
                                        <div class="btn-group btn-group-sm">
                                            <a href="{{ route('blowers.show', $blower) }}" 
                                               class="btn btn-outline-primary">
                                                <i class="bi bi-eye"></i>
                                            </a>
                                            <a href="{{ route('blowers.edit', $blower) }}" 
                                               class="btn btn-outline-warning">
                                                <i class="bi bi-pencil"></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection