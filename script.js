// script.js - VERSIÓN COMPLETA PARA METAS DE APRENDIZAJE
document.addEventListener('DOMContentLoaded', function() {
    // ============ NAVEGACIÓN ============
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    function updateActiveNav() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú en móvil
                if (window.innerWidth <= 995) {
                    document.querySelector('nav').classList.remove('active');
                    document.querySelector('.menu-toggle i').classList.remove('fa-times');
                    document.querySelector('.menu-toggle i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // ============ MENÚ HAMBURGUESA ============
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const menuIcon = menuToggle.querySelector('i');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // ============ EFECTO DE ESCRITURA MEJORADO ============
    const typingElement = document.getElementById('typing-element');
    if (typingElement) {
        const texts = [
            "Desarrollador Full Stack",
            "Especialista en Laravel + Vue.js",
            "TSU Tecnologías de la Información área Desarrollo de Software Multiplataforma",
            "Con metas claras de aprendizaje"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = charIndex === currentText.length ? 2000 : 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000);
    }
    
    // ============ LIGHTBOX PARA IMÁGENES ============
    // Crear lightbox si no existe
    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-content">
                    <img src="" alt="" class="lightbox-img">
                    <div class="lightbox-caption"></div>
                </div>
                <div class="lightbox-nav">
                    <button class="lightbox-prev">&larr;</button>
                    <button class="lightbox-next">&rarr;</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
    let currentProjectImages = [];
    let currentImageCaptions = [];
    let currentImageIndex = 0;
    
    // Función para abrir lightbox
    function openLightbox(images, captions, startIndex = 0) {
        currentProjectImages = images;
        currentImageCaptions = captions;
        currentImageIndex = startIndex;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Actualizar imagen en lightbox
    function updateLightboxImage() {
        if (currentProjectImages.length > 0 && currentImageIndex >= 0) {
            lightboxImg.src = currentProjectImages[currentImageIndex];
            lightboxCaption.textContent = currentImageCaptions[currentImageIndex] || '';
            
            lightboxPrev.style.display = currentProjectImages.length > 1 ? 'flex' : 'none';
            lightboxNext.style.display = currentProjectImages.length > 1 ? 'flex' : 'none';
        }
    }
    
    // Navegación entre imágenes
    function prevImage() {
        if (currentProjectImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
            updateLightboxImage();
        }
    }
    
    function nextImage() {
        if (currentProjectImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
            updateLightboxImage();
        }
    }
    
    // Event Listeners para lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Cerrar lightbox con ESC y navegar con flechas
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
    
    // Configurar galerías de proyectos
    document.querySelectorAll('.project-card').forEach((projectCard) => {
        const mainImage = projectCard.querySelector('.project-main-image img');
        const thumbnails = projectCard.querySelectorAll('.thumbnail');
        
        // Obtener todas las imágenes del proyecto
        const projectImages = [];
        const projectCaptions = [];
        
        // Añadir imagen principal
        if (mainImage && mainImage.src) {
            projectImages.push(mainImage.src);
            projectCaptions.push(mainImage.alt || 'Imagen del proyecto');
        }
        
        // Añadir thumbnails
        thumbnails.forEach(thumb => {
            if (thumb.src && !projectImages.includes(thumb.src)) {
                projectImages.push(thumb.src);
                projectCaptions.push(thumb.alt || 'Imagen del proyecto');
            }
        });
        
        // Hacer clic en imagen principal abre lightbox
        if (mainImage) {
            mainImage.addEventListener('click', () => {
                openLightbox(projectImages, projectCaptions, 0);
            });
        }
        
        // Configurar thumbnails
        thumbnails.forEach((thumbnail) => {
            // Cambiar imagen principal al hacer clic en thumbnail
            thumbnail.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Actualizar clase activa
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Cambiar imagen principal
                if (mainImage) {
                    mainImage.src = this.src;
                    mainImage.alt = this.alt;
                }
            });
            
            // Hacer clic en thumbnail también abre lightbox
            thumbnail.addEventListener('click', function(e) {
                const imageIndex = projectImages.indexOf(this.src);
                if (imageIndex !== -1) {
                    openLightbox(projectImages, projectCaptions, imageIndex);
                }
            });
        });
        
        // También hacer clic en overlay abre lightbox
        const overlay = projectCard.querySelector('.image-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                openLightbox(projectImages, projectCaptions, 0);
            });
        }
    });
    
    // Pre-cargar imágenes para mejor experiencia
    function preloadProjectImages() {
        const imageUrls = [];
        
        // Recopilar todas las URLs de imágenes
        document.querySelectorAll('.project-img, .thumbnail').forEach(img => {
            if (img.src && !imageUrls.includes(img.src)) {
                imageUrls.push(img.src);
            }
        });
        
        // Pre-cargar imágenes
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Pre-cargar imágenes cuando la página esté cargada
    window.addEventListener('load', preloadProjectImages);
    
    // ============ EFECTOS DE ANIMACIÓN MEJORADOS ============
    // Actualizar navegación
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Efecto de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.skill-category, .experience-card, .project-card, .contact-card, .learning-card').forEach(el => {
        observer.observe(el);
    });
    
    // Animación especial para tarjetas de aprendizaje
    const learningObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    // Aplicar animación especial a tarjetas de aprendizaje
    document.querySelectorAll('.learning-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        learningObserver.observe(card);
    });
    
    // Efectos hover adicionales
    document.querySelectorAll('.skill-tag, .project-card, .experience-card, .learning-card, .btn, .goal-tag, .tech-tag').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            if (this.classList.contains('btn')) {
                this.style.boxShadow = '0 10px 20px rgba(183, 75, 75, 0.3)';
            }
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this.classList.contains('btn')) {
                this.style.boxShadow = '';
            }
        });
    });
    
    // ============ MEJORAS DE INTERACTIVIDAD ============
    // Contador de visitas simple
    let visitCount = localStorage.getItem('portfolioVisits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('portfolioVisits', visitCount);
    
    // Animación suave para secciones al cargar
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Detectar dispositivo y ajustar efectos
    function detectDevice() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 995;
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
        } else if (isTablet) {
            document.body.classList.add('tablet-device');
        } else {
            document.body.classList.add('desktop-device');
        }
    }
    
    detectDevice();
    window.addEventListener('resize', detectDevice);
    
    // ============ FUNCIONES UTILITARIAS ============
    // Copiar email al portapapeles
    document.querySelectorAll('.contact-field').forEach(field => {
        const emailField = field.querySelector('.field-value');
        if (emailField && emailField.textContent.includes('@')) {
            emailField.style.cursor = 'pointer';
            emailField.title = 'Haz clic para copiar el email';
            
            emailField.addEventListener('click', function() {
                const email = this.textContent.trim();
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '¡Email copiado!';
                    this.style.color = '#4CAF50';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                });
            });
        }
    });
    
    // Ajustar altura del typing text dinámicamente
    function adjustTypingHeight() {
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            typingText.style.minHeight = typingText.scrollHeight + 'px';
        }
    }
    
    // Ajustar en redimensionamiento
    window.addEventListener('resize', adjustTypingHeight);
    setTimeout(adjustTypingHeight, 2000);
    
    // ============ LOG EN CONSOLA MEJORADO ============
    console.log('%c🌟 Yael Martin - Portafolio Profesional', 'color: #b74b4b; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c💻 Desarrollador Full Stack - Especialista en Laravel + Vue.js', 'color: #4CAF50; font-size: 16px;');
    console.log('%c📚 TSU en Tecnologías de la Información área Desarrollo de Software Multiplataforma - Titulado', 'color: #2196F3; font-size: 14px;');
    console.log('%c🎯 Metas de aprendizaje: React.js • Node.js • TypeScript • Docker', 'color: #FF9800; font-size: 14px;');
    console.log('%c📞 Contacto: yaelmartinxool7@gmail.com | 997 105 9640', 'color: #9C27B0; font-size: 14px;');
    console.log('%c📍 Yucatán, México | Proyectos con capturas interactivas', 'color: #00BCD4; font-size: 14px;');
    console.log('%c🔧 Haz clic en las imágenes de proyectos para verlas en grande!', 'color: #795548; font-size: 13px; font-style: italic;');
    console.log(`%c📊 Visitas a este portafolio: ${visitCount}`, 'color: #607D8B; font-size: 12px;');
    
    // Mensaje especial para desarrolladores
    console.log('%c¿Eres reclutador o desarrollador? ¡Me encantaría conectar!', 'color: #E91E63; font-size: 14px; font-weight: bold;');
    console.log('%cGitHub: https://github.com/Yaelmartinxool', 'color: #3F51B5; font-size: 13px;');
    console.log('%cLinkedIn: https://linkedin.com/in/yael-martin-xool', 'color: #3F51B5; font-size: 13px;');
    
    // ============ INICIALIZACIÓN FINAL ============
    // Marcar página como cargada
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Añadir efecto de confeti opcional en primera visita
        if (visitCount === 1) {
            console.log('%c🎉 ¡Bienvenido por primera vez a mi portafolio!', 'color: #FF5722; font-size: 16px; font-weight: bold;');
        }
        
        // Optimizar imágenes cargadas
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    });
    
    // Añadir clase para animaciones CSS cuando JS está habilitado
    document.documentElement.classList.add('js-enabled');
});