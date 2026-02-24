// ===== КОНФИГУРАЦИЯ SUPABASE =====
// Вставьте ваши данные из настроек проекта Supabase (Settings -> API)
const SUPABASE_URL = 'https://gxdaszzavrbrlwoqzyoe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_sdkcgSWRjvbO8zPB22h5mQ_h9xqGwry';

// Инициализация клиента Supabase
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

if (!supabase) {
    console.error('Supabase SDK не загружен. Проверьте подключение скрипта в HTML.');
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

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
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
        };
    });
}

function getInitials(name) {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// Переменные для хранения выбранных файлов
let photoBeforeFile = null;
let photoAfterFile = null;

// Функция для обработки выбора фото
window.handlePhotoUpload = async function(input, type) {
    const file = input.files[0];
    if (!file || !file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
    }

    const previewImg = document.getElementById(type === 'before' ? 'previewBefore' : 'previewAfter');
    const uploadArea = document.getElementById(type === 'before' ? 'uploadAreaBefore' : 'uploadAreaAfter');
    const removeBtn = document.getElementById(type === 'before' ? 'removeBefore' : 'removeAfter');

    // Показываем превью (локально через URL.createObjectURL)
    if (previewImg && uploadArea && removeBtn) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.style.display = 'block';
        uploadArea.querySelector('.upload-placeholder').style.display = 'none';
        removeBtn.style.display = 'block';
    }

    // Сохраняем файл для последующей загрузки
    if (type === 'before') {
        photoBeforeFile = file;
    } else {
        photoAfterFile = file;
    }
};

// Функция для удаления выбранного фото
window.removePhoto = function(type) {
    const previewImg = document.getElementById(type === 'before' ? 'previewBefore' : 'previewAfter');
    const uploadArea = document.getElementById(type === 'before' ? 'uploadAreaBefore' : 'uploadAreaAfter');
    const removeBtn = document.getElementById(type === 'before' ? 'removeBefore' : 'removeAfter');
    const input = document.getElementById(type === 'before' ? 'photoBefore' : 'photoAfter');

    if (previewImg && uploadArea && removeBtn && input) {
        previewImg.src = '';
        previewImg.style.display = 'none';
        uploadArea.querySelector('.upload-placeholder').style.display = 'flex';
        removeBtn.style.display = 'none';
        input.value = '';
    }

    if (type === 'before') {
        photoBeforeFile = null;
    } else {
        photoAfterFile = null;
    }
};

// Функция загрузки изображения в Supabase Storage
async function uploadToSupabase(file, type) {
    if (!file) return null;
    
    // Сжимаем перед загрузкой
    const compressedBlob = await compressImage(file);
    const fileExt = 'jpg';
    const fileName = `${Date.now()}_${type}.${fileExt}`;
    const filePath = `reviews/${fileName}`;

    const { data, error } = await supabase.storage
        .from('review-photos')
        .upload(filePath, compressedBlob);

    if (error) {
        console.error('Ошибка загрузки в Storage:', error);
        return null;
    }

    const { data: publicUrlData } = supabase.storage
        .from('review-photos')
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}

// ===== РАБОТА С ДАННЫМИ =====

async function loadReviews() {
    if (!supabase) return [];
    
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Ошибка загрузки отзывов:', error);
        return [];
    }
    return data;
}

async function deleteReview(reviewId) {
    if (window.location.hash !== '#admin') {
        alert('У вас нет прав для удаления');
        return;
    }
    
    if (confirm('Удалить этот отзыв?')) {
        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', reviewId);

        if (error) {
            alert('Ошибка при удалении: ' + error.message);
        } else {
            displayReviews();
        }
    }
}

async function displayReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Загрузка отзывов...</div>';
    
    const reviews = await loadReviews();
    const admin = window.location.hash === '#admin';
    
    if (reviews.length === 0) {
        container.innerHTML = '<div class="no-reviews">Пока нет отзывов. Будьте первым!</div>';
        return;
    }
    
    container.innerHTML = reviews.map(review => {
        const photoUrls = review.photo_urls || [];
        const hasPhotos = photoUrls.length > 0;
        
        let photosHtml = '';
        if (hasPhotos) {
            if (photoUrls.length === 1) {
                photosHtml = `
                    <div class="review-photos">
                        <div class="review-photo-item review-photo-single">
                            <img src="${photoUrls[0]}" alt="photo">
                            <span class="review-photo-label">Фото</span>
                        </div>
                    </div>`;
            } else {
                photosHtml = `
                    <div class="review-photos">
                        <div class="review-photo-item">
                            <img src="${photoUrls[0]}" alt="до">
                            <span class="review-photo-label">До</span>
                        </div>
                        <div class="review-photo-item">
                            <img src="${photoUrls[1]}" alt="после">
                            <span class="review-photo-label">После</span>
                        </div>
                    </div>`;
            }
        }
        
        const starsDisplay = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const date = new Date(review.created_at).toLocaleDateString('ru-RU');
        
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
                    <span class="review-date">${date}</span>
                    ${admin ? `<button class="delete-review-btn" onclick="deleteReview('${review.id}')"><i class="fas fa-trash"></i> Удалить</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
    
    displayReviews();
    
    if (window.location.hash === '#admin') {
        console.log('Режим администратора активен');
    }
    
    const form = document.getElementById('reviewForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit-review');
            const originalBtnText = submitBtn.innerHTML;
            
            const name = document.getElementById('reviewName')?.value.trim();
            const rating = document.getElementById('reviewRating')?.value;
            const text = document.getElementById('reviewText')?.value.trim();
            
            if (!name || !text) return;

            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Публикация...';

                // 1. Загружаем фото в Storage
                const photoUrls = [];
                if (photoBeforeFile) {
                    const url = await uploadToSupabase(photoBeforeFile, 'before');
                    if (url) photoUrls.push(url);
                }
                if (photoAfterFile) {
                    const url = await uploadToSupabase(photoAfterFile, 'after');
                    if (url) photoUrls.push(url);
                }

                // 2. Сохраняем отзыв в Database
                const { error } = await supabase
                    .from('reviews')
                    .insert([
                        { 
                            name, 
                            rating: parseInt(rating), 
                            text, 
                            photo_urls: photoUrls 
                        }
                    ]);

                if (error) throw error;

                // 3. Сброс формы и обновление
                form.reset();
                removePhoto('before');
                removePhoto('after');
                
                const ratingSelect = document.getElementById('reviewRating');
                if (ratingSelect) ratingSelect.value = '5';
                
                alert('Спасибо за ваш отзыв!');
                displayReviews();

            } catch (err) {
                console.error('Ошибка при отправке:', err);
                alert('Произошла ошибка при отправке отзыва. Проверьте настройки Supabase.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
