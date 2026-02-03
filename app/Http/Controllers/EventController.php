<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
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
}