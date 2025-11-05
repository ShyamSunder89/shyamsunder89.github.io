// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check system preference
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme) {
        body.classList.remove('dark', 'light');
        body.classList.add(savedTheme);
    } else {
        body.classList.add(prefersLight ? 'light' : 'dark');
    }
    
    // Set initial button state
    themeToggle.textContent = body.classList.contains('light') ? '☀️' : '🌙';
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('light') ? 'dark' : 'light';
        
        // Update classes
        body.classList.remove('light', 'dark');
        body.classList.add(newTheme);
        
        // Update button
        themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Add spin animation
        themeToggle.classList.add('spin');
        setTimeout(() => themeToggle.classList.remove('spin'), 400);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'light' : 'dark';
            body.classList.remove('light', 'dark');
            body.classList.add(newTheme);
            themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
        }
    });
});

// Intersection Observer for fade animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-up class
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});
