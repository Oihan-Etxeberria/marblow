import { router } from '@inertiajs/react';
import Hero from '@/components/Hero';
import "./Contact.css";
import Form from '@/components/Form';

const Register = ({ errors: serverErrors = {} }) => {
  
  const handleSubmit = (formData) => {
    router.post(route('register'), formData, {
      preserveState: true,
      preserveScroll: true,
      replace: true,

      onStart: () => {
        console.log('Enviando registro...');
      },

      onSuccess: (page) => {
        console.log('Registro exitoso!', page);
      },

      onError: (errors) => {
        console.log('Errores de validación:', errors);
        
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth' });
        }
      },

      onFinish: () => {
        console.log('Petición finalizada');
      },
    });
  };

  return (
    <>
      <Hero 
        title="Register"
        subtitle="Create your account to start betting!"
        cosas={
          <Form 
            fields={['name', 'email', 'password', 'password_confirmation']}
            onSubmit={handleSubmit}
            submitText="Register"
            secondaryButton={{ href: '/login', text: 'Already have an account?' }}
            serverErrors={serverErrors}
            clientValidation={true} // ← Mantiene validación cliente (valor por defecto)
          />
        }
      />
      {serverErrors.message && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {serverErrors.message}
        </div>
      )}
    </>
  );
};

export default Register;