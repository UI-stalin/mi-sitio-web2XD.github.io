// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const contactForm = document.getElementById('contact-form');
    const welcomeMessage = document.getElementById('welcome-message');
    
    // Función para mostrar mensaje de bienvenida
    function showWelcomeMessage() {
        welcomeMessage.style.display = 'block';
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(function() {
            welcomeMessage.style.display = 'none';
        }, 3000);
    }
    
    // Mostrar mensaje de bienvenida al cargar la página
    showWelcomeMessage();
    
    // Función para alternar el modo oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Guardar preferencia en localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    }
    
    // Verificar si el usuario ya tenía el modo oscuro activado
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
    }
    
    // Función para validar el formulario
    function validateForm(event) {
        event.preventDefault();
        
        // Obtener valores de los campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Resetear mensajes de error
        document.getElementById('name-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('message-error').textContent = '';
        document.getElementById('form-success').textContent = '';
        
        // Variable para controlar si hay errores
        let hasErrors = false;
        
        // Validar nombre
        if (name === '') {
            document.getElementById('name-error').textContent = 'Por favor, ingresa tu nombre';
            hasErrors = true;
        }
        
        // Validar email
        if (email === '') {
            document.getElementById('email-error').textContent = 'Por favor, ingresa tu correo electrónico';
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            document.getElementById('email-error').textContent = 'Por favor, ingresa un correo electrónico válido';
            hasErrors = true;
        }
        
        // Validar mensaje
        if (message === '') {
            document.getElementById('message-error').textContent = 'Por favor, ingresa un mensaje';
            hasErrors = true;
        }
        
        // Si no hay errores, mostrar mensaje de éxito
        if (!hasErrors) {
            document.getElementById('form-success').textContent = '¡Gracias por tu mensaje, camarada! Te responderemos pronto.';
            contactForm.reset();
        }
    }
    
    // Función para validar formato de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Event Listeners
    darkModeToggle.addEventListener('click', toggleDarkMode);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', validateForm);
    
    // Cerrar el menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
            }
        });
    });
});