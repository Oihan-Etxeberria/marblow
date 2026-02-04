import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ProfileForm({ user, mustVerifyEmail, status }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <form onSubmit={submit}>
            {/* Name Field */}
            <div className="mb-4">
                <label htmlFor="name" className="form-label fw-semibold">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="name"
                    style={{
                        borderRadius: '12px',
                        border: '2px solid #e9ecef',
                        padding: '0.75rem 1rem',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                {errors.name && (
                    <div className="invalid-feedback d-block">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.name}
                    </div>
                )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoComplete="username"
                    style={{
                        borderRadius: '12px',
                        border: '2px solid #e9ecef',
                        padding: '0.75rem 1rem',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                {errors.email && (
                    <div className="invalid-feedback d-block">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.email}
                    </div>
                )}
            </div>

            {/* Email Verification Notice */}
            {mustVerifyEmail && user.email_verified_at === null && (
                <div className="alert alert-warning d-flex align-items-center" role="alert" style={{
                    borderRadius: '12px',
                    border: 'none',
                    background: 'rgba(255, 193, 7, 0.1)',
                    borderLeft: '4px solid #ffc107'
                }}>
                    <i className="bi bi-info-circle-fill me-2"></i>
                    <div>
                        Tu email no está verificado.
                        <a
                            href={route('verification.send')}
                            className="alert-link ms-2"
                            onClick={(e) => {
                                e.preventDefault();
                                // Aquí puedes implementar el reenvío de verificación
                            }}
                        >
                            Reenviar email de verificación
                        </a>
                    </div>
                </div>
            )}

            {/* Status Message */}
            {status === 'verification-link-sent' && (
                <div className="alert alert-success d-flex align-items-center mb-4" style={{
                    borderRadius: '12px',
                    border: 'none',
                    background: 'rgba(25, 135, 84, 0.1)',
                    borderLeft: '4px solid #198754'
                }}>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Se ha enviado un nuevo enlace de verificación a tu email.
                </div>
            )}

            {/* Actions */}
            <div className="d-flex align-items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="btn btn-lg px-4"
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: '600',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease',
                        opacity: processing ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (!processing) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                >
                    {processing ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Saving...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-check2-circle me-2"></i>
                            Save changes
                        </>
                    )}
                </button>

                {/* Success Message */}
                {recentlySuccessful && (
                    <div className="text-success d-flex align-items-center" style={{
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <span className="fw-semibold">¡Guardado!</span>
                    </div>
                )}
            </div>
        </form>
    );
}
