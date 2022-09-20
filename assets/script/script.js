// Swiper-build
let sliders = document.querySelectorAll(".swiper");
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-build')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement("div");
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = "";
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-build');
        }
    }
    sliders_build_callback();
}

function sliders_build_callback() { }

let slideUp = (target, duration = 500) => {
    if (!target.classList.contains('slide')) {
        target.classList.add('slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration);
    }
}

let slideDown = (target, duration = 500) => {
    if (!target.classList.contains('slide')) {
        target.classList.add('slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration);
    }
}

let slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}

let spoilersArray = document.querySelectorAll("[data-spoilers]");

if (spoilersArray.length > 0) {
    // Получение обычный спойлеров
    const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
        return !item.dataset.spoilers.split(",")[0];
    })
    // Инициализация обычных спойлеров
    if (spoilersRegular.length > 0) {
        initSpoilers(spoilersRegular);
    }

    // Получение спойлеров с медиа запросами
    const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
        return item.dataset.spoilers.split(",")[0];
    })

    // Инициализация спойлеров с медиа запросами
    if (spoilersMedia.length > 0) {
        const breakpointsArray = [];

        spoilersMedia.forEach(item => {
            const params = item.dataset.spoilers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        })

        // Получаем уникальные брейкпоинты
        let mediaQueries = breakpointsArray.map(item => {
            return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
        });

        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        })

        // Работаем с каждым брейкпоинтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Объекты с нужными условиями
            const spoilersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            })
            matchMedia.addEventListener("change", function () {
                initSpoilers(spoilersArray, matchMedia)
            })
            initSpoilers(spoilersArray, matchMedia);
        })
    }

    // Инициализация
    function initSpoilers(spoilersArray, matchMedia = false) {
        spoilersArray.forEach(spoilersBlock => {
            spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
            if (matchMedia.matches || !matchMedia) {
                spoilersBlock.classList.add("init");
                initSpoilerBody(spoilersBlock);
                spoilersBlock.addEventListener("click", setSpoilerAction);
            } else {
                spoilersBlock.classList.remove("init");
                initSpoilerBody(spoilersBlock, false);
                spoilersBlock.removeEventListener("click", setSpoilerAction);
            }
        })
    }

    // Работа с контентом
    function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
        const spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
        if (spoilerTitles.length > 0) {
            spoilerTitles.forEach(spoilerTitle => {
                if (hideSpoilerBody) {
                    spoilerTitle.removeAttribute("tabindex");
                    if (!spoilerTitle.classList.contains("active")) {
                        spoilerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spoilerTitle.setAttribute("tabindex", "-1");
                    spoilerTitle.nextElementSibling.hidden = false;
                }
            })
        }
    }
    function setSpoilerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
            const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
            const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
            const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
            if (!spoilersBlock.querySelectorAll(".slide").length) {
                if (oneSpoiler && !spoilerTitle.classList.contains("active")) {
                    hideSpoilerBody(spoilersBlock);
                }
                spoilerTitle.classList.toggle("active");
                slideToggle(spoilerTitle.nextElementSibling, 500)
            }
            e.preventDefault();
        }
    }
    function hideSpoilerBody(spoilersBlock) {
        const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler].active');
        if (spoilerActiveTitle) {
            spoilerActiveTitle.classList.remove("active");
            slideUp(spoilerActiveTitle.nextElementSibling, 500)
        }
    }
}


const tabLinks = document.querySelectorAll(".tabs-button");
const tabContent = document.querySelectorAll(".tabs-content");


tabLinks.forEach(function(el) {
    el.addEventListener("mouseenter", openTabs);
});

if (document.querySelector('.paging') && document.querySelector('.side')) {
    const paging = document.querySelector('.paging')
    const side = document.querySelector('.side')
    const pagingHeight = paging.offsetHeight
    side.style.paddingBottom = 'calc(3.125rem + ' + pagingHeight + 'px)'
}

function openTabs(el) {
    const btnTarget = el.currentTarget;
    const title = btnTarget.dataset.tabTitle;

    tabContent.forEach(function(el) {
        el.classList.remove("active");
    });

    tabLinks.forEach(function(el) {
        el.classList.remove("active");
    });

    document.querySelector("#" + title).classList.add("active");

    btnTarget.classList.add("active");
}


function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();

