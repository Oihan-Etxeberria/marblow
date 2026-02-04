import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

const Navbar = () => {
    const { auth, url } = usePage().props;
    const user = auth?.user;
    
    // Estado para la búsqueda
    const [searchValue, setSearchValue] = useState('');
    
    // Verificar si la ruta actual coincide
    const isActive = (routeName) => {
        return route().current(routeName);
    };
    
    // Verificar si la ruta actual comienza con un prefijo (para grupos)
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
                {/* Logo / Inicio */}
                <Link className="navbar-brand" href={route('home')}>
                    <img src="/argazkiak/logoaB.png" width="36" alt="Marblow Logo" />
                </Link>
                
                {/* Botón hamburguesa para móviles */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenido del navbar */}
                <div className="collapse navbar-collapse" id="navbarMain">
                    {/* Menú principal - izquierda */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('home') ? 'active' : ''}`}
                                href={route('home')}
                            >
                                Home
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActiveGroup('teams.') ? 'active' : ''}`}
                                href={route('teams.index')}
                            >
                                Teams
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActiveGroup('blowers.') ? 'active' : ''}`}
                                href={route('blowers.index')}
                            >
                                Blowers
                            </Link>
                        </li>
                        
                        {/* Menú desplegable Events */}
                        <li className="nav-item dropdown">
                            <a 
                                className={`nav-link dropdown-toggle ${isActive('events') ? 'active' : ''}`}
                                href="#" 
                                id="navbarDropdown" 
                                role="button" 
                                data-bs-toggle="dropdown"
                            >
                                Events
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" href={route('events')}>
                                        Incoming Events
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/previous">
                                        Previous Events
                                    </a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item" href="/events/create">
                                        Freestyle
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('contact') ? 'active' : ''}`}
                                href={route('contact')}
                            >
                                Contact
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('contact') ? 'active' : ''}`}
                                href={route('bets')}
                            >
                                Bets
                            </Link>
                        </li>

                        {/* Enlaces de administración (solo para usuarios autenticados) */}
                        {user && (
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle text-warning" 
                                    href="#" 
                                    id="adminDropdown" 
                                    role="button" 
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-gear me-1"></i> Admin
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" href={route('blowers.create')}>
                                            <i className="bi bi-person-plus me-2"></i> Nuevo Blower
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href={route('teams.create')}>
                                            <i className="bi bi-flag me-2"></i> Nuevo Team
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={route('blowers.index')}>
                                            <i className="bi bi-people me-2"></i> Gestionar Blowers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href={route('teams.index')}>
                                            <i className="bi bi-flag-fill me-2"></i> Gestionar Teams
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Menú derecha - Auth y usuario */}
                    <ul className="navbar-nav ms-auto">
                        {!user ? (
                            <>
                                {/* Usuario no autenticado */}
                                <li className="nav-item">
                                    <Link 
                                        className={`nav-link ${isActive('login') ? 'active' : ''}`}
                                        href={route('login')}
                                    >
                                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light ms-2" href={route('register')}>
                                        <i className="bi bi-person-plus me-1"></i> Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            /* Usuario autenticado */
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle" 
                                    href="#" 
                                    id="userDropdown" 
                                    role="button" 
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-person-circle me-1"></i> {user.name}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <span className="dropdown-item-text">
                                            <small>Logged in as</small><br />
                                            <strong>{user.email}</strong>
                                        </span>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="bi bi-person me-2"></i> My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <i className="bi bi-gear me-2"></i> Settings
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a
                                        href="#"
                                        className="dropdown-item"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            router.post(route('logout'), {}, {
                                            preserveState: false,     // optional: forces full redirect after logout
                                            onFinish: () => {
                                                // optional: you can add a toast here if you want
                                            },
                                            })
                                        }}
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Búsqueda (opcional) */}
                    <form className="d-flex ms-3" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                placeholder="Search blowers..." 
                                name="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
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