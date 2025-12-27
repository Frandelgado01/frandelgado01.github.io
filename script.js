document.addEventListener('DOMContentLoaded', function() {

    // 1. MENÚ DE NAVEGACIÓN ACTIVO (SCROLL SPY)
    const sections = document.querySelectorAll('section, header#hero-header');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        // Detecta cuando la sección está en la mitad de la pantalla
        rootMargin: '-40% 0px -40% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Actualizar clases del menú
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 2. BOTÓN "VER NÚMERO"
    const btnPhone = document.getElementById('btnShowPhone');
    if (btnPhone) {
        btnPhone.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = btnPhone.dataset.phone;
            if (phone) {
                btnPhone.innerHTML = `<span style="font-weight:bold; color:#fff; margin-right:8px;">${phone}</span> 📞`;
                btnPhone.style.pointerEvents = 'none'; // Evitar doble clic
                btnPhone.style.borderColor = '#00ff88';
                btnPhone.style.background = 'rgba(0, 255, 136, 0.15)';
            }
        });
    }

    // 3. EFECTO TILT 3D (Solo Desktop)
    if (window.matchMedia("(min-width: 769px)").matches) {
        const cards = document.querySelectorAll('.proyecto, .skill-card, .contact-card, .timeline-content');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                
                const dx = (x - cx) / 25;
                const dy = (y - cy) / 25;

                card.style.transform = `perspective(1000px) rotateX(${-dy}deg) rotateY(${dx}deg) scale(1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
});