import { usePage } from '@inertiajs/react'
import Hero from '@/components/Hero';
import "./Contact.css"
import Form from '@/components/Form';


const Login = () => {
  const { errors } = usePage().props;
  return (
    <>
      <Hero 
        title="Log in"
        subtitle="Log in as user to bet, sign up as blower... and much more!"
        cosas={
            <Form 
              fields={['username', 'password']} 
              onSubmit={handleLogin}
              submitText="Log in"
              secondaryButton={{ href: '/register', text: 'Register' }}
            />
        }
      />
      
    </>
  );
};

export default Login;