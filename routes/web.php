<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlowerController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;

// Test
Route::get('/test', [TestController::class, 'test'])->name('test');

// Página principal
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Autenticación
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.submit');

// Eventos
Route::get('/events', [HomeController::class, 'events'])->name('events');

// Blowers - Públicas
Route::get('/blowers', [BlowerController::class, 'index'])->name('blowers.index');
Route::get('/blowers/{blower:slug}', [BlowerController::class, 'show'])->name('blowers.show');

// Teams - Públicas
Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
Route::get('/teams/{team:slug}', [TeamController::class, 'show'])->name('teams.show');
Route::post('/teams/{team:slug}/join', [TeamController::class, 'join'])->name('teams.join');
// Contacto
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');



// Rutas Protegidas (Admin)
Route::middleware(['auth'])->group(function () {
    // CRUD Blowers
    Route::get('/admin/blowers/create', [BlowerController::class, 'create'])->name('blowers.create');
    Route::post('/admin/blowers', [BlowerController::class, 'store'])->name('blowers.store');
    Route::get('/admin/blowers/{blower}/edit', [BlowerController::class, 'edit'])->name('blowers.edit');
    Route::put('/admin/blowers/{blower}', [BlowerController::class, 'update'])->name('blowers.update');
    Route::delete('/admin/blowers/{blower}', [BlowerController::class, 'destroy'])->name('blowers.destroy');

    // CRUD Teams
    Route::get('/admin/teams/create', [TeamController::class, 'create'])->name('teams.create');
    Route::post('/admin/teams', [TeamController::class, 'store'])->name('teams.store');
    Route::get('/admin/teams/{team}/edit', [TeamController::class, 'edit'])->name('teams.edit');
    Route::put('/admin/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
    Route::delete('/admin/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
});

