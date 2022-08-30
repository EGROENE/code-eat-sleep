// vars related to toggling light/dark themes:
const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

// var to store value of page root:
const root = document.documentElement;

// THEME
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn); // querySelectorAll returns all elements w/ given class & puts them into an array (like getElementsByClassName)
const currentTheme = localStorage.getItem(theme); // theme that the user sets is saved

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elem, selector) => {
    if (document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    }
    elem.classList.add(active);
}

const setTheme = (val) => {
    if (val === dark) {
        root.setAttribute(dataTheme, dark);
        localStorage.setItem(theme, dark);
    } else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
}

if (currentTheme) {
    root.setAttribute(dataTheme, currentTheme);
    switcher.forEach((btn) => {
        btn.classList.remove(active);
    })

    if (currentTheme === dark) {
        switcher[1].classList.add(active); // dark btn to active
    } else {
        switcher[0].classList.add(active); // light btn to active
    }
}

toggleTheme.addEventListener('click', function() {
    const tab = this.parentElement.parentElement;
    if (!tab.className.includes(open)) {
        tab.classList.add(open);
    } else {
        tab.classList.remove(open);
    }
})

for (const elem of switcher) {
    elem.addEventListener('click', function() {
        const toggle = this.dataset.toggle; // dataset corresponds to data in data-toggle
        // set active state:
        setActive(elem, switcherBtn);
        setTheme(toggle);
    })
}

// Full site modal 'open buttons'
for (const elem of openModal) {
    elem.addEventListener('click', function() {
        const modalId = this.dataset.open; // this refers to parent element, which is elem here. It then accesses datasets that are followed by 'open'. Don't use arrow func here, so that this keyword works;
        document.getElementById(modalId).classList.add(isVisible); // this adds .is-visible as a class to everything in document with data-open="about"
    })
}

// Remove isVisible class from elements in HTML with data-close attribute upon click:
for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        this.parentElement.parentElement.classList.remove(isVisible);
    })
}