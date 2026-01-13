// resources/js/Pages/Test.jsx
import React from 'react';
import { Head } from '@inertiajs/react';

export default function Test({ message }) {
    return (
        <>
            <Head title="Test Inertia" />
            <div className="container py-5">
                <h1>{message}</h1>
                <p>Si ves esto, Inertia está configurado correctamente.</p>
            </div>
        </>
    );
}