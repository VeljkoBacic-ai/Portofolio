// ===== GLOBAL VARIABLES =====
let isLoading = true;
let currentSkillCategory = 'frontend';
let currentFilter = 'websajt';

// ===== DOM ELEMENTS =====
// These will be initialized after DOM is loaded to avoid null references
let loadingScreen, navbar, hamburger, navMenu, navLinks, backToTop;
let skillCategories, skillsGrids, skillBars, statNumbers;
let portfolioFilters, portfolioItems, contactForm;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    loadingScreen = document.querySelector('.loading-screen');
    navbar = document.querySelector('.navbar');
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    backToTop = document.querySelector('.back-to-top');
    skillCategories = document.querySelectorAll('.skill-category');
    skillsGrids = document.querySelectorAll('.skills-grid');
    skillBars = document.querySelectorAll('.skill-bar');
    statNumbers = document.querySelectorAll('.stat-number');
    portfolioFilters = document.querySelectorAll('.filter-btn');
    portfolioItems = document.querySelectorAll('.portfolio-item');
    contactForm = document.getElementById('contactForm');
    
    // Initialize functions
    initializeLoading();
    initializeNavigation();
    initializeBackToTop();
    initializeScrollEffects();
    initializeSkills();
    initializePortfolio();
    initializeContactForm();
    initializeAnimations();
    initializeFloatingElements();
});

// ===== LOADING SCREEN =====
function initializeLoading() {
    if (!loadingScreen) return;
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        isLoading = false;
        
        // Start animations after loading
        setTimeout(() => {
            animateCounters();
            animateSkillBars();
        }, 500);
    }, 2500);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Check if elements exist before adding event listeners
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            if (hamburger) hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // Smooth scrolling for navigation links
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    if (hamburger) hamburger.classList.remove('active');
                    if (navMenu) navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    
                    // Update active link
                    updateActiveNavLink(link);
                }
            });
        });
    }

    // Update navbar on scroll
    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
        updateBackToTop();
    });
}

function updateActiveNavLink(clickedLink = null) {
    if (!navLinks || navLinks.length === 0) return;
    
    if (clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
        return;
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger specific animations
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('skill-bar')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item, .stat-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function updateBackToTop() {
    if (!backToTop) return;
    
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Back to top functionality
function initializeBackToTop() {
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== SKILLS SECTION =====
function initializeSkills() {
    if (!skillCategories || skillCategories.length === 0) return;
    
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryType = category.getAttribute('data-category');
            switchSkillCategory(categoryType);
        });
    });
}

function switchSkillCategory(category) {
    if (category === currentSkillCategory) return;
    
    // Update active category
    skillCategories.forEach(cat => cat.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Switch skill grids
    skillsGrids.forEach(grid => grid.classList.remove('active'));
    document.querySelector(`.skills-grid.${category}`).classList.add('active');
    
    currentSkillCategory = category;
    
    // Animate skill bars with delay
    setTimeout(() => {
        const activeSkillBars = document.querySelectorAll(`.skills-grid.${category} .skill-bar`);
        activeSkillBars.forEach((bar, index) => {
            setTimeout(() => {
                animateSkillBar(bar);
            }, index * 100);
        });
    }, 300);
}

function animateSkillBars() {
    const activeSkillBars = document.querySelectorAll('.skills-grid.active .skill-bar');
    activeSkillBars.forEach((bar, index) => {
        setTimeout(() => {
            animateSkillBar(bar);
        }, index * 100);
    });
}

function animateSkillBar(bar) {
    const level = bar.getAttribute('data-level');
    bar.style.width = `${level}%`;
}

// ===== PORTFOLIO SECTION =====
function initializePortfolio() {
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterValue = filter.getAttribute('data-filter');
            setActiveFilter(filter);
            filterPortfolioItems(filterValue);
        });
    });
}

function setActiveFilter(activeFilter) {
    portfolioFilters.forEach(filter => filter.classList.remove('active'));
    activeFilter.classList.add('active');
}

function filterPortfolioItems(filter) {
    portfolioItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (itemCategory === filter) {
            setTimeout(() => {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            }, index * 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    // Add focus effects to form inputs
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission();
    });
}

