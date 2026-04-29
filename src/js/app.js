document.addEventListener('DOMContentLoaded', () => {
    initNav();
    if (document.getElementById('auth-page')) initAuth();
    if (document.getElementById('dashboard-page')) initDashboard();
});

// GESTIÓN DE NAVEGACIÓN
function initNav() {
    const user = JSON.parse(localStorage.getItem('thor_session'));
    const nav = document.getElementById('dynamic-nav');
    if (!nav) return;

    // Ajustar rutas según profundidad de carpeta
    const isRoot = !window.location.pathname.includes('pages/');
    const pathPrefix = isRoot ? 'pages/' : '';
    const homePrefix = isRoot ? '' : '../';

    nav.innerHTML = `
        <div class="logo">THOR FITNESS</div>
        <div class="nav-links">
            <a href="${homePrefix}index.html" style="color:white; margin-right:20px; text-decoration:none">Inicio</a>
            <a href="${pathPrefix}about.html" style="color:white; margin-right:20px; text-decoration:none">Nosotros</a>
            ${user ? `<a href="${pathPrefix}dashboard.html" style="color:white; margin-right:20px; text-decoration:none">Dashboard</a>
                    <button onclick="logout()" class="btn-primary" style="padding:5px 15px; border-radius:4px; cursor:pointer">Salir</button>` 
                : `<a href="${pathPrefix}auth.html" class="btn-primary" style="padding:5px 15px; text-decoration:none; border-radius:4px">Entrar</a>`}
        </div>
    `;
}

function logout() {
    localStorage.removeItem('thor_session');
    location.reload();
}

// LÓGICA DE AUTENTICACIÓN
function initAuth() {
    const loginForm = document.getElementById('form-login');
    const registerForm = document.getElementById('form-register');
    const toggleBtn = document.getElementById('toggle-auth');

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
        toggleBtn.innerText = loginForm.classList.contains('hidden') ? '¿Ya tienes cuenta? Login' : '¿Nuevo aquí? Regístrate';
    });

    document.getElementById('do-register').onsubmit = (e) => {
        e.preventDefault();
        const user = {
            name: document.getElementById('reg-name').value,
            email: document.getElementById('reg-email').value,
            role: document.getElementById('reg-role').value
        };
        localStorage.setItem('thor_session', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    };

    document.getElementById('do-login').onsubmit = (e) => {
        e.preventDefault();
        // Simulación: Cualquier login funciona
        const user = { name: 'Socio de Prueba', email: 'demo@thor.com', role: 'socio' };
        localStorage.setItem('thor_session', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    };
}

// LÓGICA DE DASHBOARD
function initDashboard() {
    const user = JSON.parse(localStorage.getItem('thor_session'));
    if (!user) { window.location.href = 'auth.html'; return; }

    document.getElementById('user-name').innerText = user.name;
    const socioView = document.getElementById('socio-view');}