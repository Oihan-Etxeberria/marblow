// import './bootstrap';
import '../css/app.css';
import '../css/oihan.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Layout from '@/layouts/Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page = await resolvePageComponent(
            [
                `./pages/${name}.tsx`,
                `./pages/${name}.jsx`,
            ],
            import.meta.glob('./pages/**/*.{tsx,jsx}'),
        );

        // Corregido: type assertion para TypeScript
        (page as any).default.layout = (page as any).default.layout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
        
        return page;
    },
        
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    
    progress: {
        color: '#4B5563',
    },
});