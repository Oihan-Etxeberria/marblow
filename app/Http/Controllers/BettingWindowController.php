<?php

namespace App\Http\Controllers;

use App\Models\BettingWindow;
use Inertia\Inertia;

class BettingWindowController extends Controller
{
    public function index()
    {
        $bettingWindows = BettingWindow::with('event')
            ->get()
            ->filter(function ($bw) {
                if (!$bw->event) return false;
                $eventDate = is_string($bw->event->date) 
                    ? \Carbon\Carbon::parse($bw->event->date)->toDateString() 
                    : $bw->event->date->toDateString();
                return $eventDate >= now()->toDateString();
            })
            ->sortBy('opens_at')
            ->values();

        return Inertia::render('Bets', [
            'bettingWindows' => $bettingWindows
        ]);
    }

    public function debug()
    {
        $allBettingWindows = BettingWindow::with('event')->get();
        return response()->json([
            'total' => $allBettingWindows->count(),
            'betting_windows' => $allBettingWindows,
            'now' => now()->toDateString(),
        ]);
    }
}
