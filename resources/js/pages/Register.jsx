import { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import RegisterModal from '@/components/RegisterModal';

const Register = ({ errors: serverErrors = {} }) => {
  const { auth } = usePage().props;
  const [isOpen, setIsOpen] = useState(true);

  // Si ya está autenticado, redirigir a home
  useEffect(() => {
    if (auth?.user) {
      router.visit('/');
    }
  }, [auth]);

  if (auth?.user) return null;

  return (
    <RegisterModal
      isOpen={isOpen}
      onClose={() => router.visit('/')}
      errors={serverErrors}
    />
  );
};

export default Register;