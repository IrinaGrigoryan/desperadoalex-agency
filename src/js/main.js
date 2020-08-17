// Smooth scroll to navigation
$('.menu a[href^="#"]').click( function(){
    var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
        $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 800, 'linear');
    }
    return false;
});

//Burger menu
$(function() {
    $('.menu__icon').on('click', function() {
        $(this).closest('.menu').toggleClass('menu-opened');
    });
});

//Load more button
var galleryItems = [].slice.call(document.querySelectorAll('.gallery__item'));
var moreBtn = document.querySelector('.gallery__btn');

if (galleryItems && moreBtn) {
    var filteredItems = galleryItems.filter(function(item, index) {return index > 7});
    for (var i = 0; i < filteredItems.length; i++) {
        filteredItems[i].classList.add('js-hidden');
    }

    moreBtn.addEventListener('click', function() {
        for (var i = 0; i < filteredItems.length; i++) {
            filteredItems[i].classList.remove('js-hidden');
        }
        moreBtn.classList.add('js-hidden');
    });
}

//Quotes slider
$(".slider-quotes").slick({
    autoplay: true,
    autoplaySpeed: 4000,
    // fade: true,
    speed: 1500,
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true,
    accessibility: true,
    dots: true,
    arrows: false,
    appendDots: '.quotes__wrapper'
});
