import { router } from '@inertiajs/react';
import Hero from '@/components/Hero';
import "./Contact.css"
import Form from '@/components/Form';

const Login = ({ errors: serverErrors = {} }) => {
  
  const handleSubmit = (formData) => {
    router.post(route('login.submit'), formData, {
      preserveState: true,
      preserveScroll: true,
      replace: true,

      onStart: () => {
        console.log('Enviando login...');
      },

      onSuccess: (page) => {
        console.log('Login exitoso!', page);
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
        title="Log in"
        subtitle="Log in as user to bet, sign up as blower... and much more!"
        cosas={
          <Form 
            fields={['username', 'password']}
            onSubmit={handleSubmit}
            submitText="Log in"
            secondaryButton={{ href: '/register', text: 'Register' }}
            serverErrors={serverErrors}
            clientValidation={false} // ← Desactiva validación cliente
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

export default Login;