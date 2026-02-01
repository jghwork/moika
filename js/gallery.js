// ============================================
// GALLERY JAVASCRIPT
// ============================================

// Gallery categories with Russian names
const galleryCategories = [
    { id: 'all', name: 'Все' },
    { id: 'before_after', name: 'До/После' },
    { id: 'light', name: 'Фары' },
    { id: 'other', name: 'Другое' }
];

// Gallery data - will be populated from actual folders
let galleryData = [];
let currentImageIndex = 0;
let filteredImages = [];
let currentPage = 0;
let imagesPerPage = 6;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages();
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// ============================================
// CHECK SCREEN SIZE
// ============================================

function checkScreenSize() {
    if (window.innerWidth < 768) {
        imagesPerPage = 1;
    } else {
        imagesPerPage = 6;
    }
    currentPage = 0;
    renderGallery();
}

// ============================================
// LOAD GALLERY IMAGES FROM FOLDERS
// ============================================

async function loadGalleryImages() {
    // Define image paths for each category
    const categoryImages = {
        before_after: [
            'assets/images/gallery/before_after/2026-02-01 14.25.57.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.26.21.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.26.27.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.26.31.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.26.34.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.26.37.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.26.39.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.26.41.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.05.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.07.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.10.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.12.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.15.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.18.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.20.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.28.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.30.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.32.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.35.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.38.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.45.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.53.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.55.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.27.58.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.01.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.03.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.05.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.08.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.11.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.15.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.22.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.26.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.36.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.38.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.41.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.49.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.54.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.28.58.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.00.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.02.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.11.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.14.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.17.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.20.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.23.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.25.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.27.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.35.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.37.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.40.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.42.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.52.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.57.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.29.59.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.03.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.05.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.08.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.10.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.12.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.25.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.54.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.30.57.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.31.22.jpg',
            'assets/images/gallery/before_after/2026-02-01 14.31.30.jpg'
        ],
        light: [
            'assets/images/gallery/light/2026-02-01 14.27.23.jpg',
            'assets/images/gallery/light/2026-02-01 14.28.31.jpg',
            'assets/images/gallery/light/2026-02-01 14.28.44.jpg',
            'assets/images/gallery/light/2026-02-01 14.29.44.jpg',
            'assets/images/gallery/light/2026-02-01 14.29.47.jpg',
            'assets/images/gallery/light/2026-02-01 14.29.54.jpg',
            'assets/images/gallery/light/2026-02-01 14.30.23.jpg'
        ],
        other: [
            'assets/images/gallery/other/2026-02-01 14.26.54.jpg',
            'assets/images/gallery/other/2026-02-01 14.27.02.jpg',
            'assets/images/gallery/other/2026-02-01 14.28.51.jpg',
            'assets/images/gallery/other/2026-02-01 14.29.09.jpg',
            'assets/images/gallery/other/2026-02-01 14.30.15.jpg',
            'assets/images/gallery/other/2026-02-01 14.30.43.jpg',
            'assets/images/gallery/other/2026-02-01 14.30.51.jpg'
        ]
    };

    // Build gallery data array
    galleryData = [];
    
    // Add images from each category
    for (const [categoryId, images] of Object.entries(categoryImages)) {
        const category = galleryCategories.find(cat => cat.id === categoryId);
        const categoryName = category ? category.name : categoryId;
        
        images.forEach(imagePath => {
            galleryData.push({
                src: imagePath,
                category: categoryId,
                alt: `${categoryName} - ${imagePath.split('/').pop()}`
            });
        });
    }

    // Initialize filtered images with all images
    filteredImages = [...galleryData];
    currentPage = 0;

    // Render gallery and filters
    renderGalleryFilters();
    renderGallery();
    initLightbox();
    initGalleryNavigation();
}

// ============================================
// RENDER GALLERY FILTERS
// ============================================

function renderGalleryFilters() {
    const filtersContainer = document.getElementById('gallery-filters');
    filtersContainer.innerHTML = '';

    galleryCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = `filter-btn ${category.id === 'all' ? 'active' : ''}`;
        button.dataset.filter = category.id;
        button.textContent = category.name;
        filtersContainer.appendChild(button);
    });

    // Add click handlers
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        // Click event
        button.addEventListener('click', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            filterGallery(filter);
        });

        // Touch event for mobile
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            filterGallery(filter);
        }, { passive: false });
    });
}

