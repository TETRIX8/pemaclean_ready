// ===== ДАННЫЕ УСЛУГ =====
const servicesData = {
    apartment: [
        { name: "Генеральная уборка", price: 200, unit: "м²" },
        { name: "Поддерживающая уборка", price: 150, unit: "м²" },
        { name: "Уборка после ремонта", price: 250, unit: "м²" },
        { name: "Сложная уборка (после пожара)", price: 350, unit: "м²" },
        { name: "Кухня (комплексно)", price: 6000, unit: "шт" },
        { name: "Ванная (комплексно)", price: 4000, unit: "шт" }
    ],
    furniture: [
        { name: "Стул со спинкой", price: 700, unit: "шт" },
        { name: "Стул без спинки", price: 500, unit: "шт" },
        { name: "Пуфик", price: 800, unit: "шт" },
        { name: "Подушки от дивана", price: 250, unit: "шт" },
        { name: "Ковер, ковролин", price: 300, unit: "м²" },
        { name: "2-местный диван", price: 2500, unit: "шт" },
        { name: "3-местный диван", price: 3000, unit: "шт" },
        { name: "Угловой диван", price: 4000, unit: "шт" },
        { name: "П-образный диван", price: 5000, unit: "шт" },
        { name: "Кресло", price: 1000, unit: "шт" },
        { name: "Кухонный уголок", price: 2500, unit: "шт" },
        { name: "Матрас 2-спальный", price: 3500, unit: "шт" },
        { name: "Матрас 1,5-спальный", price: 2500, unit: "шт" },
        { name: "Матрас детский", price: 1500, unit: "шт" }
    ],
    windows: [
        { name: "Обычное мытье окон", price: 500, unit: "м²" },
        { name: "Мытье окон после ремонта", price: 700, unit: "м²" },
        { name: "Сложные окна (обычные)", price: 700, unit: "м²" },
        { name: "Сложные окна (после ремонта)", price: 900, unit: "м²" },
        { name: "Мытье москитных сеток", price: 100, unit: "м²" },
        { name: "Мытье оконных решеток", price: 100, unit: "м²" },
        { name: "Удаление плёнки", price: 100, unit: "м²" },
        { name: "Чистка рольставней", price: 1000, unit: "м²" },
        { name: "Чистка жалюзи", price: 200, unit: "м²" }
    ],
    house: [
        { name: "Душевая кабина", price: 1000, unit: "шт" },
        { name: "Межплиточные швы", price: 200, unit: "м²" },
        { name: "Мытье унитаза (очистка от камня)", price: 1000, unit: "шт" },
        { name: "Мытье люстры", price: 350, unit: "шт" },
        { name: "Мытье потолка", price: 50, unit: "м²" },
        { name: "Мытье пола", price: 50, unit: "м²" },
        { name: "Мытье пола после ремонта", price: 70, unit: "м²" },
        { name: "Чистка батарей (10 секций)", price: 500, unit: "шт" },
        { name: "Кухонная стеновая панель", price: 1000, unit: "шт" },
        { name: "Мытье посуды", price: 1000, unit: "час" },
        { name: "Полная чистка вытяжки", price: 1000, unit: "шт" },
        { name: "Чистка духовки", price: 1000, unit: "шт" },
        { name: "Глажка", price: 1000, unit: "час" },
        { name: "Порядок в гардеробе", price: 1000, unit: "час" },
        { name: "Пропылесосить пол (после ремонта)", price: 30, unit: "м²" },
        { name: "Постирать шторы (до 5м)", price: 1000, unit: "шт" },
        { name: "Мытье стен", price: 50, unit: "м²" },
        { name: "Мытье двора", price: 100, unit: "м²" },
        { name: "Лестничная площадка", price: 0, unit: "инд", individual: true }
    ]
};

const allServices = [...servicesData.apartment, ...servicesData.furniture, ...servicesData.windows, ...servicesData.house];

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

function createPriceItem(service) {
    const div = document.createElement('div');
    div.className = 'price-item';
    let priceText = service.individual ? 'индивидуально' : `от ${service.price} ₽/${service.unit}`;
    div.innerHTML = `<span class="price-item-name">${service.name}</span><span class="price-item-value">${priceText}</span>`;
    return div;
}

function populatePriceGrids() {
    const grids = {
        'apartment-prices': servicesData.apartment,
        'furniture-prices': servicesData.furniture,
        'windows-prices': servicesData.windows,
        'house-prices': servicesData.house
    };
    for (const [id, services] of Object.entries(grids)) {
        const grid = document.getElementById(id);
        if (grid) {
            grid.innerHTML = '';
            services.forEach(service => grid.appendChild(createPriceItem(service)));
        }
    }
}

