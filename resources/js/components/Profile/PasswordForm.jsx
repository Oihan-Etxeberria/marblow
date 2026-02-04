import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function PasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirmation: false
    });

    const { data, setData, put, errors, processing, recentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <form onSubmit={submit}>
            {/* Current Password */}
            <div className="mb-4">
                <label htmlFor="current_password" className="form-label fw-semibold">
                    Current password
                </label>
                <div className="position-relative">
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type={showPasswords.current ? 'text' : 'password'}
                        className={`form-control form-control-lg ${errors.current_password ? 'is-invalid' : ''}`}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            padding: '0.75rem 3rem 0.75rem 1rem',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f093fb'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <button
                        type="button"
                        className="btn position-absolute end-0 top-50 translate-middle-y"
                        onClick={() => togglePasswordVisibility('current')}
                        style={{ border: 'none', background: 'transparent' }}
                    >
                        <i className={`bi ${showPasswords.current ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                    </button>
                </div>
                {errors.current_password && (
                    <div className="text-danger mt-2">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.current_password}
                    </div>
                )}
            </div>

            {/* New Password */}
            <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                    New password
                </label>
                <div className="position-relative">
                    <input
                        id="password"
                        ref={passwordInput}
                        type={showPasswords.new ? 'text' : 'password'}
                        className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            padding: '0.75rem 3rem 0.75rem 1rem',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f093fb'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <button
                        type="button"
                        className="btn position-absolute end-0 top-50 translate-middle-y"
                        onClick={() => togglePasswordVisibility('new')}
                        style={{ border: 'none', background: 'transparent' }}
                    >
                        <i className={`bi ${showPasswords.new ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                    </button>
                </div>
                {errors.password && (
                    <div className="text-danger mt-2">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.password}
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
                <label htmlFor="password_confirmation" className="form-label fw-semibold">
                    Confirm new password
                </label>
                <div className="position-relative">
                    <input
                        id="password_confirmation"
                        type={showPasswords.confirmation ? 'text' : 'password'}
                        className={`form-control form-control-lg ${errors.password_confirmation ? 'is-invalid' : ''}`}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        style={{
                            borderRadius: '12px',
                            border: '2px solid #e9ecef',
                            padding: '0.75rem 3rem 0.75rem 1rem',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#f093fb'}
                        onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                    />
                    <button
                        type="button"
                        className="btn position-absolute end-0 top-50 translate-middle-y"
                        onClick={() => togglePasswordVisibility('confirmation')}
                        style={{ border: 'none', background: 'transparent' }}
                    >
                        <i className={`bi ${showPasswords.confirmation ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                    </button>
                </div>
                {errors.password_confirmation && (
                    <div className="text-danger mt-2">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.password_confirmation}
                    </div>
                )}
            </div>

            {/* Password Requirements */}
            <div className="alert alert-light mb-4" style={{
                borderRadius: '12px',
                border: '2px solid #e9ecef',
                background: '#f8f9fa'
            }}>
                <small className="text-muted">
                    <i className="bi bi-info-circle me-2"></i>
                    The password should have at least 8 characters.
                </small>
            </div>

            {/* Actions */}
            <div className="d-flex align-items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="btn btn-lg px-4"
                    style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: '600',
                        boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
                        transition: 'all 0.3s ease',
                        opacity: processing ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (!processing) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(240, 147, 251, 0.5)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(240, 147, 251, 0.4)';
                    }}
                >
                    {processing ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Updating...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-shield-check me-2"></i>
                            Update password
                        </>
                    )}
                </button>

                {/* Success Message */}
                {recentlySuccessful && (
                    <div className="text-success d-flex align-items-center" style={{
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <i className="bi bi-check-circle-fill me-2"></i>
                        <span className="fw-semibold">Updated!</span>
                    </div>
                )}
            </div>
        </form>
    );
}
