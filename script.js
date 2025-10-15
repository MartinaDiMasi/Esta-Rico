// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


//CARRUSEL

// Función para cambiar de slide en el carrusel
function changeSlide(button, direction) {
    const container = button.closest('.carousel-container');
    const images = container.querySelectorAll('.carousel-img');
    const dots = container.querySelectorAll('.carousel-dot');
    
    // Encontrar el índice actual
    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Remover clase active del slide actual
    images[currentIndex].classList.remove('active');
    if (dots.length > 0) {
        dots[currentIndex].classList.remove('active');
    }
    
    // Calcular nuevo índice
    let newIndex = currentIndex + direction;
    
    // Circular: volver al inicio o al final
    if (newIndex >= images.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = images.length - 1;
    }
    
    // Agregar clase active al nuevo slide
    images[newIndex].classList.add('active');
    if (dots.length > 0) {
        dots[newIndex].classList.add('active');
    }
}

// Función para ir a un slide específico
function goToSlide(container, index) {
    const images = container.querySelectorAll('.carousel-img');
    const dots = container.querySelectorAll('.carousel-dot');
    
    // Remover todas las clases active
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Agregar clase active al slide e indicador seleccionado
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// Inicializar los dots (indicadores) para cada carrusel
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        // Crear los dots según la cantidad de imágenes
        images.forEach((img, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            
            // Agregar evento click a cada dot
            dot.addEventListener('click', () => {
                goToSlide(carousel, index);
            });
            
            dotsContainer.appendChild(dot);
        });
    });
}

// Carrusel automático (opcional)
function autoPlayCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        setInterval(() => {
            const nextButton = carousel.querySelector('.carousel-btn.next');
            if (nextButton) {
                changeSlide(nextButton, 1);
            }
        }, 6000); // segundos
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousels();
   /*  autoPlayCarousels(); */
});