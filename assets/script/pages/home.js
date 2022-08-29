const introSlider = new Swiper('.intro-slider', {
    speed: 1000,
    loop: true,
    spaceBetween: 40,
    autoplay: {
        delay: 2000,
    },
    autoHeight: true,
    pagination: {
        el: ".intro-pagination",
        clickable: true,
    },
})

const optionsSlider = new Swiper('.options-slider', {
    speed: 1000,
    loop: true,
    spaceBetween: 30,
    breakpoints: {
        1100: {
            spaceBetween: 50,
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 3,
        },
        670: {
          slidesPerView: 2
        }
    },
    navigation: {
        nextEl: ".options .button-next",
        prevEl: ".options .button-prev",
    },
})

const clientCasesSlider = new Swiper('.client-cases-slider', {
    speed: 1000,
    loop: true,
    spaceBetween: 30,
    breakpoints: {
        1100: {
            spaceBetween: 50,
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 3,
        },
        670: {
            slidesPerView: 2
        }
    },
    navigation: {
        nextEl: ".client-cases .button-next",
        prevEl: ".client-cases .button-prev",
    },
})

