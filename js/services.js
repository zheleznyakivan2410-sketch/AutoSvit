$(document).ready(function(){
    // Ініціалізація слайдера "Як це працює?"
    if ($('.steps-slider').length) {
      $('.steps-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
      });
    }
});