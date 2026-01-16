import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        // ¡Importante! Permite que Vite escuche en todas las interfaces
        host: '0.0.0.0',          // o '::' si usas IPv6
        port: 5173,

        // Configuración CORS explícita y segura
        cors: {
            origin: [
                // Permite localhost (tu máquina principal)
                /^http?:\/\/localhost(:\d+)?$/,
                /^http?:\/\/127\.0\.0\.1(:\d+)?$/,
                // Permite cualquier IP de tu LAN (ajusta según tu red)
                /^http?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/,
                // O si prefieres permitir TODA tu subred (menos seguro pero práctico en casa)
                // /^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/,
                // Si usas el nombre de máquina (computername.local, etc.)
                // /^https?:\/\/mi-pc\.local(:\d+)?$/,
            ],
            credentials: true, // necesario para cookies / Sanctum si lo usas
        },

        // Muy recomendado: define el origin que Vite usará en los links generados
        origin: 'http://0.0.0.0:5173', // o mejor: la IP que uses desde fuera
        // origin: 'http://192.168.1.100:5173', // ← pon aquí la IP que uses en el navegador cliente
    },
});
