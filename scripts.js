document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Lightbox --- //
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');

    let allImages = [];
    let currentIndex = 0;

    const updateLightboxImages = () => {
        allImages = Array.from(document.querySelectorAll('.portfolio-item')).map(item => item.href);
    };

    const showImage = (index) => {
        if (index < 0 || index >= allImages.length) return;
        lightboxImg.src = allImages[index];
        currentIndex = index;
        lightbox.style.display = 'flex';
    };

    const attachLightboxListeners = (element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            updateLightboxImages();
            const itemIndex = allImages.indexOf(element.href);
            showImage(itemIndex);
        });
    };

    document.querySelectorAll('.portfolio-item').forEach(item => {
        attachLightboxListeners(item);
    });

    closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
    prevBtn.addEventListener('click', () => showImage((currentIndex - 1 + allImages.length) % allImages.length));
    nextBtn.addEventListener('click', () => showImage((currentIndex + 1) % allImages.length));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });

    // --- Lógica de Cargar Más --- //
    const allImageFiles = ['fotos/WhatsApp Image 2025-09-05 at 10.02.55 AM (4).jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.02.55 AM (3).jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.02.55 AM (2).jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.02.55 AM (1).jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.02.55 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.02.05 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.01.42 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.01.19 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.01.13 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 10.00.47 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.56.37 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.54.44 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.53.16 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.53.08 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.51.15 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.48.35 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.48.15 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.47.53 AM.jpeg', 'fotos/WhatsApp Image 2025-09-05 at 9.47.52 AM.jpeg', 'fotos/2.jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.12 AM.jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.14 AM (3).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.15 AM (1).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.15 AM (2).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.15 AM (3).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.15 AM.jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.16 AM (2).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.16 AM.jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.17 AM (4).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.18 AM (1).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.18 AM (2).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.18 AM (3).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.19 AM (2).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.20 AM (1).jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.34.20 AM.jpeg', 'fotos/WhatsApp Image 2024-06-06 at 9.48.44 AM (1).jpeg'];
    const initiallyDisplayedCount = 8;
    let imagesToLoad = allImageFiles.slice(initiallyDisplayedCount);

    const createPortfolioItem = (src) => {
        const link = document.createElement('a');
        link.href = src;
        link.className = 'portfolio-item';

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Proyecto Legacy Muebles';

        const overlay = document.createElement('div');
        overlay.className = 'portfolio-overlay';
        const span = document.createElement('span');
        span.textContent = 'Ver Más';
        overlay.appendChild(span);

        link.appendChild(img);
        link.appendChild(overlay);

        return link;
    };

    if (loadMoreBtn) {
        if (imagesToLoad.length === 0) {
            loadMoreBtn.style.display = 'none';
        }

        loadMoreBtn.addEventListener('click', () => {
            const fragment = document.createDocumentFragment();
            const itemsToLoadNow = imagesToLoad.splice(0, 4); // Cargar 4 a la vez

            itemsToLoadNow.forEach(src => {
                const newItem = createPortfolioItem(src);
                fragment.appendChild(newItem);
                attachLightboxListeners(newItem);
            });

            portfolioGrid.appendChild(fragment);

            if (imagesToLoad.length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});