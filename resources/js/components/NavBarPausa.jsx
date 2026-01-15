import { useState } from 'react';
import './NavBar.css';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { auth } = usePage().props;         // ← Aquí está la magia
  const user = auth?.user;

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <a href="/" className="logo">
          <img 
            src="/argazkiak/logoaB.png" 
            width="36" 
            alt="Marblow Logo" 
          />
        </a>
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/teams" onClick={() => setMenuOpen(false)}>Teams</a>
          <a href="/blowers" onClick={() => setMenuOpen(false)}>Blowers</a>

          {/* Dropdown con CSS puro */}
          <div className="dropdown">
            <a href="#" className="dropdown-toggle">
              Events <span className="arrow">▾</span>
            </a>
            <div className="dropdown-content">
              <a href="/events" onClick={() => setMenuOpen(false)}>
                Incoming Events
              </a>
              <a href="/" onClick={() => setMenuOpen(false)}>
                Previous Events
              </a>
              <hr className="divider" />
              <a href="#" onClick={() => setMenuOpen(false)}>
                Freestyle
              </a>
            </div>
          </div>

          <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>

          <a href="/login" className="login-btn" onClick={() => setMenuOpen(false)}>
            Log In
          </a>
          <Link
            v-if="isAuthenticated"
            href="/logout"
            method="post"
            as="button"
            className="text-red-400 hover:text-red-300"
          >
            Log out
          </Link>
        </div>
      </div>
    </nav>
  );
}