<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Events', [
            'events' => Event::whereDate('date', '>', now())
                ->orderBy('date')
                ->get()
        ]);
    }

    public function previous()
    {
        return Inertia::render('Previous', [
            'events' => Event::whereDate('date', '<', now())
                ->orderBy('date', 'desc')
                ->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Freestyle');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'modalidad' => 'required|string|max:255',
        ]);

        $event = Event::create([
            'nombre' => $validated['nombre'],
            'modalidad' => $validated['modalidad'],
            'date' => now(), // Ajusta según necesites
        ]);

        return redirect()->route('events.index')
            ->with('success', 'Competición creada exitosamente');
    }
}