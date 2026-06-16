document.addEventListener('DOMContentLoaded', function() {

    // 1. PRELOADER LOGIC
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide-preloader');
    }, 1200); // Desaparece tras 1.2 segundos

    // 2. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1, // El elemento aparece cuando un 10% es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo anima una vez
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. MENÚ DE NAVEGACIÓN ACTIVO (SCROLL SPY)
    const sections = document.querySelectorAll('section, header#hero-header');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', 
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => spyObserver.observe(section));

    // 4. BOTÓN "MOSTRAR TELÉFONO"
    const btnPhone = document.getElementById('btnShowPhone');
    if (btnPhone) {
        btnPhone.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = btnPhone.dataset.phone;
            if (phone) {
                btnPhone.innerHTML = `<span class="contact-icon">📱</span> ${phone}`;
                btnPhone.style.pointerEvents = 'none'; // Evitar doble clic
                btnPhone.style.borderColor = 'var(--primary-cyan)';
                btnPhone.style.color = 'var(--primary-cyan)';
            }
        });
    }

    // 5. EFECTO TILT 3D (Solo Desktop) Mantenido y suavizado
    if (window.matchMedia("(min-width: 769px)").matches) {
        const cards = document.querySelectorAll('.proyecto, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                
                // Reducido el efecto para hacerlo más sutil y premium
                const dx = (x - cx) / 40;
                const dy = (y - cy) / 40;

                card.style.transform = `perspective(1000px) rotateX(${-dy}deg) rotateY(${dx}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
});