import { Head, Link } from '@inertiajs/react';
import BlowerSwiper from '@/components/BlowerSwiper';

export default function Index({ auth, blowers }) {
    return (
        <>
            <Head title="Top Blowers" />

            <section className="py-5">
                <div className="container hero-blur">
                    <h1 className="text-center mb-4 display-4 text-white fw-bold">
                        Top Blowers
                    </h1>
                    <p className="lead text-center mb-5 text-white-50">
                        The most durezas of the planet 🌍💎
                    </p>
                    
                    {/* Admin: Botón para crear nuevo blower */}
                    {auth.user?.role === 'admin' && (
                        <div className="text-end mb-4">
                            <Link 
                                href={route('blowers.create')} 
                                className="btn btn-success btn-lg"
                                style={{
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 15px rgba(25, 135, 84, 0.4)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(25, 135, 84, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(25, 135, 84, 0.4)';
                                }}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Nuevo Blower
                            </Link>
                        </div>
                    )}
                    
                    {/* Swiper con todos los blowers */}
                    <BlowerSwiper blowers={blowers} />
                </div>
            </section>
        </>
    );
}
