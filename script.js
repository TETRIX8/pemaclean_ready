// Данные услуг из прайса (48 услуг)
const servicesData = {
    // Уборка квартир (6 услуг)
    apartment: [
        { name: "Генеральная уборка", price: 200, unit: "м²" },
        { name: "Поддерживающая уборка", price: 150, unit: "м²" },
        { name: "Уборка после ремонта", price: 250, unit: "м²" },
        { name: "Сложная уборка (после пожара)", price: 350, unit: "м²" },
        { name: "Кухня (комплексно)", price: 6000, unit: "шт" },
        { name: "Ванная (комплексно)", price: 4000, unit: "шт" }
    ],
    
    // Химчистка мебели (14 услуг)
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
    
    // Мытьё окон (9 услуг)
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
    
    // Дополнительные услуги (19 услуг)
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

// Все услуги для калькулятора
const allServices = [
    ...servicesData.apartment,
    ...servicesData.furniture,
    ...servicesData.windows,
    ...servicesData.house
];

// Форматирование цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
}

// Создание элемента цены
function createPriceItem(service) {
    const div = document.createElement('div');
    div.className = 'price-item';
    
    let priceText = service.individual ? 'индивидуально' : `от ${service.price} ₽/${service.unit}`;
    
    div.innerHTML = `
        <span class="price-item-name">${service.name}</span>
        <span class="price-item-value">${priceText}</span>
    `;
    return div;
}

// Заполнение ценовых сеток
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
            services.forEach(service => {
                grid.appendChild(createPriceItem(service));
            });
        }
    }
}

// Заполнение калькулятора
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

// Обновление калькулятора
function updateCalculator() {
    const select = document.getElementById('serviceSelect');
    const quantity = parseFloat(document.getElementById('quantityInput').value) || 1;
    const priceElement = document.getElementById('calculatedPrice');
    
    if (!select || select.selectedIndex === -1) return;
    
    const service = allServices[select.selectedIndex];
    
    if (service.individual) {
        priceElement.textContent = 'по договоренности';
        return;
    }
    
    const total = service.price * quantity;
    priceElement.textContent = formatPrice(total);
}

// ===== СИСТЕМА ОТЗЫВОВ С АДМИНКОЙ =====

// Проверка, является ли пользователь админом (по ссылке #admin)
function isAdmin() {
    return window.location.hash === '#admin';
}

// Загрузка отзывов из localStorage
function loadReviews() {
    const savedReviews = localStorage.getItem('pemaCleaningReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
}

// Сохранение отзывов в localStorage
function saveReviews(reviews) {
    localStorage.setItem('pemaCleaningReviews', JSON.stringify(reviews));
}

// Удаление отзыва (только для админа)
window.deleteReview = function(reviewId) {
    if (!isAdmin()) {
        alert('У вас нет прав для удаления');
        return;
    }
    
    if (confirm('Удалить этот отзыв?')) {
        const reviews = loadReviews();
        const updatedReviews = reviews.filter(r => r.id !== reviewId);
        saveReviews(updatedReviews);
        displayReviews();
    }
};

// Отображение отзывов
function displayReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    const reviews = loadReviews();
    const admin = isAdmin();
    
    if (reviews.length === 0) {
        container.innerHTML = '<div class="no-reviews">Пока нет отзывов. Будьте первым!</div>';
        return;
    }
    
    container.innerHTML = reviews.map(review => `
        <div class="review-card" data-aos="fade-up">
            <div class="review-header">
                <i class="fas fa-user-circle"></i>
                <div>
                    <h4>${review.name}</h4>
                    <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                </div>
            </div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-footer">
                <span class="review-date">${review.date}</span>
                ${admin ? `<button class="delete-review-btn" onclick="deleteReview('${review.id}')"><i class="fas fa-trash"></i> Удалить</button>` : ''}
            </div>
        </div>
    `).join('');
}

// Добавление нового отзыва
function addReview(name, rating, text) {
    const reviews = loadReviews();
    
    const newReview = {
        id: Date.now().toString(),
        name: name,
        rating: rating,
        text: text,
        date: new Date().toLocaleDateString('ru-RU')
    };
    
    reviews.unshift(newReview);
    saveReviews(reviews);
    displayReviews();
}

// Настройка рейтинга (звездочки)
function setupRating() {
    const stars = document.querySelectorAll('.rating i');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingInput.value = rating;
            
            stars.forEach(s => {
                s.className = s.dataset.rating <= rating ? 'fas fa-star' : 'far fa-star';
            });
        });
    });
}

// ===== Instagram и WhatsApp =====

// Instagram
function openInstagram() {
    const username = 'pema_cleaning';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        window.location.href = `instagram://user?username=${username}`;
        setTimeout(() => {
            window.open(`https://instagram.com/${username}`, '_blank');
        }, 1000);
    } else {
        window.open(`https://instagram.com/${username}`, '_blank');
    }
}

// WhatsApp
function openWhatsApp() {
    const phone = '79064883194';
    const message = 'Здравствуйте! Хочу заказать уборку';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        window.location.href = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
        setTimeout(() => {
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        }, 1000);
    } else {
        window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank');
    }
}

// Мобильное меню
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({ duration: 800, once: true });
    
    populatePriceGrids();
    populateCalculator();
    updateCalculator();
    setupMobileMenu();
    setupRating();
    displayReviews();
    
    // Показываем админу подсказку (если зашел по ссылке #admin)
    if (isAdmin()) {
        setTimeout(() => {
            alert('Режим администратора: рядом с отзывами появились кнопки удаления');
        }, 500);
    }
    
    // Обработчики для Instagram
    document.getElementById('instagramBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openInstagram();
    });
    
    document.getElementById('instagramFooter')?.addEventListener('click', (e) => {
        e.preventDefault();
        openInstagram();
    });
    
    // Обработчики для WhatsApp
    document.getElementById('whatsappBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
    
    document.getElementById('whatsappFooter')?.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
    
    // Калькулятор
    document.getElementById('serviceSelect')?.addEventListener('change', updateCalculator);
    document.getElementById('quantityInput')?.addEventListener('input', updateCalculator);
    
    // Заказ из калькулятора
    document.getElementById('orderFromCalculator')?.addEventListener('click', function() {
        const select = document.getElementById('serviceSelect');
        const quantity = document.getElementById('quantityInput').value;
        const price = document.getElementById('calculatedPrice').textContent;
        
        if (!select || select.selectedIndex === -1) return;
        
        const service = allServices[select.selectedIndex];
        const message = `Здравствуйте! Хочу заказать уборку:\nУслуга: ${service.name}\nКоличество: ${quantity} ${service.unit}\nСтоимость: ${price}`;
        
        const phone = '79064883194';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
    
    // Отправка отзыва
    document.getElementById('reviewForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const rating = document.getElementById('reviewRating').value;
        const text = document.getElementById('reviewText').value;
        
        if (name && text) {
            addReview(name, parseInt(rating), text);
            this.reset();
            
            // Сбрасываем звезды
            document.querySelectorAll('.rating i').forEach(star => {
                star.className = 'far fa-star';
            });
            document.getElementById('reviewRating').value = '5';
            
            alert('Спасибо за ваш отзыв!');
        }
    });
});