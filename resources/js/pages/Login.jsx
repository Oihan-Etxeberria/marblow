import { useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import LoginModal from '@/components/LoginModal';
import { useState } from 'react';

const Login = ({ errors: serverErrors = {} }) => {
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
    <LoginModal
      isOpen={isOpen}
      onClose={() => router.visit('/')}
      errors={serverErrors}
    />
  );
};

export default Login;