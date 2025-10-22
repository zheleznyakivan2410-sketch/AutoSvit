document.addEventListener('DOMContentLoaded', function () {
  // Ініціалізація слайдера (якщо він є на сторінці)
  if (document.querySelector('.reviews-slider')) {
    const swiper = new Swiper('.reviews-slider', {
        loop: true,
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          }
        }
      });
  }

  // Логіка для кнопки "Вгору"
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  };

  scrollTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});