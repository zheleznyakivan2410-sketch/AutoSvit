document.addEventListener('DOMContentLoaded', function () {
    // Ініціалізація слайдера "Як це працює?"
    if (document.querySelector('.steps-slider')) {
      const stepsSwiper = new Swiper('.steps-slider', {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 30,
          navigation: {
            nextEl: '.steps-slider-container .swiper-button-next',
            prevEl: '.steps-slider-container .swiper-button-prev',
          },
          breakpoints: {
              // на екранах більше 768px показувати 2 блоки
              768: {
                slidesPerView: 2,
              }
            }
        });
    }
});