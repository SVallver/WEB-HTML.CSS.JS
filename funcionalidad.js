// Función para el desplazamiento suave
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollAmount = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, scrollAmount);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Agrega el evento de clic suave a los enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            smoothScroll(targetId, 1000); // 1000 milisegundos (1 segundo) de duración
        }
    });
});

// JavaScript para activar las animaciones al desplazarse
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('active');
        }
    });
});

// JavaScript para volver arriba
const scrollToTopButton = document.getElementById('scroll-to-top');

scrollToTopButton.addEventListener('click', () => {
    smoothScroll('#inicio', 1000); // 1000 milisegundos (1 segundo) de duración
});

function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scroll = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, scroll);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Obtener el botón de inicio de sesión y el formulario
const loginButton = document.getElementById('loginBtn');
const loginForm = document.querySelector('.login form');

// Datos de usuario (esto debería estar en el servidor)
const userData = {
    username: "usuario",
    password: "contraseña"
};

// Función para mostrar el formulario de inicio de sesión
function showLoginForm() {
    loginForm.classList.add('active');
}

// Función para ocultar el formulario de inicio de sesión
function hideLoginForm() {
    loginForm.classList.remove('active');
}

// Función para realizar el inicio de sesión
function loginUser(username, password) {
    // Verifica las credenciales (esto debería hacerse en el servidor)
    if (username === userData.username && password === userData.password) {
        alert("Inicio de sesión exitoso");
        hideLoginForm();
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
}

// Agregar un evento clic al botón de inicio de sesión
loginButton.addEventListener('click', () => {
    showLoginForm();
});

// Agregar un evento de envío al formulario de inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    const usernameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const username = usernameInput.value;
    const password = passwordInput.value;
    loginUser(username, password);
});