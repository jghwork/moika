// ============================================
// MAIN JAVASCRIPT
// ============================================

// Load service data from data.json
let servicesData = [];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    await loadServicesData();
    initNavigation();
    initMobileMenu();
    initServices();
    initScrollAnimations();
});

// ============================================
// LOAD SERVICES DATA
// ============================================

async function loadServicesData() {
    try {
        const response = await fetch('data.json');
        servicesData = await response.json();
        renderServices(servicesData.service_categories);
    } catch (error) {
        console.error('Error loading services data:', error);
    }
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navList = document.querySelector('.nav-list');
            const burgerMenu = document.querySelector('.burger-menu');
            navList.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Sticky header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('.nav-list');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !navList.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navList.classList.remove('active');
        }
    });
}

// ============================================
// SERVICES
// ============================================

function initServices() {
    const searchInput = document.getElementById('service-search');
    
    // Search functionality with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterServices(e.target.value);
        }, 300);
    });
}

function renderServices(categories) {
    const container = document.querySelector('.services-categories');
    container.innerHTML = '';

    categories.forEach((category, index) => {
        const categoryElement = createCategoryElement(category, index);
        container.appendChild(categoryElement);
    });

    // Add click handlers for accordions
    initAccordions();
}

function createCategoryElement(category, index) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'service-category';
    categoryDiv.dataset.category = category.category_name;

    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
        <span class="category-title">${category.category_name}</span>
        <span class="category-count">${category.service_count} услуг</span>
        <span class="category-toggle"></span>
    `;

    const content = document.createElement('div');
    content.className = 'category-content';

    const list = document.createElement('ul');
    list.className = 'service-list';

    category.services.forEach(service => {
        const serviceItem = document.createElement('li');
        serviceItem.className = 'service-item';
        serviceItem.dataset.name = service.service_name.toLowerCase();
        serviceItem.innerHTML = `
            <span class="service-name">${service.service_name}</span>
            <span class="service-duration">${service.duration}</span>
            <span class="service-price">${service.price_from}</span>
        `;
        list.appendChild(serviceItem);
    });

    content.appendChild(list);
    categoryDiv.appendChild(header);
    categoryDiv.appendChild(content);

    return categoryDiv;
}

function initAccordions() {
    const categoryHeaders = document.querySelectorAll('.category-header');

    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.parentElement;
            const isActive = category.classList.contains('active');

            // Close all other categories
            document.querySelectorAll('.service-category').forEach(cat => {
                cat.classList.remove('active');
            });

            // Toggle current category
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });
}

function filterServices(searchTerm) {
    const categories = document.querySelectorAll('.service-category');
    const term = searchTerm.toLowerCase().trim();

    if (term === '') {
        // Show all categories
        categories.forEach(category => {
            category.style.display = 'block';
            const services = category.querySelectorAll('.service-item');
            services.forEach(service => {
                service.style.display = 'grid';
            });
        });
        return;
    }

    categories.forEach(category => {
        const services = category.querySelectorAll('.service-item');
        let hasMatch = false;

        services.forEach(service => {
            const serviceName = service.dataset.name;
            if (serviceName.includes(term)) {
                service.style.display = 'grid';
                hasMatch = true;
            } else {
                service.style.display = 'none';
            }
        });

        // Show/hide category based on matches
        if (hasMatch) {
            category.style.display = 'block';
            category.classList.add('active');
        } else {
            category.style.display = 'none';
            category.classList.remove('active');
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hero, .services, .gallery, .about, .advantages, .contacts, .footer');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}
