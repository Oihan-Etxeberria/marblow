<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\Blower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    // Mostrar todos los equipos
    public function index()
    {
        $teams = Team::withCount('blowers')->get();
        return view('pages.teams', compact('teams'));
    }

    // Mostrar un equipo específico
    public function show(Team $team)
    {
        $team->load('blowers');
        // Obtener todos los blowers para el formulario de admin
        $allBlowers = Blower::all();

        return view('pages.team', compact('team', 'allBlowers'));
    }

    // Mostrar formulario de creación
    public function create()
    {
        $blowers = Blower::all();
        return view('admin.teams.create', compact('blowers'));
    }

    // Almacenar nuevo equipo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:teams',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'blowers' => 'nullable|array',
            'blowers.*' => 'exists:blowers,id',
        ]);

        // Procesar logo
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = '/storage/' . $request->file('logo')->store('teams', 'public');
        }

        // Crear equipo
        $team = Team::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'logo' => $logoPath,
        ]);

        // Asociar blowers
        if ($request->has('blowers')) {
            $team->blowers()->attach($validated['blowers']);
        }

        return redirect()->route('teams.show', $team->slug)
            ->with('success', 'Team created successfully!');
    }

    // Mostrar formulario de edición
    public function edit(Team $team)
    {
        $blowers = Blower::all();
        return view('admin.teams.edit', compact('team', 'blowers'));
    }

    // Actualizar equipo
    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:teams,name,' . $team->id,
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'blowers' => 'nullable|array',
            'blowers.*' => 'exists:blowers,id',
        ]);

        // Procesar logo
        if ($request->hasFile('logo')) {
            // Eliminar logo anterior si existe
            if ($team->logo && str_starts_with($team->logo, '/storage/')) {
                $oldLogo = str_replace('/storage/', '', $team->logo);
                Storage::disk('public')->delete($oldLogo);
            }
            
            $logoPath = '/storage/' . $request->file('logo')->store('teams', 'public');
            $validated['logo'] = $logoPath;
        }

        $team->update($validated);

        // Actualizar blowers
        if ($request->has('blowers')) {
            $team->blowers()->sync($validated['blowers']);
        } else {
            $team->blowers()->detach();
        }

        return redirect()->route('teams.show', $team->slug)
            ->with('success', 'Team updated successfully!');
    }

    // Eliminar equipo
    public function destroy(Team $team)
    {
        // Eliminar logo si existe
        if ($team->logo && str_starts_with($team->logo, '/storage/')) {
            $oldLogo = str_replace('/storage/', '', $team->logo);
            Storage::disk('public')->delete($oldLogo);
        }

        $team->delete();

        return redirect()->route('teams.index')
            ->with('success', 'Team deleted successfully!');
    }

    public function join(Request $request, Team $team)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'nullable|string',
            'terms' => 'required|accepted',
        ]);

        // Aquí puedes procesar la solicitud (guardar en DB, enviar email, etc.)
        // Por ahora, solo redirigimos con mensaje de éxito
        
        return redirect()->route('teams.show', $team)
            ->with('success', 'Your request to join the team has been sent!');
    }
}