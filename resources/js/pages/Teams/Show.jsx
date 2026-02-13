import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import BlowerSwiper from '@/components/BlowerSwiper';

export default function Show({ auth, team, allBlowers }) {
    const [showAdminForm, setShowAdminForm] = useState(false);

    // Form para unirse al equipo (público)
    const { data: joinData, setData: setJoinData, post: joinPost, processing: joinProcessing, errors: joinErrors } = useForm({
        name: '',
        email: '',
        message: '',
        terms: false,
    });

    // Form para actualizar blowers del equipo (admin)
    const { data: updateData, setData: setUpdateData, put, processing: updateProcessing } = useForm({
        blowers: team.blowers?.map(b => b.id) || [],
    });

    // Form para eliminar equipo (admin)
    const { delete: destroy } = useForm();

    const handleJoinSubmit = (e) => {
        e.preventDefault();
        joinPost(route('teams.join', team.id));
    };

    const handleUpdateBlowers = (e) => {
        e.preventDefault();
        put(route('teams.update', team.id), {
            onSuccess: () => setShowAdminForm(false),
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm('¿Eliminar este equipo?')) {
            destroy(route('teams.destroy', team.id));
        }
    };

    const handleBlowerSelect = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(parseInt(options[i].value));
            }
        }
        setUpdateData('blowers', selected);
    };

    return (
        <>
            <Head title={team.name} />

            <div className="team-page">
                {/* Hero Section */}
                <section className="py-5">
                    <div className="container">
                        <div className="row mb-5 align-items-center">
                            <div className="col-md-4 text-center mb-4 mb-md-0">
                                {team.logo ? (
                                    <img 
                                        src={team.logo} 
                                        alt={team.name}
                                        className="img-fluid rounded shadow"
                                        style={{ 
                                            maxHeight: '300px', 
                                            objectFit: 'cover',
                                            borderRadius: '20px'
                                        }}
                                    />
                                ) : (
                                    <div 
                                        className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                        style={{ 
                                            height: '300px',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        <span className="text-white fs-4">No Logo</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="col-md-8">
                                <div className="hero-blur p-4 p-md-5" style={{
                                    borderRadius: '20px',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <h1 className="display-4 mb-3 text-white fw-bold text-uppercase">
                                        {team.name}
                                    </h1>
                                    
                                    {team.description && (
                                        <div className="mb-4">
                                            <p className="lead text-white-50">{team.description}</p>
                                        </div>
                                    )}
                                    
                                    <div className="d-flex gap-3 mb-4 flex-wrap">
                                        <span className="badge bg-primary fs-6 px-3 py-2">
                                            <i className="bi bi-people me-1"></i>
                                            {team.blowers?.length || 0} Blowers
                                        </span>
                                        <span className="badge bg-success fs-6 px-3 py-2">
                                            <i className="bi bi-trophy me-1"></i>
                                            Team
                                        </span>
                                    </div>
                                    
                                    {/* Admin: Botones de editar y eliminar */}
                                    {auth.user?.role === 'admin' && (
                                        <div className="d-flex gap-2 flex-wrap">
                                            <Link 
                                                href={route('teams.edit', team.id)} 
                                                className="btn btn-warning"
                                            >
                                                <i className="bi bi-pencil me-2"></i>
                                                Edit Team
                                            </Link>
                                            <form onSubmit={handleDelete}>
                                                <button type="submit" className="btn btn-danger">
                                                    <i className="bi bi-trash me-2"></i>
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Blowers Catalog (Swiper) */}
                <section className="py-3">
                    <div className="container">
                        <div className="hero-blur p-4 p-md-5" style={{
                            borderRadius: '20px',
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <h2 className="text-center text-white mb-3 display-5 fw-bold text-uppercase">
                                Blowers
                            </h2>
                            
                            {!team.blowers || team.blowers.length === 0 ? (
                                <div className="alert alert-info">
                                    Este equipo aún no tiene blowers.
                                    {auth.user?.role === 'admin' && (
                                        <>
                                            {' '}
                                            <button 
                                                onClick={() => setShowAdminForm(true)}
                                                className="btn btn-link p-0"
                                            >
                                                Agrega blowers a este equipo
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <BlowerSwiper blowers={team.blowers} />
                            )}
                        </div>
                    </div>
                </section>

                {/* Join Form (Público) */}
                <section className="py-5">
                    <div className="container">
                        <div className="hero-blur p-4 p-md-5" style={{
                            borderRadius: '20px',
                            background: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <h2 className="text-center text-white mb-4 display-5 fw-bold text-uppercase">
                                Apuntarse
                            </h2>
                            
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-lg-6">
                                    <form onSubmit={handleJoinSubmit} className="p-4">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label text-white">
                                                Nombre
                                            </label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${joinErrors.name ? 'is-invalid' : ''}`}
                                                id="name"
                                                value={joinData.name}
                                                onChange={e => setJoinData('name', e.target.value)}
                                                required
                                                style={{
                                                    borderRadius: '12px',
                                                    border: '2px solid #e9ecef',
                                                    padding: '0.75rem 1rem'
                                                }}
                                            />
                                            {joinErrors.name && (
                                                <div className="invalid-feedback">{joinErrors.name}</div>
                                            )}
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label text-white">
                                                Email
                                            </label>
                                            <input 
                                                type="email" 
                                                className={`form-control ${joinErrors.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                value={joinData.email}
                                                onChange={e => setJoinData('email', e.target.value)}
                                                required
                                                style={{
                                                    borderRadius: '12px',
                                                    border: '2px solid #e9ecef',
                                                    padding: '0.75rem 1rem'
                                                }}
                                            />
                                            {joinErrors.email && (
                                                <div className="invalid-feedback">{joinErrors.email}</div>
                                            )}
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label text-white">
                                                Mensaje (Opcional)
                                            </label>
                                            <textarea 
                                                className="form-control"
                                                id="message"
                                                rows="3"
                                                value={joinData.message}
                                                onChange={e => setJoinData('message', e.target.value)}
                                                style={{
                                                    borderRadius: '12px',
                                                    border: '2px solid #e9ecef',
                                                    padding: '0.75rem 1rem'
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="mb-3 form-check">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input"
                                                id="terms"
                                                checked={joinData.terms}
                                                onChange={e => setJoinData('terms', e.target.checked)}
                                                required
                                            />
                                            <label className="form-check-label text-white" htmlFor="terms">
                                                Acepto los términos y condiciones
                                            </label>
                                        </div>
                                        
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary w-100"
                                            disabled={joinProcessing}
                                            style={{
                                                borderRadius: '12px',
                                                padding: '0.75rem',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {joinProcessing ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Enviando...
                                                </>
                                            ) : (
                                                'Enviar Solicitud'
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Admin Form: Agregar blowers al equipo */}
                {auth.user?.role === 'admin' && allBlowers && allBlowers.length > 0 && (
                    <section className="py-5">
                        <div className="container">
                            <div className="card" style={{
                                borderRadius: '20px',
                                border: 'none',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                            }}>
                                <div className="card-header bg-dark text-white" style={{
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px'
                                }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">
                                            <i className="bi bi-person-plus me-2"></i>
                                            Add Blowers to Team (Admin)
                                        </h5>
                                        <button
                                            className="btn btn-sm btn-outline-light"
                                            onClick={() => setShowAdminForm(!showAdminForm)}
                                        >
                                            {showAdminForm ? (
                                                <><i className="bi bi-chevron-up"></i> Ocultar</>
                                            ) : (
                                                <><i className="bi bi-chevron-down"></i> Mostrar</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                
                                {showAdminForm && (
                                    <div className="card-body p-4">
                                        <form onSubmit={handleUpdateBlowers}>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Seleccionar Blowers
                                                </label>
                                                <select 
                                                    multiple 
                                                    size="8"
                                                    className="form-select"
                                                    value={updateData.blowers}
                                                    onChange={handleBlowerSelect}
                                                    style={{
                                                        borderRadius: '12px',
                                                        border: '2px solid #e9ecef'
                                                    }}
                                                >
                                                    {allBlowers.map((blower) => (
                                                        <option 
                                                            key={blower.id} 
                                                            value={blower.id}
                                                        >
                                                            {blower.name} {blower.surname}
                                                        </option>
                                                    ))}
                                                </select>
                                                <small className="text-muted">
                                                    Mantén presionado Ctrl/Cmd para seleccionar múltiples
                                                </small>
                                            </div>
                                            
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary"
                                                disabled={updateProcessing}
                                                style={{
                                                    borderRadius: '12px',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                {updateProcessing ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Actualizando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-save me-2"></i>
                                                        Actualizar Blowers del Equipo
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
