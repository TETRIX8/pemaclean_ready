// Данные услуг из прайса
const servicesData = {
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
    ],
    
    furniture: [
        { name: "Стул со спинкой", price: 700, unit: "шт" },
        { name: "Стул без спинки, табурет", price: 500, unit: "шт" },
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
    
    apartment: [
        { name: "Генеральная уборка", price: 200, unit: "м²" },
        { name: "Поддерживающая уборка", price: 150, unit: "м²" },
        { name: "Уборка после ремонта", price: 250, unit: "м²" },
        { name: "Сложная уборка (после пожара и т.д.)", price: 350, unit: "м²" },
        { name: "Кухня (комплексно)", price: 6000, unit: "шт" },
        { name: "Ванная (комплексно)", price: 4000, unit: "шт" }
    ]
};

// Все услуги для калькулятора
const allServices = [
    ...servicesData.windows,
    ...servicesData.house,
    ...servicesData.furniture,
    ...servicesData.apartment
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
    const windowsGrid = document.getElementById('windows-prices');
    if (windowsGrid) {
        servicesData.windows.forEach(service => {
            windowsGrid.appendChild(createPriceItem(service));
        });
    }
    
    const houseGrid = document.getElementById('house-prices');
    if (houseGrid) {
        servicesData.house.forEach(service => {
            houseGrid.appendChild(createPriceItem(service));
        });
    }
    
    const furnitureGrid = document.getElementById('furniture-prices');
    if (furnitureGrid) {
        servicesData.furniture.forEach(service => {
            furnitureGrid.appendChild(createPriceItem(service));
        });
    }
    
    const apartmentGrid = document.getElementById('apartment-prices');
    if (apartmentGrid) {
        servicesData.apartment.forEach(service => {
            apartmentGrid.appendChild(createPriceItem(service));
        });
    }
}

// Заполнение калькулятора
function populateCalculator() {
    const select = document.getElementById('serviceSelect');
    if (!select) return;
    
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
    const unitHint = document.getElementById('unitHint');
    
    if (!select || select.selectedIndex === -1) return;
    
    const service = allServices[select.selectedIndex];
    
    if (service.individual) {
        priceElement.textContent = 'по договоренности';
        return;
    }
    
    const total = service.price * quantity;
    priceElement.textContent = formatPrice(total);
    
    if (unitHint) {
        unitHint.textContent = `(${service.unit})`;
    }
}

// ========== ИСПРАВЛЕННАЯ ОТПРАВКА В WHATSAPP ==========
function sendToWhatsApp(message) {
    const phone = '79064883194'; // Заменить на номер заказчика
    
    // Очищаем номер от лишних символов
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Кодируем сообщение
    const encodedMessage = encodeURIComponent(message);
    
    // Вариант 1: Универсальная ссылка wa.me (работает и на телефонах, и на ПК)
    const waMeUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    // Вариант 2: Для мобильных приложений (глубокие ссылки)
    const intentUrl = `intent://send/${cleanPhone}?text=${encodedMessage}#Intent;package=com.whatsapp;scheme=smsto;end;`;
    
    // Вариант 3: WhatsApp Web (если не сработают первые два)
    const webUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
    
    // Определяем, открывать ссылку или показать предупреждение
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // На мобильных пробуем открыть приложение через wa.me (самый надежный способ)
        window.location.href = waMeUrl;
        
        // Если через 2 секунды приложение не открылось, показываем подсказку
        setTimeout(() => {
            if (!document.hidden) {
                alert('Если WhatsApp не открылся, нажмите "OK" чтобы открыть в браузере');
                window.open(webUrl, '_blank');
            }
        }, 2000);
    } else {
        // На компьютере открываем WhatsApp Web
        window.open(webUrl, '_blank');
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

// ========== ОБРАБОТКА КНОПОК WHATSAPP В HTML ==========
function setupWhatsAppButtons() {
    // Находим все ссылки на WhatsApp и заменяем их на наш универсальный обработчик
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Извлекаем текст сообщения из ссылки, если есть
            const url = new URL(link.href);
            const text = url.searchParams.get('text') || 'Здравствуйте! Хочу заказать уборку';
            
            sendToWhatsApp(text);
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        disable: 'mobile'
    });
    
    populatePriceGrids();
    populateCalculator();
    updateCalculator();
    setupMobileMenu();
    setupWhatsAppButtons(); // Добавляем обработку кнопок
    
    document.getElementById('serviceSelect')?.addEventListener('change', updateCalculator);
    document.getElementById('quantityInput')?.addEventListener('input', updateCalculator);
    
    document.getElementById('orderFromCalculator')?.addEventListener('click', function() {
        const select = document.getElementById('serviceSelect');
        const quantity = document.getElementById('quantityInput').value;
        const price = document.getElementById('calculatedPrice').textContent;
        
        if (!select || select.selectedIndex === -1) return;
        
        const service = allServices[select.selectedIndex];
        
        let message = `Здравствуйте! Хочу заказать уборку:\n`;
        message += `Услуга: ${service.name}\n`;
        message += `Количество: ${quantity} ${service.unit}\n`;
        message += `Примерная стоимость: ${price}`;
        
        sendToWhatsApp(message);
    });
});