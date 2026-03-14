/*======================================================
   Aadi Shakti Devi Maa Ashram
   JavaScript Interactions
======================================================*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Sync Hindi toggle state on load - Commented out
    /*
    setTimeout(() => {
        const translateCombo = document.querySelector('.goog-te-combo');
        const btn = document.getElementById('hindi-toggle');
        if (translateCombo && btn && translateCombo.value === 'hi') {
            btn.innerHTML = '<i class="fa-solid fa-language"></i> English';
            btn.classList.add('active-hi');
        }
    }, 1500);
    */

    // 1. Header Scroll Effect
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    // 2. Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    const toggleMobileNav = () => {
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', toggleMobileNav);
    mobileNavClose.addEventListener('click', toggleMobileNav);
    
    // Close mobile nav when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Donation Buttons Logic
    const donationButtons = document.querySelectorAll('.donate-opt');
    
    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all
            donationButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked
            this.classList.add('active');
            
            // If "Custom Amount" is clicked, prompt for amount
            if(this.textContent === 'Custom Amount') {
                const amount = prompt("Enter your desired donation amount (₹):", "5100");
                if(amount && !isNaN(amount)) {
                    this.textContent = `Donate ₹${amount}`;
                } else {
                    this.textContent = 'Custom Amount';
                    this.classList.remove('active');
                    // Reset to default
                    donationButtons[1].classList.add('active');
                }
            }
        });
    });

    // 5. Contact Form Submission Prevent Default
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Simple animation
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = 'Message Sent Successfully!';
                btn.style.background = 'linear-gradient(45deg, #1b5e20, #2e7d32)';
                this.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // 6. Floating Diya Particles Generation
    createParticles();
});

function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Number of particles based on screen width
    const particleCount = window.innerWidth > 768 ? 20 : 10;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('diya-particle');
            
            // Random styling
            const size = Math.random() * 4 + 4; // 4px to 8px
            const leftPos = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 10 + 10; // 10s to 20s
            const delay = Math.random() * 5; // 0s to 5s
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${leftPos}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
            
            // Clean up and recreate
            particle.addEventListener('animationend', () => {
                particle.remove();
                createSingleParticle(container);
            });
            
        }, i * 300); // Stagger initial creation
    }
}

function createSingleParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('diya-particle');
    
    const size = Math.random() * 4 + 4;
    const leftPos = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${leftPos}%`;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
    
    particle.addEventListener('animationend', () => {
        particle.remove();
        createSingleParticle(container);
    });
}

/**
 * Hindi Translation Toggle Logic - Commented out
 */
/*
function toggleHindi() {
    const btn = document.getElementById('hindi-toggle');
    const translateCombo = document.querySelector('.goog-te-combo');
    
    if (translateCombo) {
        // Find current language
        const currentLang = translateCombo.value;
        
        if (currentLang === 'hi' || document.documentElement.lang === 'hi') {
            // Switch to English
            translateCombo.value = 'en';
            btn.innerHTML = '<i class="fa-solid fa-language"></i> हिन्दी';
            btn.classList.remove('active-hi');
        } else {
            // Switch to Hindi
            translateCombo.value = 'hi';
            btn.innerHTML = '<i class="fa-solid fa-language"></i> English';
            btn.classList.add('active-hi');
        }
        
        // Trigger change event to notify Google Translate
        translateCombo.dispatchEvent(new Event('change'));
    } else {
        // If combo isn't there, maybe it's still loading or blocked
        alert("Translation service is initializing. Please wait a moment and try again.");
    }
}
*/
