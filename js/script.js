// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Phone number logic: direct call on mobile, popup on desktop
    var callLink = document.getElementById('call-phone-link');
    var popup = document.getElementById('phone-popup');
    var closeBtn = document.getElementById('close-phone-popup');
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    if (callLink) {
        if (isMobileDevice()) {
            callLink.setAttribute('href', 'tel:+919072722510');
            callLink.addEventListener('click', function() {
                // On mobile, let default action happen (direct call)
            });
        } else if (popup && closeBtn) {
            callLink.addEventListener('click', function(e) {
                e.preventDefault();
                popup.style.display = 'flex';
            });
            closeBtn.addEventListener('click', function() {
                popup.style.display = 'none';
            });
            // Close popup when clicking outside the box
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    popup.style.display = 'none';
                }
            });
        }
    }

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            bars.forEach(bar => bar.classList.remove('active'));
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            bars.forEach(bar => bar.classList.remove('active'));
        }
    });
});

// Enhanced Get Directions function for Modern Furniture store
window.getDirections = function () {
    // Destination: Modern Furniture (precise place coordinates)
    const destinationLat = 11.0002925;
    const destinationLng = 75.9961696;
    const destinationAddress = "Modern Furniture, Opp. Neha Hospital Main Road, KOTTAKKAL, Malappuram Dt., Kerala 676503";

    // Open Google Maps directions using official API URL
    function openGoogleMapsDirections(originLat = null, originLng = null) {
        const baseUrl = 'https://www.google.com/maps/dir/?api=1';
        const destination = `${destinationLat},${destinationLng}`;
        const url = (originLat != null && originLng != null)
            ? `${baseUrl}&origin=${originLat},${originLng}&destination=${destination}&travelmode=driving`
            : `${baseUrl}&destination=${destination}&travelmode=driving`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Geolocation error handler
    function handleLocationError(error) {
        let errorMessage = '';
        switch (error && error.code) {
            case error && error.PERMISSION_DENIED:
                errorMessage = 'Location access denied. Opening Google Maps without your current location.';
                break;
            case error && error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information unavailable. Opening Google Maps without your current location.';
                break;
            case error && error.TIMEOUT:
                errorMessage = 'Location request timed out. Opening Google Maps without your current location.';
                break;
            default:
                errorMessage = 'An unknown error occurred. Opening Google Maps without your current location.';
                break;
        }
        if (confirm(errorMessage + '\n\nClick OK to continue with directions.')) {
            openGoogleMapsDirections();
        }
    }

    // Show a temporary loading state on the button (if present)
    const button = document.querySelector('button[onclick="getDirections()"]');
    let originalButtonHTML;
    if (button) {
        originalButtonHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting location...';
        button.disabled = true;
        // Safety restore after 5s
        setTimeout(() => {
            if (button) {
                button.innerHTML = originalButtonHTML;
                button.disabled = false;
            }
        }, 5000);
    }

    // Use geolocation when available
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                if (button) {
                    button.innerHTML = originalButtonHTML;
                    button.disabled = false;
                }
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                openGoogleMapsDirections(userLat, userLng);
            },
            function (error) {
                if (button) {
                    button.innerHTML = originalButtonHTML;
                    button.disabled = false;
                }
                handleLocationError(error);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
    } else {
        alert('Geolocation is not supported by this browser. Opening Google Maps - you can enter your location manually.');
        openGoogleMapsDirections();
    }
};

// Alternative function for direct Google Maps link (backup)
window.openGoogleMaps = function () {
    const mapsUrl = 'https://www.google.com/maps/place/Modern+Furniture/@11.0002925,75.9935947,855m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba7b5257c016c5f:0xf6eae47b167cffa9!8m2!3d11.0002925!4d75.9961696!16s%2Fg%2F11bx5plm7v';
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
};

