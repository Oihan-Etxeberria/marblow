<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

class BetController extends Controller
{
    public function show(Event $event)
    {
        $bettingWindow = $event->bettingWindow;

        return Inertia::render('BetPlace', [
            'event' => $event,
            'bettingWindow' => $bettingWindow
        ]);
    }
}