function handleFormSubmission() {
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = `
        <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
        Šalje se...
    `;
    submitButton.disabled = true;
    
    // Check if running locally or on GitHub Pages
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' || 
                       window.location.protocol === 'file:';
    
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // If EmailJS is available and configured, use it
    if (typeof emailjs !== 'undefined' && window.emailjsConfigured) {
        const templateParams = {
            from_name: contactForm.querySelector('input[name="name"]').value,
            from_email: contactForm.querySelector('input[name="email"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value,
            to_email: 'velbyters@gmail.com'
        };
        
        emailjs.send('service_rkg14pq', 'template_dhu0y7q', templateParams)
            .then(() => {
                submitButton.innerHTML = `
                    <svg class="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    Poslato!
                `;
                
                showNotification('Poruka je uspešno poslata!', 'success');
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                    
                    contactForm.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('focused');
                    });
                }, 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                submitButton.innerHTML = `
                    <svg class="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Greška!
                `;
                
                showNotification('Greška pri slanju poruke. Molim vas pokušajte ponovo.', 'error');
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
            });
        return;
    }
    
    if (isLocalhost || isGitHubPages) {
        // Demo mode for localhost and GitHub Pages (without EmailJS)
        setTimeout(() => {
            submitButton.innerHTML = `
                <svg class="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Poslato! (DEMO)
            `;
            
            const platform = isGitHubPages ? 'GitHub Pages' : 'localhost';
            showNotification(`DEMO MODE (${platform}): Za stvarno slanje emaila konfiguriši EmailJS ili koristi PHP hosting`, 'success');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                contactForm.reset();
                
                contactForm.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focused');
                });
            }, 3000);
        }, 2000);
        return;
    }
    
    // Get form data for PHP hosting
    const formData = new FormData(contactForm);
    
    // Send email using PHP
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            submitButton.innerHTML = `
                <svg class="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Poslato!
            `;
            
            showNotification('Poruka je uspešno poslata!', 'success');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                contactForm.reset();
                
                contactForm.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focused');
                });
            }, 3000);
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        
        submitButton.innerHTML = `
            <svg class="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Greška!
        `;
        
        showNotification(error.message || 'Greška pri slanju poruke. Molim vas pokušajte ponovo.', 'error');
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 3000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto hide after 5 seconds
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== COUNTER ANIMATIONS =====
function animateCounters() {
    if (!statNumbers || statNumbers.length === 0) return;
    
    statNumbers.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

// ===== FLOATING ELEMENTS =====
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        // Random initial position
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
        
        // Random animation delay
        element.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random movement on mouse move
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rect = element.getBoundingClientRect();
            const elementX = rect.left + rect.width / 2;
            const elementY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
            );
            
            if (distance < 200) {
                const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
                const force = (200 - distance) / 200;
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                element.style.transform = 'translate(0, 0)';
            }
        });
    });
}

// ===== GENERAL ANIMATIONS =====
function initializeAnimations() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.matrix-rain');
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== TYPEWRITER EFFECT =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== MATRIX RAIN EFFECT =====
function createMatrixRain() {
    const matrix = document.querySelector('.matrix-rain');
    if (!matrix) return;
    
    const chars = '01';
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        matrix.innerHTML = '';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const span = document.createElement('span');
            span.textContent = char;
            span.style.position = 'absolute';
            span.style.left = i * fontSize + 'px';
            span.style.top = drops[i] * fontSize + 'px';
            span.style.color = '#6366f1';
            span.style.opacity = '0.1';
            span.style.fontSize = fontSize + 'px';
            span.style.fontFamily = 'monospace';
            
            matrix.appendChild(span);
            
            if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== RESPONSIVE UTILITIES =====
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Update cursor for mobile
    if (isMobile()) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    } else {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    }
    
    // Update floating elements positions
    initializeFloatingElements();
}, 250));

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    // Arrow keys for portfolio navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeFilter = document.querySelector('.filter-btn.active');
        const allFilters = Array.from(portfolioFilters);
        const currentIndex = allFilters.indexOf(activeFilter);
        
        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : allFilters.length - 1;
        } else {
            newIndex = currentIndex < allFilters.length - 1 ? currentIndex + 1 : 0;
        }
        
        allFilters[newIndex].click();
    }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function improveAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #6366f1';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #6366f1;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== PERFORMANCE MONITORING =====
function monitorPerformance() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
    
    // Monitor scroll performance
    let scrolling = false;
    window.addEventListener('scroll', () => {
        if (!scrolling) {
            scrolling = true;
            requestAnimationFrame(() => {
                scrolling = false;
            });
        }
    });
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    improveAccessibility();
    monitorPerformance();
    createMatrixRain();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== CONSOLE EASTER EGG =====
console.log(`
%c
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    🚀 VelByte - Web Development Portfolio                    ║
║                                                              ║
║    👨‍💻 Developed by: Veljko Baćić                            ║
║    🌐 Website: velbyte.rs                                    ║
║    📧 Email: veljko@velbyte.rs                               ║
║    📱 Instagram: @velbyte.rs                                 ║
║                                                              ║
║    💻 Built with: HTML5, CSS3, JavaScript                   ║
║    🎨 Design: Custom, Responsive, Accessible                ║
║    ⚡ Performance: Optimized, Fast Loading                   ║
║                                                              ║
║    Interested in working together? Let's create something    ║
║    amazing! Contact me through the form above.              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`, 'color: #6366f1; font-family: monospace; font-size: 12px;');

console.log('%cLooking at the source code? I like your curiosity! 🕵️‍♂️', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to check out my other projects on GitHub!', 'color: #10b981; font-size: 14px;');
