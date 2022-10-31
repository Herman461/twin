const categoryReviewsSlider = new Swiper('.category-reviews-body', {
    speed: 800,
    spaceBetween: 40,
    pagination: {
        el: ".category-reviews .dots",
        clickable: true,
    },
    navigation: {
        nextEl: ".category-reviews .button-next",
        prevEl: ".category-reviews .button-prev",
    },
})

