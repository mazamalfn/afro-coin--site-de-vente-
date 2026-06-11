/**
 * ELIXIR & COUTURE - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollRevel();
    initParallax();
    initCustomCursor();
    initProductHovers();
});

/**
 * Navbar scroll effects
 */
function initNavbar() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        
        if (nav) {
            if (scrolled) {
                nav.classList.add('py-2', 'shadow-sm', 'bg-surface/95');
                nav.classList.remove('bg-surface/80');
            } else {
                nav.classList.remove('py-2', 'shadow-sm', 'bg-surface/95');
                nav.classList.add('bg-surface/80');
            }
        }
        
        if (header) {
            if (scrolled) {
                header.classList.add('h-16', 'shadow-sm', 'bg-background/95');
                header.classList.remove('h-20', 'bg-background/80');
            } else {
                header.classList.add('h-20', 'bg-background/80');
                header.classList.remove('h-16', 'shadow-sm', 'bg-background/95');
            }
        }
    });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('[data-icon="menu"]') || document.querySelector('.md\\:hidden');
    const nav = document.querySelector('nav') || document.querySelector('header');
    
    if (!menuBtn) return;

    // Create Mobile Menu Overlay if it doesn't exist
    let mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-8 translate-x-full transition-transform duration-500 ease-in-out';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">close</span>';
        closeBtn.className = 'absolute top-6 right-6 text-on-surface';
        
        const linksContainer = document.createElement('div');
        linksContainer.className = 'flex flex-col items-center gap-6';
        
        // Clone links from desktop nav
        const desktopLinks = document.querySelectorAll('.hidden.md\\:flex a');
        desktopLinks.forEach(link => {
            const mobileLink = link.cloneNode(true);
            mobileLink.className = 'text-2xl font-display-lg tracking-widest uppercase text-on-surface hover:text-primary transition-all';
            linksContainer.appendChild(mobileLink);
        });
        
        mobileMenu.appendChild(closeBtn);
        mobileMenu.appendChild(linksContainer);
        document.body.appendChild(mobileMenu);
        
        // Event listeners
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Scroll Reveal Animations using Intersection Observer
 */
function initScrollRevel() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target sections, cards, and headers for reveal
    document.querySelectorAll('section, .product-card, .group, header h1, header p').forEach(el => {
        el.style.opacity = '0'; // Initial state before reveal
        revealObserver.observe(el);
    });
}

/**
 * Atmospheric parallax and hover origin updates
 */
function initParallax() {
    document.querySelectorAll('.card-hover, .group').forEach(card => {
        const img = card.querySelector('.image-reveal');
        if (!img) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        });
    });
}

/**
 * Premium Custom Cursor
 */
function initCustomCursor() {
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'custom-cursor';
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    // Smooth movement for follower
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    // Active state for links and buttons
    document.querySelectorAll('a, button, input, select').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
}

/**
 * Enhancement for product image swaps and subtle scale
 */
function initProductHovers() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const primary = card.querySelector('.primary-image');
            const hover = card.querySelector('.hover-image');
            if (primary && hover) {
                // Potential for additional JS controlled animations here
            }
        });
    });
}

// Order via WhatsApp utility (if needed)
function setupWhatsAppLinks() {
    // This can be expanded to dynamically build messages based on product names
}
