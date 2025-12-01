// Полный скрипт для страниц бронирования - с правильным порядком полей для Formspree
document.addEventListener('DOMContentLoaded', function() {
    // Данные апартаментов
    const apartmentsData = {
        'shale': {
            name: 'Шале',
            price: 35000,
            address: 'ул. Лесная, 5',
            image: '../images/apartments/shale1.jpg',
            formspree: 'https://formspree.io/f/xblnlddz'
        },
        'forest_house': {
            name: 'Лесной домик',
            price: 18000,
            address: 'ул. Таежная, 7',
            image: '../images/apartments/forest1.jpg',
            formspree: 'https://formspree.io/f/YOUR_FOREST_HOUSE_ENDPOINT'
        },
        'tent_places': {
            name: 'Палаточные места',
            price: 3000,
            address: 'Роща',
            image: '../images/apartments/tent1.jpg',
            formspree: 'https://formspree.io/f/YOUR_TENT_PLACES_ENDPOINT'
        },
        'hostel': {
            name: 'Хостел',
            price: 8000,
            address: 'ул. Молодежная, 21',
            image: '../images/apartments/hostel1.jpg',
            formspree: 'https://formspree.io/f/YOUR_HOSTEL_ENDPOINT'
        },
        'merchant_apartment': {
            name: 'Купеческие апартаменты',
            price: 32000,
            address: 'ул. Историческая, 3',
            image: '../images/apartments/merchant1.jpg',
            formspree: 'https://formspree.io/f/YOUR_MERCHANT_ENDPOINT'
        },
        'swiss_apartment': {
            name: 'Швейцарские апартаменты',
            price: 28000,
            address: 'ул. Горная, 15',
            image: '../images/apartments/swiss1.jpg',
            formspree: 'https://formspree.io/f/YOUR_SWISS_ENDPOINT'
        },
        'beach_house': {
            name: 'Дом у пляжа',
            price: 45000,
            address: 'ул. Пляжная, 8',
            image: '../images/apartments/beach1.jpg',
            formspree: 'https://formspree.io/f/YOUR_BEACH_HOUSE_ENDPOINT'
        },
        'hotel_standard': {
            name: 'Гостиница Стандарт',
            price: 15000,
            address: 'ул. Центральная, 12',
            image: '../images/apartments/hotel1.jpg',
            formspree: 'https://formspree.io/f/YOUR_HOTEL_ENDPOINT'
        }
    };

    // Получаем тип апартамента из URL
    function getApartmentType() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return filename.replace('booking_', '');
    }

    // Получаем параметры из URL
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            checkin: params.get('checkin') || '',
            checkout: params.get('checkout') || '',
            adults: parseInt(params.get('adults')) || 0,
            children03: parseInt(params.get('children03')) || 0,
            children416: parseInt(params.get('children416')) || 0
        };
    }

    // Основная функция инициализации
    function init() {
        const apartmentType = getApartmentType();
        const urlParams = getUrlParams();
        const apartment = apartmentsData[apartmentType];

        if (!apartment) {
            console.error('Апартамент не найден');
            return;
        }

        // Обновляем информацию на странице
        updatePageInfo(apartment);
        
        // Заполняем данные из URL
        fillFormData(urlParams);
        
        // Расчет стоимости
        calculateAndDisplayCost(urlParams.checkin, urlParams.checkout, apartment.price);
        
        // Настраиваем обработчики
        setupFormHandlers(apartment);
    }

    // Обновляем информацию об апартаменте
    function updatePageInfo(apartment) {
        const titleElement = document.querySelector('.apartment-title');
        const addressElement = document.querySelector('.apartment-address span');
        
        if (titleElement) titleElement.textContent = apartment.name;
        if (addressElement) addressElement.textContent = apartment.address;

        const imageElement = document.querySelector('.apartment-image img');
        if (imageElement && apartment.image) {
            imageElement.src = apartment.image;
        }
    }

    // Заполняем форму данными из URL
    function fillFormData(urlParams) {
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput && urlParams.checkin) checkinInput.value = urlParams.checkin;
        if (checkoutInput && urlParams.checkout) checkoutInput.value = urlParams.checkout;

        const totalGuests = urlParams.adults + urlParams.children03 + urlParams.children416;
        const guestsInput = document.getElementById('guests');
        if (guestsInput && totalGuests > 0) {
            guestsInput.value = totalGuests;
        }
    }

    // Расчет количества ночей
    function calculateNights(checkin, checkout) {
        if (!checkin || !checkout) return 0;
        
        const start = new Date(checkin);
        const end = new Date(checkout);
        const timeDiff = end.getTime() - start.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    // Расчет и отображение стоимости
    function calculateAndDisplayCost(checkin, checkout, pricePerNight) {
        const nights = calculateNights(checkin, checkout);
        const totalCost = nights * pricePerNight;
        const advancePayment = Math.round(totalCost * 0.12);
        const finalPayment = totalCost - advancePayment;

        // Обновляем видимое отображение
        updateDisplay(nights, totalCost, advancePayment, finalPayment);
        
        // Обновляем скрытые поля для Formspree
        updateHiddenFields(totalCost, advancePayment, finalPayment);
    }

    // Обновляем видимое отображение стоимости
    function updateDisplay(nights, totalCost, advancePayment, finalPayment) {
        const nightsElement = document.getElementById('totalNights');
        const totalCostElement = document.getElementById('totalCost');
        const advanceElement = document.getElementById('advancePayment');
        const finalElement = document.getElementById('finalPayment');

        if (nightsElement) nightsElement.textContent = nights;
        if (totalCostElement) totalCostElement.textContent = formatPrice(totalCost);
        if (advanceElement) advanceElement.textContent = formatPrice(advancePayment);
        if (finalElement) finalElement.textContent = formatPrice(finalPayment);
    }

    // Обновляем скрытые поля для отправки в Formspree
    function updateHiddenFields(totalCost, advancePayment, finalPayment) {
        const totalCostInput = document.getElementById('total_cost');
        const advanceInput = document.getElementById('advance_payment');
        const finalInput = document.getElementById('final_payment');

        if (totalCostInput) totalCostInput.value = totalCost;
        if (advanceInput) advanceInput.value = advancePayment;
        if (finalInput) finalInput.value = finalPayment;
    }

    // Форматирование цены
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    }

    // Валидация поля
    function validateField(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        
        if (!errorElement) return true;

        // Сбрасываем ошибку
        errorElement.style.display = 'none';
        errorElement.textContent = '';

        // Проверяем обязательные поля
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(errorElement, 'Это поле обязательно для заполнения');
            return false;
        }

        // Проверка email
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showError(errorElement, 'Введите корректный email');
                return false;
            }
        }

        // Проверка телефона
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            const digitsOnly = field.value.replace(/\D/g, '');
            if (!phoneRegex.test(field.value) || digitsOnly.length < 10) {
                showError(errorElement, 'Введите корректный номер телефона');
                return false;
            }
        }

        return true;
    }

    // Показать ошибку
    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Валидация всей формы
    function validateForm() {
        let isValid = true;
        const requiredFields = document.querySelectorAll('#bookingForm input[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Настройка обработчиков формы
    function setupFormHandlers(apartment) {
        const form = document.getElementById('bookingForm');
        if (!form) return;

        // Валидация при вводе
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });

        // Обработка отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(apartment);
        });
    }

    // Обработка отправки формы - ПЕРЕПИСАНА ДЛЯ ПРАВИЛЬНОГО ПОРЯДКА ПОЛЕЙ
    function handleFormSubmit(apartment) {
        if (!validateForm()) {
            alert('Пожалуйста, заполните все обязательные поля корректно');
            return;
        }

        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        // Блокируем кнопку
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        // СОЗДАЕМ FORMData С ПРАВИЛЬНЫМ ПОРЯДКОМ ПОЛЕЙ
        const formData = new FormData();
        
        // 1. Имя
        const firstName = document.getElementById('firstName').value;
        formData.append('Имя', firstName);
        
        // 2. Фамилия
        const lastName = document.getElementById('lastName').value;
        formData.append('Фамилия', lastName);
        
        // 3. Телефон
        const phone = document.getElementById('phone').value;
        formData.append('Телефон', phone);
        
        // 4. Дополнительный телефон
        const additionalPhone = document.getElementById('additionalPhone').value;
        if (additionalPhone) {
            formData.append('Дополнительный телефон', additionalPhone);
        }
        
        // 5. Количество гостей
        const guests = document.getElementById('guests').value;
        formData.append('Количество гостей', guests);
        
        // 6. Пожелания
        const notes = document.getElementById('notes').value;
        if (notes) {
            formData.append('Пожелания', notes);
        }
        
        // 7. Дата заезда
        const checkin = document.getElementById('checkin').value;
        formData.append('Дата заезда', checkin);
        
        // 8. Дата выезда
        const checkout = document.getElementById('checkout').value;
        formData.append('Дата выезда', checkout);
        
        // 9. Полная сумма
        const totalCost = document.getElementById('total_cost').value;
        formData.append('Полная сумма', formatPrice(parseInt(totalCost)));
        
        // 10. Предоплата
        const advancePayment = document.getElementById('advance_payment').value;
        formData.append('Предоплата', formatPrice(parseInt(advancePayment)));
        
        // 11. Остаток к оплате
        const finalPayment = document.getElementById('final_payment').value;
        formData.append('Остаток к оплате', formatPrice(parseInt(finalPayment)));
        
        // 12. Email
        const email = document.getElementById('email').value;
        formData.append('Email', email);
        
        // 13. Тип апартамента (скрытое поле)
        const apartmentType = document.querySelector('input[name="apartment_type"]').value;
        formData.append('Тип апартамента', apartmentType);
        
        // 14. Цена за сутки (скрытое поле)
        const apartmentPrice = document.querySelector('input[name="apartment_price"]').value;
        formData.append('Цена за сутки', formatPrice(parseInt(apartmentPrice)));

        // Отправка через Formspree
        fetch(apartment.formspree, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка отправки формы');
            }
        })
        .then(data => {
            console.log('Форма успешно отправлена');
            showSuccessNotification();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
        })
        .finally(() => {
            // Разблокируем кнопку
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 3000);
        });
    }

    // Показать уведомление об успехе
    function showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">✅</div>
                <div class="notification-text">
                    <h3>Заявка отправлена!</h3>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
                    <p>Через 5 секунд вы будете перенаправлены на страницу с развлечениями.</p>
                </div>
                <button class="notification-close" id="closeNotification">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        const closeButton = document.getElementById('closeNotification');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                closeNotificationAndRedirect(notification);
            });
        }

        setTimeout(() => {
            closeNotificationAndRedirect(notification);
        }, 10000);
    }

    // Закрыть уведомление и перенаправить
    function closeNotificationAndRedirect(notification) {
        notification.classList.remove('show');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            window.location.href = '../pages/entertainment.html';
        }, 300);
    }

    // Запускаем инициализацию
    init();
});