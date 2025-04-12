// Esperar a que el DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM que se manipularán con JavaScript
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const contactForm = document.getElementById('contact-form');
    const welcomeMessage = document.getElementById('welcome-message');
    
    // Función para mostrar el mensaje de bienvenida al cargar la página
    // y ocultarlo automáticamente después de 3 segundos
    function showWelcomeMessage() {
        welcomeMessage.style.display = 'block';
        
        // Temporizador para ocultar el mensaje después de 3 segundos
        setTimeout(function() {
            welcomeMessage.style.display = 'none';
        }, 3000);
    }
    
    // Ejecutar la función de bienvenida al cargar la página
    showWelcomeMessage();
    
    // Función para alternar entre modo claro y oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Guardar la preferencia del usuario en el almacenamiento local del navegador
        // para mantenerla entre sesiones
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    }
    
    // Verificar si el usuario ya tenía el modo oscuro activado en visitas anteriores
    // y aplicarlo automáticamente si es así
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // Función para mostrar/ocultar el menú de navegación en dispositivos móviles
    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
    }
    
    // Función para validar el formulario de contacto antes de enviarlo
    function validateForm(event) {
        // Prevenir el comportamiento predeterminado del formulario (evitar recarga de página)
        event.preventDefault();
        
        // Obtener valores de los campos del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Resetear todos los mensajes de error y éxito previos
        document.getElementById('name-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('message-error').textContent = '';
        document.getElementById('form-success').textContent = '';
        
        // Variable para controlar si hay errores en la validación
        let hasErrors = false;
        
        // Validar que el campo nombre no esté vacío
        if (name === '') {
            document.getElementById('name-error').textContent = 'Por favor, ingresa tu nombre';
            hasErrors = true;
        }
        
        // Validar que el campo email no esté vacío y tenga formato correcto
        if (email === '') {
            document.getElementById('email-error').textContent = 'Por favor, ingresa tu correo electrónico';
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            document.getElementById('email-error').textContent = 'Por favor, ingresa un correo electrónico válido';
            hasErrors = true;
        }
        
        // Validar que el campo mensaje no esté vacío
        if (message === '') {
            document.getElementById('message-error').textContent = 'Por favor, ingresa un mensaje';
            hasErrors = true;
        }
        
        // Si no hay errores, mostrar mensaje de éxito y resetear el formulario
        if (!hasErrors) {
            document.getElementById('form-success').textContent = '¡Gracias por tu mensaje, camarada! Te responderemos pronto.';
            contactForm.reset();
        }
    }
    
    // Función auxiliar para validar el formato de un correo electrónico
    // mediante una expresión regular
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Configuración de los escuchadores de eventos para los diferentes elementos interactivos
    darkModeToggle.addEventListener('click', toggleDarkMode);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', validateForm);
    
    // Cerrar automáticamente el menú móvil cuando se hace clic en un enlace de navegación
    // para mejorar la experiencia de usuario en dispositivos móviles
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
            }
        });
    });
});