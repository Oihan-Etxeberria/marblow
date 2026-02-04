<section class="d-flex justify-content-center align-items-center py-5">
    <div class="container">
        <div class="hero-blur blower p-4 p-md-5" 
             style="border-radius: 20px; background: rgba(0, 0, 0, 0.7); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <div class="row align-items-center">
                <!-- Imagen -->
                <div class="col-md-5 col-lg-4 mb-4 mb-md-0 text-center">
                    <div style="padding: 10px; border: 2px solid rgba(255,255,255,0.2); border-radius: 15px; display: inline-block;">
                        <img src="{{ asset($blower->image_path) }}" 
                             alt="{{ $blower->full_name }}" 
                             class="img-fluid rounded"
                             style="max-height: 350px; object-fit: cover; width: 100%; box-shadow: 0 5px 15px rgba(0,0,0,0.5);">
                    </div>
                </div>

                <!-- Información -->
                <div class="col-md-7 col-lg-8">
                    <div class="pl-md-3">
                        <h2 class="text-white display-5 font-weight-bold mb-0">{{ $blower->name }}</h2>
                        <h3 class="text-info mb-4">{{ $blower->surname }}</h3>
                        
                        @if($blower->description)
                        <div class="mb-4 text-white font-weight-bold">
                            {{ $blower->description }}
                        </div>
                        @endif

                        <!-- Estadísticas -->
                        <div class="stats-bars">
                            <!-- Edad -->
                            <div class="mb-2">
                                <div class="d-flex justify-content-between text-white mb-1">
                                    <span style="font-size: 1.1rem;">🎂 Edad</span>
                                    <span class="font-weight-bold">{{ $blower->age }} años</span>
                                </div>
                                <div class="progress" style="height: 24px; border-radius: 12px; background-color: rgba(255,255,255,0.1);">
                                    <div class="progress-bar bg-success" 
                                         role="progressbar" 
                                         style="width: {{ min(100, ($blower->age / 80) * 100) }}%;"
                                         aria-valuenow="{{ $blower->age }}" 
                                         aria-valuemin="0" 
                                         aria-valuemax="80">
                                    </div>
                                </div>
                            </div>

                            <!-- Años de Fumador -->
                            <div class="mb-2">
                                <div class="d-flex justify-content-between text-white mb-1">
                                    <span style="font-size: 1.1rem;">🚬 Años de Fumador</span>
                                    <span class="font-weight-bold">{{ $blower->smoking_years }} años</span>
                                </div>
                                <div class="progress" style="height: 24px; border-radius: 12px; background-color: rgba(255,255,255,0.1);">
                                    <div class="progress-bar bg-danger" 
                                         role="progressbar" 
                                         style="width: {{ min(100, ($blower->smoking_years / $blower->age) * 100) }}%;"
                                         aria-valuenow="{{ $blower->smoking_years }}" 
                                         aria-valuemin="0" 
                                         aria-valuemax="{{ $blower->age }}">
                                    </div>
                                </div>
                            </div>

                            <!-- Capacidad Pulmonar -->
                            <div class="mb-4">
                                <div class="d-flex justify-content-between text-white mb-1">
                                    <span style="font-size: 1.1rem;">🫁 Capacidad Pulmonar</span>
                                    <span class="font-weight-bold">{{ $blower->pulmon_capacity }} dl</span>
                                </div>
                                <div class="progress" style="height: 24px; border-radius: 12px; background-color: rgba(255,255,255,0.1);">
                                    <div class="progress-bar bg-info" 
                                         role="progressbar" 
                                         style="width: {{ min(100, ($blower->pulmon_capacity / 100) * 100) }}%;"
                                         aria-valuenow="{{ $blower->pulmon_capacity }}" 
                                         aria-valuemin="0" 
                                         aria-valuemax="100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>