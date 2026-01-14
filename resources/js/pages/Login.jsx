import { router } from '@inertiajs/react';
import Hero from '@/components/Hero';
import "./Contact.css"
import Form from '@/components/Form';


const Login = ({ errors: serverErrors = {} }) => {
  
  const handleSubmit = (formData) => {
    router.post(route('login.submit'), formData, {
      // Opciones muy recomendadas para formularios de login
      preserveState: true,      // Mantiene el estado de la página actual
      preserveScroll: true,     // No salta al principio de la página al fallar
      replace: true,            // Reemplaza la entrada actual en el history (evita "atrás" raro)

      // Callbacks útiles
      onStart: () => {
        // Opcional: mostrar spinner global, deshabilitar botón, etc.
        console.log('Enviando login...');
      },

      onSuccess: (page) => {
        // ¡Éxito! El servidor redirigió (normalmente a dashboard)
        // Este callback se ejecuta SOLO si NO hay errores de validación
        // (Inertia detecta automáticamente si props.errors está vacío)
        console.log('Login exitoso!', page);

        // Ejemplos útiles que puedes poner aquí:
        // - Mostrar toast de éxito (aunque normalmente el redirect ya lo hace innecesario)
        // - Resetear algo manualmente si no usas useForm
        // - Analytics: track('login_success')
      },

      onError: (errors) => {
        // ¡Falló la validación o algún error controlado!
        // Aquí llegan los errores que pusiste en Laravel con ->withErrors()
        console.log('Errores de validación:', errors);

        // Ejemplos de cosas útiles que puedes hacer:
        // 1. Scroll al primer error
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth' });
        }

        // 2. Mostrar toast/notification de error general
        // toast.error('Por favor revisa los errores en el formulario')

        // 3. Focus en el primer campo con error (muy buena UX)
        // document.getElementById(firstErrorField)?.focus();
      },

      onFinish: () => {
        // Siempre se ejecuta al final (éxito o fallo)
        // Ideal para quitar loading/spinner
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