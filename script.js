/**
 * NQJ.SYS - Client Side Logic
 */

// 1. Live Clock for the HUD
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        clockElement.innerText = timeString;
    }
}

// 2. Project Filtering Logic
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update Active Button State
    buttons.forEach(btn => {
        const btnText = btn.innerText.toLowerCase();
        if (category === 'all' && btnText.includes('all')) {
            btn.classList.add('active');
        } else if (btnText.includes(category)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter Grid Items
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Restore visibility
            card.style.display = (card.classList.contains('featured')) ? 'grid' : 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            // Hide
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 3. Simple Intersection Observer for scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

// Initialize components on DOM Load
window.addEventListener('DOMContentLoaded', () => {
    // Start Clock
    setInterval(updateClock, 1000);
    updateClock();

    // Observe skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        scrollObserver.observe(bar);
    });

    // Handle smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});