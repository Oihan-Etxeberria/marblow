<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #272626">
    <div class="container-fluid">
        <!-- Logo / Inicio -->
        <a class="navbar-brand" href="{{ route('home') }}">
            <img src="{{ asset('argazkiak/logoaB.png') }}" width="36" alt="Marblow Logo">
        </a>
        
        <!-- Botón hamburguesa para móviles -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Contenido del navbar -->
        <div class="collapse navbar-collapse" id="navbarMain">
            <!-- Menú principal - izquierda -->
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" 
                       href="{{ route('home') }}">
                        Home
                    </a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('teams.*') ? 'active' : '' }}" 
                       href="{{ route('teams.index') }}">
                        Teams
                    </a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('blowers.*') ? 'active' : '' }}" 
                       href="{{ route('blowers.index') }}">
                        Blowers
                    </a>
                </li>
                
                <!-- Menú desplegable Events -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle {{ request()->routeIs('events') ? 'active' : '' }}" 
                       href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                        Events
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="{{ route('events') }}">
                                Incoming Events
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">
                                Previous Events
                            </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="#">
                                Freestyle
                            </a>
                        </li>
                    </ul>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('contact') ? 'active' : '' }}" 
                       href="{{ route('contact') }}">
                        Contact
                    </a>
                </li>

                <!-- Enlaces de administración (solo para usuarios autenticados) -->
                @auth
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-warning" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-gear me-1"></i> Admin
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="{{ route('blowers.create') }}">
                                <i class="bi bi-person-plus me-2"></i> Nuevo Blower
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="{{ route('teams.create') }}">
                                <i class="bi bi-flag me-2"></i> Nuevo Team
                            </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="{{ route('blowers.index') }}">
                                <i class="bi bi-people me-2"></i> Gestionar Blowers
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="{{ route('teams.index') }}">
                                <i class="bi bi-flag-fill me-2"></i> Gestionar Teams
                            </a>
                        </li>
                    </ul>
                </li>
                @endauth
            </ul>

            <!-- Menú derecha - Auth y usuario -->
            <ul class="navbar-nav ms-auto">
                @guest
                <!-- Usuario no autenticado -->
                <li class="nav-item">
                    <a class="nav-link {{ request()->routeIs('login') ? 'active' : '' }}" 
                       href="{{ route('login') }}">
                        <i class="bi bi-box-arrow-in-right me-1"></i> Login
                    </a>
                </li>
                <li class="nav-item">
                    <a class="btn btn-outline-light ms-2" href="{{ route('register') }}">
                        <i class="bi bi-person-plus me-1"></i> Register
                    </a>
                </li>
                @else
                <!-- Usuario autenticado -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle me-1"></i> {{ Auth::user()->name }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <span class="dropdown-item-text">
                                <small>Logged in as</small><br>
                                <strong>{{ Auth::user()->email }}</strong>
                            </span>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" href="#">
                                <i class="bi bi-person me-2"></i> My Profile
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">
                                <i class="bi bi-gear me-2"></i> Settings
                            </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li>
                            <form method="POST" action="{{ route('logout') }}" id="logout-form">
                                @csrf
                                <a class="dropdown-item" href="#" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <i class="bi bi-box-arrow-right me-2"></i> Logout
                                </a>
                            </form>
                        </li>
                    </ul>
                </li>
                @endguest
            </ul>

            <!-- Búsqueda (opcional) -->
            <form class="d-flex ms-3" action="{{ route('blowers.index') }}" method="GET">
                <div class="input-group">
                    <input type="text" class="form-control form-control-sm" 
                           placeholder="Search blowers..." name="search"
                           value="{{ request('search') }}">
                    <button class="btn btn-outline-light btn-sm" type="submit">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</nav>