// Function to copy address to clipboard
window.copyAddress = function () {
    const address = 'Modern Furniture, Opp. Neha Hospital Main Road, KOTTAKKAL, Malappuram Dt., Kerala - 676503';
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(address).then(function () {
            alert('Address copied to clipboard!');
        }, function () {
            fallbackCopyTextToClipboard(address);
        });
    } else {
        fallbackCopyTextToClipboard(address);
    }
};

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Address copied to clipboard!');
        } else {
            alert('Failed to copy address. Please copy manually:\n' + text);
        }
    } catch (err) {
        alert('Copy not supported. Address:\n' + text);
    }
    document.body.removeChild(textArea);
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.category-card, .gallery-item, .stat');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .category-card,
    .gallery-item,
    .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .category-card:nth-child(1) { transition-delay: 0.1s; }
    .category-card:nth-child(2) { transition-delay: 0.2s; }
    .category-card:nth-child(3) { transition-delay: 0.3s; }
    
    .gallery-item:nth-child(1) { transition-delay: 0.1s; }
    .gallery-item:nth-child(2) { transition-delay: 0.2s; }
    .gallery-item:nth-child(3) { transition-delay: 0.3s; }
    .gallery-item:nth-child(4) { transition-delay: 0.4s; }
    
    .stat:nth-child(1) { transition-delay: 0.1s; }
    .stat:nth-child(2) { transition-delay: 0.2s; }
    .stat:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.intro-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Enhanced Button Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Category Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Gallery Item Click Effects
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
});

// Smooth Reveal Animation for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
});

// Add initial styles for hero animation
const heroStyle = document.createElement('style');
heroStyle.textContent = `
    .hero-content,
    .hero-image {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .hero-image {
        transform: translateX(50px);
    }
`;
document.head.appendChild(heroStyle);

// Lazy Loading for Images (when you add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Form Validation (for contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add error styles
const formStyle = document.createElement('style');
formStyle.textContent = `
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(formStyle);

// Performance Optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility Improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
});

// Add skip link styles
const skipLinkStyle = document.createElement('style');
skipLinkStyle.textContent = `
    .skip-link:focus {
        top: 6px !important;
    }
`;
document.head.appendChild(skipLinkStyle);

// About page section and card animation
// Only runs if .why-card exists (i.e., on about.html)
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.why-card')) {
        // Animate sections
        document.querySelectorAll('.animate-section').forEach(function(section, i) {
            setTimeout(function() {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 200 + i * 200);
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.transition = 'opacity 1s cubic-bezier(.77,0,.18,1), transform 1s cubic-bezier(.77,0,.18,1)';
        });
        // Animate why-cards
        var cards = document.querySelectorAll('.why-card');
        cards.forEach(function(card, i) {
            setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 600 + i * 200);
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)';
        });
    }
});

// WhatsApp enquiry for collection category cards
document.addEventListener('DOMContentLoaded', function() {
    // Delegate clicks from any "Enquire Now" button inside category cards
    document.body.addEventListener('click', function(e) {
        var btn = e.target.closest('.category-card .btn.btn-primary');
        if (!btn) return;

        // Ensure this runs only on Product page or when the button is intended for enquiry
        var inProductPage = /Product\.html$/i.test(location.pathname) || document.querySelector('main .categories');
        if (!inProductPage) return;

        e.preventDefault();

        var card = btn.closest('.category-card');
        if (!card) return;

        var titleEl = card.querySelector('h3');
        var productName = titleEl ? titleEl.textContent.trim() : 'Product';

        // Create a stable slug and assign an id to the card if missing
        var slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!card.id) card.id = slug;

        // Build a link back to this product card
        var productLink = location.origin + location.pathname + '#' + card.id;

        // WhatsApp number (owner) without '+' for wa.me
        var phone = '919847104232';

        // Prefilled message
        var message = 'Hello, I\'m interested in "' + productName + '" from your website: ' + productLink;
        var waUrl = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);

        window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
});