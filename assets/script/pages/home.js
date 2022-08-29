const introSlider = new Swiper('.intro-slider', {
    speed: 1000,
    loop: true,
    spaceBetween: 40,
    // autoplay: {
    //     delay: 2000,
    // },
    autoHeight: true,
    pagination: {
        el: ".intro-pagination",
        clickable: true,
    },
})

