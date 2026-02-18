<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('Contact');
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:100'],
            'email'   => ['required', 'email', 'max:150'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        ContactMessage::create($validated);

        return back()->with('success', true);
    }

    public function index()
    {
        $messages = ContactMessage::latest()->get();

        return Inertia::render('ContactIndex', [
            'messages' => $messages,
        ]);
    }

    // Elimina un mensaje
    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return back();
    }
}