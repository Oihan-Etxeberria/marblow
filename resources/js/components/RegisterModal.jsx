import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Form from '@/components/Form';

const RegisterModal = ({ isOpen, onClose }) => {

  const [serverErrors, setServerErrors] = useState({});

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Limpiar errores al cerrar
  useEffect(() => {
    if (!isOpen) setServerErrors({});
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (formData) => {
    setServerErrors({}); // Limpiar errores anteriores antes de enviar

    router.post(route('register'), formData, {
      preserveState: true,
      preserveScroll: true,
      replace: true,

      onSuccess: () => {
        onClose();
      },

      onError: (errors) => {
        // Guardar errores en estado local para pasarlos al Form
        setServerErrors(errors);

        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth' });
        }
      },
    });
  };

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Caja del modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3 shadow-lg p-4 p-md-5 mx-3"
          style={{
            width: '100%',
            maxWidth: '440px',
            animation: 'modalIn 0.25s ease',
            position: 'relative',
          }}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="btn-close"
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
            aria-label="Cerrar"
          />

          {/* Título */}
          <h2 className="fw-bold mb-1">Register</h2>
          <p className="text-muted small mb-4">
            Create your account to start betting!
          </p>

          {/* Formulario */}
          <Form
            fields={['name', 'email', 'password', 'password_confirmation']}
            onSubmit={handleSubmit}
            submitText="Register"
            secondaryButton={{ href: '/login', text: 'Already have an account?' }}
            serverErrors={serverErrors}
            clientValidation={true}
          />

          {/* Error general */}
          {serverErrors.message && (
            <div className="alert alert-danger mt-3 py-2 small">
              {serverErrors.message}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(-16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  );
};

export default RegisterModal;