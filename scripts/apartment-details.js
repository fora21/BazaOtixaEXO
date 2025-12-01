// Галерея и лайтбокс - с полным набором фотографий
class ApartmentGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.allImages = [];
        this.init();
    }

    init() {
        this.setupGallery();
        this.setupLightbox();
    
    }

    setupGallery() {
        const mainImage = document.querySelector('.main-image');
        const thumbnails = document.querySelectorAll('.thumbnail:not(.more-photos)');
        const morePhotos = document.querySelector('.more-photos');

        // Собираем все изображения
        this.collectAllImages();

        // Обработчики для ДВУХ миниатюр - только меняют основное фото
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.setMainImage(index);
            });
        });

        // ТОЛЬКО блок +X фото открывает лайтбокс
        if (morePhotos) {
            morePhotos.addEventListener('click', () => {
                this.openLightbox(0);
            });
        }

        // Основное изображение НЕ открывает лайтбокс
        mainImage.style.cursor = 'default';
    }

    collectAllImages() {
        // Основное изображение
        const mainImage = document.querySelector('.main-image').src;
        
        // ДВЕ миниатюры
        const thumbnails = document.querySelectorAll('.thumbnail:not(.more-photos) img');
        const thumbImages = Array.from(thumbnails).map(thumb => thumb.src);
        
        // Объединяем видимые изображения
        this.allImages = [mainImage, ...thumbImages];
        
        // ДОБАВЛЯЕМ ОСТАЛЬНЫЕ 10 ФОТОГРАФИЙ
        // Замените пути на ваши реальные пути к фотографиям
        const apartmentType = this.getApartmentType();
        this.addAdditionalImages(apartmentType);
    }

    getApartmentType() {
        // Определяем тип апартамента из URL или заголовка
        const url = window.location.pathname;
        const pageName = url.split('/').pop().replace('.html', '');
        return pageName;
    }

    addAdditionalImages(apartmentType) {
        // Добавляем дополнительные фото в зависимости от типа апартамента
        const additionalImages = this.getAdditionalImagesForApartment(apartmentType);
        this.allImages = [...this.allImages, ...additionalImages];
    }

    getAdditionalImagesForApartment(apartmentType) {
        // Возвращаем массив с путями к дополнительным фото
        // ЗАМЕНИТЕ ЭТИ ПУТИ НА ВАШИ РЕАЛЬНЫЕ ПУТИ К ФОТОГРАФИЯМ
        
        const imagePaths = {
            'shale': [
                '../images/apartments/shale/shale5.jpg',
                '../images/apartments/shale/shale6.jpg', 
                '../images/apartments/shale/shale7.jpg',
                '../images/apartments/shale/shale8.jpg',
                '../images/apartments/shale/shale9.jpg',
                '../images/apartments/shale/shale10.jpg',
                '../images/apartments/shale/shale11.jpg',
                '../images/apartments/shale/shale12.jpg',
                '../images/apartments/shale/shale13.jpg',
                '../images/apartments/shale/shale14.jpg'
            ],
            'forest_house': [
                '../images/apartments/forest_house/forest5.jpg',
                '../images/apartments/forest_house/forest6.jpg',
                '../images/apartments/forest_house/forest7.jpg',
                '../images/apartments/forest_house/forest8.jpg',
                '../images/apartments/forest_house/forest9.jpg',
                '../images/apartments/forest_house/forest10.jpg'
            ],
            'tent_places': [
                '../images/apartments/tent_places/tent5.jpg',
                '../images/apartments/tent_places/tent6.jpg',
                '../images/apartments/tent_places/tent7.jpg',
                '../images/apartments/tent_places/tent8.jpg'
            ],
            'hostel': [
                '../images/apartments/hostel/hostel5.jpg',
                '../images/apartments/hostel/hostel6.jpg',
                '../images/apartments/hostel/hostel7.jpg'
            ],
            'merchant_apartment': [
                '../images/apartments/merchant_apartment/merchant5.jpg',
                '../images/apartments/merchant_apartment/merchant6.jpg',
                '../images/apartments/merchant_apartment/merchant7.jpg',
                '../images/apartments/merchant_apartment/merchant8.jpg',
                '../images/apartments/merchant_apartment/merchant9.jpg',
                '../images/apartments/merchant_apartment/merchant10.jpg',
                '../images/apartments/merchant_apartment/merchant11.jpg'
            ],
            'swiss_apartment': [
                '../images/apartments/swiss_apartment/swiss5.jpg',
                '../images/apartments/swiss_apartment/swiss6.jpg',
                '../images/apartments/swiss_apartment/swiss7.jpg',
                '../images/apartments/swiss_apartment/swiss8.jpg',
                '../images/apartments/swiss_apartment/swiss9.jpg',
                '../images/apartments/swiss_apartment/swiss10.jpg'
            ],
            'beach_house': [
                '../images/apartments/beach_house/beach5.jpg',
                '../images/apartments/beach_house/beach6.jpg',
                '../images/apartments/beach_house/beach7.jpg',
                '../images/apartments/beach_house/beach8.jpg',
                '../images/apartments/beach_house/beach9.jpg',
                '../images/apartments/beach_house/beach10.jpg',
                '../images/apartments/beach_house/beach11.jpg',
                '../images/apartments/beach_house/beach12.jpg'
            ],
            'hotel_standard': [
                '../images/apartments/hotel_standard/hotel5.jpg',
                '../images/apartments/hotel_standard/hotel6.jpg',
                '../images/apartments/hotel_standard/hotel7.jpg',
                '../images/apartments/hotel_standard/hotel8.jpg'
            ]
        };

        return imagePaths[apartmentType] || [];
    }

    setMainImage(index) {
        const mainImage = document.querySelector('.main-image');
        const thumbnails = document.querySelectorAll('.thumbnail:not(.more-photos)');
        
        // Обновляем основное изображение
        mainImage.src = this.allImages[index];
        this.currentImageIndex = index;
        
        // Обновляем активную миниатюру
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    setupLightbox() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.querySelector('.lightbox-image');
        this.lightboxCounter = document.querySelector('.lightbox-counter');
        this.closeBtn = document.querySelector('.close-lightbox');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.thumbnailsContainer = document.querySelector('.lightbox-thumbnails');

        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));

        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'flex') {
                if (e.key === 'ArrowLeft') this.navigate(-1);
                else if (e.key === 'ArrowRight') this.navigate(1);
                else if (e.key === 'Escape') this.closeLightbox();
            }
        });
    }

    openLightbox(startIndex) {
        this.currentImageIndex = startIndex;
        this.showImage(startIndex);
        this.lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.createLightboxThumbnails();
    }

    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showImage(index) {
        this.currentImageIndex = index;
        this.lightboxImage.src = this.allImages[index];
        this.lightboxCounter.textContent = `${index + 1}/${this.allImages.length}`;
        
        document.querySelectorAll('.lightbox-thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    navigate(direction) {
        let newIndex = this.currentImageIndex + direction;
        if (newIndex < 0) newIndex = this.allImages.length - 1;
        if (newIndex >= this.allImages.length) newIndex = 0;
        this.showImage(newIndex);
    }

    createLightboxThumbnails() {
        this.thumbnailsContainer.innerHTML = '';
        
        this.allImages.forEach((src, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'lightbox-thumb';
            if (index === this.currentImageIndex) {
                thumb.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Фото ${index + 1}`;
            
            thumb.appendChild(img);
            thumb.addEventListener('click', () => {
                this.showImage(index);
            });
            
            this.thumbnailsContainer.appendChild(thumb);
        });
    }


}

document.addEventListener('DOMContentLoaded', () => {
    new ApartmentGallery();
});
