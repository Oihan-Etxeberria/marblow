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
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        Event::create($validated);

        return redirect()
            ->route('events')
            ->with('success', 'Competition created successfully');
    }
}