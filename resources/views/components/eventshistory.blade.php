<section class="py-5" style="background-color: #1a1a1a;">
    <div class="container">
        <h3 class="text-white mb-4 border-bottom pb-2 border-secondary">
            🏆 Historial de Competiciones
        </h3>

        @if($events->count() > 0)
        <div class="table-responsive">
            <table class="table table-dark table-hover text-center align-middle" style="border-radius: 10px; overflow: hidden;">
                <thead style="background-color: #000;">
                    <tr>
                        <th class="py-3 text-uppercase text-secondary">Evento</th>
                        <th class="py-3 text-uppercase text-secondary">Fecha</th>
                        <th class="py-3 text-uppercase text-secondary">Ranking</th>
                        <th class="py-3 text-uppercase text-secondary">Tiempo</th>
                        <th class="py-3 text-uppercase text-info">💨 Top Blow</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($events as $event)
                    <tr>
                        <td class="text-white">{{ $event->name }}</td>
                        <td class="text-white-50">{{ $event->date->format('d M Y') }}</td>
                        <td>
                            @switch($event->pivot->rank)
                                @case(1)
                                    <span class="badge bg-warning text-dark" style="font-size: 1em;">🥇 1º</span>
                                    @break
                                @case(2)
                                    <span class="badge bg-secondary" style="font-size: 1em;">🥈 2º</span>
                                    @break
                                @case(3)
                                    <span class="badge" style="font-size: 1em; background-color: #cd7f32; color: white;">🥉 3º</span>
                                    @break
                                @default
                                    <span class="font-weight-bold">{{ $event->pivot->rank }}º</span>
                            @endswitch
                        </td>
                        <td>{{ $event->pivot->time }}</td>
                        <td class="font-weight-bold text-info" style="font-size: 1.1rem;">
                            {{ $event->pivot->top_blow }} <span style="font-size: 0.8rem;">N</span>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div class="text-center py-4">
            <p class="text-muted">Este participante aún no tiene registros de eventos.</p>
        </div>
        @endif
    </div>
</section>