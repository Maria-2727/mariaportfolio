function toggleDetails(button) {
    const details = button.nextElementSibling;
    const isOpen = details.style.display === 'block';
    
    details.style.display = isOpen ? 'none' : 'block';
    button.innerHTML = isOpen ? 
        'Learn More <i class="fas fa-chevron-down"></i>' : 
        'Show Less <i class="fas fa-chevron-up"></i>';
    
    // Smooth animation
    if (!isOpen) {
        details.style.opacity = '0';
        details.style.height = '0';
        details.style.overflow = 'hidden';
        details.style.transition = 'opacity 0.3s ease, height 0.3s ease';
        
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.height = 'auto';
        }, 10);
    } else {
        details.style.height = '0';
        details.style.opacity = '0';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.experience-card, .skill-category');
        
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
    const animatedElements = document.querySelectorAll('.experience-card, .skill-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});