const select = document.querySelectorAll('.select')
let activeSelect
for (let index = 0; index < select.length; ++index) {
    const item = select[index]
    const selectOption = item.querySelectorAll('option')
    const selectOptionLength = selectOption.length
    const selectedOption = item.querySelector('option[selected]')
    const disabledOption = item.querySelector('option[disabled]')
    const duration = 300

    item.querySelector('select').hidden = true

    const head = document.createElement('div')
    const text = document.createElement('span')

    head.classList.add('select__head')

    text.textContent = disabledOption ? disabledOption.textContent : selectedOption.textContent
    head.append(text)
    item.append(head)

    const icon = item.querySelector('.select__icon')

    if (icon) {
        head.append(icon)
    }

    const selectList = document.createElement('ul')
    selectList.classList.add('select__list')
    item.append(selectList)

    if (!disabledOption) {
        const newOption = document.createElement('li')
        newOption.textContent = selectedOption ? selectedOption.textContent : selectOption[0].textContent
        newOption.classList.add('select__item')
        newOption.dataset.value = selectedOption ? selectedOption.value : selectOption[0].textContent
        selectList.append(newOption)
    }
    for (let index = 1; index < selectOptionLength; index++) {
        const newOption = document.createElement('li')
        newOption.textContent = selectOption[index].textContent
        newOption.classList.add('select__item')
        newOption.dataset.value = selectOption[index].value
        selectList.append(newOption)
    }

    selectList.hidden = true
    head.addEventListener('click', function(e) {
        if (!document.querySelector('.select__list.slide') && e.target.closest('.select__head')) {
            if (activeSelect && !e.target.closest('.select__head').nextElementSibling.isEqualNode(activeSelect)) {
                slideUp(activeSelect)
                activeSelect.closest('.select').querySelector('.select__head').classList.remove('active')
            }
            activeSelect = e.target.closest('.select__head').nextElementSibling
            e.currentTarget.classList.toggle('active')
            slideToggle(selectList)
        }
    })
    selectList.addEventListener('click', function(e) {
        if (e.target.closest('.select__item')) {
            const target = e.target.closest('.select__item')
            const value = target.dataset.value
            let newSelectedEl = item.querySelector(`option[value="${value}"]`)
            const oldSelectedEl = item.querySelector('option[selected]')
            if (!newSelectedEl) {
                for (let index = 1; index < selectOptionLength; index++) {
                    const option = selectOption[index]
                    if (option.textContent == value) {
                        newSelectedEl = option
                    }
                }
            }

            if (oldSelectedEl) {
                oldSelectedEl.removeAttribute('selected')
            }
            if (newSelectedEl) {
                newSelectedEl.setAttribute('selected', 'selected')
                text.textContent = newSelectedEl.textContent
            }
            head.classList.remove('active')
            activeSelect = null
            e.target.closest('.select').querySelector('select').dispatchEvent(new Event('change'))
            slideUp(selectList)
        }
    })
}

window.addEventListener('click', function(e) {

    if (
        document.querySelector('.select__head.active')
        && !e.target.closest('.select')
        && !document.querySelector('.select__list.slide')
    ) {
        activeSelect.closest('.select').querySelector('.select__head').classList.remove('active')
        slideUp(activeSelect)
        activeSelect = null
    }
})



const menuLinks = document.querySelectorAll('.menu-link')

if (menuLinks.length > 0) {
    for (let index = 0; index < menuLinks.length; index++) {
        const link = menuLinks[index]

        if (!link.nextElementSibling || !link.nextElementSibling.classList.contains('submenu')) continue

        link.addEventListener('mouseenter', function() {
            if (!window.matchMedia("(min-width: 1100.98px)").matches) return
            if (document.querySelector('.submenu.active')) {
                const activeSubmenu = document.querySelector('.submenu.active')
                activeSubmenu.classList.remove('active')
                activeSubmenu.classList.remove('active')
                activeSubmenu.previousElementSibling.classList.remove('active')
            }
            const submenu = link.nextElementSibling
            submenu.classList.add('active')
            link.classList.add('active')
        })
        link.addEventListener('click', function(e) {
            e.preventDefault()
            const submenu = link.nextElementSibling
            submenu.classList.add('active')
            link.classList.add('active')
        })
    }
}


window.addEventListener('mousemove', function(e) {
    if (!window.matchMedia("(min-width: 1100.98px)").matches) return
    if (document.querySelector('.submenu.active') && !e.target.closest('.header')) {
        document.querySelector('.submenu.active').classList.remove('active')
        document.querySelector('.menu-link.active').classList.remove('active')
    }
})


const iconMenu = document.querySelector('.icon-menu')

