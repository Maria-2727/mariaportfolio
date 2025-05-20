// Toggle mobile menu
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuButton.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Toggle experience details
function toggleDetails(button) {
    const details = button.nextElementSibling;
    const isOpen = details.classList.contains('active');
    
    if (isOpen) {
        details.style.height = `${details.scrollHeight}px`;
        setTimeout(() => {
            details.style.height = '0';
            details.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            details.classList.remove('active');
        }, 300);
        
        button.innerHTML = '<span>View Details</span> <i class="fas fa-chevron-down"></i>';
    } else {
        details.classList.add('active');
        details.style.height = `${details.scrollHeight}px`;
        details.style.opacity = '1';
        
        setTimeout(() => {
            details.style.height = 'auto';
        }, 300);
        
        button.innerHTML = '<span>Hide Details</span> <i class="fas fa-chevron-up"></i>';
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.experience-card, .competition-card, .achievement-card, .skill-category');
    
    elements.forEach(el => {
        const elPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elPosition < screenPosition) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
const animatedElements = document.querySelectorAll('.experience-card, .competition-card, .achievement-card, .skill-category');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}