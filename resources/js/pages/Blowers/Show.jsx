import { Head, Link, router } from '@inertiajs/react';
import HeroBlower from "../../components/HeroBlower";
import EventsHistory from "../../components/EventsHistory";

// Opción 1: Si tienes un layout, impórtalo aquí
// import AppLayout from '@/Layouts/AppLayout';

export default function Show({ auth, blower }) {
    const handleDelete = (e) => {
        e.preventDefault();
        
        if (confirm('¿Estás seguro de eliminar este blower?')) {
            router.delete(route('blowers.destroy', blower.id));
        }
    };
    return (
        <>
            <Head title={blower.full_name} />
            <HeroBlower blower={blower} />
            <EventsHistory events={blower.events} />

            {auth.user?.role === 'admin' && (
                <div className="container mt-4">
                    <div className="d-flex justify-content-center gap-3">
                        <Link 
                            href={route('blowers.edit', blower.id)} 
                            className="btn btn-warning"
                        >
                            <i className="bi bi-pencil me-2"></i> Editar Blower
                        </Link>
                        
                        <form onSubmit={handleDelete}>
                            <button type="submit" className="btn btn-danger">
                                <i className="bi bi-trash me-2"></i> Eliminar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}