function populateCalculator() {
    const select = document.getElementById('serviceSelect');
    if (!select) return;
    select.innerHTML = '';
    allServices.forEach((service, index) => {
        const option = document.createElement('option');
        option.value = index;
        let priceText = service.individual ? 'цена договорная' : `${service.price} ₽/${service.unit}`;
        option.textContent = `${service.name} — ${priceText}`;
        select.appendChild(option);
    });
}

function updateCalculator() {
    const select = document.getElementById('serviceSelect');
    const quantity = parseFloat(document.getElementById('quantityInput')?.value) || 1;
    const priceElement = document.getElementById('calculatedPrice');
    if (!select || !priceElement) return;
    if (select.selectedIndex === -1) return;
    const service = allServices[select.selectedIndex];
    if (service.individual) {
        priceElement.textContent = 'по договоренности';
        return;
    }
    const total = service.price * quantity;
    priceElement.textContent = formatPrice(total);
}

// ===== СЖАТИЕ ФОТО =====
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

// ===== ОТЗЫВЫ С ФОТО =====
let photoBefore = null;
let photoAfter = null;

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// ===== ПРОВЕРКА АДМИНА =====
function isAdmin() {
    // Проверяем хеш в URL
    const hash = window.location.hash;
    console.log('📍 Хеш URL:', hash);
    
    // Проверяем и на мобильных устройствах
    const isAdminMode = hash === '#admin';
    
    if (isAdminMode) {
        console.log('👑 Режим администратора активен');
        // Добавляем класс для body, чтобы можно было стилизовать
        document.body.classList.add('admin-mode');
    } else {
        document.body.classList.remove('admin-mode');
    }
    
    return isAdminMode;
}

function loadReviews() {
    const saved = localStorage.getItem('pemaCleaningReviews');
    return saved ? JSON.parse(saved) : [];
}

function saveReviews(reviews) {
    try {
        const reviewsJson = JSON.stringify(reviews);
        const sizeInMB = new Blob([reviewsJson]).size / (1024 * 1024);
        
        console.log('📊 Размер отзывов:', sizeInMB.toFixed(2), 'MB');
        
        if (sizeInMB > 4.5) {
            alert('⚠️ Достигнут лимит хранилища. Удалите старые отзывы или подключите сервер.');
            return false;
        }
        
        localStorage.setItem('pemaCleaningReviews', reviewsJson);
        console.log('✅ Сохранено отзывов:', reviews.length);
        return true;
    } catch (e) {
        console.error('❌ Ошибка сохранения:', e);
        alert('Ошибка при сохранении отзыва. Возможно, закончилось место.');
        return false;
    }
}

// ===== ФУНКЦИЯ УДАЛЕНИЯ ОТЗЫВА =====
window.deleteReview = function(reviewId) {
    console.log('🗑️ Попытка удалить отзыв:', reviewId);
    
    if (!isAdmin()) {
        console.log('❌ Не админ');
        alert('У вас нет прав для удаления');
        return;
    }
    
    if (confirm('Удалить этот отзыв?')) {
        const reviews = loadReviews();
        console.log('📊 До удаления:', reviews.length);
        
        const updated = reviews.filter(r => r.id !== reviewId);
        console.log('📊 После удаления:', updated.length);
        
        const saved = saveReviews(updated);
        
        if (saved) {
            displayReviews();
            console.log('✅ Отзыв удален');
        } else {
            alert('❌ Не удалось удалить отзыв');
        }
    }
};