// ============================================
// RENDER GALLERY (with pagination)
// ============================================

function renderGallery() {
    const container = document.querySelector('.gallery-grid');
    container.innerHTML = '';

    // Calculate start and end indices for current page
    const startIndex = currentPage * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, filteredImages.length);
    const visibleImages = filteredImages.slice(startIndex, endIndex);

    visibleImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.index = startIndex + index;
        item.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
        `;
        container.appendChild(item);
    });

    // Add click handlers for lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Click event
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(item.dataset.index);
            openLightbox(index);
        });

        // Touch event for mobile
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const index = parseInt(item.dataset.index);
            openLightbox(index);
        }, { passive: false });
    });

    // Update navigation buttons visibility
    updateGalleryNavigation();
}

// ============================================
// GALLERY NAVIGATION (pagination)
// ============================================

function initGalleryNavigation() {
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    if (prevBtn) {
        // Click event
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentPage > 0) {
                currentPage--;
                renderGallery();
            }
        });

        // Touch event for mobile
        prevBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (currentPage > 0) {
                currentPage--;
                renderGallery();
            }
        }, { passive: false });
    }

    if (nextBtn) {
        // Click event
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const maxPage = Math.ceil(filteredImages.length / imagesPerPage) - 1;
            if (currentPage < maxPage) {
                currentPage++;
                renderGallery();
            }
        });

        // Touch event for mobile
        nextBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const maxPage = Math.ceil(filteredImages.length / imagesPerPage) - 1;
            if (currentPage < maxPage) {
                currentPage++;
                renderGallery();
            }
        }, { passive: false });
    }
}

function updateGalleryNavigation() {
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const maxPage = Math.ceil(filteredImages.length / imagesPerPage) - 1;
    
    if (prevBtn) {
        prevBtn.style.display = currentPage > 0 ? 'flex' : 'none';
    }

    if (nextBtn) {
        nextBtn.style.display = currentPage < maxPage ? 'flex' : 'none';
    }
}

// ============================================
// GALLERY FILTERS
// ============================================

function filterGallery(filter) {
    if (filter === 'all') {
        filteredImages = [...galleryData];
    } else {
        filteredImages = galleryData.filter(img => img.category === filter);
    }

    currentPage = 0;
    renderGallery();
    updateLightboxCounter();
}

// ============================================
// LIGHTBOX
// ============================================

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    // Close lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeLightbox();
        });

        // Touch event for mobile
        closeBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeLightbox();
        }, { passive: false });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Navigate with buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateLightbox(-1);
        });

        // Touch event for mobile
        prevBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateLightbox(-1);
        }, { passive: false });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateLightbox(1);
        });

        // Touch event for mobile
        nextBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateLightbox(1);
        }, { passive: false });
    }

    // Navigate with keyboard
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                navigateLightbox(1);
            } else {
                // Swipe right - previous image
                navigateLightbox(-1);
            }
        }
    }
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    
    currentImageIndex = index;
    lightboxImage.src = filteredImages[index].src;
    lightboxImage.alt = filteredImages[index].alt;
    
    updateLightboxCounter();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;

    // Wrap around
    if (currentImageIndex < 0) {
        currentImageIndex = filteredImages.length - 1;
    } else if (currentImageIndex >= filteredImages.length) {
        currentImageIndex = 0;
    }

    const lightboxImage = document.querySelector('.lightbox-image');
    lightboxImage.src = filteredImages[currentImageIndex].src;
    lightboxImage.alt = filteredImages[currentImageIndex].alt;
    
    updateLightboxCounter();
}

function updateLightboxCounter() {
    const currentSpan = document.querySelector('.lightbox-counter .current');
    const totalSpan = document.querySelector('.lightbox-counter .total');
    
    currentSpan.textContent = currentImageIndex + 1;
    totalSpan.textContent = filteredImages.length;
}