document.addEventListener('DOMContentLoaded', function() {
    // יצירת ה-Lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="Enlarged screenshot">
            <button class="close-button">&times;</button>
            <button class="prev-button">&#10094;</button>
            <button class="next-button">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // מערך התמונות
    const images = document.querySelectorAll('.screenshots-gallery img');
    let currentImageIndex = 0;

    // פתיחת ה-Lightbox
    images.forEach((image, index) => {
        image.addEventListener('click', (e) => {
            currentImageIndex = index;
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // סגירת ה-Lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox' || e.target.classList.contains('close-button')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // כפתורי הקודם והבא
    const prevButton = lightbox.querySelector('.prev-button');
    const nextButton = lightbox.querySelector('.next-button');

    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightbox.querySelector('img').src = images[currentImageIndex].src;
    });

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightbox.querySelector('img').src = images[currentImageIndex].src;
    });

    // מקשי מקלדת
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightbox.querySelector('img').src = images[currentImageIndex].src;
        }
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightbox.querySelector('img').src = images[currentImageIndex].src;
        }
    });
});
