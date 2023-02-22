const basePartnerSliders = document.querySelectorAll('.base-partner-slider')

if (basePartnerSliders.length > 0) {
    for (let index = 0; index < basePartnerSliders.length; index++) {
        const basePartnerSlider = basePartnerSliders[index]

        new Swiper(basePartnerSlider, {
            speed: 800,
            loop: false,
            slidesPerView: 'auto',
            spaceBetween: 40,
            // autoHeight: true,
            navigation: {
                nextEl: basePartnerSlider.parentElement.querySelector(".button-next"),
                prevEl: basePartnerSlider.parentElement.querySelector(".button-prev")
            },
            breakpoint: {
                767.98: {
                    slidesPerView: 1,
                }
            }
            // // autoplay: {
            // //     delay: 2000,
            // // },
            // // autoHeight: true,

        })
    }
}


