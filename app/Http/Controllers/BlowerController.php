<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Blower;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlowerController extends Controller
{
    // Mostrar todos los blowers
    public function index()
    {
        $blowers = Blower::orderBy('name')->get()->map(function ($blower) {
            $blower->image_path = asset($blower->image_path);
            return $blower;
        });

        return Inertia::render('Blowers/Index', [
            'blowers' => $blowers,
        ]);
    }

    // Mostrar un blower específico
    public function show($slug)
    {
        $blower = Blower::with('events')->where('slug', $slug)->firstOrFail();
        $blower->image_path = asset($blower->image_path);

        return Inertia::render('Blowers/Show', [
            'blower' => $blower,
        ]);
    }

    // Mostrar formulario de creación
    public function create()
    {
        $events = Event::all();

        return Inertia::render('Blowers/Create', [
            'events' => $events,
        ]);
    }

    // Almacenar nuevo blower
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'surname' => 'required|string|max:100',
            'description' => 'required|string',
            'age' => 'required|integer|min:1|max:120',
            'pulmon_capacity' => 'required|integer|min:1|max:200',
            'smoking_years' => 'required|integer|min:0',
            'lung_capacity' => 'nullable|numeric',
            'image' => 'nullable|image|max:2048',
        ]);

        // Procesar imagen
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blowers', 'public');
        }

        // Crear blower
        $blower = Blower::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'description' => $validated['description'],
            'age' => $validated['age'],
            'pulmon_capacity' => $validated['pulmon_capacity'],
            'smoking_years' => $validated['smoking_years'],
            'lung_capacity' => $validated['lung_capacity'] ?? null,
            'image_path' => $imagePath ? '/storage/' . $imagePath : '/Blowers/default.jpg',
        ]);

        // Asociar eventos si se proporcionan
        if ($request->has('events')) {
            foreach ($request->events as $eventData) {
                if (!empty($eventData['event_id']) && !empty($eventData['rank'])) {
                    $blower->events()->attach($eventData['event_id'], [
                        'rank' => $eventData['rank'],
                        'time' => $eventData['time'] ?? '00:00 min',
                        'top_blow' => $eventData['top_blow'] ?? 0,
                    ]);
                }
            }
        }

        return redirect()->route('blowers.show', $blower->slug)
            ->with('success', 'Blower creado exitosamente!');
    }

    // Mostrar formulario de edición
    public function edit(Blower $blower)
    {
        $events = Event::all();
        //return view('admin.blowers.edit', compact('blower', 'events'));

        return Inertia::render('Blowers/Edit', [
            'blower' => $blower->load('events'),
            'events' => $events,
        ]);
    }

    // Actualizar blower
    public function update(Request $request, Blower $blower)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'surname' => 'required|string|max:100',
            'description' => 'required|string',
            'age' => 'required|integer|min:1|max:120',
            'pulmon_capacity' => 'required|integer|min:1|max:200',
            'smoking_years' => 'required|integer|min:0',
            'lung_capacity' => 'nullable|numeric',
            'image' => 'nullable|image|max:2048',
        ]);

        // Procesar imagen
        if ($request->hasFile('image')) {
            // Eliminar imagen anterior si existe
            if ($blower->image_path && str_starts_with($blower->image_path, '/storage/')) {
                $oldImage = str_replace('/storage/', '', $blower->image_path);
                Storage::disk('public')->delete($oldImage);
            }
            
            $imagePath = $request->file('image')->store('blowers', 'public');
            $validated['image_path'] = '/storage/' . $imagePath;
        }

        $blower->update($validated);

        // Actualizar eventos
        if ($request->has('events')) {
            $blower->events()->detach();
            foreach ($request->events as $eventData) {
                if (!empty($eventData['event_id']) && !empty($eventData['rank'])) {
                    $blower->events()->attach($eventData['event_id'], [
                        'rank' => $eventData['rank'],
                        'time' => $eventData['time'] ?? '00:00 min',
                        'top_blow' => $eventData['top_blow'] ?? 0,
                    ]);
                }
            }
        }

        return redirect()->route('blowers.show', $blower->slug)
            ->with('success', 'Blower actualizado exitosamente!');
    }

    // Eliminar blower
    public function destroy(Blower $blower)
    {
        // Eliminar imagen si existe
        if ($blower->image_path && str_starts_with($blower->image_path, '/storage/')) {
            $oldImage = str_replace('/storage/', '', $blower->image_path);
            Storage::disk('public')->delete($oldImage);
        }

        $blower->delete();

        return redirect()->route('blowers.index')
            ->with('success', 'Blower eliminado exitosamente!');
    }
}