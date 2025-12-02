// === ИНСТРУКЦИЯ ДЛЯ АДМИНИСТРАТОРА ===
 
// КАК ДОБАВИТЬ БРОНЬ:
// 
// bookedDates["shale"].push({ start: "2025-12-25", end: "2025-12-30" })
// 
// КАК УДАЛИТЬ БРОНЬ:
// 
// bookedDates["shale"] = []  // очистить все брони
// или удалить конкретный элемент из массива
// 
// ДОСТУПНЫЕ АПАРТАМЕНТЫ ДЛЯ РЕДАКТИРОВАНИЯ:
// - "shale" (Шале)
// - "hotel_standard" (Гостиница Стандарт) 
// - "beach_house" (Дом у пляжа)
// - "swiss_apartment" (Швейцарские апартаменты)
// - "merchant_apartment" (Купеческие апартаменты)
// - "hostel" (Хостел)
// - "tent_places" (Палаточные места)
// - "forest_house" (Лесной домик)

// === СИСТЕМА УПРАВЛЕНИЯ БРОНИРОВАНИЯМИ ===
// Чтобы добавить/удалить бронь, редактируйте массив bookedDates ниже
// Формат: { start: "ГГГГ-ММ-ДД", end: "ГГГГ-ММ-ДД" }

const bookedDates = {
    // Шале - забронировано с 29.11.2025 по 01.12.2025
    "shale": [
        { start: "2025-11-29", end: "2025-12-01" }
    ],
    // Гостиница Стандарт - забронировано с 20.12.2025 по 25.12.2025
    "hotel_standard": [
        { start: "2025-12-20", end: "2025-12-25" }
    ],
    // Дом у пляжа - свободен
    "beach_house": [
        { start: "", end: "" }
    ],
    // Швейцарские апартаменты - свободен
    "swiss_apartment": [
        { start: "", end: "" }
    ],
    // Купеческие апартаменты - свободен
    "merchant_apartment": [
        { start: "", end: "" }
    ],
    // Хостел - свободен
    "hostel": [
        { start: "", end: "" }
    ],
    // Палаточные места - свободен
    "tent_places": [
        { start: "", end: "" }
    ],
    // Лесной домик - свободен
    "forest_house": [
        { start: "", end: "" }
    ]
};


