// DOM Elements
const loader = document.getElementById('loader');
const backToTop = document.getElementById('backToTop');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const ticketModal = document.getElementById('ticketModal');
const ticketForm = document.getElementById('ticketForm');

// Ticket prices
const ticketPrices = {
    single: 89,
    festival: 199,
    vip: 399
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page loads
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);

    // Initialize all event listeners
    initializeEventListeners();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
});

// Event Listeners
function initializeEventListeners() {
    // Navigation toggle
    navToggle.addEventListener('click', toggleNavigation);
    
    // Back to top button
    backToTop.addEventListener('click', scrollToTop);
    
    // Window scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', handleContactForm);
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    newsletterForm.addEventListener('submit', handleNewsletterForm);
    
    // Ticket form submission
    ticketForm.addEventListener('submit', handleTicketPurchase);
    
    // Ticket quantity change
    const ticketQuantity = document.getElementById('ticketQuantity');
    ticketQuantity.addEventListener('change', updateTicketTotal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === ticketModal) {
            closeTicketModal();
        }
    });
}

// Navigation Functions
function toggleNavigation() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navMenu.classList.contains('active') 
            ? getHamburgerTransform(index) 
            : 'none';
    });
}

function getHamburgerTransform(index) {
    const transforms = [
        'rotate(45deg) translate(5px, 5px)',
        'opacity: 0',
        'rotate(-45deg) translate(7px, -6px)'
    ];
    return transforms[index];
}

// Scroll Functions
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Back to top button visibility
    backToTop.style.display = scrollY > 500 ? 'flex' : 'none';
    
    // Header background on scroll
    const header = document.querySelector('.header');
    if (scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroVideo = hero.querySelector('video');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    
    [...navLinks, ...heroButtons].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('section, .ticket-card, .artist-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Form Handlers
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

// Ticket Modal Functions
function openTicketModal(ticketType) {
    const modal = document.getElementById('ticketModal');
    const typeInput = document.getElementById('ticketType');
    
    // Set ticket type
    const ticketNames = {
        single: 'Single Day Pass',
        festival: '3-Day Festival Pass',
        vip: 'VIP Experience'
    };
    
    typeInput.value = ticketNames[ticketType];
    typeInput.dataset.type = ticketType;
    
    // Update total price
    updateTicketTotal();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeTicketModal() {
    const modal = document.getElementById('ticketModal');
    
    // Animation
    modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    modal.querySelector('.modal-content').style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        ticketForm.reset();
    }, 300);
}

function updateTicketTotal() {
    const typeInput = document.getElementById('ticketType');
    const quantityInput = document.getElementById('ticketQuantity');
    const totalElement = document.getElementById('totalPrice');
    
    const ticketType = typeInput.dataset.type;
    const quantity = parseInt(quantityInput.value) || 1;
    const price = ticketPrices[ticketType] || 0;
    const total = price * quantity;
    
    totalElement.textContent = total;
}

function handleTicketPurchase(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const ticketData = {
        type: document.getElementById('ticketType').value,
        quantity: parseInt(document.getElementById('ticketQuantity').value),
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        total: document.getElementById('totalPrice').textContent
    };
    
    // Validation
    if (!ticketData.name || !ticketData.email || !ticketData.phone) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(ticketData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate ticket purchase
    showNotification('Ticket purchase successful! Check your email for confirmation.', 'success');
    
    // Close modal and reset form
    closeTicketModal();
    
    // In a real application, this would send data to a payment processor
    console.log('Ticket purchase data:', ticketData);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Performance optimizations
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

// Debounced scroll handler
const debouncedScrollHandler = debounce(handleScroll, 16);
window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1181490/pexels-photo-1181490.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();