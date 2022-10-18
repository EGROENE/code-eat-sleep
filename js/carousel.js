const slides = document.querySelectorAll('.review-item');
const buttons = document.querySelectorAll('.slide-ctrl-container button');

let current = Math.floor(Math.random() * slides.length); // random slide loads

// Define next/prev slides as index numbers:
let next = current < slides.length - 1 ? current + 1 : 0; // if current is not last slide, next = current + 1, otherwise 0.
let prev = current > 0 ? current - 1 : slides.length - 1; // if current is not first slide, prev = current - 1, otherwise last slide.

// Update CSS of slides:
const update = () => {
    slides.forEach((slide) => {
        slide.classList.remove('active', 'prev', 'next');
    })
    slides[current].classList.add('active');
    slides[prev].classList.add('prev');
    slides[next].classList.add('next');
}

// Func to redefine passed number as current (index of slides object), & define the next and prev slides
const goToNum = (number) => {
    current = number;
    // if current is not the last in slides, next slide = current + 1; else, it is slides[0]:
    next = current < slides.length - 1 ? current + 1 : 0;
    // if current is not the first in slides, prev slide = current - 1; else, it is slides[slides.length -1]:
    prev = current > 0 ? current - 1 : slides.length - 1;
    update();
}

// Func to go to slide after current, defined randomly & redefined in goToNum()'s param, displays, unless current is the last slide, in which case, the first slide displays:
const goToNext = () => current < slides.length - 1 ? goToNum(current + 1) : goToNum(0);

// Func to go to slide before current, defined randomly & redefined in goToNum()'s param, displays, unless current is the first slide, in which case, the last slide displays:
const goToPrev = () => current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);

// Functionality to display either prev or next rev, depending on buttons index (0 is prev btn, else (1) is next btn), upon clicking of prev/next buttons:
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext());
}

update();