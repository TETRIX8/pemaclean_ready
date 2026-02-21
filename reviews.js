function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
        };
    });
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// Функция для превью фото
function setupPhotoPreview() {
    const input = document.getElementById('reviewPhotos');
    const preview = document.getElementById('photoPreview');
    if (!input || !preview) return;
    
    input.addEventListener('change', async (e) => {
        preview.innerHTML = '';
        const files = Array.from(e.target.files).slice(0, 4);
        
        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;
            const compressed = await compressImage(file);
            const div = document.createElement('div');
            div.className = 'photo-preview-item';
            div.innerHTML = `
                <img src="${compressed}" alt="preview">
                <button type="button" class="remove-photo">&times;</button>
            `;
            div.querySelector('.remove-photo').addEventListener('click', () => {
                div.remove();
            });
            preview.appendChild(div);
        }
    });
}

function getPhotosFromPreview() {
    const preview = document.getElementById('photoPreview');
    if (!preview) return [];
    return Array.from(preview.querySelectorAll('img')).map(img => img.src);
}

function loadReviews() {
    const saved = localStorage.getItem('pemaCleaningReviews');
    return saved ? JSON.parse(saved) : [];
}

function saveReviews(reviews) {
    localStorage.setItem('pemaCleaningReviews', JSON.stringify(reviews));
}

function deleteReview(reviewId) {
    if (window.location.hash !== '#admin') {
        alert('У вас нет прав для удаления');
        return;
    }
    if (confirm('Удалить этот отзыв?')) {
        const reviews = loadReviews();
        const updated = reviews.filter(r => r.id !== reviewId);
        saveReviews(updated);
        displayReviews();
    }
}

function displayReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    const reviews = loadReviews();
    const admin = window.location.hash === '#admin';
    
    if (reviews.length === 0) {
        container.innerHTML = '<div class="no-reviews">Пока нет отзывов. Будьте первым!</div>';
        return;
    }
    
    container.innerHTML = reviews.map(review => {
        const hasPhotos = review.photos && review.photos.length > 0;
        const photosHtml = hasPhotos ? (review.photos.length === 1 ? 
            `<div class="review-photos"><div class="review-photo-item review-photo-single">
                <img src="${review.photos[0]}" alt="photo">
                <span class="review-photo-label">Фото</span>
            </div></div>` : 
            `<div class="review-photos">
                <div class="review-photo-item">
                    <img src="${review.photos[0]}" alt="до">
                    <span class="review-photo-label">До</span>
                </div>
                <div class="review-photo-item">
                    <img src="${review.photos[1]}" alt="после">
                    <span class="review-photo-label">После</span>
                </div>
            </div>`) : '';
        
        // Создаем звезды для отображения на основе рейтинга
        const starsDisplay = '★'.repeat(review.rating) + '☆'.repeat(5-review.rating);
        
        return `
            <div class="review-card" data-aos="fade-up">
                <div class="review-header">
                    <div class="review-avatar">${getInitials(review.name)}</div>
                    <div>
                        <h4>${review.name}</h4>
                        <div class="review-stars">${starsDisplay}</div>
                    </div>
                </div>
                <p class="review-text">"${review.text}"</p>
                ${photosHtml}
                <div class="review-footer">
                    <span class="review-date">${review.date}</span>
                    ${admin ? `<button class="delete-review-btn" onclick="deleteReview('${review.id}')"><i class="fas fa-trash"></i> Удалить</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function addReview(name, rating, text, photos) {
    const reviews = loadReviews();
    const newReview = {
        id: Date.now().toString(),
        name,
        rating: parseInt(rating),
        text,
        photos: photos || [],
        date: new Date().toLocaleDateString('ru-RU')
    };
    reviews.unshift(newReview);
    saveReviews(reviews);
    displayReviews();
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен');
    
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
    
    // Настраиваем превью фото
    setupPhotoPreview();
    
    // Отображаем отзывы
    displayReviews();
    
    if (window.location.hash === '#admin') {
        alert('Режим администратора: кнопки удаления активны');
    }
    
    // Обработчик формы
    document.getElementById('reviewForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName')?.value.trim();
        const rating = document.getElementById('reviewRating')?.value;
        const text = document.getElementById('reviewText')?.value.trim();
        const photos = getPhotosFromPreview();
        
        if (name && text) {
            addReview(name, rating, text, photos);
            
            // Сброс формы
            this.reset();
            
            // Устанавливаем оценку по умолчанию 5
            const ratingSelect = document.getElementById('reviewRating');
            if (ratingSelect) ratingSelect.value = '5';
            
            // Очистка превью фото
            const preview = document.getElementById('photoPreview');
            if (preview) preview.innerHTML = '';
            
            alert('Спасибо за ваш отзыв!');
        }
    });
});