if (iconMenu) {
    iconMenu.addEventListener('click', function(e) {
        iconMenu.classList.toggle('active')
        document.querySelector('.menu').classList.toggle('active')
        document.body.classList.toggle('hidden')
    })
}

function each(arr, callback) {
    arr.forEach(function (el, i) {
        callback(el, i, arr);
    })
}

const optionsSlider = document.querySelector('.options-slider')
const clientCasesSlider = document.querySelector('.client-cases-slider')

each([optionsSlider, clientCasesSlider], initSlider)

function initSlider(item) {
    if (!item) return

    const slider = new Swiper(item, {
        speed: 1000,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 'auto',
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
            nextEl: item.parentElement.querySelector(".button-next"),
            prevEl: item.parentElement.querySelector(".button-prev")
        },
    })
}

if (document.querySelector('.usage-slider')) {
    const usageSlider = new Swiper('.usage-slider', {
        speed: 1000,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            992: {
                slidesPerView: 3,
                loop: false,
                spaceBetween: 0
            },
            670: {
                slidesPerView: 2,
                spaceBetween: 30,
            }
        },
        navigation: {
            nextEl: ".usage .button-next",
            prevEl: ".usage .button-prev",
        },
    })

}

//
// // возвращает куки с указанным name
// function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }
//


if (document.querySelectorAll('.audio').length > 0) {
    const audio = GreenAudioPlayer.init({
        selector: '.audio',
        showTooltips: true,
    })
    const playPauseButtons = document.querySelectorAll('.audio .play-pause-btn')

    for (let index = 0; index < playPauseButtons.length; index++) {
        const button = playPauseButtons[index]

        button.addEventListener('click', function(e) {
            const activeButtons = document.querySelectorAll('.play-pause-btn[title="Pause"]')
            const audio = e.target.closest('.audio').querySelector('audio')

           if (activeButtons.length > 0) {
               for (let index = 0; index < activeButtons.length; index++) {
                   const item = activeButtons[index]
                   const activeAudio = item.closest('.audio').querySelector('audio');

                   if (!activeAudio.isEqualNode(audio)) {
                       GreenAudioPlayer.pausePlayer(activeAudio)
                   }


               }
           }

           if (e.target.closest('.play-pause-btn').getAttribute('title') === 'Pause') {
               GreenAudioPlayer.playPlayer(audio)
           } else {
               GreenAudioPlayer.pausePlayer(audio)
           }
        }, true)
    }

}

function setStyleForBlind() {
    document.body.classList.add('blind')
    document.body.style.zoom = 1.3
    // document.documentElement.style.setProperty('--white-2', '#222222')
    // document.documentElement.style.setProperty('--white', '#111111')
    // document.documentElement.style.setProperty('--dark', '#ffffff')
    // document.documentElement.style.setProperty('--body-color', '#ffffff')
    // document.documentElement.style.setProperty('--txt-color-blue', '#ffffff')
    // document.documentElement.style.setProperty('--grey-light', '#ffffff')
    // document.documentElement.style.setProperty('--placeholder-color', '#ffffff')
    document.documentElement.style.setProperty('--blue', '#d9d9d9')
    document.documentElement.style.setProperty('--txt-color-white', '#000')
}

function removePropertyForBlind() {
    document.body.classList.remove('blind')
    document.body.style.zoom = 1
    document.documentElement.style.removeProperty('--txt-color-white')
    document.documentElement.style.removeProperty('--blue')
    // document.documentElement.style.removeProperty('--body-font-size')
    // document.documentElement.style.removeProperty('--blue')
    // document.documentElement.style.removeProperty('--white-2')
    // document.documentElement.style.removeProperty('--white')
    // document.documentElement.style.removeProperty('--dark')
    // document.documentElement.style.removeProperty('--body-color')
    // document.documentElement.style.removeProperty('--grey-light')

    // document.documentElement.style.removeProperty('--placeholder-color')
}

window.addEventListener('DOMContentLoaded', function() {

    if (document.cookie) {
        if (getCookie('is-blind')) {
            setStyleForBlind()
        }
    }
})
if (document.querySelector('#blind')) {
    document.querySelector('#blind').addEventListener('click', function(e) {
        window.scrollTo(0, 0)

        if (document.body.classList.contains('blind')) {
            document.cookie = 'is-blind=1;max-age=-1'
            removePropertyForBlind()
        } else {
            document.cookie = 'is-blind=1;blind-value=1'
            setStyleForBlind()
        }
        e.preventDefault()
    })
}