// Данные апартаментов 
const apartmentsData = [
    {
        id: "shale",
        title: "Шале",
        address: "ул. Молодежная, 5",
        area: "85м²",
        rooms: "3 комнаты",
        beds: "4+2 спальных мест",
        price: "35 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "Шезлонги", "Терраса"],
        images: [
            "apartments/shale1.jpg",
            "apartments/shale2.jpg",
            "apartments/shale3.jpg",
            "apartments/shale4.jpg",
            "apartments/shale5.jpg",
            "apartments/shale6.jpg",
            "apartments/shale7.jpg",
            "apartments/shale8.jpg",
            "apartments/shale9.jpg",
            "apartments/shale10.jpg",
        ]
    },
    {
        id: "hotel_standard",
        title: "Гостиница Стандарт",
        address: "ул. Центральная, 12",
        area: "35м²",
        rooms: "1 комната",
        beds: "2 спальных места",
        price: "15 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Холодильник", "Сейф"],
        images: [
            "apartments/hotel1.jpg",
            "apartments/hotel2.jpg",
            "apartments/hotel3.jpg"
        ]
    },
    {
        id: "beach_house",
        title: "Дом у пляжа",
        address: "ул. Пляжная, 8",
        area: "120м²",
        rooms: "4 комнаты",
        beds: "6+2 спальных мест",
        price: "45 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "Вид на озеро", "Терраса", "Можно с животными"],
        images: [
            "apartments/beach1.jpg",
            "apartments/beach2.jpg",
            "apartments/beach3.jpg",
            "apartments/beach4.jpg",
            "apartments/beach5.jpg"
        ]
    },
    {
        id: "swiss_apartment",
        title: "Швейцарские апартаменты",
        address: "ул. Горная, 15",
        area: "65м²",
        rooms: "2 комнаты",
        beds: "2+1 спальных мест",
        price: "28 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Мини-бар", "Сейф", "Вид на озеро"],
        images: [
            "apartments/swiss1.jpg",
            "apartments/swiss2.jpg",
            "apartments/swiss3.jpg",
            "apartments/swiss4.jpg"
        ]
    },
    {
        id: "merchant_apartment",
        title: "Купеческие апартаменты",
        address: "ул. Историческая, 3",
        area: "95м²",
        rooms: "3 комнаты",
        beds: "4+2 спальных мест",
        price: "32 000",
        tags: ["Кондиционер", "Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "Терраса", "Парковка"],
        images: [
            "apartments/merchant1.jpg",
            "apartments/merchant2.jpg",
            "apartments/merchant3.jpg",
            "apartments/merchant4.jpg",
            "apartments/merchant5.jpg"
        ]
    },
    {
        id: "hostel",
        title: "Хостел",
        address: "ул. Молодежная, 21",
        area: "20м²",
        rooms: "1 комната",
        beds: "4 спальных места",
        price: "8 000",
        tags: ["Интернет", "Телевизор", "Холодильник", "Общая кухня"],
        images: [
            "apartments/hostel1.jpg",
            "apartments/hostel2.jpg",
            "apartments/hostel3.jpg"
        ]
    },
    {
        id: "tent_places",
        title: "Палаточные места",
        address: "Роща",
        area: "16м²",
        rooms: "1 комната",
        beds: "2+2 спальных мест",
        price: "3 000",
        tags: ["Можно с детьми", "Можно с животными", "Природа"],
        images: [
            "apartments/tent1.jpg",
            "apartments/tent2.jpg",
            "apartments/tent3.jpg"
        ]
    },
    {
        id: "forest_house",
        title: "Лесной домик",
        address: "ул. Таежная, 7",
        area: "45м²",
        rooms: "2 комнаты",
        beds: "2+1 спальных мест",
        price: "18 000",
        tags: ["Интернет", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "Природа", "Терраса"],
        images: [
            "apartments/forest1.jpg",
            "apartments/forest2.jpg",
            "apartments/forest3.jpg",
            "apartments/forest4.jpg"
        ]
    }
];

// Глобальные переменные
let currentGuests = {
    adults: 0,
    children03: 0,
    children416: 0
};

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    initGuestsDropdown();
    initDateInputs();
    renderApartments();
    initSliders();
});

// Dropdown для выбора гостей 
function initGuestsDropdown() {
    const dropdown = document.getElementById('guestsDropdown');
    const display = document.getElementById('guestsDisplay');
    const selector = document.getElementById('guestsSelector');

    // Открытие/закрытие dropdown
    display.addEventListener('click', function() {
        dropdown.classList.toggle('active');
    });

    // Закрытие при клике вне dropdown
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Обработчики для кнопок +/-
    document.querySelectorAll('.guest-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            const isPlus = this.classList.contains('plus');
            updateGuestCount(category, isPlus);
            updateGuestsDisplay();
        });
    });
}

function updateGuestCount(category, isPlus) {
    if (isPlus) {
        currentGuests[category]++;
    } else {
        if (currentGuests[category] > 0) {
            currentGuests[category]--;
        }
    }
    
    // Обновление состояния кнопок
    updateGuestButtons();
}

function updateGuestButtons() {
    document.querySelectorAll('.guest-count').forEach(element => {
        const category = element.dataset.category;
        element.textContent = currentGuests[category];
    });

    document.querySelectorAll('.guest-btn.minus').forEach(button => {
        const category = button.dataset.category;
        button.disabled = currentGuests[category] === 0;
    });
}