function openFullscreen(imgSrc, label) {
    const modal = document.createElement('div');
    modal.className = 'fullscreen-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imgSrc}" alt="${label}">
            <div class="modal-label">${label}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

window.handlePhotoUpload = async function(input, type) {
    const file = input.files[0];
    if (!file || !file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
    }

    try {
        const compressed = await compressImage(file, 1080, 0.8);
        const previewImg = document.getElementById(type === 'before' ? 'previewBefore' : 'previewAfter');
        const uploadArea = document.getElementById(type === 'before' ? 'uploadAreaBefore' : 'uploadAreaAfter');
        const removeBtn = document.getElementById(type === 'before' ? 'removeBefore' : 'removeAfter');

        if (type === 'before') {
            photoBefore = compressed;
        } else {
            photoAfter = compressed;
        }

        if (previewImg) {
            previewImg.src = compressed;
            previewImg.style.display = 'block';
        }

        if (uploadArea) {
            const placeholder = uploadArea.querySelector('.upload-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        }

        if (removeBtn) {
            removeBtn.style.display = 'inline-flex';
        }
    } catch (error) {
        console.error('Ошибка загрузки фото:', error);
        alert('Ошибка при загрузке фото');
    }
};

window.removePhoto = function(type) {
    const previewImg = document.getElementById(type === 'before' ? 'previewBefore' : 'previewAfter');
    const uploadArea = document.getElementById(type === 'before' ? 'uploadAreaBefore' : 'uploadAreaAfter');
    const input = document.getElementById(type === 'before' ? 'photoBefore' : 'photoAfter');
    const removeBtn = document.getElementById(type === 'before' ? 'removeBefore' : 'removeAfter');

    if (type === 'before') {
        photoBefore = null;
    } else {
        photoAfter = null;
    }

    if (previewImg) {
        previewImg.src = '';
        previewImg.style.display = 'none';
    }

    if (uploadArea) {
        const placeholder = uploadArea.querySelector('.upload-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
    }

    if (removeBtn) {
        removeBtn.style.display = 'none';
    }

    if (input) {
        input.value = '';
    }
};

function getPhotosFromForm() {
    const photos = [];
    if (photoBefore) photos.push(photoBefore);
    if (photoAfter) photos.push(photoAfter);
    return photos;
}

function displayReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    const reviews = loadReviews();
    const admin = isAdmin();
    console.log('📊 ВСЕГО ОТЗЫВОВ В ХРАНИЛИЩЕ:', reviews.length);
    console.log('📋 ПОЛНЫЙ СПИСОК ОТЗЫВОВ:', reviews);
    
    
    
    console.log('👑 Админ-режим:', admin ? 'ДА' : 'НЕТ');
    
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (reviews.length === 0) {
        container.innerHTML = '<div class="no-reviews">Пока нет отзывов. Будьте первым!</div>';
        return;
    }
    
    container.innerHTML = reviews.map(review => {
        const hasPhotos = review.photos && review.photos.length > 0;
        
        let photosHtml = '';
        if (hasPhotos) {
            if (review.photos.length === 1 || isMobile) {
                photosHtml = `
                    <div class="review-photos">
                        ${review.photos.map((photo, index) => `
                            <div class="review-photo-item ${review.photos.length === 1 ? 'review-photo-single' : ''}" 
                                 onclick="openFullscreen('${photo}', '${index === 0 ? 'До' : (index === 1 ? 'После' : 'Фото')}')">
                                <img src="${photo}" alt="${index === 0 ? 'до' : (index === 1 ? 'после' : 'фото')}">
                                <span class="review-photo-label">${index === 0 ? 'До' : (index === 1 ? 'После' : 'Фото')}</span>
                            </div>
                        `).join('')}
                    </div>`;
            } else {
                photosHtml = `
                    <div class="review-photos desktop-grid">
                        <div class="review-photo-item" onclick="openFullscreen('${review.photos[0]}', 'До')">
                            <img src="${review.photos[0]}" alt="до">
                            <span class="review-photo-label">До</span>
                        </div>
                        <div class="review-photo-item" onclick="openFullscreen('${review.photos[1] || review.photos[0]}', 'После')">
                            <img src="${review.photos[1] || review.photos[0]}" alt="после">
                            <span class="review-photo-label">После</span>
                        </div>
                    </div>`;
            }
        }
        
        return `
            <div class="review-card" data-aos="fade-up">
                <div class="review-header">
                    <div class="review-avatar">${getInitials(review.name)}</div>
                    <div>
                        <h4>${review.name}</h4>
                        <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                    </div>
                </div>
                <p class="review-text">"${review.text}"</p>
                ${photosHtml}
                <div class="review-footer">
                    <span class="review-date">${review.date}</span>
                    ${admin ? `<button class="delete-review-btn" onclick="deleteReview('${review.id}')"><i class="fas fa-trash"></i> Удалить</button>` : ''}
                </div>
            </div>`;
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
    const saved = saveReviews(reviews);
    
    if (saved) {
        displayReviews();
        alert(' Спасибо за ваш отзыв!');
    }
    
    return saved;
}

// ===== СОЦСЕТИ =====
function openInstagram() {
    const username = 'pema_cleaning';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = `instagram://user?username=${username}`;
        setTimeout(() => window.open(`https://instagram.com/${username}`, '_blank'), 1000);
    } else {
        window.open(`https://instagram.com/${username}`, '_blank');
    }
}

function openWhatsApp() {
    const phone = '79885784206';
    const message = 'Здравствуйте! Хочу заказать уборку';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
        setTimeout(() => window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank'), 1000);
    } else {
        window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
    }
}

// ===== МОБИЛЬНОЕ МЕНЮ =====
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (menuBtn && navLinks) {
        // Убираем старые обработчики
        menuBtn.replaceWith(menuBtn.cloneNode(true));
        const newMenuBtn = document.getElementById('mobileMenuBtn');
        
        newMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('show');
            console.log('Меню открыто/закрыто');
        });
        
        // Закрываем меню при клике на ссылку
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !newMenuBtn.contains(e.target)) {
                navLinks.classList.remove('show');
            }
        });
    }
}

