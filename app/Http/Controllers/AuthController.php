<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;
use App\Mail\VerifyEmail;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $field = filter_var($credentials['username'], FILTER_VALIDATE_EMAIL)
            ? 'email'
            : 'name';

        if (Auth::attempt([
            $field => $credentials['username'],
            'password' => $credentials['password'],
        ])) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'username' => 'The provided credentials are incorrect.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    public function showRegister()
    {
        return Inertia::render('Register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Crear usuario con email no verificado
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'email_verification_token' => Str::random(60),
            'email_verified_at' => null,
        ]);

        // Generar URL de verificación
        $verificationUrl = url("/verify-email/{$user->id}/{$user->email_verification_token}");

        // Enviar email de verificación
        Mail::to($user->email)->send(new VerifyEmail($user, $verificationUrl));

        // Redirigir con mensaje de éxito
        return redirect()->route('login')
            ->with('success', '¡Registro exitoso! Por favor, verifica tu email para activar tu cuenta.');
    }

    public function verifyEmail(Request $request, $id, $token)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect('/login')->with('error', 'Usuario no encontrado.');
        }

        if ($user->email_verification_token !== $token) {
            return redirect('/login')->with('error', 'Token de verificación inválido.');
        }

        // Verificar el email
        $user->email_verified_at = now();
        $user->email_verification_token = null;
        $user->save();

        // Opcional: Iniciar sesión automáticamente después de verificar
        Auth::login($user);

        return redirect('/dashboard')->with('success', '¡Email verificado exitosamente!');
    }

    public function resendVerification(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user->email_verified_at) {
            return back()->with('error', 'Este email ya ha sido verificado.');
        }

        // Generar nuevo token si es necesario
        if (!$user->email_verification_token) {
            $user->email_verification_token = Str::random(60);
            $user->save();
        }

        $verificationUrl = route('verify.email', [
            'token' => $user->email_verification_token,
            'id' => $user->id
        ]);

        Mail::to($user->email)->send(new VerifyEmail($user, $verificationUrl));

        return back()->with('message', 'Email de verificación reenviado. Por favor revisa tu bandeja de entrada.');
    }
}
