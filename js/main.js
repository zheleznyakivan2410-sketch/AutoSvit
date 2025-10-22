$(document).ready(function(){
  // Ініціалізація слайдера відгуків
  if ($('.reviews-slider').length) {
    $('.reviews-slider').owlCarousel({
      loop: true,
      margin: 30,
      nav: true, // Вмикаємо стрілки
      dots: false, // Вимикаємо точки
      responsive:{
          0:{
              items:1
          },
          768:{
              items:2
          },
          992:{
              items:3
          }
        }
    });
  }

  // Логіка для гамбургер-меню
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.main-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      // Перемикаємо класи для анімації
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

});