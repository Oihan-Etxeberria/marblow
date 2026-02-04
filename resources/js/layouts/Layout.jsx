import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';  // o Header

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;