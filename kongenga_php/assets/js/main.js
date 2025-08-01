// KONGENGA - Main JavaScript File

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractions();
    initializeScrollEffects();
});

// Initialize Scroll Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize Interactive Elements
function initializeInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.add('ripple-effect');
        button.addEventListener('click', createRipple);
    });

    // Initialize gradient blue sliders
    initializeSliders();
}

// Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize Gradient Blue Sliders
function initializeSliders() {
    const sliders = document.querySelectorAll('.slide-bar-wrapper');
    
    sliders.forEach(slider => {
        slider.addEventListener('click', handleSliderClick);
        slider.addEventListener('mousedown', handleSliderMouseDown);
    });
}

function handleSliderClick(event) {
    updateSliderValue(event);
}

function handleSliderMouseDown(event) {
    event.preventDefault();
    
    const slider = event.currentTarget;
    const onMouseMove = (e) => updateSliderValue(e, slider);
    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    updateSliderValue(event, slider);
}

function updateSliderValue(event, sliderElement = null) {
    const slider = sliderElement || event.currentTarget;
    const rect = slider.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    const fill = slider.querySelector('.slide-bar-fill');
    const thumb = slider.querySelector('.slide-bar-thumb');
    
    if (fill) fill.style.width = percentage + '%';
    if (thumb) thumb.style.left = percentage + '%';
    
    // Update associated value display
    const sliderId = slider.getAttribute('data-slider-id');
    if (sliderId) {
        const valueDisplay = document.getElementById(sliderId + '-value');
        if (valueDisplay) {
            valueDisplay.textContent = Math.round(percentage) + '%';
        }
    }
    
    // Trigger custom event
    slider.dispatchEvent(new CustomEvent('sliderchange', {
        detail: { value: percentage }
    }));
}

// Scroll Effects
function initializeScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(17, 24, 39, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(17, 24, 39, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Parallax effect for hero elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.float-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Chat Widget
function toggleChat() {
    // Simple chat toggle (can be expanded)
    alert('Chat feature coming soon! 💬\n\nPour le moment, vous pouvez nous contacter à:\n📧 contact@kongenga.cd');
}

// Language Change
function changeLanguage(lang) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../includes/set_language.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.reload();
        }
    };
    xhr.send('lang=' + lang);
}

// Favorite Toggle
function toggleFavorite(jobId, element = null) {
    if (!jobId) return;
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../includes/toggle_favorite.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        if (element) {
                            element.textContent = response.action === 'added' ? '❤️' : '🤍';
                            element.style.color = response.action === 'added' ? '#ef4444' : '#9ca3af';
                        }
                        
                        // Show notification
                        showNotification(
                            response.action === 'added' ? 'Ajouté aux favoris' : 'Retiré des favoris',
                            'success'
                        );
                    } else {
                        showNotification('Erreur lors de la mise à jour', 'error');
                    }
                } catch (e) {
                    showNotification('Erreur de connexion', 'error');
                }
            } else {
                showNotification('Vous devez être connecté pour utiliser cette fonctionnalité', 'warning');
            }
        }
    };
    
    xhr.send('job_id=' + jobId);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: 'rgba(16, 185, 129, 0.9)',
        error: 'rgba(239, 68, 68, 0.9)',
        warning: 'rgba(245, 158, 11, 0.9)',
        info: 'rgba(59, 130, 246, 0.9)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#374151';
        }
    });
    
    return isValid;
}

// Enhanced Button Interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        e.target.classList.add('btn-press-effect');
        setTimeout(() => {
            e.target.classList.remove('btn-press-effect');
        }, 150);
    }
});

// Smooth Scrolling for Anchor Links
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

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .animate-on-scroll.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .btn-press-effect {
        transform: scale(0.98) !important;
    }
`;
document.head.appendChild(style);