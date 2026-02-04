import { Head } from '@inertiajs/react';
import ProfileForm from '@/components/Profile/ProfileForm';
import PasswordForm from '@/components/Profile/PasswordForm';
import DeleteAccountForm from '@/components/Profile/DeleteAccountForm';

export default function Profile({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="My Profile" />

            <div className="min-vh-100" style={{ 
                paddingTop: '2rem',
                paddingBottom: '4rem'
            }}>
                <div className="container">
                    {/* Header */}
                    <div className="text-center mb-5">
                        <h1 className="display-4 text-white fw-bold mb-2" style={{
                            fontFamily: '"Poppins", sans-serif',
                            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
                        }}>
                            My Profile
                        </h1>
                        <p className="text-white-50 fs-5">
                            Manage your personal information and preferences
                        </p>
                    </div>

                    {/* Profile Cards Grid */}
                    <div className="row g-4">
                        {/* Información del Perfil */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg" style={{
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                overflow: 'hidden'
                            }}>
                                <div className="card-body p-4 p-md-5">
                                    <div className="d-flex align-items-center mb-4">
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '1rem'
                                        }}>
                                            <i className="bi bi-person-circle text-white fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 className="h4 mb-0 fw-bold">Personal Information</h2>
                                            <p className="text-muted mb-0 small">
                                                Update your name and email
                                            </p>
                                        </div>
                                    </div>
                                    <ProfileForm 
                                        user={auth.user}
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-lg mb-4" style={{
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <div className="mx-auto mb-3" style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '2rem',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                        }}>
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <h3 className="h5 fw-bold mb-1">{auth.user.name}</h3>
                                        <p className="text-muted small mb-3">{auth.user.email}</p>
                                        <span className="badge px-3 py-2" style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {auth.user.role || 'Usuario'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="card border-0 shadow-lg" style={{
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div className="card-body p-4">
                                    <h4 className="h6 fw-bold mb-3">Information about Account</h4>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="text-muted small">Member since</span>
                                        <span className="fw-semibold small">
                                            {new Date(auth.user.created_at).toLocaleDateString('en-EN', {
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cambiar Contraseña */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg" style={{
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div className="card-body p-4 p-md-5">
                                    <div className="d-flex align-items-center mb-4">
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '1rem'
                                        }}>
                                            <i className="bi bi-shield-lock text-white fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 className="h4 mb-0 fw-bold">Security</h2>
                                            <p className="text-muted mb-0 small">
                                                Update your password
                                            </p>
                                        </div>
                                    </div>
                                    <PasswordForm />
                                </div>
                            </div>
                        </div>

                        {/* Eliminar Cuenta */}
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg" style={{
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(220, 53, 69, 0.1)'
                            }}>
                                <div className="card-body p-4 p-md-5">
                                    <div className="d-flex align-items-center mb-4">
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
                                            <i className="bi bi-exclamation-triangle text-white fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 className="h4 mb-0 fw-bold text-danger">Dange Zone</h2>
                                            <p className="text-muted mb-0 small">
                                                Permanently delete your account
                                            </p> 
                                        </div>
                                    </div>
                                    <DeleteAccountForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
