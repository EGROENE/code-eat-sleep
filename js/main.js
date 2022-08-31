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

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

// var to store value of page root:
const root = document.documentElement;

// THEME
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn); // querySelectorAll returns all elements w/ given class & puts them into an array (like getElementsByClassName)
const currentTheme = localStorage.getItem(theme); // theme that the user sets is saved

// PORTFOLIO
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');
const portfolioCards = document.getElementsByClassName('portfolio-card');

// MODAL
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

searchBox.addEventListener('keyup', (eventObject) => {
    const searchInput = eventObject.target.value.toLowerCase().trim();
    portfolioItems.forEach((card) => {
        if (card.dataset.item.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
})

for (const link of filterLink) {
    link.addEventListener('click', function() {
        setActive(link, '.filter-link');
        const filter = this.dataset.filter;
        portfolioItems.forEach((card) => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else if (card.dataset.item === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        })
    })
    // If only one category is displayed while the others are hidden, change link color:
    // Iterate thru the styles & if display: block; then change color of corresponding link
/*     for (const card of portfolioCards) {
        if (card.style.display === 'block') {
            link.style.color = '#495fef';
        }
    } */
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