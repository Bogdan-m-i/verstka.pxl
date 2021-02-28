import {textarea} from './_textarea'
import {MySelect} from './_mySelect'
import { MyMask } from './_myMask'
import {toggles} from './_toggles'
import {range} from './_range'

window.addEventListener('DOMContentLoaded', function () {

    console.log('ok');

    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const isMobile = () => {
        if(window.matchMedia('(max-width: 992px)').matches) {
            return true
        }
        return false
    }

    const navbar = () => {
        const $nav = document.querySelector('.navbar')
        const $toggle = $nav.querySelector('.navbar__toggle')
        const $menu = $nav.querySelector('.navbar__menu')
        const linkList = $menu.querySelectorAll('a[href*="#"]')
        const $icon = $nav.querySelector('.navbar__toggle-img')

        const openClose = () => {
            if ($nav.classList.contains('navbar_open')) {
                $nav.classList.remove('navbar_open')
                window.removeEventListener('resize', resizeClose)
            } else {
                $nav.classList.add('navbar_open')
                window.addEventListener('resize', resizeClose)
            }
        }

        const resizeClose = () => {
            if (!isMobile()) {
                $nav.classList.remove('navbar_open')
                window.removeEventListener('resize', resizeClose)
            }
        }

        $toggle.addEventListener('click', openClose)

        $menu.addEventListener('click', (e) => {
            if (e.target.nodeName === 'A') {
                if (isMobile()) {
                    $nav.classList.remove('navbar_open')
                    window.removeEventListener('resize', resizeClose)
                }
            }
        })

        
        const scrollSpy = () => {
            const sectionListn = []
            
            linkList.forEach((el) => {
                let section = document.querySelector(el.getAttribute('href'))
            
                if (section) {
                    sectionListn.push({
                        id: el.getAttribute('href'),
                        top: window.scrollY + section.getBoundingClientRect().top,
                        bottom: window.scrollY + section.getBoundingClientRect().bottom
                    })
                }
            })

            window.addEventListener('scroll', () => {
                const offset = window.scrollY + (window.screen.height / 4)

                sectionListn.forEach((el) => {
                    if (el.top < offset && offset < el.bottom) {
                        $menu.querySelector(`[href="${el.id}"]`).classList.add('active')
                    } else {
                        $menu.querySelector(`[href="${el.id}"]`).classList.remove('active')
                    }
                })
            })
        }
        $menu.classList.contains('scroll-spy') ? scrollSpy() : null
    }
    navbar()

    const slider = () => {
        const $gallery = document.querySelector('.gallery')
        const $img = $gallery.querySelectorAll('img')

        const calcGalleryWidth = () => {
            const imgWidth = $img[0].clientWidth
            const imgPadding = parseFloat(getComputedStyle($img[0].parentNode).getPropertyValue('padding-right')) * 2
            const imgCount = $img.length

            const parentWidth = $img[0].parentNode.parentNode.clientWidth - (imgWidth + imgPadding) //Чтоб последний слайд не уезжал от правого края
            
            return (imgWidth + imgPadding) * (imgCount - 1) * -1 + parentWidth
        }

        const clearTransform = () => {
            if (!isMobile()) {
                $gallery.style.transform = `translateX(0px)`
                window.removeEventListener('resize', clearTransform)
            }
        }

        const setHeight = () => {
            $img.forEach((el) => {
                el.style.height = el.clientWidth + 'px'
            })
            let imgWidth = $img[0].clientWidth
        }
        setHeight()



        let Xstart = null
        let Xmove = null
        let tranformPos = null
        let galWith = null


        const touchStart = (e) => {
            Xstart = e.changedTouches[0].clientX
            tranformPos = parseFloat($gallery.style.transform.replace(/[^\-.\d]/g,"")) || 0;
            galWith = calcGalleryWidth()
        }

        const touchMove = (e) => {
            Xmove = e.changedTouches[0].clientX

            let offset = (Xstart - Xmove) * 1.3
            
            if (Math.abs(offset) > 20 && e.cancelable) { e.preventDefault() }

            let nextPos = (tranformPos - offset) < galWith ? galWith : (tranformPos - offset) > 0 ? 0 : (tranformPos - offset)

            $gallery.style.transform = `translateX(${nextPos}px)`
        }

        const touchEnd = () => {
            Xstart = null
            Xmove = null
            tranformPos = null
            galWith = null
        }

        if (isMobile()) {
            $gallery.addEventListener('touchstart', touchStart)
            $gallery.addEventListener('touchmove', touchMove)
            $gallery.addEventListener('touchend', touchEnd)
        }

        window.addEventListener('resize', () => {
            setHeight()
            if (isMobile) {
                $gallery.addEventListener('touchstart', touchStart)
                window.addEventListener('resize', clearTransform)
            } else {
                $gallery.removeEventListener('touchstart', touchStart)
                window.removeEventListener('resize', clearTransform)
            }
        })
    }
    slider()

    const map = () => {
        ymaps.ready(init);
        function init(){
            const myMap = new ymaps.Map("map", {
                center: [56.840646, 60.612180],
                zoom: 16,
                controls: ['geolocationControl', 'zoomControl'],
            });

            const myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [56.840646, 60.612180]
                }
            });
    
            myMap.geoObjects.add(myGeoObject);
        }
    }
    map()

    function modal() {
        console.log('call modal')
        const $modal = document.querySelector('.window')

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-close') || e.target.closest('.btn-close') || e.target.classList.contains('window__bg')) {
                e.preventDefault();
                $modal.classList.remove('open')
                document.documentElement.style.overflow = 'auto'
            } else if (e.target.classList.contains('open-modal')) {
                e.preventDefault();

                start()
                $modal.classList.add('open')
                document.documentElement.style.overflow = 'hidden'
            }
        })

        function start() {
            const mHeader = $modal.querySelector('.modal__header')
            const mBody = $modal.querySelector('.modal__body')
            const mFooter = $modal.querySelector('.modal__footer')

            mHeader.innerHTML = `<h1 class="h1">Регистрация</h1>`
            mBody.innerHTML = `<form action="#" method="POST" class="form" id="form">
            <div class="form-group" id="select">
                <input class="input" name="city" id="input-select" placeholder=" " readonly>
                <label class="label" for="input-select">Город</label>
            </div>
            <div class="form-group">
                <input type="text" name="name" class="input wrong" id="input-text-1" placeholder=" ">
                <label class="label" for="input-text-1">Имя Фамилия</label>
            </div>
            <div class="form-group">
                <input type="phone" name="phone" class="input" id="input-text-2" placeholder=" ">
                <label class="label" for="input-text-2">Телефон</label>
            </div>
            <div class="form-group">
                <textarea class="textarea" id="textarea-1"></textarea>
                <label class="label" for="textarea-1">Комментарий</label>
            </div>
            <p class="group-header">Мастер-класс</p>
            <div class="form-group">
                <label class="label-radio" for="radio-1">
                    <input class="input-radio" type="radio" name="radio" id="radio-1" value="1">
                    Экономия на онлайн-шопинге 
                </label>
                <label class="label-radio" for="radio-2">
                    <input class="input-radio" type="radio" name="radio" id="radio-2" value="2">
                    Мастер-класс
                </label>
                <label class="label-radio" for="radio-3">
                    <input class="input-radio" type="radio" name="radio" id="radio-3" value="3" checked>
                    Лучшие площадки
                </label>
                <label class="label-radio" for="radio-4">
                    <input class="input-radio" type="radio" name="radio" id="radio-4" value="4">
                    Мастер-класс
                </label>
            </div>
            <p class="group-header">Мастер-класс</p>
            <div class="form-group">
                <label class="label-check" for="check-1">
                    <input class="input-check" type="checkbox" name="check-1" id="check-1">
                    12:00 – 14:00
                </label>
                <label class="label-check" for="check-2">
                    <input class="input-check" type="checkbox" name="check-2" id="check-2" checked>
                    15:00 – 17:00
                </label>
                <label class="label-check" for="check-3">
                    <input class="input-check" type="checkbox" name="check-3" id="check-3">
                    19:00 – 21:00
                </label>
            </div>
            <div class="form-group">
                <label class="label-toggle" for="toggle">
                    <span class="off">Онлайн</span>
                    <input class="input-toggle" type="checkbox" name="toggle" id="toggle">
                    <span class="on">Офлайн</span>
                    
                </label>
            </div>
            <p class="group-header">Сколько вы готовы заплатить за мероприятие?</p>
            <div class="form-group">
                <label class="label-range" for="input-range" id="sum">4 000 ₽</label>
                <input type="range" name="rage" min="3000" max="10000" step="1000" value="6000" class="input-range" id="input-range" placeholder=" ">
            </div>
                                </form>`
            mFooter.innerHTML = `<div class="modal__btn">
            <button class="btn btn_red" type="submit" form="form">
                Продолжить
            </button>
        </div>
        <div class="modal__desc">
            Нажимая на кнопку, вы соглашаетесь с <a href="#">Политикой обработки персональных данных</a>
                                </div>`

            //////////////////////////////////////////////////////

            textarea()
            toggles()
            range()
        
            const mask = new MyMask('[name="phone"]')
        
            const mySelect = new MySelect('#select', {
                //selectedId: '4',
                data: [
                    {id: '1', value: 'Москва'},
                    {id: '2', value: 'Санкт-Петербург'},
                    {id: '3', value: 'Екатеринбург'},
                    {id: '4', value: 'Самара'},
                    {id: '5', value: 'Иркутск'},
                    {id: '6', value: 'Челябинск'}
                ],
                onSelect(item) {
                    console.log('select ', item)
                }
            })

            //////////////////////////////////////////////////////
            const form = $modal.querySelector('#form')
            form.addEventListener('submit', (e) => {
                e.preventDefault()
        
                document.querySelector('.loading').style.display = 'block';
                setTimeout(() => {
        
                    const formData = new FormData(form);
                
                    for (let item of formData.entries()) {
                        console.log(item[0]+ ': '+ item[1]);
                    }
        
                    document.querySelector('.loading').style.display = 'none';
    
                    mHeader.innerHTML = `<h1 class="h1">Спасибо за&nbsp;заявку</h1>`
                    mBody.innerHTML = `<p class="p1">Мы свяжемся с вами в ближайшее время</p>`
                    mFooter.innerHTML = `<div class="modal__btn"><button class="btn btn_red btn-close">Продолжить</button></div>`
                }, 1000);
            })
        }
    }
    modal()

});