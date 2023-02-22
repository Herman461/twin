const basePartnerSliders = document.querySelectorAll('.base-partner-slider')

const basePartnerSwiperSliders = []
if (basePartnerSliders.length > 0) {
    for (let index = 0; index < basePartnerSliders.length; index++) {
        const basePartnerSlider = basePartnerSliders[index]

        const slider = new Swiper(basePartnerSlider, {
            speed: 800,
            loop: true,
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
                    loop: false,
                }
            }
            // // autoplay: {
            // //     delay: 2000,
            // // },
            // // autoHeight: true,

        })
        basePartnerSwiperSliders.push(slider)
    }

}

const spoilerButtons = document.querySelectorAll('.spoiler')

window.addEventListener('click', function(e) {
    if (
        e.target.closest('.spoiler')
        && e.target.closest('.spoiler').classList.contains('active')
    ) {
        setTimeout(function() {
            for (let index = 0; index < basePartnerSwiperSliders.length; index++) {
                const slider = basePartnerSwiperSliders[index]

                slider.update()

            }
        }, 500)

    }
})
