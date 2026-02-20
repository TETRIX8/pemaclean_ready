// Данные услуг
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
        { name: "Кресло", price: 1000, unit: "шт" },
        { name: "Кухонный уголок", price: 2500, unit: "шт" },
        { name: "Матрас 2-спальный", price: 3500, unit: "шт" }
    ],
    
    windows: [
        { name: "Обычное мытье окон", price: 500, unit: "м²" },
        { name: "Мытье окон после ремонта", price: 700, unit: "м²" },
        { name: "Сложные окна", price: 700, unit: "м²" },
        { name: "Мытье москитных сеток", price: 100, unit: "м²" },
        { name: "Чистка жалюзи", price: 200, unit: "м²" }
    ],
    
    house: [
        { name: "Душевая кабина", price: 1000, unit: "шт" },
        { name: "Межплиточные швы", price: 200, unit: "м²" },
        { name: "Мытье люстры", price: 350, unit: "шт" },
        { name: "Мытье потолка", price: 50, unit: "м²" },
        { name: "Мытье пола", price: 50, unit: "м²" },
        { name: "Чистка батарей", price: 500, unit: "шт" },
        { name: "Мытье посуды", price: 1000, unit: "час" },
        { name: "Чистка духовки", price: 1000, unit: "шт" },
        { name: "Глажка", price: 1000, unit: "час" }
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
    div.innerHTML = `
        <span class="price-item-name">${service.name}</span>
        <span class="price-item-value">от ${service.price} ₽/${service.unit}</span>
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
    
    allServices.forEach((service, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${service.name} — ${service.price} ₽/${service.unit}`;
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
    const total = service.price * quantity;
    priceElement.textContent = formatPrice(total);
}

// ===== УНИВЕРСАЛЬНЫЕ ССЫЛКИ =====

// Instagram (работает на всех устройствах)
function openInstagram() {
    const username = 'recepti.pema';
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

// WhatsApp (работает на всех устройствах)
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
});