
        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera del nav o hamburguesa
        document.addEventListener('click', function (event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });



        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        // Counter animation for stats
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 20);
        }

        // Animate counters when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Testimonial slider
        let currentSlide = 0;
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        function showSlide(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialCards[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showSlide(currentSlide);
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto-play testimonials
        setInterval(nextSlide, 5000);

        // Smooth scrolling for anchor links
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

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(47, 65, 87, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(47, 65, 87, 0.1)';
            }
        });

        // Form submission
        document.querySelector('.contact-form form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Create WhatsApp message
            const whatsappMessage = `¡Hola! Me interesa solicitar una cotización para servicios de limpieza.

*Datos de contacto:*
• Nombre: ${name}
• Teléfono: ${phone}
• Email: ${email}
• Servicio: ${service}

*Mensaje:*
${message}

¡Espero su respuesta!`;
            
            // Open WhatsApp
            const whatsappURL = `https://wa.me/+51964431281?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('¡Gracias! Te estamos redirigiendo a WhatsApp para completar tu solicitud.');
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    



        // JavaScript para Modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Función para contactar por WhatsApp desde modal
function contactWhatsApp(servicio) {
    const mensaje = `¡Hola! Me interesa obtener más información sobre el servicio de ${servicio}. ¿Podrían enviarme una cotización personalizada?`;
    const whatsappURL = `https://wa.me/+51964431281?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappURL, '_blank');
}













// Efectos para la sección de Introducción
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las animaciones al hacer scroll
    initAOS();
    
    // Efecto de parallax para los shapes
    const introSection = document.querySelector('.intro');
    const shapes = document.querySelectorAll('.intro-shape');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (introSection) {
            const introOffset = introSection.offsetTop;
            const introHeight = introSection.offsetHeight;
            
            // Solo aplicar el efecto cuando la sección intro está visible
            if (scrollTop >= introOffset - window.innerHeight && scrollTop <= introOffset + introHeight) {
                const scrollFactor = (scrollTop - (introOffset - window.innerHeight)) / (introHeight + window.innerHeight);
                
                shapes.forEach((shape, index) => {
                    const speed = 0.2 + (index * 0.1);
                    const yPos = scrollFactor * 100 * speed;
                    shape.style.transform = `translateY(${yPos}px)`;
                });
            }
        }
    });
    
    // Efecto de hover 3D para la imagen
    const imageWrapper = document.querySelector('.image-wrapper');
    
    if (imageWrapper) {
        imageWrapper.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            this.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        imageWrapper.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        });
    }
    
    // Efecto de contador para los años de experiencia
    const yearsElement = document.querySelector('.experience-badge .years');
    
    if (yearsElement) {
        const text = yearsElement.textContent;
        const hasPlus = text.includes('+');
        let target = parseInt(text.replace('+', ''));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        function animateCounter() {
            yearsElement.textContent = '0' + (hasPlus ? '+' : '');
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    yearsElement.textContent = target + (hasPlus ? '+' : '');
                } else {
                    yearsElement.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }
            }, 16);
        }
        
        // Función para verificar si un elemento está visible en la ventana
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Iniciar animación cuando el elemento sea visible
        function checkVisibility() {
            if (isElementInViewport(yearsElement) && !yearsElement.classList.contains('animated')) {
                animateCounter();
                yearsElement.classList.add('animated');
            }
        }
        
        // Verificar visibilidad al cargar y al hacer scroll
        window.addEventListener('load', checkVisibility);
        window.addEventListener('scroll', checkVisibility);
    }
    
    // Inicializar AOS (Animate On Scroll)
    function initAOS() {
        // Simular la funcionalidad básica de AOS
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        function checkElements() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('aos-animate');
                    
                    // Aplicar delay si existe
                    const delay = element.getAttribute('data-aos-delay');
                    if (delay) {
                        element.style.transitionDelay = `${delay}ms`;
                    }
                }
            });
        }
        
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // Verificar elementos al cargar y al hacer scroll
        window.addEventListener('load', checkElements);
        window.addEventListener('scroll', checkElements);
        
        // Verificar inicialmente después de un pequeño retraso
        setTimeout(checkElements, 100);
    }
});
