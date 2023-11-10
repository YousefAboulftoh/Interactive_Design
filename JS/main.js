// Open Menu And Add Nav
let bars = document.querySelector(`.bars i`)
let nav = document.querySelector(`header nav`)
let navLinks = document.querySelectorAll(`header nav a`)
let arrow = document.querySelector(`header .bars .arrow`)
bars.onclick = function () {
    nav.classList.toggle(`opend`)
    arrow.classList.toggle(`none`)
}
document.addEventListener(`click`, e => {
    if (e.target !== nav && e.target !== bars) {
        if (nav.classList.contains(`opend`)) {
            nav.classList.toggle(`opend`)
            arrow.classList.toggle(`none`)
        }
    }
})
navLinks.forEach(a => {
    a.addEventListener(`click`, e => {
        e.target.stopPropagation()
    })
})
// Setting Box Slide
let setting = document.querySelector(`.setting-box`)
let gear = document.querySelector(`.setting-box .gear`)
gear.onclick = function () {
    setting.classList.toggle(`slide`)
}
let lisColor = document.querySelectorAll(`.setting-box ul li`)
if (window.localStorage.getItem(`color`)) {
    document.documentElement.style.setProperty(`--main-color`, window.localStorage.getItem(`color`))
    lisColor.forEach((l) => {
        l.classList.remove(`active`)
    })
    document.querySelector(`[data-color = "${window.localStorage.getItem(`color`)}"]`).classList.add(`active`)
}
lisColor.forEach((li) => {
    li.style.backgroundColor = li.dataset.color
    li.addEventListener(`click`, (e) => {
        // Remove Active From All
        lisColor.forEach((l) => {
            l.classList.remove(`active`)
        })
        // Add Active Class
        e.currentTarget.classList.add(`active`)
        window.localStorage.setItem(`color`, e.currentTarget.dataset.color)
        document.documentElement.style.setProperty(`--main-color`, e.currentTarget.dataset.color)
    })
})
// Change Background Image
let landing = document.querySelector(`.landing`)
let buttons = document.querySelectorAll(`.background-random button`)
let arr = [`01.jpg`, `02.jpg`, `03.jpg`, `04.jpg`, `05.jpg`, `06.jpg`, `07.jpg`, `08.jpg`, `09.jpg`, `landing.jpg`]
let randomBackground = true;
let changeBac;
if (window.localStorage.getItem(`button`)) {
    buttons.forEach(b => {
        b.classList.remove(`active`)
    })
    document.querySelector(`[data-content="${window.localStorage.getItem(`button`)}"]`).classList.add(`active`)
    if (window.localStorage.getItem(`button`) === `no`) {
        randomBackground = false;
        clearInterval(changeBac)
    }
}
function changeback() {
    if (randomBackground) {
        changeBac = setInterval(() => {
            let random = Math.floor(Math.random() * arr.length)
            landing.style.backgroundImage = `url(../img/${arr[random]})`
            console.log(arr[random])
        }, 10000);
    }
}

buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        buttons.forEach(b => {
            b.classList.remove(`active`)
        })
        e.currentTarget.classList.add(`active`)
        if (e.target.dataset.content === `yes`) {
            window.localStorage.setItem(`button`, e.target.dataset.content)
            randomBackground = true;
            changeback()
        } else {
            window.localStorage.setItem(`button`, e.target.dataset.content)
            randomBackground = false
            clearInterval(changeBac)
        }
    })
})
changeback();
// Progress On Load
let skills = document.getElementById(`skills`)
let spans = document.querySelectorAll(`.skills .prog`)

window.onscroll = function () {
    if (window.scrollY >= skills.offsetTop) {
        spans.forEach(s => {
            s.style.width = s.dataset.width
        })
    }
}
// Gallery

let imgs = document.querySelectorAll(`.gallery .image img`)

imgs.forEach(img => {
    img.addEventListener(`click`, e => {
        let overlayPopup = document.createElement(`div`)
        overlayPopup.className = `overlay-popup`
        document.body.appendChild(overlayPopup)
        // Add Box Image
        let boxPopup = document.createElement(`div`)
        boxPopup.classList.add(`box-popup`)
        let imageInBox = document.createElement(`img`)
        imageInBox.className = "image-box"
        imageInBox.src = img.src
        if (img.alt !== null) {
            let h3 = document.createElement(`h3`)
            h3.classList.add(`head`)
            let headingText = document.createTextNode(img.alt)
            h3.appendChild(headingText)
            boxPopup.appendChild(h3)
        }
        boxPopup.append(imageInBox)
        document.body.append(boxPopup)
        // Add Close Span
        let closeSpan = document.createElement(`span`)
        let spanText = document.createTextNode(`x`)
        closeSpan.className = `close`
        closeSpan.appendChild(spanText)
        boxPopup.appendChild(closeSpan)
        document.querySelector(`.close`).onclick = function (e) {
            e.target.parentNode.remove()
            overlayPopup.remove()
        }
    })
})
// Show Or No Bullets
let bullets = document.querySelector(`.bullets`)
let bulletLi = document.querySelectorAll(`.bullets ul li`)
let bulletBtn = document.querySelectorAll(`.bullet button`)

if (window.localStorage.getItem(`bullet`)) {
    bulletBtn.forEach(b => {
        b.classList.remove(`active`)
    })
    document.querySelector(`[data-bull="${window.localStorage.getItem(`bullet`)}"]`).classList.add(`active`)
    if (window.localStorage.getItem(`bullet`) === "no") {
        bullets.style.display = `none`
    }
}

bulletBtn.forEach(btn => {
    btn.addEventListener(`click`, e => {
        // Remove From All
        bulletBtn.forEach(b => {
            b.classList.remove(`active`)
        })
        e.target.classList.add(`active`)
        window.localStorage.setItem(`bullet`, e.target.dataset.bull)
        if (e.target.dataset.bull === "yes") {
            bullets.style.display = `block`
        } else {
            bullets.style.display = `none`
        }
    })
})
smooth(bulletLi)
smooth(navLinks)
// Reset All 

let resetBtn = document.querySelector(`.setting-box .reset`)

resetBtn.onclick = function () {
    window.localStorage.clear()
    // window.location.reload()
}
// Copyright

let copy = document.querySelector(`footer .copy`)
let date = new Date()
copy.innerText = date.getFullYear()

function smooth(elements) {
    elements.forEach(ele => {
        ele.addEventListener(`click`, e => {
            let currnet = document.querySelector(e.target.dataset.sec)
            currnet.scrollIntoView({ behavior: "smooth" })
        })
    })
}
