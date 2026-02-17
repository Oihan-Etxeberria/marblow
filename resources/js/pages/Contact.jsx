import { router } from '@inertiajs/react';
import Hero from '@/components/Hero';
import "./Contact.css";
import Form from '@/components/Form';

const Contact = ({ errors: serverErrors = {}, success = false }) => {

  const handleSubmit = (formData) => {
    router.post(route('contact.submit'), formData, {
      preserveState: true,
      preserveScroll: true,
      replace: true,

      onStart: () => {
        console.log('Enviando mensaje...');
      },

      onSuccess: () => {
        console.log('Mensaje enviado!');
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
        title="Contact"
        subtitle="Got a question or want to get in touch? We'd love to hear from you."
        cosas={
          success ? (
            <div className="alert alert-success text-center">
              <i className="bi bi-check-circle me-2"></i>
              Your message has been sent! We'll get back to you soon.
            </div>
          ) : (
            <Form
              fields={['name', 'email', 'message']}
              onSubmit={handleSubmit}
              submitText="Send message"
              serverErrors={serverErrors}
              clientValidation={true}
            />
          )
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

export default Contact;
