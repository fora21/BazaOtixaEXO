// Services Slider
let currentSlide = 0;
let slideInterval;
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50; // Минимальная дистанция для распознавания свайпа

function initServicesSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    const sliderContainer = document.querySelector('.slider-container');
    
    // Очищаем контейнер точек перед созданием новых
    dotsContainer.innerHTML = '';
    
    // Create dots - только по количеству слайдов (6)
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Добавляем обработчики для свайпа (только для мобильных устройств)
    addSwipeSupport(sliderContainer);
    
    // Start auto slide
    startAutoSlide();
    
    // Pause on hover
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Функция добавления поддержки свайпа
function addSwipeSupport(element) {
    if (!element) return;
    
    // Обработчики для тач-устройств
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Оптимизация для тач-устройств
    element.style.touchAction = 'pan-y';
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
    const diff = touchStartX - touchEndX;
    
    // Проверяем, был ли свайп достаточно длинным
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
        // Останавливаем автопрокрутку при свайпе
        stopAutoSlide();
        
        if (diff > 0) {
            // Свайп влево - следующий слайд
            nextSlide();
        } else {
            // Свайп вправо - предыдущий слайд
            prevSlide();
        }
        
        // Перезапускаем автопрокрутку через 5 секунд
        setTimeout(startAutoSlide, 5000);
    }
    
    // Сбрасываем значения
    touchStartX = 0;
    touchEndX = 0;
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

// Добавляем функцию для перехода к предыдущему слайду
function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Promotions Modal
function openPromotion(promoId) {
    const modal = document.getElementById('promotionModal');
    const modalContent = document.getElementById('modalContent');
    
    const promotions = {
        1: {
            title: "Свадьба у нас!",
            content: `
                <h2>Свадьба у нас!</h2>
                <p>В такой знаменательный день для молодоженов, наша база отдыха предлагает 30% скидку при бронировании домиков в день проведения торжества!</p>
                <p><strong>Условия акции:</strong></p>
                <ul>
                    <li>Скидка 30% на проживание для молодоженов</li>
                    <li>Бесплатное украшение банкетного зала</li>
                    <li>Подарок от базы отдыха</li>
                    <li>Фотозона в подарок</li>
                </ul>
                <p>Для бронирования свяжитесь с нами по телефону: +7 (924) 543 76-23</p>
            `
        },
        2: {
            title: "День рождения",
            content: `
                <h2>День рождения</h2>
                <p>За неделю до или после дня рождения имениннику предоставляется скидка в размере 20%!</p>
                <p><strong>Условия акции:</strong></p>
                <ul>
                    <li>Скидка 20% на проживание имениннику</li>
                    <li>Действует за 7 дней до и после дня рождения</li>
                    <li>При предъявлении документа, удостоверяющего личность</li>
                    <li>Дополнительный подарок от базы отдыха</li>
                </ul>
            `
        },
        3: {
            title: "Путевка выходного дня на двоих",
            content: `
                <h2>Путевка выходного дня на двоих</h2>
                <p>Путевка на двое суток на двоих от 8 000. Посещение спа, завтрак, обед и ужин - всё включено! Скидка до 33%.</p>
                <p><strong>Включено в путевку:</strong></p>
                <ul>
                    <li>Проживание 2 суток в комфортабельном номере</li>
                    <li>Питание: завтрак, обед, ужин (шведский стол)</li>
                    <li>Посещение СПА-зоны</li>
                    <li>Бесплатный Wi-Fi</li>
                    <li>Парковка</li>
                </ul>
            `
        },
        4: {
            title: "Раннее бронирование",
            content: `
                <h2>Раннее бронирование</h2>
                <p>Забронируйте отдых за 3 месяца до заезда и получите скидку 15% на проживание и 10% на все развлечения!</p>
                <p><strong>Преимущества раннего бронирования:</strong></p>
                <ul>
                    <li>Гарантированное размещение в выбранные даты</li>
                    <li>Лучшие цены на проживание</li>
                    <li>Дополнительные скидки на развлечения</li>
                    <li>Бесплатная отмена за 14 дней до заезда</li>
                </ul>
            `
        },
        5: {
            title: "Корпоративный отдых",
            content: `
                <h2>Корпоративный отдых</h2>
                <p>При заказе корпоративного мероприятия для группы от 10 человек - организация тимбилдинга в подарок!</p>
                <p><strong>Что мы предлагаем для корпоративов:</strong></p>
                <ul>
                    <li>Организация тимбилдинга (на выбор)</li>
                    <li>Отдельный конференц-зал</li>
                    <li>Индивидуальное меню</li>
                    <li>Трансфер от города</li>
                    <li>Фотограф на мероприятие</li>
                </ul>
            `
        }
    };
    
    const promotion = promotions[promoId];
    if (promotion) {
        modalContent.innerHTML = promotion.content;
        modal.style.display = 'block';
    }
}

function closePromotion() {
    const modal = document.getElementById('promotionModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('promotionModal');
    if (event.target === modal) {
        closePromotion();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initServicesSlider();
});
// Promotions Horizontal Slider
let currentPromotionSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

function initPromotionsSlider() {
    const slider = document.getElementById('promotionsSlider');
    const prevBtn = document.getElementById('promotionsPrev');
    const nextBtn = document.getElementById('promotionsNext');
    const indicatorsContainer = document.getElementById('promotionsIndicators');
    const slides = document.querySelectorAll('.promotion-slide');
    const slidesCount = slides.length;

    // Create indicators
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < slidesCount; i++) {
        const indicator = document.createElement('div');
        indicator.className = `slider-indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToPromotionSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    // Touch events for mobile
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);

    // Mouse events for desktop
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', touchEnd);

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        goToPromotionSlide(currentPromotionSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToPromotionSlide(currentPromotionSlide + 1);
    });

    // Auto slide
    startAutoPromotionSlide();

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPromotionSlide);
    slider.addEventListener('mouseleave', startAutoPromotionSlide);
}

function goToPromotionSlide(index) {
    const slides = document.querySelectorAll('.promotion-slide');
    const indicators = document.querySelectorAll('.slider-indicator');
    const slidesCount = slides.length;

    if (index >= slidesCount) {
        currentPromotionSlide = 0;
    } else if (index < 0) {
        currentPromotionSlide = slidesCount - 1;
    } else {
        currentPromotionSlide = index;
    }

    // Update slider position
    const slider = document.getElementById('promotionsSlider');
    const slideWidth = slides[0].offsetWidth + 30; // width + gap
    slider.style.transform = `translateX(-${currentPromotionSlide * slideWidth}px)`;

    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentPromotionSlide);
    });

    // Reset auto slide
    stopAutoPromotionSlide();
    startAutoPromotionSlide();
}

function startAutoPromotionSlide() {
    stopAutoPromotionSlide();
    slideInterval = setInterval(() => {
        goToPromotionSlide(currentPromotionSlide + 1);
    }, 5000);
}

function stopAutoPromotionSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Touch/Mouse events for dragging
function touchStart(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
        event.preventDefault();
    }
    
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
}

function touchMove(event) {
    if (!isDragging) return;
    
    const currentPosition = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const diff = currentPosition - startPos;
    
    if (Math.abs(diff) > 10) { // Minimum drag distance
        event.preventDefault();
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -100) {
        goToPromotionSlide(currentPromotionSlide + 1);
    } else if (movedBy > 100) {
        goToPromotionSlide(currentPromotionSlide - 1);
    }
    
    setSliderPosition();
    slider.classList.remove('grabbing');
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Обновляем функцию инициализации в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initServicesSlider();
    initPromotionsSlider(); // Добавляем инициализацию слайдера акций
});