// document.querySelector('#blind-logout').addEventListener('click', function(e) {
//     document.cookie = 'is-blind=1;max-age=-1'
//     document.querySelector('.blind-form').style.display = 'none'
//     removePropertyForBlind()
//
//     e.preventDefault()
// })
if (document.querySelector('.side') && window.matchMedia("(min-width: 991.98px)").matches) {
    document.querySelector('.side').style.width = 'calc(' + getComputedStyle(document.querySelector('.side').parentElement, true).width + ' - 3.125rem)'
}
window.addEventListener('resize', function() {
    if (document.querySelector('.side')) {
        if (!window.matchMedia("(min-width: 991.98px)").matches) return
        document.querySelector('.side').style.width = 'calc(' + getComputedStyle(document.querySelector('.side').parentElement, true).width + ' - 3.125rem)'
    }
})

if (document.querySelector('.header')) {
    document.querySelector('.header-search img').addEventListener('click', function() {
        document.querySelector('.header-search__body').classList.add('active')
        if (iconMenu.classList.contains('active')) {
            iconMenu.classList.remove('active')
            document.querySelector('.menu').classList.remove('active')
            document.body.classList.remove('hidden')
        }
    })
    window.addEventListener('click', function(e) {
        if (!e.target.closest('.header-search') && document.querySelector('.header-search__body.active')) {
            document.querySelector('.header-search__body').classList.remove('active')
        }
    })

}


if (document.querySelector('#copyToClipBoardBtn')) {
    const copyUrlBtn = document.querySelector('#copyToClipBoardBtn');

    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', function(e) {
            let tempInput = document.createElement('textarea');

            tempInput.style.fontSize = '12pt';
            tempInput.style.border = '0';
            tempInput.style.padding = '0';
            tempInput.style.margin = '0';
            tempInput.style.position = 'absolute';
            tempInput.style.left = '-9999px';
            tempInput.setAttribute('readonly', '');

            tempInput.value = window.location.href;

            copyUrlBtn.parentNode.appendChild(tempInput);

            tempInput.select();
            tempInput.setSelectionRange(0, 99999);

            document.execCommand('copy');

            tempInput.parentNode.removeChild(tempInput);
            e.preventDefault()
        });
    }
}



// функция возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
// let cookiecook = getCookie("cookiecook"),
//     cookiewin = document.getElementsByClassName('cookie_notice')[0];
//
// cookiewin.classList.add("d-none")
// // проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
// if (cookiecook != "no") {
//     // показываем
//     // cookiewin.style.display="block";
//     cookiewin.classList.add("d-block");
//     cookiewin.classList.remove("d-none");
//     // закрываем по клику
//     document.getElementById("cookie_close").addEventListener("click", function(){
//         cookiewin.classList.add("d-none")
//         // записываем cookie на 1 день, с которой мы не показываем окно
//         let date = new Date;
//         date.setDate(date.getDate() + 1);
//         document.cookie = "cookiecook=no; path=/; expires=" + date.toUTCString();
//     });
// }

const cookieCloseButton = document.querySelector('.cookie-close')

if (cookieCloseButton) {
    cookieCloseButton.addEventListener('click', function() {

        document.querySelector('.cookie').classList.remove('active')
    })
}

// if (document.querySelector('.side')) {
//     let offset = 0;
//     window.addEventListener('scroll', function(e) {
//         const side = document.querySelector('.side')
//         // const sideTop = side.getBoundingClientRect().top
//         const sideOffset = side.scrollHeight
//         const sideTop = document.querySelector('.page').scrollHeight - sideOffset
//         // console.log(sideTop)
//         // if (side.classList.contains('fixed') && sideTop < document.documentElement.scrollTop) {
//         //     side.classList.remove('fixed')
//         //     // return
//         // }
//
//         if (document.documentElement.scrollTop < offset) {
//             side.style.top = '0'
//         } else {
//             side.style.top = '-100%'
//         }
//         offset = document.documentElement.scrollTop
//     })
// }

if (window.matchMedia('(min-width: 991.98px)')) {
    let sidebar
    let pageHeight = document.querySelector('.page').offsetHeight
    if (document.querySelector('.side')) {
        sidebar = new StickySidebar('.side', {topSpacing: 20, bottomSpacing: 20});
    }

    window.addEventListener('scroll', function(e) {
        console.log(document.querySelector('.page').offsetHeight)
        if (pageHeight !== document.querySelector('.page').offsetHeight) {
            pageHeight = document.querySelector('.page').offsetHeight
            sidebar = new StickySidebar('.side', {topSpacing: 20, bottomSpacing: 20});
        }

    })

}