// ===== ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ СТРАНИЦЫ =====
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('reviews.html')) return 'reviews';
    return 'main';
}

// ===== СЛЕДИМ ЗА ИЗМЕНЕНИЕМ РАЗМЕРА ЭКРАНА =====
function handleResize() {
    if (getCurrentPage() === 'reviews') {
        displayReviews();
    }
}

window.addEventListener('resize', handleResize);

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен');
    
    const currentPage = getCurrentPage();
    console.log('📄 Текущая страница:', currentPage);
    
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
    
    setupMobileMenu();
    
    document.getElementById('instagramBtn')?.addEventListener('click', (e) => { e.preventDefault(); openInstagram(); });
    document.getElementById('instagramFooter')?.addEventListener('click', (e) => { e.preventDefault(); openInstagram(); });
    document.getElementById('whatsappBtn')?.addEventListener('click', (e) => { e.preventDefault(); openWhatsApp(); });
    document.getElementById('whatsappFooter')?.addEventListener('click', (e) => { e.preventDefault(); openWhatsApp(); });
    
    if (currentPage === 'main') {
        console.log('🏠 Запускаю главную страницу');
        
        populatePriceGrids();
        populateCalculator();
        updateCalculator();
        
        document.getElementById('serviceSelect')?.addEventListener('change', updateCalculator);
        document.getElementById('quantityInput')?.addEventListener('input', updateCalculator);
        
        document.getElementById('orderFromCalculator')?.addEventListener('click', function() {
            const select = document.getElementById('serviceSelect');
            const quantity = document.getElementById('quantityInput')?.value;
            const price = document.getElementById('calculatedPrice')?.textContent;
            if (!select || select.selectedIndex === -1) return;
            const service = allServices[select.selectedIndex];
            const message = `Здравствуйте! Хочу заказать уборку:\nУслуга: ${service.name}\nКоличество: ${quantity} ${service.unit}\nСтоимость: ${price}`;
            const phone = '79885784206';
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }
    
    if (currentPage === 'reviews') {
        console.log('📝 Запускаю страницу отзывов');
        
        displayReviews();
        
        if (isAdmin()) {
            console.log('👑 Админ-режим активен');
            setTimeout(() => alert('Режим администратора: кнопки удаления активны'), 500);
        } else {
            console.log('👤 Обычный пользователь');
        }
        
        document.getElementById('reviewForm')?.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewName')?.value.trim();
            const rating = document.getElementById('reviewRating')?.value;
            const text = document.getElementById('reviewText')?.value.trim();
            const photos = getPhotosFromForm();

            if (name && text) {
                addReview(name, rating, text, photos);

                this.reset();
                
                photoBefore = null;
                photoAfter = null;
                
                const previewBefore = document.getElementById('previewBefore');
                const previewAfter = document.getElementById('previewAfter');
                const uploadAreaBefore = document.getElementById('uploadAreaBefore');
                const uploadAreaAfter = document.getElementById('uploadAreaAfter');
                const removeBefore = document.getElementById('removeBefore');
                const removeAfter = document.getElementById('removeAfter');
                const photoBeforeInput = document.getElementById('photoBefore');
                const photoAfterInput = document.getElementById('photoAfter');

                if (previewBefore) previewBefore.style.display = 'none';
                if (previewAfter) previewAfter.style.display = 'none';
                
                if (uploadAreaBefore) {
                    const ph = uploadAreaBefore.querySelector('.upload-placeholder');
                    if (ph) ph.style.display = 'flex';
                }
                if (uploadAreaAfter) {
                    const ph = uploadAreaAfter.querySelector('.upload-placeholder');
                    if (ph) ph.style.display = 'flex';
                }
                
                if (removeBefore) removeBefore.style.display = 'none';
                if (removeAfter) removeAfter.style.display = 'none';
                if (photoBeforeInput) photoBeforeInput.value = '';
                if (photoAfterInput) photoAfterInput.value = '';

                alert('Спасибо за ваш отзыв!');
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }
});