function updateGuestsDisplay() {
    const display = document.getElementById('guestsDisplay');
    const totalGuests = currentGuests.adults + currentGuests.children03 + currentGuests.children416;
    
    if (totalGuests === 0) {
        display.textContent = 'Выберите';
    } else {
        display.textContent = `${totalGuests} гостей`;
    }
}

// Инициализация полей дат
function initDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('check-in').min = today;
    document.getElementById('check-out').min = today;
    
    // Автоматическое обновление минимальной даты выезда
    document.getElementById('check-in').addEventListener('change', function() {
        const checkOut = document.getElementById('check-out');
        checkOut.min = this.value;
        if (checkOut.value && checkOut.value < this.value) {
            checkOut.value = '';
        }
    });
}

// ИСПРАВЛЕННАЯ функция проверки доступности апартамента
function isApartmentAvailable(apartmentId, checkIn, checkOut) {
    if (!checkIn || !checkOut) return true;
    
    const bookings = bookedDates[apartmentId] || [];
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Если нет броней - апартамент доступен
    if (bookings.length === 0) return true;
    
    for (const booking of bookings) {
        const bookingStart = new Date(booking.start);
        const bookingEnd = new Date(booking.end);
        
        // ИСПРАВЛЕННАЯ проверка пересечения периодов
        // Апартамент занят, если выбранные даты пересекаются с забронированными
        // Учитываем, что дата выезда - это день, когда гость освобождает номер
        if ((checkInDate < bookingEnd) && (checkOutDate > bookingStart)) {
            return false;
        }
    }
    
    return true;
}

// ИСПРАВЛЕННЫЙ рендеринг апартаментов с правильной сортировкой
function renderApartments() {
    const container = document.getElementById('apartmentsContainer');
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const totalGuests = currentGuests.adults + currentGuests.children03 + currentGuests.children416;
    
    container.innerHTML = '';
    
    // Создаем массив апартаментов с информацией о доступности
    const apartmentsWithAvailability = apartmentsData.map(apartment => {
        const isAvailable = isApartmentAvailable(apartment.id, checkIn, checkOut);
        
        // Проверка по количеству гостей
        let guestsOk = true;
        if (totalGuests > 0) {
            const bedNumbers = apartment.beds.match(/\d+/g);
            const totalBeds = bedNumbers ? bedNumbers.reduce((sum, num) => sum + parseInt(num), 0) : 0;
            guestsOk = totalGuests <= totalBeds;
        }
        
        return {
            ...apartment,
            available: isAvailable && guestsOk,
            sortPriority: isAvailable ? 1 : 0 // Сортируем: доступные first
        };
    });
    
    // ИСПРАВЛЕННАЯ СОРТИРОВКА: сначала доступные, потом забронированные
    apartmentsWithAvailability.sort((a, b) => {
        // Сначала по доступности (доступные вперед)
        if (a.available && !b.available) return -1;
        if (!a.available && b.available) return 1;
        
        // Если одинаковая доступность, сохраняем исходный порядок
        return apartmentsData.findIndex(apt => apt.id === a.id) - 
               apartmentsData.findIndex(apt => apt.id === b.id);
    });
    
    // Рендерим отсортированные апартаменты
    apartmentsWithAvailability.forEach(apartment => {
        const apartmentCard = createApartmentCard(apartment, apartment.available);
        container.appendChild(apartmentCard);
    });
}

