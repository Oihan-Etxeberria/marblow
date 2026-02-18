import Footer from '@/components/Footer';
import React, { useState } from 'react';
import Navbar from '@/components/NavBar';  // o Header
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';
import { usePage } from '@inertiajs/react';

const Layout = ({ children }) => {

  // Esto es pa que se abra el Login/Register popup
  const { auth } = usePage().props;
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onLoginClick={() => setLoginOpen(true)} onRegisterClick={() => setRegisterOpen(true)}/>
      <main>
        {children}
      </main>
      {!auth?.user && (
        <>
          <LoginModal
            isOpen={loginOpen}
            onClose={() => setLoginOpen(false)}
          />
          <RegisterModal
            isOpen={registerOpen}
            onClose={() => setRegisterOpen(false)}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Layout;