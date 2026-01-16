import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        // ¡Importante! Permite que Vite escuche en todas las interfaces
        host: '0.0.0.0',          // o '::' si usas IPv6
        port: 5173,

        // Configuración CORS explícita y segura
        cors: true,
        origin: 'http://10.14.0.111:5173', // o mejor: la IP que uses desde fuera
        // origin: 'http://192.168.1.100:5173', // ← pon aquí la IP que uses en el navegador cliente
    },
});
