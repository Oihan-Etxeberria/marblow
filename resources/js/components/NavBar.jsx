import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
// IMPORTANTE: Asegúrate de que la ruta al componente sea la correcta
import GoogleTranslate from "./GoogleTranslate"; 

const Navbar = () => {
    const { auth } = usePage().props;
    const user = auth?.user;
    
    const [searchValue, setSearchValue] = useState('');
    
    const isActive = (routeName) => route().current(routeName);
    const isActiveGroup = (prefix) => {
        const currentRoute = route().current();
        return currentRoute && currentRoute.startsWith(prefix);
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('blowers.index'), { search: searchValue });
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#272626' }}>
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" href={route('home')}>
                    <img src="/argazkiak/logoaB.png" width="36" alt="Marblow Logo" />
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMain">
                    {/* Menú principal - IZQUIERDA */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('home') ? 'active' : ''}`} href={route('home')}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActiveGroup('teams.') ? 'active' : ''}`} href={route('teams.index')}>Teams</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActiveGroup('blowers.') ? 'active' : ''}`} href={route('blowers.index')}>Blowers</Link>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className={`nav-link dropdown-toggle ${isActive('events') ? 'active' : ''}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">Events</a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href={route('events')}>Incoming Events</Link></li>
                                <li><a className="dropdown-item" href="/previous">Previous Events</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="/events/create">Freestyle</Link></li>
                            </ul>
                        </li>
                        
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('contact') ? 'active' : ''}`} href={route('contact')}>Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('contact') ? 'active' : ''}`} href={route('bets')}>Bets</Link>
                        </li>

                        {user && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-warning" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-gear me-1"></i> Admin
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href={route('blowers.create')}>Nuevo Blower</Link></li>
                                    <li><Link className="dropdown-item" href={route('teams.create')}>Nuevo Team</Link></li>
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Menú - DERECHA (Traductor + Auth) */}
                    <ul className="navbar-nav ms-auto align-items-center">
                        
                        {/* 1. EL BOTÓN DE IDIOMA AQUÍ */}
                        <li className="nav-item me-3">
                            <GoogleTranslate />
                        </li>

                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('login') ? 'active' : ''}`} href={route('login')}>
                                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light ms-2" href={route('register')}>
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-person-circle me-1"></i> {user.name}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i> Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a href="#" className="dropdown-item" onClick={(e) => {
                                            e.preventDefault();
                                            router.post(route('logout'));
                                        }}>
                                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Buscador */}
                    <form className="d-flex ms-3" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input type="text" className="form-control form-control-sm" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <button className="btn btn-outline-light btn-sm" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;