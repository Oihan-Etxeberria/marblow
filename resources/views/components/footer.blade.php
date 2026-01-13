<footer class="px-3" style="background-color: #272626; color: white;">
    <div class="container pt-4 pb-2">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 mb-4">
            <!-- Logo en desktop -->
            <div class="text-center text-md-start order-2 order-md-0 d-none d-md-block">
                <img src="{{ asset('argazkiak/logoaB.png') }}" alt="Marblow" width="50" class="mb-2">
                <p class="mb-0 small text-white-50">
                    © Marblow {{ date('Y') }}<br>Todos los derechos reservados.
                </p>
            </div>

            <!-- Menú en desktop -->
            <ul class="nav flex-row flex-wrap justify-content-center gap-3 d-none d-md-flex mb-0">
                <li class="nav-item">
                    <a href="{{ route('home') }}" class="nav-link text-white px-0 {{ request()->routeIs('home') ? 'active' : '' }}">
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('teams.index') }}" class="nav-link text-white px-0 {{ request()->routeIs('teams.*') ? 'active' : '' }}">
                        Teams
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('blowers.index') }}" class="nav-link text-white px-0 {{ request()->routeIs('blowers.*') ? 'active' : '' }}">
                        Blowers
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('events') }}" class="nav-link text-white px-0 {{ request()->routeIs('events') ? 'active' : '' }}">
                        Events
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('contact') }}" class="nav-link text-white px-0 {{ request()->routeIs('contact') ? 'active' : '' }}">
                        Contact
                    </a>
                </li>
                @auth
                <li class="nav-item">
                    <a href="{{ route('logout') }}" 
                       class="nav-link text-warning px-0"
                       onclick="event.preventDefault(); document.getElementById('footer-logout-form').submit();">
                        Logout
                    </a>
                    <form id="footer-logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
                @endauth
            </ul>

            <!-- Menú en móvil -->
            <ul class="nav flex-column align-items-center d-md-none order-0 mb-3">
                <li class="nav-item">
                    <a href="{{ route('home') }}" class="nav-link text-white {{ request()->routeIs('home') ? 'active' : '' }}">
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('teams.index') }}" class="nav-link text-white {{ request()->routeIs('teams.*') ? 'active' : '' }}">
                        Teams
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('blowers.index') }}" class="nav-link text-white {{ request()->routeIs('blowers.*') ? 'active' : '' }}">
                        Blowers
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('events') }}" class="nav-link text-white {{ request()->routeIs('events') ? 'active' : '' }}">
                        Events
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ route('contact') }}" class="nav-link text-white {{ request()->routeIs('contact') ? 'active' : '' }}">
                        Contact
                    </a>
                </li>
                @auth
                <li class="nav-item">
                    <a href="{{ route('logout') }}" 
                       class="nav-link text-warning"
                       onclick="event.preventDefault(); document.getElementById('footer-mobile-logout-form').submit();">
                        Logout
                    </a>
                    <form id="footer-mobile-logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
                @endauth
            </ul>

            <!-- Redes sociales -->
            <div class="text-center text-md-end order-1">
                <p class="mb-2 text-white-50 small">Síguenos:</p>
                <div class="d-flex justify-content-center justify-content-md-end gap-4">
                    <a href="https://www.instagram.com/willsmith/" target="_blank" rel="noopener noreferrer" class="social-icon">
                        <img src="{{ asset('argazkiak/instagramblanco.png') }}" alt="Instagram" width="35">
                        <span class="visually-hidden">Instagram</span>
                    </a>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" class="social-icon">
                        <img src="{{ asset('argazkiak/whatsappblanco.svg') }}" alt="WhatsApp" width="35">
                        <span class="visually-hidden">WhatsApp</span>
                    </a>
                    <a href="https://www.facebook.com/WillSmith/" target="_blank" rel="noopener noreferrer" class="social-icon">
                        <img src="{{ asset('argazkiak/facebookona.svg') }}" alt="Facebook" width="35">
                        <span class="visually-hidden">Facebook</span>
                    </a>
                </div>
            </div>
        </div>

        <hr class="border-secondary opacity-25 my-4">

        <div class="text-center">
            <ul class="nav justify-content-center small mb-3 flex-wrap gap-3">
                <li class="nav-item">
                    <a href="#" class="nav-link text-white-50 py-0">Aviso legal</a>
                </li>
                <li><span class="text-white-50">·</span></li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white-50 py-0">Política de privacidad</a>
                </li>
                <li><span class="text-white-50">·</span></li>
                <li class="nav-item">
                    <a href="#" class="nav-link text-white-50 py-0">Política de cookies</a>
                </li>
                @auth
                <li><span class="text-white-50">·</span></li>
                <li class="nav-item">
                    <a href="{{ route('blowers.create') }}" class="nav-link text-warning py-0">
                        <small>Admin</small>
                    </a>
                </li>
                @endauth
            </ul>
            
            <img src="{{ asset('argazkiak/taldearen-izena1.png') }}" alt="Marblow" class="marblogo mb-3" style="width: 200px; object-fit: contain;">

            <!-- Copyright en móvil -->
            <div class="d-md-none text-center">
                <img src="{{ asset('argazkiak/logoaB.png') }}" alt="Marblow" width="50" class="mb-2">
                <p class="mb-0 small text-white-50">
                    © Marblow {{ date('Y') }}<br>Todos los derechos reservados.
                </p>
            </div>
        </div>
    </div>
</footer>