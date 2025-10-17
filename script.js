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


//CARRUSEL AUTOMÁTICO ASINCRÓNICO

// Función para cambiar al siguiente slide automáticamente
function autoChangeSlide(carousel) {
    const images = carousel.querySelectorAll('.carousel-img');
    
    // Encontrar el índice actual
    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Remover clase active del slide actual
    images[currentIndex].classList.remove('active');
    
    // Calcular nuevo índice (circular)
    let newIndex = (currentIndex + 1) % images.length;
    
    // Agregar clase active al nuevo slide
    images[newIndex].classList.add('active');
}

// Inicializar carruseles automáticos con intervalos diferentes
function initializeAutoCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    // Intervalos diferentes para cada carrusel (en milisegundos)
    const intervals = [3500, 4200, 3800]; // Diferentes tiempos para efecto asincrónico
    
    carousels.forEach((carousel, index) => {
        // Usar un intervalo diferente para cada carrusel
        const interval = intervals[index] || 3500;
        
        setInterval(() => {
            autoChangeSlide(carousel);
        }, interval);
    });
}

// CARRUSEL DE MARCAS
let currentBrandsSlide = 0;
let brandsPerView = getBrandsPerView();
let brandsAutoplayInterval;

function getBrandsPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 968) return 2;
    return 3;
}

function initializeBrandsCarousel() {
    const track = document.querySelector('.brands-carousel-track');
    const items = document.querySelectorAll('.brand-item');
    const dotsContainer = document.querySelector('.brands-carousel-dots');
    
    if (!track || !items.length) return;
    
    const totalSlides = Math.ceil(items.length / brandsPerView);
    
    // Crear dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'brands-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToBrandsSlide(i);
        dotsContainer.appendChild(dot);
    }
    
    updateBrandsCarousel();
    startBrandsAutoplay();
}

function updateBrandsCarousel() {
    const track = document.querySelector('.brands-carousel-track');
    const items = document.querySelectorAll('.brand-item');
    const dots = document.querySelectorAll('.brands-dot');
    
    if (!track || !items.length) return;
    
    const itemWidth = items[0].offsetWidth;
    const gap = 32; // 2rem = 32px
    const offset = -(currentBrandsSlide * brandsPerView * (itemWidth + gap));
    
    track.style.transform = `translateX(${offset}px)`;
    
    // Actualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentBrandsSlide);
    });
}

function changeBrandsSlide(direction) {
    const items = document.querySelectorAll('.brand-item');
    const totalSlides = Math.ceil(items.length / brandsPerView);
    
    currentBrandsSlide += direction;
    
    if (currentBrandsSlide < 0) {
        currentBrandsSlide = totalSlides - 1;
    } else if (currentBrandsSlide >= totalSlides) {
        currentBrandsSlide = 0;
    }
    
    updateBrandsCarousel();
    resetBrandsAutoplay();
}

function goToBrandsSlide(index) {
    currentBrandsSlide = index;
    updateBrandsCarousel();
    resetBrandsAutoplay();
}

function startBrandsAutoplay() {
    brandsAutoplayInterval = setInterval(() => {
        changeBrandsSlide(1);
    }, 4000);
}

function resetBrandsAutoplay() {
    clearInterval(brandsAutoplayInterval);
    startBrandsAutoplay();
}

// Actualizar en resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const newBrandsPerView = getBrandsPerView();
        if (newBrandsPerView !== brandsPerView) {
            brandsPerView = newBrandsPerView;
            currentBrandsSlide = 0;
            initializeBrandsCarousel();
        }
    }, 250);
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeAutoCarousels();
    initializeBrandsCarousel();
});