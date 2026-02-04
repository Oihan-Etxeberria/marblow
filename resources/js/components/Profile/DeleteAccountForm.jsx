import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteAccountForm() {
    const [showModal, setShowModal] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        password: '',
    });

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const deleteAccount = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <>
            {/* Delete Account Description */}
            <div className="mb-4">
                <p className="text-muted mb-3">
                    Once your account is deleted, all your resources and data will be permanently erased. Before deleting your account, please download any data or information you wish to keep.
                </p>
            </div>

            <button
                type="button"
                onClick={openModal}
                className="btn btn-lg px-4"
                style={{
                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(220, 53, 69, 0.4)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.4)';
                }}
            >
                <i className="bi bi-trash me-2"></i>
                Delete account
            </button>

            {/* Modal */}
            {showModal && (
                <>
                    <div 
                        className="modal show d-block" 
                        tabIndex="-1" 
                        style={{ 
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(4px)'
                        }}
                        onClick={closeModal}
                    >
                        <div 
                            className="modal-dialog modal-dialog-centered"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-content" style={{
                                borderRadius: '20px',
                                border: 'none',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                            }}>
                                {/* Modal Header */}
                                <div className="modal-header border-0 pb-0">
                                    <div className="d-flex align-items-center">
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '1rem'
                                        }}>
                                            <i className="bi bi-exclamation-triangle text-white fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="modal-title fw-bold mb-0">
                                                ¿Estás seguro?
                                            </h5>
                                            <p className="text-muted small mb-0">
                                                Esta acción no se puede deshacer
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                        aria-label="Close"
                                    ></button>
                                </div>

                                {/* Modal Body */}
                                <div className="modal-body pt-3">
                                    <form onSubmit={deleteAccount}>
                                        <div className="alert alert-danger d-flex align-items-start mb-4" style={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: 'rgba(220, 53, 69, 0.1)',
                                            borderLeft: '4px solid #dc3545'
                                        }}>
                                            <i className="bi bi-info-circle-fill me-2 mt-1"></i>
                                            <div>
                                                <strong>Atención:</strong> Esta acción eliminará permanentemente 
                                                tu cuenta y todos los datos asociados. Por favor, ingresa tu 
                                                contraseña para confirmar.
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label fw-semibold">
                                                Contraseña
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                ref={passwordInput}
                                                className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Ingresa tu contraseña"
                                                autoComplete="current-password"
                                                style={{
                                                    borderRadius: '12px',
                                                    border: '2px solid #e9ecef',
                                                    padding: '0.75rem 1rem'
                                                }}
                                            />
                                            {errors.password && (
                                                <div className="invalid-feedback d-block">
                                                    <i className="bi bi-exclamation-circle me-1"></i>
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>

                                        <div className="d-flex gap-3">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="btn btn-lg flex-fill"
                                                style={{
                                                    borderRadius: '12px',
                                                    border: '2px solid #e9ecef',
                                                    background: 'white',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="btn btn-lg flex-fill"
                                                style={{
                                                    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontWeight: '600',
                                                    opacity: processing ? 0.7 : 1
                                                }}
                                            >
                                                {processing ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Eliminando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-trash me-2"></i>
                                                        Eliminar Cuenta
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
