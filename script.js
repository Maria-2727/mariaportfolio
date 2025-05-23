document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Navigation
    // ======================
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });

    // ======================
    // Sticky Navigation
    // ======================
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    window.addEventListener('scroll', function() {
        // Sticky navbar
        if (window.scrollY > heroHeight * 0.8) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        highlightActiveSection();
    });

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // ======================
    // Experience Section Toggles
    // ======================
    document.querySelectorAll('.exp-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            const isOpen = details.classList.contains('active');
            
            // Close all other open details first
            document.querySelectorAll('.exp-details').forEach(item => {
                if (item !== details) {
                    item.classList.remove('active');
                    item.previousElementSibling.innerHTML = 
                        '<span>View Details</span> <i class="fas fa-chevron-down"></i>';
                }
            });
            
            if (isOpen) {
                details.classList.remove('active');
                this.innerHTML = '<span>View Details</span> <i class="fas fa-chevron-down"></i>';
            } else {
                details.classList.add('active');
                this.innerHTML = '<span>Hide Details</span> <i class="fas fa-chevron-up"></i>';
            }
        });
    });

    // ======================
    // Animate Elements on Scroll
    // ======================
    const animateElements = () => {
        const elements = document.querySelectorAll(
            '.experience-card, .project-card, .achievement-card, ' +
            '.skill-category, .contact-card, .contact-form'
        );
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const animationPoint = windowHeight * 0.8;
            
            if (elementPosition < animationPoint) {
                element.classList.add('visible');
            }
        });
    };

    // Initialize elements as invisible
    document.querySelectorAll(
        '.experience-card, .project-card, .achievement-card, ' +
        '.skill-category, .contact-card, .contact-form'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    // Run once on load and then on scroll
    animateElements();
    window.addEventListener('scroll', animateElements);

    // ======================
    // Active Section Highlighting
    // ======================
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 200 && 
                window.scrollY < sectionTop + sectionHeight - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }

    // ======================
    // Form Submission
    // ======================
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
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.backgroundColor = '#4BB543';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.backgroundColor = '';
            }, 3000);
        });
    }

    // ======================
    // Tech Icons Animation
    // ======================
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(15deg)';
            icon.style.color = icon.style.color === 'rgb(247, 37, 133)' ? 
                'rgb(67, 97, 238)' : 'rgb(247, 37, 133)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // ======================
    // Skill Bar Animation
    // ======================
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // ======================
    // Project Card Hover Effect
    // ======================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const image = card.querySelector('img');
        const overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.05)';
            overlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });

    // ======================
    // Scroll to Top Button
    // ======================
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });

    // ======================
    // Initialize Functions
    // ======================
    highlightActiveSection();
});