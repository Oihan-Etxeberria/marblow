import Hero from '@/components/Hero';
import Highlights from '@/components/HighlightsSection';
import AdBanner from '@/components/AdBanner';

import { Link, usePage } from '@inertiajs/react';

const Home = () => {
  
  const { auth } = usePage().props;         // ← Aquí está la magia
  const user = auth?.user;

  return (
    <>
      <Hero 
        title="International Marble Blowing Competition"
        subtitle="Experience the pinnacle of precision and skill! The most prestigious and exciting marble-blowing event in the world, uniting the globe's finest blowers."
        primaryButton={{
            label: "Register Now",
            href: "#register",
            variant: "primary"
        }}
        secondaryButton={{
            label: "View Rulebook",
            href: "#rules",
            variant: "outline-light"
        }}
      />
      <Highlights />
      <AdBanner position="bottom" closeable={true} />
      <Hero
        primaryButton={{
            label: "Log out!",
            href: "/logout",
            variant: "primary"
        }}
        cosas={
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
              Bienvenido, {user.name || user.username}!
            </h1>

            <div className="bg-white p-6 rounded-lg shadow">
              <p>Email: {user.email}</p>
              <p>ID: {user.id}</p>
            </div>

            {/* Ejemplo: mostrar contenido solo si está logueado */}
            {auth.isAuthenticated && (
              <p className="mt-4 text-green-600">Estás completamente autenticado 🎉</p>
            )}
          </div>
        }
      />
    </>
  );
};

export default Home;