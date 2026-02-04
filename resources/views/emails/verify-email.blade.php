<!DOCTYPE html>
<html>
<head>
    <title>Verifica tu Email</title>
</head>
<body>
    <h2>¡Bienvenido, {{ $user->name }}!</h2>
    <p>Gracias por registrarte. Por favor, verifica tu dirección de email haciendo clic en el siguiente enlace:</p>
    
    <a href="{{ $verificationUrl }}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        Verificar Email
    </a>
    
    <p>Si no has creado esta cuenta, puedes ignorar este mensaje.</p>
    <p>Este enlace expirará en 24 horas.</p>
</body>
</html>