// Создание карточки апартамента (без изменений)
function createApartmentCard(apartment, isAvailable) {
    const card = document.createElement('div');
    card.className = `apartment-card ${!isAvailable ? 'unavailable' : ''}`;
    card.innerHTML = `
        <!-- Слайдер (40%) -->
        <div class="apartment-slider">
            <div class="slider-track" id="slider-${apartment.id}">
                ${apartment.images.map(img => `
                    <div class="slider-slide">
                        <img src="../images/${img}" alt="${apartment.title}">
                    </div>
                `).join('')}
            </div>
            <div class="slider-dots" id="dots-${apartment.id}">
                ${apartment.images.map((_, index) => `
                    <div class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
                `).join('')}
            </div>
        </div>
        
        <!-- Информация (40%) -->
        <div class="apartment-info">
            <div class="apartment-header">
                <h2 class="apartment-title">${apartment.title}</h2>
                <div class="apartment-address">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${apartment.address}</span>
                </div>
                <div class="apartment-features">
                    <div class="feature">
                        <i class="fas fa-vector-square"></i>
                        <span>${apartment.area}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-door-open"></i>
                        <span>${apartment.rooms}</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        <span>${apartment.beds}</span>
                    </div>
                </div>
            </div>
            
            <div class="apartment-tags-container">
                <h3 class="tags-title">Удобства:</h3>
                <div class="apartment-tags">
                    ${apartment.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="apartment-details-link">
                <a href="${apartment.id}.html" class="btn-details">
        <i class="fas fa-info-circle"></i>
        Подробнее об апартаменте
    </a>
            </div>
        </div>
        
        <!-- Бронирование (20%) -->
        <div class="apartment-booking-side">
            <div class="booking-content">
                <div class="apartment-price">
                    <div class="price-main">от ${apartment.price} ₽</div>
                    <div class="price-note">за 1 сутки</div>
                </div>
                <button class="btn-book-apartment" ${!isAvailable ? 'disabled' : ''}>
                    Забронировать <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Инициализация слайдеров (без изменений)
function initSliders() {
    apartmentsData.forEach(apartment => {
        initApartmentSlider(apartment.id, apartment.images.length);
    });
}

function initApartmentSlider(apartmentId, slidesCount) {
    const track = document.getElementById(`slider-${apartmentId}`);
    const dots = document.getElementById(`dots-${apartmentId}`);
    
    if (!track || !dots) return;
    
    let currentSlide = 0;
    let slideInterval;

    // Обработчики для точек
    dots.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновление активной точки
        dots.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        // Перезапуск автопрокрутки
        restartAutoSlide();
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slidesCount;
        goToSlide(nextIndex);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Пауза при наведении
    if (track) {
        track.addEventListener('mouseenter', stopAutoSlide);
        track.addEventListener('mouseleave', startAutoSlide);
    }

    // Запуск автопрокрутки
    startAutoSlide();
}

// Обработчик кнопки "Показать"
document.getElementById('showApartments').addEventListener('click', function() {
    renderApartments();
    // Переинициализируем слайдеры для новых карточек
    setTimeout(() => {
        initSliders();
    }, 100);
});


// ОСТАВЛЯЕМ ТОЛЬКО ЭТОТ ОБРАБОТЧИК (новый с перенаправлением):
document.addEventListener('click', function(event) {
    if (event.target.closest('.btn-book-apartment')) {
        const apartmentCard = event.target.closest('.apartment-card');
        const apartmentTitle = apartmentCard.querySelector('.apartment-title').textContent;
        
        if (!event.target.disabled) {
            // Получаем выбранные даты и гостей
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const adults = currentGuests.adults;
            const children03 = currentGuests.children03;
            const children416 = currentGuests.children416;
            
            if (!checkIn || !checkOut) {
                alert('Пожалуйста, выберите даты заезда и выезда');
                return;
            }
            
            // Определяем ID апартамента для перехода на правильную страницу
            const apartmentId = getApartmentIdFromCard(apartmentCard);
            
            // Перенаправляем на страницу бронирования с параметрами
            redirectToBookingPage(apartmentId, checkIn, checkOut, adults, children03, children416);
        } else {
            alert('Данный апартамент недоступен на выбранные даты. Пожалуйста, выберите другие даты.');
        }
    }
});

// Функция для определения ID апартамента из карточки
function getApartmentIdFromCard(apartmentCard) {
    const title = apartmentCard.querySelector('.apartment-title').textContent;
    
    const titleToIdMap = {
        'Шале': 'shale',
        'Лесной домик': 'forest_house',
        'Палаточные места': 'tent_places',
        'Хостел': 'hostel',
        'Купеческие апартаменты': 'merchant_apartment',
        'Швейцарские апартаменты': 'swiss_apartment',
        'Дом у пляжа': 'beach_house',
        'Гостиница Стандарт': 'hotel_standard'
    };
    
    return titleToIdMap[title] || 'shale'; // fallback
}

// Функция перенаправления на страницу бронирования
function redirectToBookingPage(apartmentId, checkIn, checkOut, adults, children03, children416) {
    // Создаем URL с параметрами
    const params = new URLSearchParams({
        checkin: checkIn,
        checkout: checkOut,
        adults: adults,
        children03: children03,
        children416: children416
    });
    
    // Перенаправляем на соответствующую страницу бронирования
    window.location.href = `booking_${apartmentId}.html?${params.toString()}`;
}

// Обработчики для кнопок бронирования в шапке
document.querySelector('.btn-book').addEventListener('click', function() {
    window.location.href = 'apartments.html';
});

document.querySelector('.mobile-btn-book').addEventListener('click', function() {
    window.location.href = 'apartments.html';
});
// === ДОБАВЛЯЕМ ПЕРЕХОД НА СТРАНИЦЫ БРОНИРОВАНИЯ ===

// Обработчик для кнопки "Забронировать" в карточках апартаментов
document.addEventListener('click', function(event) {
    if (event.target.closest('.btn-book-apartment')) {
        const apartmentCard = event.target.closest('.apartment-card');
        const apartmentTitle = apartmentCard.querySelector('.apartment-title').textContent;
        
        if (!event.target.disabled) {
            // Получаем выбранные даты и гостей
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const adults = currentGuests.adults;
            const children03 = currentGuests.children03;
            const children416 = currentGuests.children416;
            
            if (!checkIn || !checkOut) {
                alert('Пожалуйста, выберите даты заезда и выезда');
                return;
            }
            
            // Определяем ID апартамента для перехода на правильную страницу
            const apartmentId = getApartmentIdFromCard(apartmentCard);
            
            // Перенаправляем на страницу бронирования с параметрами
            redirectToBookingPage(apartmentId, checkIn, checkOut, adults, children03, children416);
        } else {
            alert('Данный апартамент недоступен на выбранные даты. Пожалуйста, выберите другие даты.');
        }
    }
});

// Функция для определения ID апартамента из карточки
function getApartmentIdFromCard(apartmentCard) {
    const title = apartmentCard.querySelector('.apartment-title').textContent;
    
    const titleToIdMap = {
        'Шале': 'shale',
        'Лесной домик': 'forest_house',
        'Палаточные места': 'tent_places',
        'Хостел': 'hostel',
        'Купеческие апартаменты': 'merchant_apartment',
        'Швейцарские апартаменты': 'swiss_apartment',
        'Дом у пляжа': 'beach_house',
        'Гостиница Стандарт': 'hotel_standard'
    };
    
    return titleToIdMap[title] || 'shale'; // fallback
}

// Функция перенаправления на страницу бронирования
function redirectToBookingPage(apartmentId, checkIn, checkOut, adults, children03, children416) {
    // Создаем URL с параметрами
    const params = new URLSearchParams({
        checkin: checkIn,
        checkout: checkOut,
        adults: adults,
        children03: children03,
        children416: children416
    });
    
    // Перенаправляем на соответствующую страницу бронирования
    window.location.href = `booking_${apartmentId}.html?${params.toString()}`;
}

// Также добавляем обработчик для кнопки "Забронировать" в шапке
document.querySelector('.btn-book').addEventListener('click', function() {
    // Перенаправляем на страницу апартаментов для выбора
    window.location.href = 'apartments.html';
});

// Обработчик для мобильной кнопки бронирования
document.querySelector('.mobile-btn-book').addEventListener('click', function() {
    window.location.href = 'apartments.html';
});